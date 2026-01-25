import { useState } from 'react'
import Button from '../components/UI/Button'
import Card from '../components/UI/Card'
import Dropdown from '../components/UI/Dropdown'
import { REPORT_TYPES, EXPORT_FORMATS } from '../utils/constants'

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('project_progress')
  const [dateRange, setDateRange] = useState('this_month')
  const [isGenerating, setIsGenerating] = useState(false)

  const reportData = {
    project_progress: {
      title: 'Project Progress Report',
      description: 'Overview of all projects with completion status and timelines',
      metrics: [
        { label: 'Total Projects', value: '24', change: '+12%' },
        { label: 'On Schedule', value: '18', change: '+8%' },
        { label: 'Delayed', value: '4', change: '-2%' },
        { label: 'Completed', value: '2', change: '+1%' }
      ],
      chartData: [75, 45, 90, 30, 60, 85, 40]
    },
    time_utilization: {
      title: 'Time Utilization Report',
      description: 'Analysis of team hours across projects and tasks',
      metrics: [
        { label: 'Total Hours', value: '1,240h', change: '+15%' },
        { label: 'Billable Hours', value: '980h', change: '+12%' },
        { label: 'Utilization Rate', value: '78%', change: '+5%' },
        { label: 'Overtime', value: '45h', change: '-8%' }
      ],
      chartData: [40, 25, 15, 10, 5, 3, 2]
    },
    team_performance: {
      title: 'Team Performance Report',
      description: 'Individual and team productivity metrics',
      metrics: [
        { label: 'Avg. Tasks Completed', value: '24', change: '+18%' },
        { label: 'On-time Delivery', value: '92%', change: '+7%' },
        { label: 'Quality Score', value: '4.8/5', change: '+0.3' },
        { label: 'Team Satisfaction', value: '4.5/5', change: '+0.4' }
      ],
      chartData: [90, 85, 92, 88, 95, 87, 93]
    }
  }

  const currentReport = reportData[selectedReport] || reportData.project_progress

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      alert('Report generated successfully!')
    }, 1500)
  }

  const handleExport = (format) => {
    alert(`Exporting report as ${format.toUpperCase()}...`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold golden-gradient">Reports & Analytics</h1>
          <p className="text-slate-400 mt-1">Generate insights and track performance metrics</p>
        </div>
        <Button 
          onClick={handleGenerateReport}
          loading={isGenerating}
          icon={<i className="fas fa-chart-bar"></i>}
        >
          Generate Report
        </Button>
      </div>

      {/* Report Selector */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gold-200 mb-2">Report Type</label>
            <Dropdown
              options={REPORT_TYPES}
              value={selectedReport}
              onChange={setSelectedReport}
              placeholder="Select report type"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gold-200 mb-2">Date Range</label>
            <Dropdown
              options={[
                { value: 'today', label: 'Today' },
                { value: 'yesterday', label: 'Yesterday' },
                { value: 'this_week', label: 'This Week' },
                { value: 'this_month', label: 'This Month' },
                { value: 'this_quarter', label: 'This Quarter' },
                { value: 'this_year', label: 'This Year' },
                { value: 'custom', label: 'Custom Range' }
              ]}
              value={dateRange}
              onChange={setDateRange}
              placeholder="Select date range"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gold-200 mb-2">Export Format</label>
            <div className="flex flex-wrap gap-2">
              {EXPORT_FORMATS.map(format => (
                <Button
                  key={format.value}
                  variant="secondary"
                  size="small"
                  onClick={() => handleExport(format.value)}
                >
                  <i className={`${format.icon} mr-2`}></i>
                  {format.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Report Header */}
      <Card>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white">{currentReport.title}</h2>
            <p className="text-slate-400 mt-2">{currentReport.description}</p>
            <div className="flex items-center mt-4 space-x-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-blue-500 to-cyan-500 text-white">
                Generated: {new Date().toLocaleDateString()}
              </span>
              <span className="text-slate-400 text-sm">
                <i className="far fa-clock mr-1"></i>
                Last updated: 2 hours ago
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="small">
              <i className="fas fa-share"></i>
            </Button>
            <Button variant="ghost" size="small">
              <i className="fas fa-print"></i>
            </Button>
            <Button variant="ghost" size="small">
              <i className="fas fa-sync"></i>
            </Button>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentReport.metrics.map((metric, index) => (
          <Card key={index} hoverable={true}>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">{metric.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${metric.change.startsWith('+') ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                  <span className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${metric.change.startsWith('+') ? 'bg-linear-to-r from-emerald-500 to-teal-500' : 'bg-linear-to-r from-red-500 to-rose-500'}`}
                  style={{ width: `${Math.min(Math.abs(parseInt(metric.change)), 100)}%` }}
                ></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart Visualization */}
      <Card title="Performance Overview">
        <div className="h-64 flex items-end space-x-2 pt-8">
          {currentReport.chartData.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full rounded-t-lg bg-linear-to-t from-gold-500 to-gold-600 transition-all duration-300 hover:from-gold-600 hover:to-gold-700"
                style={{ height: `${value}%` }}
                title={`${value}%`}
              ></div>
              <span className="text-slate-400 text-xs mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-slate-700">
          <div className="flex justify-between items-center">
            <div className="text-slate-400 text-sm">
              Showing data for the last 7 days
            </div>
            <Button variant="secondary" size="small">
              View Detailed Chart
            </Button>
          </div>
        </div>
      </Card>

      {/* Project Breakdown */}
      <Card title="Project Breakdown">
        <div className="space-y-4">
          {[
            { name: 'Website Redesign', progress: 75, hours: 240, budget: '$25,000' },
            { name: 'Mobile App Development', progress: 45, hours: 180, budget: '$45,000' },
            { name: 'CRM Migration', progress: 90, hours: 320, budget: '$35,000' },
            { name: 'E-commerce Platform', progress: 30, hours: 120, budget: '$60,000' },
            { name: 'Internal Dashboard', progress: 100, hours: 80, budget: '$18,000' }
          ].map((project, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg glass-light hover:bg-slate-800/30 transition-colors">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">{project.name}</span>
                  <span className="text-gold-300 font-semibold">{project.progress}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-gold-500 to-gold-600 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-slate-400 mt-2">
                  <span>{project.hours}h logged</span>
                  <span>{project.budget} budget</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Team Performance */}
      <Card title="Team Performance">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="py-3 px-4 text-left text-gold-200 font-semibold">Team Member</th>
                <th className="py-3 px-4 text-left text-gold-200 font-semibold">Tasks Completed</th>
                <th className="py-3 px-4 text-left text-gold-200 font-semibold">Hours Logged</th>
                <th className="py-3 px-4 text-left text-gold-200 font-semibold">Efficiency</th>
                <th className="py-3 px-4 text-left text-gold-200 font-semibold">Quality Score</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Alex Johnson', tasks: 24, hours: 120, efficiency: '92%', quality: '4.8/5' },
                { name: 'Sarah Williams', tasks: 18, hours: 96, efficiency: '88%', quality: '4.6/5' },
                { name: 'Michael Chen', tasks: 32, hours: 160, efficiency: '95%', quality: '4.9/5' },
                { name: 'Lisa Rodriguez', tasks: 15, hours: 80, efficiency: '85%', quality: '4.5/5' },
                { name: 'David Miller', tasks: 28, hours: 140, efficiency: '90%', quality: '4.7/5' }
              ].map((member, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-r from-gold-400 to-gold-600"></div>
                      <span className="text-white">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white">{member.tasks}</td>
                  <td className="py-3 px-4 text-white">{member.hours}h</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-linear-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300">
                      {member.efficiency}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gold-300 font-semibold">{member.quality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default Reports