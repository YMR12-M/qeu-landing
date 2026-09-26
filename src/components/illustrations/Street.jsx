import { LOGO_HREF } from '../brand/Logo.jsx';

/**
 * The street of «كيف يشتغل», drawn flat in the delivery van's style: Qeu's store with its sign
 * and awning at one end, a Jeddah house with its wooden rawshan at the other, palms, the pin
 * where the order is placed, a pale skyline behind, and the bag left at the door. All
 * decorative: the section's steps say what the street shows.
 */

function Svg({ children, ...props }) {
  return (
    <svg aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

/** Qeu's store: the wordmark on its sign, a striped awning, groceries in the window. */
export function Store({ className, ...props }) {
  const stripes = [18, 62, 106, 150, 194];
  const scallops = [29, 51, 73, 95, 117, 139, 161, 183, 205];
  return (
    <Svg viewBox="16 0 202 182" className={className} {...props}>
      <rect x="52" y="0" width="128" height="36" rx="7" fill="#17a2ae" />
      <use href={LOGO_HREF} x="87" y="3" width="58" height="30" fill="#fff" />
      <rect x="70" y="36" width="5" height="14" fill="#9fb3b7" />
      <rect x="157" y="36" width="5" height="14" fill="#9fb3b7" />
      <rect x="20" y="50" width="194" height="10" rx="2" fill="#e2eaec" />
      <rect x="24" y="60" width="186" height="120" fill="#fff" stroke="#c3d3d6" strokeWidth="2" />

      {/* The awning: teal and pale stripes, a scalloped hem, and its shadow on the wall. */}
      <rect x="24" y="86" width="186" height="8" fill="#0b4a57" fillOpacity="0.08" />
      <rect x="18" y="66" width="198" height="20" fill="#cdeef1" />
      {stripes.map((x) => (
        <rect key={x} x={x} y="66" width="22" height="20" fill="#17a2ae" />
      ))}
      {scallops.map((cx, index) => (
        <circle key={cx} cx={cx} cy="86" r="11" fill={index % 2 ? '#cdeef1' : '#17a2ae'} />
      ))}
      <rect x="18" y="66" width="198" height="3" fill="#0b4a57" fillOpacity="0.3" />

      {/* The window: two shelves of groceries. */}
      <rect x="36" y="106" width="58" height="60" rx="3" fill="#cfe9ec" />
      <rect x="36" y="126" width="58" height="3" fill="#9fcdd3" />
      <rect x="36" y="146" width="58" height="3" fill="#9fcdd3" />
      <rect x="41" y="114" width="7" height="12" rx="1" fill="#f2c230" />
      <rect x="51" y="117" width="8" height="9" rx="1" fill="#d8432f" />
      <rect x="62" y="112" width="6" height="14" rx="1" fill="#3a86d1" />
      <rect x="71" y="116" width="9" height="10" rx="1" fill="#c68f45" />
      <rect x="83" y="113" width="6" height="13" rx="1" fill="#4da253" />
      <rect x="42" y="135" width="9" height="11" rx="1" fill="#ecdfc2" />
      <rect x="54" y="137" width="7" height="9" rx="1" fill="#e84a36" />
      <rect x="64" y="134" width="7" height="12" rx="1" fill="#fbfbf8" />
      <rect x="74" y="136" width="8" height="10" rx="1" fill="#f2c230" />
      <rect x="85" y="135" width="5" height="11" rx="1" fill="#2e8f5c" />

      {/* The glass doors. */}
      <rect
        x="104"
        y="108"
        width="46"
        height="72"
        rx="2"
        fill="#bfe3e7"
        stroke="#9fb3b7"
        strokeWidth="2"
      />
      <path d="M127 108v72" stroke="#9fb3b7" strokeWidth="2" />
      <rect x="120" y="138" width="3" height="12" rx="1.5" fill="#0b4a57" />
      <rect x="131" y="138" width="3" height="12" rx="1.5" fill="#0b4a57" />

      {/* The other window, with a yellow deal poster. */}
      <rect x="160" y="106" width="42" height="60" rx="3" fill="#cfe9ec" />
      <path
        d="m181 118 3.2 4.1 5-1.6-.3 5.2 4.9 1.8-3.3 4 3.3 4-4.9 1.8.3 5.2-5-1.6-3.2 4.1-3.2-4.1-5 1.6.3-5.2-4.9-1.8 3.3-4-3.3-4 4.9-1.8-.3-5.2 5 1.6Z"
        fill="#ffc43d"
      />
      <rect x="24" y="172" width="186" height="8" fill="#e2eaec" />
    </Svg>
  );
}

/**
 * A Jeddah house: a crenellated parapet, a wooden rawshan on the upper floor, an arched door
 * on the side it is drawn facing (its left; the section turns it to face the van).
 */
export function House({ className, ...props }) {
  const merlons = [22, 34, 46, 58, 70, 82, 94, 106, 118, 130];
  return (
    <Svg viewBox="16 21 136 157" className={className} {...props}>
      {merlons.map((x) => (
        <path key={x} d={`M${x} 30l5-7 5 7Z`} fill="#efe4cf" />
      ))}
      <rect
        x="18"
        y="30"
        width="130"
        height="146"
        fill="#fbf5ea"
        stroke="#dccfb7"
        strokeWidth="2"
      />
      <rect x="18" y="96" width="130" height="5" fill="#efe4cf" />

      {/* The rawshan: a wooden lattice bay, capped and bracketed. */}
      <rect x="82" y="38" width="50" height="52" rx="2" fill="#1f6f78" />
      <path d="M78 38h58l-4-8H82Z" fill="#0b4a57" />
      <g stroke="#3aa0aa" strokeWidth="1.4">
        <path d="M90 44v40M98 44v40M106 44v40M114 44v40M122 44v40" />
        <path d="M86 52h42M86 62h42M86 72h42M86 82h42" />
      </g>
      <path d="M86 90h42l-5 7H91Z" fill="#0b4a57" />

      <rect
        x="32"
        y="44"
        width="30"
        height="36"
        rx="15"
        fill="#cfe9ec"
        stroke="#dccfb7"
        strokeWidth="2"
      />
      <path d="M47 44v36" stroke="#dccfb7" strokeWidth="2" />

      {/* The door. */}
      <path d="M36 176v-40a14 14 0 0 1 28 0v40Z" fill="#0b4a57" />
      <path d="M50 122v54" stroke="#062f38" strokeWidth="1.5" />
      <circle cx="56" cy="152" r="1.8" fill="#ffc43d" />

      <rect
        x="84"
        y="116"
        width="44"
        height="34"
        rx="3"
        fill="#cfe9ec"
        stroke="#dccfb7"
        strokeWidth="2"
      />
      <path d="M106 116v34" stroke="#dccfb7" strokeWidth="2" />
    </Svg>
  );
}

/** The pin where the order is placed: a shopping bag in a map pin. */
export function Pin({ className, ...props }) {
  return (
    <Svg viewBox="0 0 44 88" className={className} {...props}>
      <ellipse cx="22" cy="84" rx="12" ry="3" fill="#0b4a57" fillOpacity="0.15" />
      <path d="M22 80c-3-9-18-24-18-40a18 18 0 0 1 36 0c0 16-15 31-18 40Z" fill="#17a2ae" />
      <circle cx="22" cy="40" r="12" fill="#fff" />
      <path d="M16.5 37h11l-1 10h-9Z" fill="#17a2ae" />
      <path d="M18.5 37v-2a3.5 3.5 0 0 1 7 0v2" fill="none" stroke="#17a2ae" strokeWidth="1.8" />
    </Svg>
  );
}

/** A date palm. */
export function Palm({ className, ...props }) {
  return (
    <Svg viewBox="-14 -6 80 124" className={className} {...props}>
      <path
        d="M18 116c2-30 3-58 8-86"
        fill="none"
        stroke="#9a7b4f"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M18 116c2-30 3-58 8-86"
        fill="none"
        stroke="#7f6440"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="3 7"
      />
      <g fill="#3f9a4a">
        <path d="M26 30c-12-10-28-10-38-2 12-2 24 0 38 2Z" />
        <path d="M26 30c10-12 26-14 38-8-12 0-24 3-38 8Z" />
        <path d="M26 30c-6-14-2-28 8-34-4 10-6 22-8 34Z" />
        <path d="M26 30c-16 0-26 10-30 20 8-8 18-14 30-20Z" />
        <path d="M26 30c14 2 24 12 26 22-8-8-16-14-26-22Z" />
      </g>
      <g fill="#8a4b22">
        <circle cx="23" cy="34" r="2.2" />
        <circle cx="28" cy="35" r="2.2" />
        <circle cx="25.5" cy="37.5" r="2.2" />
      </g>
    </Svg>
  );
}

/** The city behind, pale: low blocks and towers, stretched to whatever width the street has. */
export function Skyline({ className, ...props }) {
  const blocks = [
    [30, 50, 60],
    [95, 20, 40],
    [140, 65, 70],
    [260, 45, 44],
    [330, 40, 50],
    [385, 0, 36],
    [426, 55, 64],
    [540, 35, 48],
    [600, 30, 44],
    [650, 60, 70],
    [760, 50, 52],
    [860, 45, 56],
    [920, 25, 40],
  ];
  return (
    <Svg viewBox="0 0 1000 170" preserveAspectRatio="none" className={className} {...props}>
      {blocks.map(([x, y, width]) => (
        <rect key={x} x={x} y={y} width={width} height={170 - y} />
      ))}
    </Svg>
  );
}

/** Qeu's teal bag, left at the door: the wordmark on it, the groceries showing at the top. */
export function Bag({ className, ...props }) {
  return (
    <Svg viewBox="0 0 40 48" className={className} {...props}>
      <path d="M13 12c0-6 3-9 7-9s7 3 7 9" fill="none" stroke="#0b4a57" strokeWidth="2.4" />
      <path d="M11 13c-1-5 1-9 4-10 2 3 1 7-1 10Z" fill="#4da253" />
      <rect x="21" y="4" width="6" height="11" rx="2" fill="#f2c230" />
      <path d="M5 13h30l-2.5 33a2 2 0 0 1-2 1.8H9.5a2 2 0 0 1-2-1.8Z" fill="#17a2ae" />
      <path d="M29 13h6l-2.5 33a2 2 0 0 1-2 1.8h-3Z" fill="#000" fillOpacity="0.12" />
      <use href={LOGO_HREF} x="10" y="22" width="18" height="10" fill="#fff" />
    </Svg>
  );
}
