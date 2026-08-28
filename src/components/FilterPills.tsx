type Option<T extends string> = {
  id: T
  label: string
  count?: number
}

type Props<T extends string> = {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  label?: string
}

export function FilterPills<T extends string>({ value, options, onChange, label }: Props<T>) {
  return (
    <div className="filter-block">
      {label ? <p className="kicker">{label}</p> : null}
      <div className="filter-track" role="tablist" aria-label={label ?? 'Filter'}>
        {options.map((option) => {
          const active = option.id === value
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`filter-pill${active ? ' is-active' : ''}`}
              onClick={() => onChange(option.id)}
            >
              {option.label}
              {typeof option.count === 'number' ? ` (${option.count})` : ''}
            </button>
          )
        })}
      </div>
    </div>
  )
}
