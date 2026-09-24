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
