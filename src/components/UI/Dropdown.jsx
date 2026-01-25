import { useState, useRef, useEffect } from 'react'

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  multiple = false,
  searchable = false,
  label = '',
  required = false,
  error = '',
  success = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearch('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(search.toLowerCase())
      )
    : options

  const selectedOption = multiple
    ? options.filter(opt => value?.includes(opt.value))
    : options.find(opt => opt.value === value)

  const displayValue = multiple
    ? selectedOption?.length > 0
      ? `${selectedOption.length} selected`
      : placeholder
    : selectedOption?.label || placeholder

  const handleSelect = (option) => {
    if (multiple) {
      const newValue = value?.includes(option.value)
        ? value.filter(v => v !== option.value)
        : [...(value || []), option.value]
      onChange(newValue)
    } else {
      onChange(option.value)
      setIsOpen(false)
      setSearch('')
    }
  }

  const removeOption = (optionValue, e) => {
    e.stopPropagation()
    const newValue = value?.filter(v => v !== optionValue)
    onChange(newValue)
  }

  const inputClasses = `
    w-full px-4 py-3 rounded-xl glass-light border transition-all duration-300 
    outline-none text-left cursor-pointer flex items-center justify-between
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30' : 
      success ? 'border-emerald-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30' :
      'border-slate-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30'}
    ${isOpen ? 'border-gold-500' : ''}
  `

  return (
    <div className={`space-y-2 ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gold-200">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={inputClasses}
        >
          <div className="flex items-center flex-wrap gap-2 min-h-6">
            {multiple && value?.length > 0 ? (
              value.map((val, index) => {
                const option = options.find(opt => opt.value === val)
                return (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded text-xs bg-gold-500/20 text-gold-300"
                  >
                    {option?.label || val}
                    <button
                      type="button"
                      onClick={(e) => removeOption(val, e)}
                      className="ml-1 hover:text-white"
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </span>
                )
              })
            ) : (
              <span className={`${value ? 'text-white' : 'text-slate-500'}`}>
                {displayValue}
              </span>
            )}
          </div>
          <i className={`fas fa-chevron-down text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 glass-dark rounded-xl golden-border shadow-xl max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-3 border-b border-slate-700">
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg glass-light border border-slate-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 outline-none transition-all duration-300 text-white"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            <div className="overflow-y-auto max-h-48">
              {filteredOptions.length === 0 ? (
                <div className="py-3 px-4 text-slate-400 text-center">No options found</div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`
                      px-4 py-3 cursor-pointer transition-colors flex items-center justify-between
                      ${multiple && value?.includes(option.value) ? 'bg-gold-500/10' : 'hover:bg-slate-800/50'}
                    `}
                  >
                    <div className="flex items-center">
                      {multiple && (
                        <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${value?.includes(option.value) ? 'bg-gold-500 border-gold-500' : 'border-slate-600'}`}>
                          {value?.includes(option.value) && (
                            <i className="fas fa-check text-xs text-slate-900"></i>
                          )}
                        </div>
                      )}
                      {option.icon && <span className="mr-3 text-gold-300">{option.icon}</span>}
                      <span className="text-white">{option.label}</span>
                    </div>
                    {!multiple && value === option.value && (
                      <i className="fas fa-check text-gold-300"></i>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
      {success && <p className="text-xs text-emerald-400">{success}</p>}
    </div>
  )
}

export default Dropdown