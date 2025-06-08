const Icon = ({ name, className = "w-5 h-5" }) => (
  <svg className={className} aria-hidden="true">
    <use href={`/sprite.svg#${name}`} />
  </svg>
);

export default Icon;
