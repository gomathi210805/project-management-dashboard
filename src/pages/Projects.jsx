import { useState } from 'react'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'
import Card from '../components/UI/Card'
import Table from '../components/UI/Table'
import Dropdown from '../components/UI/Dropdown'
import { PROJECT_STATUS, PRIORITY_LEVELS } from '../utils/constants'

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of company website with modern design',
      status: 'Active',
      progress: 75,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      manager: 'Alex Johnson',
      members: 5,
      priority: 'High',
      budget: '$25,000'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'iOS & Android app for customer engagement',
      status: 'Active',
      progress: 45,
      startDate: '2024-02-01',
      endDate: '2024-04-20',
      manager: 'Sarah Williams',
      members: 8,
      priority: 'High',
      budget: '$45,000'
    },
    {
      id: 3,
      name: 'CRM Migration',
      description: 'Migrate from legacy CRM to Salesforce',
      status: 'Active',
      progress: 90,
      startDate: '2023-12-10',
      endDate: '2024-02-28',
      manager: 'Michael Chen',
      members: 6,
      priority: 'Medium',
      budget: '$35,000'
    },
    {
      id: 4,
      name: 'E-commerce Platform',
      description: 'New online store with payment integration',
      status: 'Planning',
      progress: 30,
      startDate: '2024-03-01',
      endDate: '2024-05-10',
      manager: 'David Miller',
      members: 10,
      priority: 'High',
      budget: '$60,000'
    },
    {
      id: 5,
      name: 'Internal Dashboard',
      description: 'Analytics dashboard for business metrics',
      status: 'Completed',
      progress: 100,
      startDate: '2023-11-01',
      endDate: '2024-01-31',
      manager: 'Lisa Rodriguez',
      members: 4,
      priority: 'Medium',
      budget: '$18,000'
    },
    {
      id: 6,
      name: 'API Integration',
      description: 'Third-party API integration for payment systems',
      status: 'On Hold',
      progress: 20,
      startDate: '2024-01-20',
      endDate: '2024-03-30',
      manager: 'Robert Kim',
      members: 3,
      priority: 'Low',
      budget: '$12,000'
    }
  ])

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  const columns = [
    {
      header: 'Project Name',
      accessor: 'name',
      render: (value, row) => (
        <div>
          <div className="font-medium text-white">{value}</div>
          <div className="text-sm text-slate-400">{row.description}</div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => {
        const status = PROJECT_STATUS.find(s => s.label === value)
        return status ? (
          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r ${status.color} text-white`}>
            {value}
          </span>
        ) : value
      }
    },
    {
      header: 'Progress',
      accessor: 'progress',
      render: (value) => (
        <div className="flex items-center space-x-3">
          <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-gold-500 to-gold-600 rounded-full"
              style={{ width: `${value}%` }}
            ></div>
          </div>
          <span className="text-gold-300 font-semibold text-sm">{value}%</span>
        </div>
      )
    },
    {
      header: 'Team',
      accessor: 'members',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {[...Array(Math.min(value, 3))].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-linear-to-r from-gold-400 to-gold-600 border-2 border-slate-800"
              ></div>
            ))}
          </div>
          <span className="text-white text-sm">{value} members</span>
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (value) => (
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

  const filteredProjects = projects.filter(project => {
    const projectStatus = PROJECT_STATUS.find(s => s.label === project.status)
    const statusValue = projectStatus ? projectStatus.value : project.status.toLowerCase().replace(' ', '_')
    const matchesFilter = filter === 'all' || statusValue === filter.toLowerCase().replace(' ', '_')
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) || 
                         project.description.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const statusCounts = {
    all: projects.length,
    planning: projects.filter(p => p.status === 'Planning').length,
    active: projects.filter(p => p.status === 'Active').length,
    on_hold: projects.filter(p => p.status === 'On Hold').length,
    completed: projects.filter(p => p.status === 'Completed').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold golden-gradient">Projects</h1>
          <p className="text-slate-400 mt-1">Manage and track all your projects in one place</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          icon={<i className="fas fa-plus"></i>}
        >
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
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
              {PROJECT_STATUS.find(s => s.value === status)?.label || 
               status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </div>
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<i className="fas fa-search"></i>}
            className="flex-1"
          />
          <div className="flex gap-4">
            <Dropdown
              options={[
                { value: 'name', label: 'Sort by: Name' },
                { value: 'date', label: 'Sort by: Date' },
                { value: 'progress', label: 'Sort by: Progress' }
              ]}
              placeholder="Sort by"
              className="w-48"
            />
            <Button variant="secondary">
              <i className="fas fa-filter"></i>
            </Button>
          </div>
        </div>
      </Card>

      {/* Projects Table */}
      <Table
        columns={columns}
        data={filteredProjects}
        onRowClick={(project) => setSelectedProject(project)}
        hoverable={true}
        pagination={{
          currentPage: 1,
          pageSize: 10,
          totalItems: filteredProjects.length,
          onPageChange: () => {},
          onNext: () => {},
          onPrevious: () => {}
        }}
      />

      {/* Create Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Project Name"
              placeholder="Enter project name"
              required
            />
            <Dropdown
              label="Project Manager"
              options={[
                { value: 'alex', label: 'Alex Johnson' },
                { value: 'sarah', label: 'Sarah Williams' },
                { value: 'michael', label: 'Michael Chen' }
              ]}
              placeholder="Select manager"
            />
            <Input
              label="Start Date"
              type="date"
              required
            />
            <Input
              label="End Date"
              type="date"
              required
            />
            <Input
              label="Budget"
              placeholder="$0.00"
            />
            <Dropdown
              label="Priority"
              options={PRIORITY_LEVELS.map(p => ({ value: p.value, label: p.label }))}
            />
          </div>

          <Input
            label="Description"
            placeholder="Describe the project goals and requirements..."
            multiline
            rows={3}
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
              Create Project
            </Button>
          </div>
        </form>
      </Modal>

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.name}
        size="lg"
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-400">Description</p>
                <p className="text-white mt-1">{selectedProject.description}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Manager</p>
                <p className="text-white mt-1">{selectedProject.manager}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Timeline</p>
                <p className="text-white mt-1">{selectedProject.startDate} → {selectedProject.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Budget</p>
                <p className="text-gold-300 font-semibold mt-1">{selectedProject.budget}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Priority</p>
                <p className={`mt-1 ${PRIORITY_LEVELS.find(p => p.label === selectedProject.priority)?.color || 'text-white'}`}>
                  {selectedProject.priority}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Status</p>
                <p className="mt-1">
                  <span className={`px-2 py-1 rounded text-xs font-medium bg-linear-to-r ${PROJECT_STATUS.find(s => s.label === selectedProject.status)?.color || ''} text-white`}>
                    {selectedProject.status}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-2">Progress</p>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-gold-500 to-gold-600 rounded-full"
                  style={{ width: `${selectedProject.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-slate-400">{selectedProject.progress}% complete</span>
                <span className="text-gold-300">{selectedProject.members} team members</span>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </Button>
              <Button>
                Edit Project
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Projects