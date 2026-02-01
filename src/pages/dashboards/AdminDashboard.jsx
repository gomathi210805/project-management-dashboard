import Button from '../../components/UI/Button'
import Card from '../../components/UI/Card'
import ProjectCard from '../../components/Dashboard/ProjectCard'
import { DASHBOARD_STATS } from '../../utils/constants'

const AdminDashboard = () => {
  const projects = [
    { name: 'Website Redesign', progress: 75, deadline: '2024-03-15', members: 5, status: 'active' },
    { name: 'Mobile App Dev', progress: 45, deadline: '2024-04-20', members: 8, status: 'active' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold golden-gradient">Admin Dashboard</h1>
          <p className="text-slate-400 mt-1">System overview and administration</p>
        </div>
        <Button icon={<i className="fas fa-plus"></i>}>
          Create Project
        </Button>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hoverable>
          <p className="text-slate-400 text-sm">Total Users</p>
          <p className="text-3xl font-bold text-white">120</p>
        </Card>

        <Card hoverable>
          <p className="text-slate-400 text-sm">Total Projects</p>
          <p className="text-3xl font-bold text-white">24</p>
        </Card>

        <Card hoverable>
          <p className="text-slate-400 text-sm">Active Tasks</p>
          <p className="text-3xl font-bold text-white">340</p>
        </Card>

        <Card hoverable>
          <p className="text-slate-400 text-sm">Reports Generated</p>
          <p className="text-3xl font-bold text-white">18</p>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card title="Recent Projects">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </Card>
    </div>
  )
}

export default AdminDashboard
