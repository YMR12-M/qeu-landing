// cutout <in.png> <out.png> [scale] [--no-lift]
//
// How the photos of Qeu Foods' packs were cut from screenshots of the app (src/assets/images/
// food-*.webp): a card of the app's grey, one product on it and a + button at its corner. The
// + button was first painted out (mirrored from the other side of the pack where the pack was
// symmetrical, grey where not — the price stickers sit over that corner), then this tool
// upscales the card 4× with macOS's own super-resolution model (VideoToolbox, macOS 26) and lifts
// the subject off its grey (Vision), writing a PNG with alpha; the PNG was then trimmed, its
// matte pulled in a pixel and softened, and saved as WebP.
//
// Build: `swiftc -O cutout.swift -o cutout`. If the Command Line Tools' Swift reports
// «redefinition of module 'SwiftBridging'», hide the stale module map from the compiler with a
// VFS overlay (an empty module.modulemap standing in for
// /Library/Developer/CommandLineTools/usr/include/swift/module.modulemap) and pass
// `-Xcc -ivfsoverlay -Xcc overlay.yaml -vfsoverlay overlay.yaml`.
//
import Foundation
import CoreImage
import CoreVideo
import VideoToolbox
import Vision
import ImageIO
import UniformTypeIdentifiers

let ctx = CIContext(options: [.workingColorSpace: CGColorSpace(name: CGColorSpace.sRGB)!])
let sRGB = CGColorSpace(name: CGColorSpace.sRGB)!

func fail(_ message: String) -> Never {
  FileHandle.standardError.write((message + "\n").data(using: .utf8)!)
  exit(1)
}

@available(macOS 26.0, *)
func superResolve(_ input: CIImage, scale: Int) async throws -> CIImage {
  let w = Int(input.extent.width), h = Int(input.extent.height)
  guard let config = VTSuperResolutionScalerConfiguration(
    frameWidth: w, frameHeight: h, scaleFactor: scale, inputType: .image,
    usePrecomputedFlow: false, qualityPrioritization: .normal, revision: .revision1)
  else { fail("no super-resolution configuration for \(w)x\(h)") }
  if config.configurationModelStatus != .ready { try await config.downloadConfigurationModel() }
  let processor = VTFrameProcessor()
  try processor.startSession(configuration: config)

  func buffer(_ attrs: [String: Any]) -> CVPixelBuffer {
    var pb: CVPixelBuffer?
    let formats = attrs[kCVPixelBufferPixelFormatTypeKey as String]
    var format = kCVPixelFormatType_64RGBAHalf
    if let list = formats as? [NSNumber], let first = list.first { format = first.uint32Value }
    var a = attrs
    a[kCVPixelBufferPixelFormatTypeKey as String] = format
    CVPixelBufferCreate(nil, attrs[kCVPixelBufferWidthKey as String] as! Int,
                        attrs[kCVPixelBufferHeightKey as String] as! Int, format, a as CFDictionary, &pb)
    return pb!
  }
  let src = buffer(config.sourcePixelBufferAttributes)
  let dst = buffer(config.destinationPixelBufferAttributes)
  ctx.render(input, to: src, bounds: input.extent, colorSpace: sRGB)

  guard let sf = VTFrameProcessorFrame(buffer: src, presentationTimeStamp: .zero),
        let df = VTFrameProcessorFrame(buffer: dst, presentationTimeStamp: CMTime(value: 0, timescale: 1)),
        let params = VTSuperResolutionScalerParameters(
          sourceFrame: sf, previousFrame: nil, previousOutputFrame: nil, opticalFlow: nil,
          submissionMode: .random, destinationFrame: df)
  else { fail("could not build super-resolution parameters") }
  try await processor.process(parameters: params)
  processor.endSession()
  return CIImage(cvPixelBuffer: dst)
}

func lift(_ image: CIImage) throws -> CIImage {
  guard let cg = ctx.createCGImage(image, from: image.extent, format: .RGBA8, colorSpace: sRGB)
  else { fail("could not render the upscaled image") }
  let request = VNGenerateForegroundInstanceMaskRequest()
  let handler = VNImageRequestHandler(cgImage: cg)
  try handler.perform([request])
  guard let result = request.results?.first else { fail("no subject found") }
  let masked = try result.generateMaskedImage(
    ofInstances: result.allInstances, from: handler, croppedToInstancesExtent: false)
  return CIImage(cvPixelBuffer: masked)
}

func write(_ image: CIImage, to path: String) {
  let url = URL(fileURLWithPath: path)
  do {
    try ctx.writePNGRepresentation(of: image, to: url, format: .RGBA8, colorSpace: sRGB)
  } catch { fail("write failed: \(error)") }
}

let args = CommandLine.arguments
guard args.count >= 3 else { fail("usage: cutout in.png out.png [scale] [--no-lift]") }
let scale = args.count > 3 ? (Int(args[3]) ?? 4) : 4
let skipLift = args.contains("--no-lift")
guard let input = CIImage(contentsOf: URL(fileURLWithPath: args[1])) else { fail("cannot read \(args[1])") }

Task {
  do {
    if #available(macOS 26.0, *) {
      var out = scale > 1 ? try await superResolve(input, scale: scale) : input
      if !skipLift { out = try lift(out) }
      write(out, to: args[2])
    } else { fail("needs macOS 26") }
    exit(0)
  } catch { fail("error: \(error)") }
}
dispatchMain()
