'use client';

export default function Accordion({ items, defaultOpen = 0 }) {
  const handleClick = (e) => {
    const button = e.currentTarget;
    const item = button.closest('.accordion-item');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  };

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div key={i} className={`accordion-item${i === defaultOpen ? ' open' : ''}`}>
          <button
            className="accordion-button"
            aria-expanded={i === defaultOpen ? 'true' : 'false'}
            onClick={handleClick}
          >
            {item.question}<i></i>
          </button>
          <div className="accordion-panel">{item.answer}</div>
        </div>
      ))}
    </div>
  );
}
