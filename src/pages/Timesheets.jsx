import { useState } from 'react'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'
import Card from '../components/UI/Card'
import Table from '../components/UI/Table'
import Dropdown from '../components/UI/Dropdown'
import { TASK_STATUS, TASK_CATEGORIES } from '../utils/constants'

const Timesheets = () => {
  const [timesheets, setTimesheets] = useState([
    {
      id: 1,
      date: '2024-01-25',
      project: 'Website Redesign',
      task: 'Design Homepage Layout',
      hours: 4.5,
      description: 'Created wireframes and mockups for homepage',
      status: 'Submitted',
      billable: true
    },
    {
      id: 2,
      date: '2024-01-25',
      project: 'Mobile App Development',
      task: 'API Authentication Setup',
      hours: 3,
      description: 'Implemented OAuth2 authentication flow',
      status: 'Approved',
      billable: true
    },
    {
      id: 3,
      date: '2024-01-24',
      project: 'CRM Migration',
      task: 'Database Schema Migration',
      hours: 6,
      description: 'Migrated customer data to new schema',
      status: 'Approved',
      billable: true
    },
    {
      id: 4,
      date: '2024-01-24',
      project: 'E-commerce Platform',
      task: 'Payment Gateway Integration',
      hours: 2.5,
      description: 'Integrated Stripe payment processor',
      status: 'Pending',
      billable: true
    },
    {
      id: 5,
      date: '2024-01-23',
      project: 'Internal Dashboard',
      task: 'User Profile Dashboard',
      hours: 5,
      description: 'Built user management interface',
      status: 'Approved',
      billable: false
    }
  ])

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const columns = [
    {
      header: 'Date',
      accessor: 'date',
      render: (value) => (
        <div className="text-white">{value}</div>
      )
    },
    {
      header: 'Project & Task',
      accessor: 'project',
      render: (value, row) => (
        <div>
          <div className="font-medium text-white">{value}</div>
          <div className="text-sm text-slate-400">{row.task}</div>
        </div>
      )
    },
    {
      header: 'Hours',
      accessor: 'hours',
      render: (value) => (
        <div className="text-gold-300 font-semibold">{value}h</div>
      )
    },
    {
      header: 'Description',
      accessor: 'description',
      render: (value) => (
        <div className="text-slate-300 text-sm max-w-xs truncate">{value}</div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'Approved' ? 'bg-linear-to-r from-emerald-500 to-teal-500' :
          value === 'Submitted' ? 'bg-linear-to-r from-blue-500 to-cyan-500' :
          'bg-linear-to-r from-amber-500 to-orange-500'
        } text-white`}>
          {value}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (value, row) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="small">
            <i className="fas fa-edit"></i>
          </Button>
          <Button variant="ghost" size="small" className="hover:bg-red-500/20">
            <i className="fas fa-trash text-red-400"></i>
          </Button>
        </div>
      )
    }
  ]

  const filteredTimesheets = timesheets.filter(entry => {
    const matchesFilter = filter === 'all' || entry.status.toLowerCase() === filter.toLowerCase()
    const matchesSearch = entry.project.toLowerCase().includes(search.toLowerCase()) || 
                         entry.task.toLowerCase().includes(search.toLowerCase()) ||
                         entry.description.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const weeklyTotal = timesheets.reduce((sum, entry) => sum + entry.hours, 0)
  const billableTotal = timesheets.filter(e => e.billable).reduce((sum, entry) => sum + entry.hours, 0)

  const statusCounts = {
    all: timesheets.length,
    pending: timesheets.filter(t => t.status === 'Pending').length,
    submitted: timesheets.filter(t => t.status === 'Submitted').length,
    approved: timesheets.filter(t => t.status === 'Approved').length,
    rejected: timesheets.filter(t => t.status === 'Rejected').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold golden-gradient">Timesheets</h1>
          <p className="text-slate-400 mt-1">Track and manage your working hours</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          icon={<i className="fas fa-plus"></i>}
        >
          Log Time
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card hoverable={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-2">Weekly Total</p>
              <p className="text-3xl font-bold text-white">{weeklyTotal.toFixed(1)}h</p>
            </div>
            <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20">
              <i className="fas fa-clock text-blue-300 text-xl"></i>
            </div>
          </div>
        </Card>

        <Card hoverable={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-2">Billable Hours</p>
              <p className="text-3xl font-bold text-white">{billableTotal.toFixed(1)}h</p>
            </div>
            <div className="p-3 rounded-xl bg-linear-to-br from-emerald-500/20 to-teal-500/20">
              <i className="fas fa-dollar-sign text-emerald-300 text-xl"></i>
            </div>
          </div>
        </Card>

        <Card hoverable={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-2">Pending Approval</p>
              <p className="text-3xl font-bold text-white">{statusCounts.pending}</p>
            </div>
            <div className="p-3 rounded-xl bg-linear-to-br from-amber-500/20 to-orange-500/20">
              <i className="fas fa-hourglass-half text-amber-300 text-xl"></i>
            </div>
          </div>
        </Card>

        <Card hoverable={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-2">Approved</p>
              <p className="text-3xl font-bold text-white">{statusCounts.approved}</p>
            </div>
            <div className="p-3 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20">
              <i className="fas fa-check-circle text-purple-300 text-xl"></i>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Button
            key={status}
            onClick={() => setFilter(status)}
            variant={filter === status ? 'secondary' : 'ghost'}
            className="flex-col h-auto py-4"
          >
            <div className="text-2xl font-bold">{count}</div>
            <div className="text-sm mt-1">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          </Button>
        ))}
      </div>

      {/* Search and Date Filter */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search timesheets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<i className="fas fa-search"></i>}
            />
          </div>
          <div className="flex gap-4">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-48"
            />
            <Dropdown
              options={[
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' },
                { value: 'quarter', label: 'This Quarter' }
              ]}
              placeholder="Time Period"
              className="w-48"
            />
            <Button variant="secondary">
              <i className="fas fa-download mr-2"></i>
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Timesheets Table */}
      <Table
        columns={columns}
        data={filteredTimesheets}
        hoverable={true}
        pagination={{
          currentPage: 1,
          pageSize: 10,
          totalItems: filteredTimesheets.length,
          onPageChange: () => {},
          onNext: () => {},
          onPrevious: () => {}
        }}
      />

      {/* Log Time Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Log Time Entry"
        size="md"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Date"
              type="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Dropdown
              label="Project"
              options={[
                { value: 'website', label: 'Website Redesign' },
                { value: 'mobile', label: 'Mobile App Development' },
                { value: 'crm', label: 'CRM Migration' },
                { value: 'ecommerce', label: 'E-commerce Platform' }
              ]}
              placeholder="Select project"
              required
            />
            <Dropdown
              label="Task"
              options={[
                { value: 'design', label: 'Design Homepage Layout' },
                { value: 'api', label: 'API Authentication Setup' },
                { value: 'database', label: 'Database Schema Migration' },
                { value: 'payment', label: 'Payment Gateway Integration' }
              ]}
              placeholder="Select task"
              required
            />
            <Input
              label="Hours"
              type="number"
              placeholder="0.0"
              min="0"
              step="0.5"
              required
            />
          </div>

          <Input
            label="Description"
            placeholder="What did you work on?"
            multiline
            rows={3}
            required
          />

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-slate-700 text-gold-500 focus:ring-gold-500" />
              <span className="ml-2 text-sm text-slate-300">Billable hours</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-slate-700 text-gold-500 focus:ring-gold-500" defaultChecked />
              <span className="ml-2 text-sm text-slate-300">Submit for approval</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Log Time
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Timesheets