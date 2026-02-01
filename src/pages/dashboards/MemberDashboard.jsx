import Card from '../../components/UI/Card'

const MemberDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold golden-gradient">
        My Dashboard
      </h1>
      <p className="text-slate-400">My assigned work and progress</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverable>
          <p className="text-slate-400">Assigned Tasks</p>
          <p className="text-3xl font-bold text-white">9</p>
        </Card>

        <Card hoverable>
          <p className="text-slate-400">Completed Tasks</p>
          <p className="text-3xl font-bold text-white">14</p>
        </Card>

        <Card hoverable>
          <p className="text-slate-400">Pending Tasks</p>
          <p className="text-3xl font-bold text-white">3</p>
        </Card>
      </div>
    </div>
  )
}

export default MemberDashboard
