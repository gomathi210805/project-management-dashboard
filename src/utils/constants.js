// Navigation Items
export const NAVIGATION_ITEMS = [
  { icon: 'fas fa-tachometer-alt', label: 'Dashboard', path: '/', exact: true },
  { icon: 'fas fa-folder-open', label: 'Projects', path: '/projects' },
  { icon: 'fas fa-tasks', label: 'Tasks', path: '/tasks' },
  { icon: 'fas fa-clock', label: 'Timesheets', path: '/timesheets' },
  { icon: 'fas fa-chart-bar', label: 'Reports', path: '/reports' },
  { icon: 'fas fa-users', label: 'Team', path: '/team' },
  { icon: 'fas fa-cog', label: 'Settings', path: '/settings' },
  { icon: 'fas fa-question-circle', label: 'Help & Support', path: '/help' }
]

// User Roles
export const USER_ROLES = [
  { value: 'super_admin', label: 'Super Admin', icon: '👑', description: 'Full system access' },
  { value: 'project_admin', label: 'Project Admin', icon: '📊', description: 'Project management access' },
  { value: 'project_manager', label: 'Project Manager', icon: '🎯', description: 'Team and task management' },
  { value: 'team_member', label: 'Team Member', icon: '👨‍💻', description: 'Task execution and updates' },
  { value: 'client', label: 'Client', icon: '👔', description: 'View-only access' }
]

// Project Status Options
export const PROJECT_STATUS = [
  { 
    value: 'planning', 
    label: 'Planning', 
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-300',
    icon: 'fas fa-clipboard-list'
  },
  { 
    value: 'active', 
    label: 'Active', 
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-300',
    icon: 'fas fa-play-circle'
  },
  { 
    value: 'on_hold', 
    label: 'On Hold', 
    color: 'from-slate-500 to-gray-500',
    bgColor: 'bg-slate-500/10',
    textColor: 'text-slate-300',
    icon: 'fas fa-pause-circle'
  },
  { 
    value: 'completed', 
    label: 'Completed', 
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-300',
    icon: 'fas fa-check-circle'
  },
  { 
    value: 'cancelled', 
    label: 'Cancelled', 
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-300',
    icon: 'fas fa-times-circle'
  }
]

// Task Status Options
export const TASK_STATUS = [
  { 
    value: 'todo', 
    label: 'To Do', 
    color: 'from-slate-500 to-gray-500',
    bgColor: 'bg-slate-500/10',
    textColor: 'text-slate-300',
    icon: 'fas fa-circle',
    order: 1
  },
  { 
    value: 'in_progress', 
    label: 'In Progress', 
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-300',
    icon: 'fas fa-spinner',
    order: 2
  },
  { 
    value: 'review', 
    label: 'Review', 
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    textColor: 'text-purple-300',
    icon: 'fas fa-eye',
    order: 3
  },
  { 
    value: 'completed', 
    label: 'Completed', 
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-300',
    icon: 'fas fa-check-circle',
    order: 4
  },
  { 
    value: 'blocked', 
    label: 'Blocked', 
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-300',
    icon: 'fas fa-ban',
    order: 5
  }
]

// Priority Levels
export const PRIORITY_LEVELS = [
  { 
    value: 'low', 
    label: 'Low', 
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    icon: 'fas fa-arrow-down',
    level: 1
  },
  { 
    value: 'medium', 
    label: 'Medium', 
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    icon: 'fas fa-equals',
    level: 2
  },
  { 
    value: 'high', 
    label: 'High', 
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    icon: 'fas fa-exclamation-triangle',
    level: 3
  },
  { 
    value: 'critical', 
    label: 'Critical', 
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    icon: 'fas fa-skull-crossbones',
    level: 4
  }
]

