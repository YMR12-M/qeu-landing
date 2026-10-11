/**
 * Icons. The icons are Phosphor Icons (MIT, https://phosphoricons.com) in their fill weight,
 * inlined so the bundle carries only these paths; the two store marks (AppStoreMark,
 * PlayStoreMark) are the stores' own logos as Simple Icons draws them (CC0,
 * https://simpleicons.org), the Play triangle in its four brand colours. All icons are decorative
 * (aria-hidden) and take the current text colour, except the Play mark.
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

/** The Apple logo, as the App Store's badge carries it. Takes the current text colour. */
export function AppStoreMark(props) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </Icon>
  );
}

/** Google Play's triangle, in its four colours (blue, green, yellow, red), as its badge carries it. */
export function PlayStoreMark(props) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path fill="#00a0ff" d="M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924z" />
      <path fill="#00e07b" d="M12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973z" />
      <path fill="#ff3a44" d="M12.207 12.132l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
      <path fill="#ffd500" d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z" />
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

/** Opens downwards: the bar's list of sections, on phones. */
export function ChevronDown(props) {
  return (
    <StrokeIcon {...props}>
      <path d="m6 9.5 6 6 6-6" />
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
