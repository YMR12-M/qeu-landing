/**
 * Icons. The store logos are Phosphor Icons (MIT, https://phosphoricons.com) in their fill
 * weight, inlined so the bundle carries only these paths. All icons are decorative
 * (aria-hidden) and take the current text colour.
 */

function Icon({ viewBox = '0 0 256 256', children, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function AppleLogo(props) {
  return (
    <Icon {...props}>
      <path d="M128.23,30A40,40,0,0,1,167,0h1a8,8,0,0,1,0,16h-1a24,24,0,0,0-23.24,18,8,8,0,1,1-15.5-4ZM223.3,169.59a8.07,8.07,0,0,0-2.8-3.4C203.53,154.53,200,134.64,200,120c0-17.67,13.47-33.06,21.5-40.67a8,8,0,0,0,0-11.62C208.82,55.74,187.82,48,168,48a72.23,72.23,0,0,0-40,12.13,71.56,71.56,0,0,0-90.71,9.09A74.63,74.63,0,0,0,16,123.4a127,127,0,0,0,40.14,89.73A39.8,39.8,0,0,0,83.59,224h87.68a39.84,39.84,0,0,0,29.12-12.57,125,125,0,0,0,17.82-24.6C225.23,174,224.33,172,223.3,169.59Z" />
    </Icon>
  );
}

export function GooglePlayLogo(props) {
  return (
    <Icon {...props}>
      <path d="M239.82,114.18,72,18.16a16,16,0,0,0-16.12,0A15.68,15.68,0,0,0,48,31.87V224.13a15.68,15.68,0,0,0,7.92,13.67,16,16,0,0,0,16.12,0l167.78-96a15.76,15.76,0,0,0,0-27.64ZM160,139.31l18.92,18.92-88.5,50.66ZM90.4,47.1l88.53,50.67L160,116.69ZM193.31,150l-22-22,22-22,38.43,22Z" />
    </Icon>
  );
}

export function Globe(props) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9M12 3c-2.4 2.6-3.6 5.6-3.6 9s1.2 6.4 3.6 9" />
    </Icon>
  );
}

/** A till receipt — torn bottom edge, three printed lines: the page's sections menu. */
export function Receipt(props) {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 3h14v17l-1.75-1.25L15.5 20l-1.75-1.25L12 20l-1.75-1.25L8.5 20l-1.75-1.25L5 20Z" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" />
    </Icon>
  );
}

// Media controls keep their direction in RTL (they describe playback, not reading order).
export function Pause(props) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </Icon>
  );
}

export function Play(props) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path d="M8 5.8v12.4a1 1 0 0 0 1.5.86l10.2-6.2a1 1 0 0 0 0-1.72L9.5 4.94A1 1 0 0 0 8 5.8Z" />
    </Icon>
  );
}

/**
 * كيور's mark in the app: a four-pointed sparkle. `gradient` names a <linearGradient> id to
 * fill it with (the app's violet-to-teal); without one it takes the text colour.
 */
export function Sparkle({ gradient, ...props }) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill={gradient ? `url(#${gradient})` : undefined}
        d="M12 0c.9 6.2 5.8 11.1 12 12-6.2.9-11.1 5.8-12 12-.9-6.2-5.8-11.1-12-12C6.2 11.1 11.1 6.2 12 0Z"
      />
    </Icon>
  );
}

/** Line icons for the app screen in «اسأل كيور»: its back chevron, the cart, send, done. */
function StrokeIcon({ children, ...props }) {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </Icon>
  );
}

/** Points right: the back button of a right-to-left screen (the app is Arabic). */
export function ChevronBack(props) {
  return (
    <StrokeIcon {...props}>
      <path d="m9 5 7 7-7 7" />
    </StrokeIcon>
  );
}

export function Basket(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M3.5 9.5h17l-1.6 9.1a2 2 0 0 1-2 1.7H7.1a2 2 0 0 1-2-1.7Z" />
      <path d="m8.5 9.5 3-6M15.5 9.5l-3-6M9 13.5v3M15 13.5v3" />
    </StrokeIcon>
  );
}

export function ArrowUp(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </StrokeIcon>
  );
}

/** Points right, onwards in English; the stylesheet using it mirrors it for Arabic. */
export function ArrowForward(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </StrokeIcon>
  );
}

/** «كيو فودز»: the display fridge its meals are sold from. */
export function Fridge(props) {
  return (
    <StrokeIcon {...props}>
      <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
      <path d="M5 10h14M8.5 5.5v1.5M8.5 13v3" />
    </StrokeIcon>
  );
}

/** «كيو كوفي»: an iced coffee in its cold cup, with a straw. */
export function IcedCoffee(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M5.5 8h13l-1.6 12a1.8 1.8 0 0 1-1.8 1.5H8.9a1.8 1.8 0 0 1-1.8-1.5Z" />
      <path d="M4.5 8h15M12.5 8l2-5.5h2.5" />
    </StrokeIcon>
  );
}

export function Check(props) {
  return (
    <StrokeIcon strokeWidth="2.6" {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </StrokeIcon>
  );
}

/** The reactions under كيور's answers in the app: copy, like, dislike. */
export function Copy(props) {
  return (
    <StrokeIcon strokeWidth="1.7" {...props}>
      <rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2.5" />
      <path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5" />
    </StrokeIcon>
  );
}

const THUMB =
  'M7.5 11v9H5a1.5 1.5 0 0 1-1.5-1.5v-6A1.5 1.5 0 0 1 5 11h2.5Zm0 0 3.4-6.8a1.8 1.8 0 0 1 3.4 1.1L13.6 9h4.9a2 2 0 0 1 2 2.3l-1.1 7a2 2 0 0 1-2 1.7H7.5';

export function ThumbUp(props) {
  return (
    <StrokeIcon strokeWidth="1.7" {...props}>
      <path d={THUMB} />
    </StrokeIcon>
  );
}

export function ThumbDown(props) {
  return (
    <StrokeIcon strokeWidth="1.7" {...props}>
      <path d={THUMB} transform="rotate(180 12 12)" />
    </StrokeIcon>
  );
}

/** Replay: a circular arrow, anticlockwise. Media control, so it keeps its direction. */
export function Replay(props) {
  return (
    <StrokeIcon {...props}>
      <path d="M4 12a8 8 0 1 0 2.6-5.9" />
      <path d="M4 4.5v4.2h4.2" />
    </StrokeIcon>
  );
}

/** The privacy policy's three recipients: a delivery van, a payment card, a government building. */
function LineIcon({ children, ...props }) {
  return (
    <Icon
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </Icon>
  );
}

export function Van(props) {
  return (
    <LineIcon {...props}>
      <path d="M2.5 6.5h11v9.5h-11z" />
      <path d="M13.5 9.5h4.2l3.3 3.4v3.1h-7.5" />
      <circle cx="6.5" cy="17.2" r="1.9" />
      <circle cx="17" cy="17.2" r="1.9" />
    </LineIcon>
  );
}

export function PaymentCard(props) {
  return (
    <LineIcon {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.2" />
      <path d="M2.5 10h19M6 14.5h4" />
    </LineIcon>
  );
}

export function Landmark(props) {
  return (
    <LineIcon {...props}>
      <path d="M12 3.5 3.5 8h17z" />
      <path d="M6 9.5v7M10 9.5v7M14 9.5v7M18 9.5v7M4 17.5h16M3 20.5h18" />
    </LineIcon>
  );
}
