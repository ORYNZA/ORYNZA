import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();
  return (
    <div className="acc">
      {items.map((it, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div className={`acc-item ${isOpen ? 'is-open' : ''}`} key={it.q}>
            <h3>
              <button type="button" id={`${id}-b`} aria-expanded={isOpen} aria-controls={`${id}-p`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{it.q}</span>
                {isOpen ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
              </button>
            </h3>
            <div id={`${id}-p`} role="region" aria-labelledby={`${id}-b`} hidden={!isOpen}>
              <p>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
