interface Props {
  index: string;
  label: string;
}

/** Small editorial folio, e.g. "§ 02 — Philosophy". */
export function SectionMark({ index, label }: Props) {
  return (
    <p className="section-mark" data-reveal>
      <span>§ {index}</span>
      <span className="section-mark__rule" />
      <span>{label}</span>
    </p>
  );
}