// Task Tags/Categories
export const TASK_CATEGORIES = [
  { 
    value: 'design', 
    label: 'Design', 
    color: 'bg-purple-500/20',
    textColor: 'text-purple-300',
    borderColor: 'border-purple-500/30',
    icon: 'fas fa-palette'
  },
  { 
    value: 'development', 
    label: 'Development', 
    color: 'bg-blue-500/20',
    textColor: 'text-blue-300',
    borderColor: 'border-blue-500/30',
    icon: 'fas fa-code'
  },
  { 
    value: 'testing', 
    label: 'Testing', 
    color: 'bg-emerald-500/20',
    textColor: 'text-emerald-300',
    borderColor: 'border-emerald-500/30',
    icon: 'fas fa-vial'
  },
  { 
    value: 'documentation', 
    label: 'Documentation', 
    color: 'bg-slate-500/20',
    textColor: 'text-slate-300',
    borderColor: 'border-slate-500/30',
    icon: 'fas fa-file-alt'
  },
  { 
    value: 'bug', 
    label: 'Bug', 
    color: 'bg-red-500/20',
    textColor: 'text-red-300',
    borderColor: 'border-red-500/30',
    icon: 'fas fa-bug'
  },
  { 
    value: 'feature', 
    label: 'Feature', 
    color: 'bg-amber-500/20',
    textColor: 'text-amber-300',
    borderColor: 'border-amber-500/30',
    icon: 'fas fa-star'
  },
  { 
    value: 'maintenance', 
    label: 'Maintenance', 
    color: 'bg-cyan-500/20',
    textColor: 'text-cyan-300',
    borderColor: 'border-cyan-500/30',
    icon: 'fas fa-tools'
  },
  { 
    value: 'research', 
    label: 'Research', 
    color: 'bg-indigo-500/20',
    textColor: 'text-indigo-300',
    borderColor: 'border-indigo-500/30',
    icon: 'fas fa-search'
  }
]

// Dashboard Statistics
export const DASHBOARD_STATS = [
  { 
    title: 'Total Projects', 
    value: '24', 
    icon: 'fas fa-project-diagram', 
    color: 'from-blue-500 to-cyan-500',
    trend: '+12%',
    trendDirection: 'up'
  },
  { 
    title: 'Active Tasks', 
    value: '156', 
    icon: 'fas fa-tasks', 
    color: 'from-emerald-500 to-teal-500',
    trend: '+8%',
    trendDirection: 'up'
  },
  { 
    title: 'Team Members', 
    value: '42', 
    icon: 'fas fa-users', 
    color: 'from-purple-500 to-pink-500',
    trend: '+5',
    trendDirection: 'up'
  },
  { 
    title: 'Hours Logged', 
    value: '1,240', 
    icon: 'fas fa-clock', 
    color: 'from-orange-500 to-yellow-500',
    trend: '+15%',
    trendDirection: 'up'
  },
  { 
    title: 'Overdue Tasks', 
    value: '7', 
    icon: 'fas fa-exclamation-triangle', 
    color: 'from-red-500 to-rose-500',
    trend: '-2',
    trendDirection: 'down'
  },
  { 
    title: 'Completed', 
    value: '89%', 
    icon: 'fas fa-chart-line', 
    color: 'from-green-500 to-emerald-500',
    trend: '+3%',
    trendDirection: 'up'
  }
]

// Time Tracking Units
export const TIME_UNITS = [
  { value: 'hours', label: 'Hours', abbreviation: 'h' },
  { value: 'days', label: 'Days', abbreviation: 'd' },
  { value: 'weeks', label: 'Weeks', abbreviation: 'w' },
  { value: 'months', label: 'Months', abbreviation: 'm' }
]

// Report Types
export const REPORT_TYPES = [
  { value: 'project_progress', label: 'Project Progress', icon: 'fas fa-chart-line' },
  { value: 'task_completion', label: 'Task Completion', icon: 'fas fa-tasks' },
  { value: 'time_utilization', label: 'Time Utilization', icon: 'fas fa-clock' },
  { value: 'team_performance', label: 'Team Performance', icon: 'fas fa-users' },
  { value: 'budget_tracking', label: 'Budget Tracking', icon: 'fas fa-dollar-sign' },
  { value: 'milestone_tracking', label: 'Milestone Tracking', icon: 'fas fa-flag-checkered' }
]

// Export Formats
export const EXPORT_FORMATS = [
  { value: 'pdf', label: 'PDF', icon: 'fas fa-file-pdf' },
  { value: 'csv', label: 'CSV', icon: 'fas fa-file-csv' },
  { value: 'excel', label: 'Excel', icon: 'fas fa-file-excel' },
  { value: 'json', label: 'JSON', icon: 'fas fa-file-code' }
]

