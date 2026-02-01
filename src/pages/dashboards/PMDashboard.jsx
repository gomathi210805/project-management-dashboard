import Card from '../../components/UI/Card'

const PMDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold golden-gradient">
        Project Manager Dashboard
      </h1>
      <p className="text-slate-400">Project execution and progress overview</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverable>
          <p className="text-slate-400">My Projects</p>
          <p className="text-3xl font-bold text-white">6</p>
        </Card>

        <Card hoverable>
          <p className="text-slate-400">Ongoing Tasks</p>
          <p className="text-3xl font-bold text-white">42</p>
        </Card>

        <Card hoverable>
          <p className="text-slate-400">Delayed Tasks</p>
          <p className="text-3xl font-bold text-white">3</p>
        </Card>
      </div>
    </div>
  )
}

export default PMDashboard
