import Button from '../UI/Button'

const ProjectCard = ({ name, progress, deadline, members, status }) => {
  const statusColors = {
    active: 'from-emerald-500 to-teal-500',
    planning: 'from-amber-500 to-orange-500',
    completed: 'from-blue-500 to-cyan-500',
    onhold: 'from-slate-500 to-gray-500'
  }

  return (
    <div className="glass-light rounded-xl p-5 hover:bg-slate-800/30 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-white group-hover:text-gold-200 transition-colors">{name}</h3>
          <div className="flex items-center mt-2 space-x-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r ${statusColors[status] || 'from-slate-500 to-gray-500'} text-white`}>
              {status}
            </span>
            <span className="text-slate-400 text-sm">
              <i className="far fa-calendar-alt mr-1"></i>
              {deadline}
            </span>
          </div>
        </div>
        <div className="flex -space-x-2">
          {[...Array(Math.min(members, 3))].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-linear-to-r from-gold-400 to-gold-600 border-2 border-slate-800"
            ></div>
          ))}
          {members > 3 && (
            <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center">
              <span className="text-xs text-slate-300">+{members - 3}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-300">Progress</span>
          <span className="text-gold-300 font-semibold">{progress}%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-linear-to-r from-gold-500 to-gold-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="ghost" size="small">
            <i className="fas fa-edit"></i>
          </Button>
          <Button variant="ghost" size="small">
            <i className="fas fa-chart-bar"></i>
          </Button>
        </div>
        <Button variant="secondary" size="small">
          View Details
        </Button>
      </div>
    </div>
  )
}

export default ProjectCard