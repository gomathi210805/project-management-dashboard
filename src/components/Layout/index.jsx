import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
    setIsAuthenticated(false)
  }

  const user = {
    name: localStorage.getItem('userName') || 'Admin User',
    email: localStorage.getItem('userEmail') || 'admin@example.com',
    role: 'Super Admin'
  }

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout