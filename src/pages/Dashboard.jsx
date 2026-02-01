import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import ProjectCard from '../components/Dashboard/ProjectCard'
import { DASHBOARD_STATS } from '../utils/constants'

const Dashboard = () => {

  // ✅ DASHBOARD TEAM ADDITION (ROLE)
  const role = localStorage.getItem('role')

  const projects = [
    { name: 'Website Redesign', progress: 75, deadline: '2024-03-15', members: 5, status: 'active' },
    { name: 'Mobile App Dev', progress: 45, deadline: '2024-04-20', members: 8, status: 'active' },
    { name: 'CRM Migration', progress: 90, deadline: '2024-02-28', members: 6, status: 'active' },
    { name: 'E-commerce Platform', progress: 30, deadline: '2024-05-10', members: 10, status: 'planning' },
  ]

  const quickActions = [
    { icon: 'fas fa-plus-circle', label: 'Create Task', roles: ['admin', 'pm', 'lead'] },
    { icon: 'fas fa-clock', label: 'Log Time', roles: ['member', 'lead', 'pm'] },
    { icon: 'fas fa-chart-pie', label: 'Generate Report', roles: ['admin', 'pm'] },
    { icon: 'fas fa-user-plus', label: 'Invite Member', roles: ['admin', 'lead'] },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold golden-gradient">Dashboard</h1>
          <p className="text-slate-400 mt-1">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>

        {/* ✅ ROLE-BASED BUTTON */}
        {(role === 'admin' || role === 'pm') && (
          <Button icon={<i className="fas fa-plus"></i>}>
            New Project
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DASHBOARD_STATS.map((stat, index) => (
          <Card key={index} hoverable={true}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-linear-to-br ${stat.color}`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-linear-to-r ${stat.color} rounded-full transition-all duration-500`}
                  style={{
                    width: `${Math.min(
                      parseInt(stat.value.replace(',', '')) * 2,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Projects Section */}
      <Card
        title="Recent Projects"
        headerAction={
          <Button variant="ghost" size="small">
            View All <i className="fas fa-arrow-right ml-2"></i>
          </Button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions
            .filter(action => action.roles.includes(role))
            .map((action, index) => (
              <Button
                key={index}
                variant="secondary"
                className="flex-col h-auto py-4"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-gold-500/20 to-gold-600/20 flex items-center justify-center group-hover:animate-pulse-glow">
                    <i className={`${action.icon} text-gold-300 text-xl`}></i>
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </div>
              </Button>
            ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="space-y-4">
          {[
            { user: 'Alex Johnson', action: 'completed task', task: 'Design Homepage', time: '10 min ago' },
            { user: 'Sarah Williams', action: 'commented on', task: 'API Documentation', time: '1 hour ago' },
            { user: 'Michael Chen', action: 'uploaded file to', task: 'CRM Migration', time: '2 hours ago' },
            { user: 'Lisa Rodriguez', action: 'started working on', task: 'User Dashboard', time: '3 hours ago' },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center p-3 rounded-lg glass-light hover:bg-slate-800/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-gold-400 to-gold-600 mr-4"></div>
              <div className="flex-1">
                <p className="text-white">
                  <span className="font-semibold">{activity.user}</span>{' '}
                  {activity.action}{' '}
                  <span className="text-gold-300">{activity.task}</span>
                </p>
                <p className="text-slate-400 text-sm">{activity.time}</p>
              </div>
              <Button variant="ghost" size="small">
                <i className="fas fa-ellipsis-v"></i>
              </Button>
            </div>
          ))}
        </div>
      </Card>

    </div>
  )
}

export default Dashboard
