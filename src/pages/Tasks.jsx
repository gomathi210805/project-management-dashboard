import { useState } from 'react'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Modal from '../components/UI/Modal'
import Card from '../components/UI/Card'
import Table from '../components/UI/Table'
import Dropdown from '../components/UI/Dropdown'
import { TASK_STATUS, PRIORITY_LEVELS, TASK_CATEGORIES } from '../utils/constants'

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design Homepage Layout',
      project: 'Website Redesign',
      assignee: 'Alex Johnson',
      dueDate: '2024-02-15',
      priority: 'High',
      status: 'In Progress',
      progress: 75,
      description: 'Create wireframes and design mockups for new homepage',
      tags: ['design', 'development'],
      estimatedHours: 24,
      loggedHours: 18,
    },
    {
      id: 2,
      title: 'API Authentication Setup',
      project: 'Mobile App Development',
      assignee: 'Sarah Williams',
      dueDate: '2024-02-20',
      priority: 'High',
      status: 'To Do',
      progress: 30,
      description: 'Implement OAuth2 authentication for mobile APIs',
      tags: ['development', 'testing'],
      estimatedHours: 40,
      loggedHours: 12,
    },
    {
      id: 3,
      title: 'Database Schema Migration',
      project: 'CRM Migration',
      assignee: 'Michael Chen',
      dueDate: '2024-02-10',
      priority: 'Medium',
      status: 'Completed',
      progress: 100,
      description: 'Migrate existing database schema to new structure',
      tags: ['database', 'development'],
      estimatedHours: 32,
      loggedHours: 32,
    }
  ])

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'table'
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const columns = [
    {
      header: 'Task',
      accessor: 'title',
      render: (value, row) => (
        <div>
          <div className="font-medium text-white">{value}</div>
          <div className="text-sm text-slate-400">{row.description}</div>
        </div>
      )
    },
    {
      header: 'Project',
      accessor: 'project'
    },
    {
      header: 'Assignee',
      accessor: 'assignee',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-linear-to-r from-gold-400 to-gold-600"></div>
          <span className="text-white">{value}</span>
        </div>
      )
    },
    {
      header: 'Due Date',
      accessor: 'dueDate'
    },
    {
      header: 'Priority',
      accessor: 'priority',
      render: (value) => {
        const priority = PRIORITY_LEVELS.find(p => p.label === value)
        return priority ? (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${priority.bgColor} ${priority.color}`}>
            {value}
          </span>
        ) : value
      }
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => {
        const status = TASK_STATUS.find(s => s.label === value)
        return status ? (
          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r ${status.color} text-white`}>
            {value}
          </span>
        ) : value
      }
    },
    {
      header: 'Actions',
      accessor: 'id',
      render: (value, row) => (
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="small"
            onClick={() => handleStatusUpdate(value, 'Completed')}
          >
            <i className="fas fa-check text-emerald-400"></i>
          </Button>
          <Button 
            variant="ghost" 
            size="small"
            onClick={() => handleTimeLog(row)}
          >
            <i className="far fa-clock text-blue-400"></i>
          </Button>
        </div>
      )
    }
  ]

  const filteredTasks = tasks.filter(task => {
    const taskStatus = TASK_STATUS.find(s => s.label === task.status)
    const statusValue = taskStatus ? taskStatus.value : task.status.toLowerCase().replace(' ', '_')
    const matchesFilter = filter === 'all' || statusValue === filter.toLowerCase()
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                         task.description.toLowerCase().includes(search.toLowerCase()) ||
                         task.project.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleStatusUpdate = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const handleTimeLog = (task) => {
    setSelectedTask(task)
    setIsTimeModalOpen(true)
  }

  const statusCounts = {
    all: tasks.length,
    todo: tasks.filter(t => t.status === 'To Do').length,
    in_progress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    blocked: tasks.filter(t => t.status === 'Blocked').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold golden-gradient">Tasks</h1>
          <p className="text-slate-400 mt-1">Manage tasks, track progress, and collaborate with your team</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-slate-800 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="small"
              onClick={() => setViewMode('grid')}
            >
              <i className="fas fa-th-large"></i>
            </Button>
            <Button
              variant={viewMode === 'table' ? 'secondary' : 'ghost'}
              size="small"
              onClick={() => setViewMode('table')}
            >
              <i className="fas fa-list"></i>
            </Button>
          </div>
          <Button 
            onClick={() => setIsTaskModalOpen(true)}
            icon={<i className="fas fa-plus"></i>}
          >
            New Task
          </Button>
        </div>
      </div>

      {/* Stats */}
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
              {TASK_STATUS.find(s => s.value === status)?.label || 
               status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </div>
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<i className="fas fa-search"></i>}
            className="flex-1"
          />
          <div className="flex gap-4">
            <Dropdown
              options={[
                { value: 'project', label: 'Filter by Project' },
                { value: 'assignee', label: 'Filter by Assignee' },
                { value: 'priority', label: 'Filter by Priority' }
              ]}
              placeholder="Filter by"
              className="w-48"
            />
            <Dropdown
              options={[
                { value: 'date', label: 'Sort by: Due Date' },
                { value: 'priority', label: 'Sort by: Priority' },
                { value: 'progress', label: 'Sort by: Progress' }
              ]}
              placeholder="Sort by"
              className="w-48"
            />
          </div>
        </div>
      </Card>

      {/* Tasks View */}
      {viewMode === 'table' ? (
        <Table
          columns={columns}
          data={filteredTasks}
          onRowClick={(task) => setSelectedTask(task)}
          hoverable={true}
          pagination={{
            currentPage: 1,
            pageSize: 10,
            totalItems: filteredTasks.length,
            onPageChange: () => {},
            onNext: () => {},
            onPrevious: () => {}
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <Card key={task.id} hoverable={true}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${PRIORITY_LEVELS.find(p => p.label === task.priority)?.bgColor || ''} ${PRIORITY_LEVELS.find(p => p.label === task.priority)?.color || ''}`}>
                        {task.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-linear-to-r ${TASK_STATUS.find(s => s.label === task.status)?.color || ''} text-white`}>
                        {task.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{task.title}</h3>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">{task.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Project</p>
                    <p className="text-sm text-white font-medium">{task.project}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Assignee</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-linear-to-r from-gold-400 to-gold-600"></div>
                      <span className="text-sm text-white font-medium">{task.assignee}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300">Progress</span>
                    <span className="text-gold-300 font-semibold">{task.progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-gold-500 to-gold-600 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag, index) => {
                    const category = TASK_CATEGORIES.find(c => c.value === tag)
                    return (
                      <span 
                        key={index} 
                        className={`px-2 py-1 rounded text-xs ${category?.color || 'bg-slate-500/20'} ${category?.textColor || 'text-slate-300'}`}
                      >
                        {category?.label || tag}
                      </span>
                    )
                  })}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="small"
                      onClick={() => handleStatusUpdate(task.id, 'Completed')}
                    >
                      <i className="fas fa-check text-emerald-400"></i>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="small"
                      onClick={() => handleTimeLog(task)}
                    >
                      <i className="far fa-clock text-blue-400"></i>
                    </Button>
                  </div>
                  <Button variant="secondary" size="small">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Create New Task"
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Task Title"
              placeholder="Enter task title"
              required
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
            />
            <Dropdown
              label="Assignee"
              options={[
                { value: 'alex', label: 'Alex Johnson' },
                { value: 'sarah', label: 'Sarah Williams' },
                { value: 'michael', label: 'Michael Chen' },
                { value: 'david', label: 'David Miller' }
              ]}
              placeholder="Select assignee"
            />
            <Input
              label="Due Date"
              type="date"
              required
            />
            <Dropdown
              label="Priority"
              options={PRIORITY_LEVELS.map(p => ({ value: p.value, label: p.label }))}
            />
            <Input
              label="Estimated Hours"
              type="number"
              placeholder="0"
            />
          </div>

          <Input
            label="Description"
            placeholder="Describe the task requirements..."
            multiline
            rows={3}
          />

          <div>
            <label className="block text-sm font-medium text-gold-200 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {TASK_CATEGORIES.map(tag => (
                <Button
                  key={tag.value}
                  variant="secondary"
                  size="small"
                  className={`${tag.color} ${tag.textColor}`}
                >
                  {tag.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsTaskModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Task
            </Button>
          </div>
        </form>
      </Modal>

      {/* Time Log Modal */}
      <Modal
        isOpen={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        title="Log Time"
      >
        {selectedTask && (
          <form className="space-y-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-2">{selectedTask.title}</h3>
              <p className="text-slate-400 text-sm">{selectedTask.project}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="glass-light p-3 rounded-lg">
                  <p className="text-xs text-slate-400">Estimated</p>
                  <p className="text-lg text-white font-bold">{selectedTask.estimatedHours}h</p>
                </div>
                <div className="glass-light p-3 rounded-lg">
                  <p className="text-xs text-slate-400">Logged</p>
                  <p className="text-lg text-gold-300 font-bold">{selectedTask.loggedHours}h</p>
                </div>
              </div>
            </div>

            <Input
              label="Hours"
              type="number"
              placeholder="Enter hours"
              min="0"
              step="0.5"
              required
            />

            <Input
              label="Date"
              type="date"
              required
            />

            <Input
              label="Description"
              placeholder="What did you work on?"
              multiline
              rows={3}
            />

            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsTimeModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Log Time
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}

export default Tasks