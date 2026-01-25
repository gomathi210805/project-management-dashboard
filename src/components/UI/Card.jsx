const Card = ({
  children,
  title,
  subtitle,
  icon,
  headerAction,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  hoverable = false,
  border = true,
  padding = true
}) => {
  return (
    <div className={`
      glass-dark rounded-2xl transition-all duration-300
      ${border ? 'golden-border' : ''}
      ${hoverable ? 'hover:golden-glow hover:bg-slate-800/50' : ''}
      ${className}
    `}>
      {/* Header */}
      {(title || icon || headerAction) && (
        <div className={`
          flex items-center justify-between
          ${padding ? 'p-6' : 'pt-6 px-6'}
          ${subtitle || icon ? 'pb-4' : 'pb-6'}
          border-b border-slate-700
          ${headerClassName}
        `}>
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-linear-to-r from-gold-500/20 to-gold-600/20 flex items-center justify-center">
                <span className="text-gold-300">{icon}</span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              {subtitle && (
                <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Body */}
      <div className={`
        ${padding ? 'p-6' : ''}
        ${bodyClassName}
      `}>
        {children}
      </div>

      {/* Footer */}
      {footer && (
        <div className="p-6 border-t border-slate-700">
          {footer}
        </div>
      )}
    </div>
  )
}

export const CardStats = ({ title, value, icon, trend, trendDirection = 'up', description, className = '' }) => {
  return (
    <Card className={className} padding={true}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm ${trendDirection === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                <i className={`fas fa-arrow-${trendDirection === 'up' ? 'up' : 'down'} mr-1`}></i>
                {trend}
              </span>
              {description && (
                <span className="text-slate-400 text-sm ml-2">{description}</span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-xl bg-linear-to-br from-gold-500/20 to-gold-600/20">
            <span className="text-gold-300 text-xl">{icon}</span>
          </div>
        )}
      </div>
    </Card>
  )
}

export default Card