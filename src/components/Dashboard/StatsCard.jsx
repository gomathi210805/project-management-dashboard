import { CardStats } from '../UI/Card'

const StatsCard = ({ title, value, icon, color, progress }) => {
  return (
    <CardStats
      title={title}
      value={value}
      icon={icon}
      className="hover:golden-glow"
    >
      {progress !== undefined && (
        <div className="mt-4">
          <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-linear-to-r ${color} rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(parseInt(value) * 2, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </CardStats>
  )
}

export default StatsCard