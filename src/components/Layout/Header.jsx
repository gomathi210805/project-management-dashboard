import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../UI/Button'

const Header = ({ user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout()
    }
    setShowUserMenu(false)
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="glass-dark sticky top-0 z-50 border-b golden-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold golden-gradient hover:opacity-90 transition-opacity">
              <i className="fas fa-project-diagram mr-2"></i>
              ProjectPro
            </Link>
            {user && (
              <div className="hidden md:block text-sm px-3 py-1 rounded-full bg-linear-to-r from-gold-500/20 to-gold-600/20 golden-border">
                <span className="text-gold-300">{user.role}</span>
              </div>
            )}
          </div>
          
          {/* Right side: User info and actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="small"
              className="relative"
            >
              <i className="fas fa-bell text-gold-300"></i>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="small">
                <i className="fas fa-plus"></i>
                <span className="ml-2">Quick Add</span>
              </Button>
              <Button variant="ghost" size="small">
                <i className="fas fa-search"></i>
              </Button>
            </div>

            {/* User Profile */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-10 h-10 rounded-full bg-linear-to-r from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
                    <span className="font-bold text-slate-900 text-sAshithm">
                      {getInitials(user.name)}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gold-200">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate max-w-37.5">{user.email}</p>
                  </div>
                  <i className={`fas fa-chevron-down text-slate-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`}></i>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 glass-dark rounded-xl golden-border shadow-xl z-50">
                    <div className="p-4 border-b border-slate-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-linear-to-r from-gold-400 to-gold-600 flex items-center justify-center">
                          <span className="font-bold text-slate-900">
                            {getInitials(user.name)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white truncate">{user.name}</p>
                          <p className="text-sm text-slate-400 truncate">{user.email}</p>
                          <p className="text-xs text-gold-300 mt-1">{user.role}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors text-slate-300"
                      >
                        <i className="fas fa-user mr-3 text-gold-300"></i>
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors text-slate-300"
                      >
                        <i className="fas fa-cog mr-3 text-gold-300"></i>
                        <span>Settings</span>
                      </Link>
                      <Link
                        to="/team"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-slate-800/50 transition-colors text-slate-300"
                      >
                        <i className="fas fa-users mr-3 text-gold-300"></i>
                        <span>Team</span>
                      </Link>
                      <div className="border-t border-slate-700 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
                      >
                        <i className="fas fa-sign-out-alt mr-3"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  )
}

export default Header