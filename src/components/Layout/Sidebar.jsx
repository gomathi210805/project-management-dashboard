import { NavLink } from 'react-router-dom'
import { NAVIGATION_ITEMS } from '../../utils/constants'

const Sidebar = () => {
  return (
    <aside className="glass-dark w-64 border-r golden-border hidden md:block">
      <nav className="p-6">
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-4">MAIN MENU</h3>
          <ul className="space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-linear-to-r from-gold-500/20 to-gold-600/20 golden-border text-gold-300'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-gold-200'
                    }`
                  }
                >
                  <i className={`${item.icon} w-5`}></i>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-4">QUICK STATS</h3>
          <div className="space-y-3">
            <div className="glass-light p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Active Projects</span>
                <span className="text-gold-300 font-bold">12</span>
              </div>
            </div>
            <div className="glass-light p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Pending Tasks</span>
                <span className="text-gold-300 font-bold">47</span>
              </div>
            </div>
            <div className="glass-light p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Team Online</span>
                <span className="text-gold-300 font-bold">24</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-4">QUICK ACTIONS</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-linear-to-r from-gold-500/20 to-gold-600/20 text-gold-300 hover:from-gold-600/30 hover:to-gold-700/30 transition-all duration-300">
              <i className="fas fa-plus"></i>
              <span>New Project</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg glass-light text-slate-300 hover:text-gold-200 hover:bg-slate-800/50 transition-all duration-300">
              <i className="fas fa-clock"></i>
              <span>Log Time</span>
            </button>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar