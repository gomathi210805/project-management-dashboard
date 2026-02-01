import Card from '../../components/UI/Card'

const LeadDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold golden-gradient">
        Team Lead Dashboard
      </h1>
      <p className="text-slate-400">Team progress and task monitoring</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverable>
          <p className="text-slate-400">Team Members</p>
          <p className="text-3xl font-bold text-white">6</p>
        </Card>

        <Card hoverable>
          <p className="text-slate-400">Pending Reviews</p>
          <p className="text-3xl font-bold text-white">8</p>
        </Card>

        <Card hoverable>
          <p className="text-slate-400">Completed Tasks</p>
          <p className="text-3xl font-bold text-white">27</p>
        </Card>
      </div>
    </div>
  )
}

export default LeadDashboard
