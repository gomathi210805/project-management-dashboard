import { useState } from 'react'

const Input = ({
  label,
  type = 'text',
  error,
  success,
  icon,
  iconPosition = 'left',
  helperText,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const inputType = type === 'password' && showPassword ? 'text' : type

  const baseClasses = 'w-full px-4 py-3 rounded-xl glass-light border transition-all duration-300 outline-none text-white placeholder:text-slate-500'
  
  const stateClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/30' 
    : success 
    ? 'border-emerald-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30'
    : 'border-slate-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30'

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gold-200">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        
        <input
          type={inputType}
          className={`${baseClasses} ${stateClasses} ${icon && iconPosition === 'left' ? 'pl-12' : ''} ${(icon && iconPosition === 'right') || type === 'password' ? 'pr-12' : ''} ${className}`}
          {...props}
        />

        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-gold-300 transition-colors"
          >
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        )}

        {icon && iconPosition === 'right' && type !== 'password' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
      </div>

      {helperText && !error && !success && (
        <p className="text-xs text-slate-400">{helperText}</p>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
      {success && <p className="text-xs text-emerald-400">{success}</p>}
    </div>
  )
}

export default Input