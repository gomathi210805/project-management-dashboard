import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Timesheets from './pages/Timesheets'
import Reports from './pages/Reports'
import Team from './pages/Team'
import Settings from './pages/Settings'
import Layout from './components/Layout'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // ✅ ADD: get role from localStorage
  const role = localStorage.getItem('role')

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsAuthenticated(loggedIn)
  }, [])

  return (
    <Router>
      <Routes>
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

          {/* ✅ REPLACE INDEX DASHBOARD WITH ROLE-BASED DASHBOARD */}
          <Route
            index
            element={
              role === 'admin' ? <Dashboard /> :
              role === 'pm' ? <Projects /> :
              role === 'lead' ? <Team /> :
              role === 'member' ? <Tasks /> :
              <Dashboard />
            }
          />

          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="timesheets" element={<Timesheets />} />
          <Route path="reports" element={<Reports />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />

        </Route>
      </Routes>
    </Router>
  )
}

export default App
