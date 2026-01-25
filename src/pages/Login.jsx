import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      
      // Store login state
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', credentials.email || 'demo@example.com')
      localStorage.setItem('userName', 'Admin')

      // 👉 ADD ROLE HERE (CHANGE FOR TESTING: admin / pm / lead / member)
      localStorage.setItem('role', 'pm')
      
      // Update auth state
      setIsAuthenticated(true)
      
      // Navigate to dashboard
      navigate('/')
    }, 1000)
  }

  const handleQuickLogin = () => {
    console.log('Quick login clicked')
    
    // Store login state
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userEmail', 'pm@example.com')
    localStorage.setItem('userName', 'pm')

    // 👉 ADD ROLE HERE ALSO
    localStorage.setItem('role', 'pm')
    
    // Update auth state
    setIsAuthenticated(true)
    
    // Navigate to dashboard
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="glass-dark rounded-3xl p-8 w-full max-w-md golden-border golden-glow">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-gold-500 to-gold-600 flex items-center justify-center mr-3">
              <i className="fas fa-project-diagram text-3xl text-slate-900"></i>
            </div>
            <div className="text-left">
              <div className="text-4xl font-bold golden-gradient">ProjectPro</div>
              <div className="text-sm text-slate-400">Professional Project Management</div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mt-6">Welcome Back</h1>
          <p className="text-slate-400 mt-2">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gold-200 mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 pl-12 rounded-xl glass-light border border-slate-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 outline-none transition-all duration-300 text-white"
                />
                <i className="fas fa-envelope absolute left-4 top-3.5 text-slate-400"></i>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gold-200 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-12 rounded-xl glass-light border border-slate-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 outline-none transition-all duration-300 text-white"
                />
                <i className="fas fa-lock absolute left-4 top-3.5 text-slate-400"></i>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
              />
              <span className="ml-2 text-sm text-slate-300">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-gold-300 hover:text-gold-400 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-linear-to-r from-gold-500 to-gold-600 text-slate-900 font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-2"></i>
                Sign In
              </>
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-slate-700"></div>
          <span className="px-4 text-sm text-slate-500">OR</span>
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>

        {/* Quick Demo Login Button */}
        <button
          onClick={handleQuickLogin}
          className="w-full py-3 rounded-xl glass-light border golden-border text-gold-300 hover:text-gold-400 hover:bg-gold-500/10 transition-all duration-300 flex items-center justify-center mb-4"
        >
          <i className="fas fa-rocket mr-2"></i>
          Quick Demo Login
        </button>

        {/* Demo Info */}
        <div className="mt-6 p-4 rounded-xl glass-light">
          <p className="text-sm text-slate-400 mb-2">For testing:</p>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Click "Sign In" with any credentials</li>
            <li>• Or use "Quick Demo Login"</li>
            <li>• Both will redirect to dashboard</li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            © 2024 ProjectPro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
