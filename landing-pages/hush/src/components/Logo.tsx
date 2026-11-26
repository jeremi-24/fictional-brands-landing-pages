/** A calendar page whose only entry is a minus: a meeting taken out, "do not disturb". */
export function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="5" width="26" height="25" rx="6" fill="#d7f54a" />
      <path d="M3 13v-2a6 6 0 0 1 6-6h14a6 6 0 0 1 6 6v2z" fill="#10231c" />
      <rect x="3" y="5" width="26" height="25" rx="6" fill="none" stroke="#10231c" strokeWidth="2.5" />
      <path d="M10 2v6M22 2v6M10 21.5h12" stroke="#10231c" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}
