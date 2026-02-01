import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// UI team pages (UNCHANGED)
import Login from './pages/Login'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Timesheets from './pages/Timesheets'
import Reports from './pages/Reports'
import Team from './pages/Team'
import Settings from './pages/Settings'
import Layout from './components/Layout'

// 🔹 DASHBOARD TEAM ADDITIONS (UNCHANGED)
import AdminDashboard from './pages/dashboards/AdminDashboard'
import PMDashboard from './pages/dashboards/PMDashboard'
import LeadDashboard from './pages/dashboards/LeadDashboard'
import MemberDashboard from './pages/dashboards/MemberDashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsAuthenticated(loggedIn)
  }, [])

  // 🔹 ROLE-BASED DASHBOARD (UNCHANGED)
  const RoleBasedDashboard = () => {
    const role = localStorage.getItem('role')

    if (role === 'admin') return <AdminDashboard />
    if (role === 'pm') return <PMDashboard />
    if (role === 'lead') return <LeadDashboard />
    if (role === 'member') return <MemberDashboard />

    return <Navigate to="/login" replace />
  }

  // 🔐 STEP-7 ADDITION: ROLE PERMISSIONS MAP
  const rolePermissions = {
    admin: ['projects', 'tasks', 'timesheets', 'reports', 'team', 'settings'],
    pm: ['projects', 'tasks', 'timesheets', 'team'],
    lead: ['tasks', 'timesheets', 'team'],
    member: ['tasks', 'timesheets'],
  }

  // 🔐 STEP-7 ADDITION: PROTECTED ROUTE
  const ProtectedRoute = ({ children, page }) => {
    const role = localStorage.getItem('role')

    if (!role) {
      return <Navigate to="/login" replace />
    }

    if (rolePermissions[role]?.includes(page)) {
      return children
    }

    // ❌ Unauthorized access
    return <Navigate to="/" replace />
  }

  return (
    <Router>
      <Routes>

        {/* UI TEAM LOGIN ROUTE (UNCHANGED) */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        {/* UI TEAM LAYOUT ROUTE (UNCHANGED) */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >

          {/* ROLE BASED DASHBOARD (UNCHANGED) */}
          <Route index element={<RoleBasedDashboard />} />

          {/* 🔐 STEP-7: PROTECTED ROUTES */}
          <Route
            path="projects"
            element={
              <ProtectedRoute page="projects">
                <Projects />
              </ProtectedRoute>
            }
          />

          <Route
            path="tasks"
            element={
              <ProtectedRoute page="tasks">
                <Tasks />
              </ProtectedRoute>
            }
          />

          <Route
            path="timesheets"
            element={
              <ProtectedRoute page="timesheets">
                <Timesheets />
              </ProtectedRoute>
            }
          />

          <Route
            path="reports"
            element={
              <ProtectedRoute page="reports">
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="team"
            element={
              <ProtectedRoute page="team">
                <Team />
              </ProtectedRoute>
            }
          />

          <Route
            path="settings"
            element={
              <ProtectedRoute page="settings">
                <Settings />
              </ProtectedRoute>
            }
          />

        </Route>
      </Routes>
    </Router>
  )
}

export default App