// Notification Types
export const NOTIFICATION_TYPES = [
  { value: 'task_assigned', label: 'Task Assigned', icon: 'fas fa-user-plus', color: 'text-blue-400' },
  { value: 'task_due', label: 'Task Due', icon: 'fas fa-calendar-exclamation', color: 'text-amber-400' },
  { value: 'task_completed', label: 'Task Completed', icon: 'fas fa-check-circle', color: 'text-emerald-400' },
  { value: 'comment_added', label: 'Comment Added', icon: 'fas fa-comment', color: 'text-purple-400' },
  { value: 'file_uploaded', label: 'File Uploaded', icon: 'fas fa-file-upload', color: 'text-cyan-400' },
  { value: 'milestone_reached', label: 'Milestone Reached', icon: 'fas fa-flag', color: 'text-gold-400' },
  { value: 'time_logged', label: 'Time Logged', icon: 'fas fa-clock', color: 'text-orange-400' }
]

// Project Template Types
export const PROJECT_TEMPLATES = [
  { value: 'software_dev', label: 'Software Development', icon: 'fas fa-laptop-code' },
  { value: 'marketing_campaign', label: 'Marketing Campaign', icon: 'fas fa-bullhorn' },
  { value: 'event_planning', label: 'Event Planning', icon: 'fas fa-calendar-alt' },
  { value: 'product_launch', label: 'Product Launch', icon: 'fas fa-rocket' },
  { value: 'research_project', label: 'Research Project', icon: 'fas fa-flask' },
  { value: 'construction', label: 'Construction', icon: 'fas fa-hard-hat' }
]

// Milestone Types
export const MILESTONE_TYPES = [
  { value: 'planning_complete', label: 'Planning Complete', icon: 'fas fa-clipboard-check' },
  { value: 'design_approved', label: 'Design Approved', icon: 'fas fa-palette' },
  { value: 'development_start', label: 'Development Start', icon: 'fas fa-code-branch' },
  { value: 'testing_phase', label: 'Testing Phase', icon: 'fas fa-vial' },
  { value: 'client_review', label: 'Client Review', icon: 'fas fa-eye' },
  { value: 'final_delivery', label: 'Final Delivery', icon: 'fas fa-box-open' }
]

