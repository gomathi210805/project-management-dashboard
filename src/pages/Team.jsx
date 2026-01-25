import { useState } from 'react'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'
import Card from '../components/UI/Card'
import Table from '../components/UI/Table'
import Dropdown from '../components/UI/Dropdown'
import { USER_ROLES, TEAM_DEPARTMENTS } from '../utils/constants'

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'Project Manager',
      department: 'Engineering',
      status: 'Active',
      projects: 4,
      tasks: 24,
      joinDate: '2022-03-15',
      avatarColor: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'Senior Developer',
      department: 'Engineering',
      status: 'Active',
      projects: 3,
      tasks: 18,
      joinDate: '2022-06-20',
      avatarColor: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'Lead Designer',
      department: 'Design',
      status: 'Active',
      projects: 2,
      tasks: 32,
      joinDate: '2021-11-10',
      avatarColor: 'from-emerald-500 to-teal-500'
    },
    {
      id: 4,
      name: 'Lisa Rodriguez',
      email: 'lisa@example.com',
      role: 'QA Engineer',
      department: 'Engineering',
      status: 'Active',
      projects: 3,
      tasks: 15,
      joinDate: '2023-01-25',
      avatarColor: 'from-amber-500 to-orange-500'
    },
    {
      id: 5,
      name: 'David Miller',
      email: 'david@example.com',
      role: 'Marketing Specialist',
      department: 'Marketing',
      status: 'Active',
      projects: 1,
      tasks: 28,
      joinDate: '2023-03-30',
      avatarColor: 'from-red-500 to-rose-500'
    },
    {
      id: 6,
      name: 'Emma Wilson',
      email: 'emma@example.com',
      role: 'DevOps Engineer',
      department: 'Operations',
      status: 'On Leave',
      projects: 2,
      tasks: 12,
      joinDate: '2022-09-05',
      avatarColor: 'from-indigo-500 to-violet-500'
    }
  ])

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const columns = [
    {
      header: 'Team Member',
      accessor: 'name',
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full bg-linear-to-r ${row.avatarColor} flex items-center justify-center`}>
            <span className="font-bold text-white text-sm">
              {value.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium text-white">{value}</div>
            <div className="text-sm text-slate-400">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      accessor: 'role',
      render: (value) => (
        <span className="text-white">{value}</span>
      )
    },
    {
      header: 'Department',
      accessor: 'department',
      render: (value) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-slate-500/20 to-gray-500/20 text-slate-300">
          {value}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-linear-to-r from-emerald-500 to-teal-500' :
          value === 'On Leave' ? 'bg-linear-to-r from-amber-500 to-orange-500' :
          'bg-linear-to-r from-slate-500 to-gray-500'
        } text-white`}>
          {value}
        </span>
      )
    },
    {
      header: 'Projects',
      accessor: 'projects',
      render: (value) => (
        <div className="text-center">
          <div className="text-white font-semibold">{value}</div>
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (value, row) => (
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="small"
            onClick={() => setSelectedMember(row)}
          >
            <i className="fas fa-eye"></i>
          </Button>
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

  const filteredMembers = teamMembers.filter(member => {
    const matchesFilter = filter === 'all' || member.status.toLowerCase().replace(' ', '_') === filter.toLowerCase()
    const matchesSearch = member.name.toLowerCase().includes(search.toLowerCase()) || 
                         member.email.toLowerCase().includes(search.toLowerCase()) ||
                         member.role.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const statusCounts = {
    all: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'Active').length,
    on_leave: teamMembers.filter(m => m.status === 'On Leave').length,
    inactive: teamMembers.filter(m => m.status === 'Inactive').length
  }

  const departmentStats = TEAM_DEPARTMENTS.map(dept => ({
    ...dept,
    count: teamMembers.filter(m => m.department === dept.label).length
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold golden-gradient">Team Management</h1>
          <p className="text-slate-400 mt-1">Manage team members, roles, and permissions</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          icon={<i className="fas fa-user-plus"></i>}
        >
          Invite Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card hoverable={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-2">Total Team Members</p>
              <p className="text-3xl font-bold text-white">{teamMembers.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20">
              <i className="fas fa-users text-blue-300 text-xl"></i>
            </div>
          </div>
        </Card>

        <Card hoverable={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-2">Active Members</p>
              <p className="text-3xl font-bold text-white">{statusCounts.active}</p>
            </div>
            <div className="p-3 rounded-xl bg-linear-to-br from-emerald-500/20 to-teal-500/20">
              <i className="fas fa-user-check text-emerald-300 text-xl"></i>
            </div>
          </div>
        </Card>

        <Card hoverable={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-2">Projects Active</p>
              <p className="text-3xl font-bold text-white">12</p>
            </div>
            <div className="p-3 rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20">
              <i className="fas fa-project-diagram text-purple-300 text-xl"></i>
            </div>
          </div>
        </Card>

        <Card hoverable={true}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-2">Avg. Tasks per Member</p>
              <p className="text-3xl font-bold text-white">21.5</p>
            </div>
            <div className="p-3 rounded-xl bg-linear-to-br from-amber-500/20 to-orange-500/20">
              <i className="fas fa-tasks text-amber-300 text-xl"></i>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Button
            key={status}
            onClick={() => setFilter(status)}
            variant={filter === status ? 'secondary' : 'ghost'}
            className="flex-col h-auto py-4"
          >
            <div className="text-2xl font-bold">{count}</div>
            <div className="text-sm mt-1">
              {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </div>
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search team members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<i className="fas fa-search"></i>}
            />
          </div>
          <div className="flex gap-4">
            <Dropdown
              options={TEAM_DEPARTMENTS.map(d => ({ value: d.value, label: d.label }))}
              placeholder="Filter by Department"
              className="w-48"
            />
            <Dropdown
              options={USER_ROLES.map(r => ({ value: r.value, label: r.label }))}
              placeholder="Filter by Role"
              className="w-48"
            />
            <Button variant="secondary">
              <i className="fas fa-filter mr-2"></i>
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Team Table */}
      <Table
        columns={columns}
        data={filteredMembers}
        onRowClick={(member) => setSelectedMember(member)}
        hoverable={true}
        pagination={{
          currentPage: 1,
          pageSize: 10,
          totalItems: filteredMembers.length,
          onPageChange: () => {},
          onNext: () => {},
          onPrevious: () => {}
        }}
      />

      {/* Department Distribution */}
      <Card title="Department Distribution">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {departmentStats.map((dept, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg glass-light hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-linear-to-br from-slate-500/20 to-gray-500/20">
                  <i className={`${dept.icon} text-slate-300`}></i>
                </div>
                <div>
                  <p className="text-sm text-slate-400">{dept.label}</p>
                  <p className="text-xl font-bold text-white">{dept.count} members</p>
                </div>
              </div>
              <div className="text-slate-400 text-sm">
                {dept.count > 0 ? `${Math.round((dept.count / teamMembers.length) * 100)}%` : '0%'}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invite Team Member"
        size="md"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter email"
              required
            />
            <Dropdown
              label="Role"
              options={USER_ROLES.map(r => ({ value: r.value, label: r.label }))}
              placeholder="Select role"
              required
            />
            <Dropdown
              label="Department"
              options={TEAM_DEPARTMENTS.map(d => ({ value: d.value, label: d.label }))}
              placeholder="Select department"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gold-200 mb-2">Permissions</label>
            <div className="space-y-2">
              {[
                'Create Projects',
                'Manage Tasks',
                'View Reports',
                'Manage Team',
                'System Settings'
              ].map((permission, index) => (
                <label key={index} className="flex items-center">
                  <input type="checkbox" className="rounded border-slate-700 text-gold-500 focus:ring-gold-500" />
                  <span className="ml-2 text-sm text-slate-300">{permission}</span>
                </label>
              ))}
            </div>
          </div>

          <Input
            label="Personal Message (Optional)"
            placeholder="Add a welcome message..."
            multiline
            rows={2}
          />

          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>

      {/* Member Detail Modal */}
      <Modal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title="Team Member Details"
        size="lg"
      >
        {selectedMember && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full bg-linear-to-r ${selectedMember.avatarColor} flex items-center justify-center`}>
                <span className="font-bold text-white text-xl">
                  {selectedMember.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedMember.name}</h3>
                <p className="text-slate-400">{selectedMember.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-linear-to-r from-slate-500/20 to-gray-500/20 text-slate-300">
                    {selectedMember.department}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedMember.status === 'Active' ? 'bg-linear-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300' :
                    'bg-linear-to-r from-amber-500/20 to-orange-500/20 text-amber-300'
                  }`}>
                    {selectedMember.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-light p-4 rounded-lg">
                <p className="text-sm text-slate-400">Role</p>
                <p className="text-lg font-semibold text-white mt-1">{selectedMember.role}</p>
              </div>
              <div className="glass-light p-4 rounded-lg">
                <p className="text-sm text-slate-400">Projects</p>
                <p className="text-lg font-semibold text-white mt-1">{selectedMember.projects}</p>
              </div>
              <div className="glass-light p-4 rounded-lg">
                <p className="text-sm text-slate-400">Tasks</p>
                <p className="text-lg font-semibold text-white mt-1">{selectedMember.tasks}</p>
              </div>
              <div className="glass-light p-4 rounded-lg">
                <p className="text-sm text-slate-400">Join Date</p>
                <p className="text-lg font-semibold text-white mt-1">{selectedMember.joinDate}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700">
              <h4 className="text-lg font-semibold text-gold-200 mb-4">Recent Activity</h4>
              <div className="space-y-3">
                {[
                  { action: 'Completed task', details: 'Design Homepage Layout', time: '2 hours ago' },
                  { action: 'Logged time', details: '4.5 hours on Website Redesign', time: '4 hours ago' },
                  { action: 'Commented on', details: 'API Integration project', time: '1 day ago' },
                  { action: 'Updated profile', details: 'Changed profile picture', time: '2 days ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg glass-light hover:bg-slate-800/30 transition-colors">
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-medium">{activity.action}</span>{' '}
                        <span className="text-gold-300">{activity.details}</span>
                      </p>
                      <p className="text-slate-400 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setSelectedMember(null)}
              >
                Close
              </Button>
              <Button>
                Edit Profile
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Team