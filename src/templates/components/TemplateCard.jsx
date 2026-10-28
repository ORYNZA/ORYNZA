export default function TemplateCard({ template, onSelect }) {
  return (
    <button
      type="button"
      className="orynza-template-card"
      onClick={() => onSelect?.(template)}
      aria-label={`Select ${template?.name ?? "template"}`}
    >
      <div className="orynza-template-card__preview">
        <span>{template?.categoryName ?? "ORYNZA"}</span>
        <h3>{template?.name ?? "Untitled template"}</h3>
      </div>
      <span>{template?.status ?? "draft"}</span>
    </button>
  );
}