// Issue/Bug Severity Levels
export const ISSUE_SEVERITY = [
  { value: 'low', label: 'Low', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  { value: 'medium', label: 'Medium', color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
  { value: 'high', label: 'High', color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  { value: 'critical', label: 'Critical', color: 'text-red-400', bgColor: 'bg-red-500/10' }
]

// Issue/Bug Status
export const ISSUE_STATUS = [
  { value: 'open', label: 'Open', color: 'from-red-500 to-rose-500' },
  { value: 'in_progress', label: 'In Progress', color: 'from-blue-500 to-cyan-500' },
  { value: 'resolved', label: 'Resolved', color: 'from-emerald-500 to-teal-500' },
  { value: 'closed', label: 'Closed', color: 'from-slate-500 to-gray-500' },
  { value: 'reopened', label: 'Reopened', color: 'from-amber-500 to-orange-500' }
]

// Date Formats
export const DATE_FORMATS = [
  { value: 'YYYY-MM-DD', label: '2024-01-25', example: 'ISO Format' },
  { value: 'MM/DD/YYYY', label: '01/25/2024', example: 'US Format' },
  { value: 'DD/MM/YYYY', label: '25/01/2024', example: 'European Format' },
  { value: 'MMMM D, YYYY', label: 'January 25, 2024', example: 'Long Format' }
]

// Time Zones
export const TIME_ZONES = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'EST', label: 'EST (Eastern Standard Time)' },
  { value: 'PST', label: 'PST (Pacific Standard Time)' },
  { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
  { value: 'IST', label: 'IST (Indian Standard Time)' },
  { value: 'CET', label: 'CET (Central European Time)' }
]

// Team Departments
export const TEAM_DEPARTMENTS = [
  { value: 'engineering', label: 'Engineering', icon: 'fas fa-cogs' },
  { value: 'design', label: 'Design', icon: 'fas fa-palette' },
  { value: 'marketing', label: 'Marketing', icon: 'fas fa-bullhorn' },
  { value: 'sales', label: 'Sales', icon: 'fas fa-chart-line' },
  { value: 'support', label: 'Support', icon: 'fas fa-headset' },
  { value: 'operations', label: 'Operations', icon: 'fas fa-tasks' },
  { value: 'hr', label: 'Human Resources', icon: 'fas fa-users' },
  { value: 'finance', label: 'Finance', icon: 'fas fa-dollar-sign' }
]

// File Types
export const FILE_TYPES = [
  { value: 'image', label: 'Image', icon: 'fas fa-image', extensions: ['jpg', 'jpeg', 'png', 'gif', 'svg'] },
  { value: 'document', label: 'Document', icon: 'fas fa-file-alt', extensions: ['pdf', 'doc', 'docx', 'txt'] },
  { value: 'spreadsheet', label: 'Spreadsheet', icon: 'fas fa-file-excel', extensions: ['xls', 'xlsx', 'csv'] },
  { value: 'presentation', label: 'Presentation', icon: 'fas fa-file-powerpoint', extensions: ['ppt', 'pptx'] },
  { value: 'archive', label: 'Archive', icon: 'fas fa-file-archive', extensions: ['zip', 'rar', '7z'] },
  { value: 'code', label: 'Code', icon: 'fas fa-file-code', extensions: ['js', 'jsx', 'ts', 'tsx', 'html', 'css'] }
]

// Colors for Charts and UI
export const CHART_COLORS = {
  primary: '#f6d02e', // Gold
  secondary: '#d4b021', // Dark Gold
  success: '#10b981', // Emerald
  info: '#3b82f6', // Blue
  warning: '#f59e0b', // Amber
  danger: '#ef4444', // Red
  purple: '#8b5cf6',
  pink: '#ec4899',
  indigo: '#6366f1',
  teal: '#14b8a6',
  orange: '#f97316',
  cyan: '#06b6d4'
}

// API Endpoints (for reference)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  PROJECTS: {
    LIST: '/api/projects',
    CREATE: '/api/projects',
    DETAIL: (id) => `/api/projects/${id}`,
    UPDATE: (id) => `/api/projects/${id}`,
    DELETE: (id) => `/api/projects/${id}`
  },
  TASKS: {
    LIST: '/api/tasks',
    CREATE: '/api/tasks',
    DETAIL: (id) => `/api/tasks/${id}`,
    UPDATE: (id) => `/api/tasks/${id}`,
    DELETE: (id) => `/api/tasks/${id}`
  },
  USERS: {
    LIST: '/api/users',
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile'
  }
}

// Default Settings
export const DEFAULT_SETTINGS = {
  THEME: 'dark',
  LANGUAGE: 'en',
  TIMEZONE: 'UTC',
  DATE_FORMAT: 'YYYY-MM-DD',
  ITEMS_PER_PAGE: 10,
  NOTIFICATIONS: true,
  EMAIL_NOTIFICATIONS: true,
  AUTO_SAVE: true,
  TWO_FACTOR_AUTH: false
}

// Helper Functions
export const getStatusColor = (status, type = 'task') => {
  const statusList = type === 'project' ? PROJECT_STATUS : TASK_STATUS
  const found = statusList.find(s => s.value === status || s.label === status)
  return found ? found.color : 'from-slate-500 to-gray-500'
}

export const getPriorityColor = (priority) => {
  const found = PRIORITY_LEVELS.find(p => p.value === priority || p.label === priority)
  return found ? found.color : 'text-slate-400'
}

export const getCategoryColor = (category) => {
  const found = TASK_CATEGORIES.find(c => c.value === category || c.label === category)
  return found ? found.color : 'bg-slate-500/20'
}

export default {
  NAVIGATION_ITEMS,
  USER_ROLES,
  PROJECT_STATUS,
  TASK_STATUS,
  PRIORITY_LEVELS,
  TASK_CATEGORIES,
  DASHBOARD_STATS,
  TIME_UNITS,
  REPORT_TYPES,
  EXPORT_FORMATS,
  NOTIFICATION_TYPES,
  PROJECT_TEMPLATES,
  MILESTONE_TYPES,
  ISSUE_SEVERITY,
  ISSUE_STATUS,
  DATE_FORMATS,
  TIME_ZONES,
  TEAM_DEPARTMENTS,
  FILE_TYPES,
  CHART_COLORS,
  API_ENDPOINTS,
  DEFAULT_SETTINGS,
  getStatusColor,
  getPriorityColor,
  getCategoryColor
}