interface Props {
  label?: string;
  className?: string;
}

export default function AdPlaceholder({ label = 'Werbeplatz', className = '' }: Props) {
  return (
    <div
      className={`my-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center p-6 text-center ${className}`}
      aria-hidden="true"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-300 mb-1">Anzeige</p>
      <p className="text-gray-300 text-sm">{label}</p>
      <p className="text-gray-200 text-xs mt-1">z. B. 728 × 90 px Leaderboard oder 300 × 250 px Rectangle</p>
    </div>
  );
}
