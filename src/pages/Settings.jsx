import { useState } from 'react'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import Card from '../components/UI/Card'
import Dropdown from '../components/UI/Dropdown'
import { DATE_FORMATS, TIME_ZONES, DEFAULT_SETTINGS } from '../utils/constants'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [settings, setSettings] = useState({
    profile: {
      name: 'Ashith',
      email: 'ashith@example.com',
      phone: '+1 (555) 123-4567',
      jobTitle: 'Project Manager',
      department: 'Engineering',
      timezone: 'UTC',
      language: 'en'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordLastChanged: '2024-01-15',
      loginAlerts: true
    },
    notifications: {
      emailNotifications: true,
      taskAssigned: true,
      taskDue: true,
      milestoneReached: true,
      weeklyDigest: true,
      marketingEmails: false
    },
    appearance: {
      theme: 'dark',
      sidebarCollapsed: false,
      compactMode: false,
      animations: true
    }
  })

  const [isSaving, setIsSaving] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
    { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'appearance', label: 'Appearance', icon: 'fas fa-palette' },
    { id: 'integrations', label: 'Integrations', icon: 'fas fa-plug' },
    { id: 'billing', label: 'Billing', icon: 'fas fa-credit-card' }
  ]

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert('Settings saved successfully!')
    }, 1000)
  }

  const handleChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }))
  }

  const integrations = [
    { name: 'GitHub', connected: true, icon: 'fab fa-github', color: 'text-gray-300' },
    { name: 'Slack', connected: true, icon: 'fab fa-slack', color: 'text-purple-300' },
    { name: 'Google Calendar', connected: false, icon: 'fab fa-google', color: 'text-red-300' },
    { name: 'Jira', connected: false, icon: 'fab fa-jira', color: 'text-blue-300' },
    { name: 'Dropbox', connected: true, icon: 'fab fa-dropbox', color: 'text-blue-400' },
    { name: 'Zoom', connected: false, icon: 'fas fa-video', color: 'text-cyan-300' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold golden-gradient">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account preferences and system settings</p>
        </div>
        <Button 
          onClick={handleSave}
          loading={isSaving}
          icon={<i className="fas fa-save"></i>}
        >
          Save Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Card>
        <div className="border-b border-slate-700">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-gold-500 text-gold-300'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Personal Information">
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={settings.profile.name}
                onChange={(e) => handleChange('profile', 'name', e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={settings.profile.email}
                onChange={(e) => handleChange('profile', 'email', e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                value={settings.profile.phone}
                onChange={(e) => handleChange('profile', 'phone', e.target.value)}
              />
              <Input
                label="Job Title"
                value={settings.profile.jobTitle}
                onChange={(e) => handleChange('profile', 'jobTitle', e.target.value)}
              />
              <Dropdown
                label="Timezone"
                options={TIME_ZONES}
                value={settings.profile.timezone}
                onChange={(value) => handleChange('profile', 'timezone', value)}
                required
              />
              <div className="pt-4 border-t border-slate-700">
                <Button variant="secondary" className="w-full">
                  Update Profile Picture
                </Button>
              </div>
            </div>
          </Card>

          <Card title="Preferences" className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gold-200 mb-2">Date Format</label>
                <div className="space-y-2">
                  {DATE_FORMATS.map(format => (
                    <label key={format.value} className="flex items-center">
                      <input
                        type="radio"
                        name="dateFormat"
                        value={format.value}
                        className="mr-2 text-gold-500 focus:ring-gold-500"
                        defaultChecked={format.value === DEFAULT_SETTINGS.DATE_FORMAT}
                      />
                      <div>
                        <span className="text-white">{format.label}</span>
                        <p className="text-xs text-slate-400">{format.example}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gold-200 mb-2">Language</label>
                <div className="space-y-2">
                  {[
                    { value: 'en', label: 'English', flag: '🇺🇸' },
                    { value: 'es', label: 'Spanish', flag: '🇪🇸' },
                    { value: 'fr', label: 'French', flag: '🇫🇷' },
                    { value: 'de', label: 'German', flag: '🇩🇪' },
                    { value: 'ja', label: 'Japanese', flag: '🇯🇵' }
                  ].map(lang => (
                    <label key={lang.value} className="flex items-center">
                      <input
                        type="radio"
                        name="language"
                        value={lang.value}
                        className="mr-2 text-gold-500 focus:ring-gold-500"
                        defaultChecked={lang.value === settings.profile.language}
                      />
                      <span className="mr-2">{lang.flag}</span>
                      <span className="text-white">{lang.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gold-200 mb-2">Bio</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl glass-light border border-slate-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 outline-none transition-all duration-300 text-white"
                  rows={4}
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Password & Authentication">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Change Password</h4>
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                  <Button className="w-full">Update Password</Button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Enable 2FA</p>
                    <p className="text-slate-400 text-sm mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Session & Privacy">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Session Timeout</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Auto-logout after {settings.security.sessionTimeout} minutes</p>
                    <p className="text-slate-400 text-sm mt-1">Automatically log out after period of inactivity</p>
                  </div>
                  <Dropdown
                    options={[
                      { value: 15, label: '15 min' },
                      { value: 30, label: '30 min' },
                      { value: 60, label: '1 hour' },
                      { value: 120, label: '2 hours' },
                      { value: 240, label: '4 hours' }
                    ]}
                    value={settings.security.sessionTimeout}
                    onChange={(value) => handleChange('security', 'sessionTimeout', value)}
                    className="w-32"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4">Login Alerts</h4>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.security.loginAlerts}
                      onChange={(e) => handleChange('security', 'loginAlerts', e.target.checked)}
                      className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
                    />
                    <span className="ml-2 text-white">Email me about new sign-ins</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
                      defaultChecked
                    />
                    <span className="ml-2 text-white">Notify me about suspicious activity</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4">Active Sessions</h4>
                <div className="space-y-3">
                  {[
                    { device: 'Chrome on Windows', location: 'New York, USA', lastActive: 'Now' },
                    { device: 'Safari on iPhone', location: 'San Francisco, USA', lastActive: '2 hours ago' },
                    { device: 'Firefox on Mac', location: 'London, UK', lastActive: '1 day ago' }
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg glass-light">
                      <div>
                        <p className="text-white">{session.device}</p>
                        <p className="text-slate-400 text-sm">{session.location} • Last active {session.lastActive}</p>
                      </div>
                      <Button variant="ghost" size="small" className="hover:bg-red-500/20">
                        <i className="fas fa-sign-out-alt text-red-400"></i>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notifications Settings */}
      {activeTab === 'notifications' && (
        <Card title="Notification Preferences">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Email Notifications</h4>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Email notifications</p>
                    <p className="text-slate-400 text-sm">Receive email notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                    className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Task assigned</p>
                    <p className="text-slate-400 text-sm">When a task is assigned to you</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.taskAssigned}
                    onChange={(e) => handleChange('notifications', 'taskAssigned', e.target.checked)}
                    className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Task due soon</p>
                    <p className="text-slate-400 text-sm">When a task deadline is approaching</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.taskDue}
                    onChange={(e) => handleChange('notifications', 'taskDue', e.target.checked)}
                    className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
                  />
                </label>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">In-App Notifications</h4>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Milestone reached</p>
                    <p className="text-slate-400 text-sm">When a project milestone is completed</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.milestoneReached}
                    onChange={(e) => handleChange('notifications', 'milestoneReached', e.target.checked)}
                    className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Weekly digest</p>
                    <p className="text-slate-400 text-sm">Weekly summary of your activity</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.weeklyDigest}
                    onChange={(e) => handleChange('notifications', 'weeklyDigest', e.target.checked)}
                    className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <div>
                    <p className="text-white">Marketing emails</p>
                    <p className="text-slate-400 text-sm">Product updates and promotional offers</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.marketingEmails}
                    onChange={(e) => handleChange('notifications', 'marketingEmails', e.target.checked)}
                    className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
                  />
                </label>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Appearance Settings */}
      {activeTab === 'appearance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Theme & Display">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Theme</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'dark', label: 'Dark', bg: 'bg-slate-800', border: 'border-slate-700' },
                    { id: 'light', label: 'Light', bg: 'bg-white', border: 'border-gray-300' },
                    { id: 'system', label: 'System', bg: 'bg-gradient-to-r from-slate-800 to-white', border: 'border-slate-700' }
                  ].map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => handleChange('appearance', 'theme', theme.id)}
                      className={`p-4 rounded-xl border-2 ${theme.bg} ${theme.border} transition-all duration-300 ${
                        settings.appearance.theme === theme.id ? 'ring-2 ring-gold-500' : ''
                      }`}
                    >
                      <div className="h-20 rounded-lg bg-slate-700/50 mb-2"></div>
                      <span className="text-white">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4">Interface</h4>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Compact mode</p>
                      <p className="text-slate-400 text-sm">Reduce padding and spacing</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.appearance.compactMode}
                      onChange={(e) => handleChange('appearance', 'compactMode', e.target.checked)}
                      className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Animations</p>
                      <p className="text-slate-400 text-sm">Enable interface animations</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.appearance.animations}
                      onChange={(e) => handleChange('appearance', 'animations', e.target.checked)}
                      className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
                    />
                  </label>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Sidebar & Layout">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Sidebar</h4>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Collapsed by default</p>
                      <p className="text-slate-400 text-sm">Start with sidebar collapsed</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.appearance.sidebarCollapsed}
                      onChange={(e) => handleChange('appearance', 'sidebarCollapsed', e.target.checked)}
                      className="rounded border-slate-700 text-gold-500 focus:ring-gold-500"
                    />
                  </label>
                  <div>
                    <p className="text-white mb-2">Sidebar position</p>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 rounded-lg glass-light hover:bg-gold-500/10 transition-colors">
                        Left
                      </button>
                      <button className="px-4 py-2 rounded-lg glass-dark hover:bg-slate-700/50 transition-colors">
                        Right
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4">Density</h4>
                <div className="space-y-3">
                  {[
                    { id: 'comfortable', label: 'Comfortable', description: 'More spacing between elements' },
                    { id: 'normal', label: 'Normal', description: 'Default spacing' },
                    { id: 'compact', label: 'Compact', description: 'Less spacing for more content' }
                  ].map(density => (
                    <label key={density.id} className="flex items-center">
                      <input
                        type="radio"
                        name="density"
                        value={density.id}
                        className="mr-3 text-gold-500 focus:ring-gold-500"
                        defaultChecked={density.id === 'normal'}
                      />
                      <div>
                        <p className="text-white">{density.label}</p>
                        <p className="text-slate-400 text-sm">{density.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Integrations Settings */}
      {activeTab === 'integrations' && (
        <Card title="Third-Party Integrations">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration, index) => (
                <div key={index} className="p-4 rounded-xl glass-light hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <i className={`${integration.icon} ${integration.color} text-xl`}></i>
                      <span className="text-white font-medium">{integration.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      integration.connected 
                        ? 'bg-linear-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300' 
                        : 'bg-linear-to-r from-slate-500/20 to-gray-500/20 text-slate-300'
                    }`}>
                      {integration.connected ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">
                    {integration.connected 
                      ? 'This integration is currently connected to your account.' 
                      : 'Connect to sync data and enable features.'}
                  </p>
                  <Button variant={integration.connected ? 'secondary' : 'primary'} className="w-full">
                    {integration.connected ? 'Manage' : 'Connect'}
                  </Button>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-700">
              <h4 className="text-lg font-semibold text-white mb-4">API Access</h4>
              <div className="p-4 rounded-xl glass-light">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white">API Key</p>
                    <p className="text-slate-400 text-sm">Use this key to access our API</p>
                  </div>
                  <Button variant="secondary" size="small">
                    <i className="fas fa-copy mr-2"></i>
                    Copy Key
                  </Button>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/50 font-mono text-sm text-slate-300 overflow-x-auto">
                  {import.meta.env.VITE_API_KEY ?? '••••••••••••••••••••••••'}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-slate-400 text-sm">
                    Last used: 2 hours ago • Requests today: 142
                  </p>
                  <Button variant="ghost" size="small" className="hover:bg-red-500/20">
                    <i className="fas fa-redo text-red-400"></i>
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Billing Settings */}
      {activeTab === 'billing' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Subscription Plan" className="lg:col-span-2">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Starter',
                    price: '$29',
                    period: '/month',
                    features: ['5 Projects', '10 Team Members', 'Basic Support', '1GB Storage'],
                    current: false
                  },
                  {
                    name: 'Professional',
                    price: '$79',
                    period: '/month',
                    features: ['Unlimited Projects', '50 Team Members', 'Priority Support', '10GB Storage', 'Advanced Analytics'],
                    current: true,
                    popular: true
                  },
                  {
                    name: 'Enterprise',
                    price: '$199',
                    period: '/month',
                    features: ['Unlimited Everything', 'Custom Solutions', '24/7 Support', 'Unlimited Storage', 'Custom Integrations'],
                    current: false
                  }
                ].map((plan, index) => (
                  <div key={index} className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    plan.current 
                      ? 'border-gold-500 golden-glow' 
                      : 'border-slate-700 glass-light hover:border-gold-500/50'
                  }`}>
                    {plan.popular && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-linear-to-r from-gold-500 to-gold-600 text-slate-900 mb-4">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-slate-400 ml-2">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-slate-300">
                          <i className="fas fa-check text-emerald-400 mr-2"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.current ? 'secondary' : 'primary'}
                      className="w-full"
                    >
                      {plan.current ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4">Billing History</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="py-3 px-4 text-left text-gold-200 font-semibold">Date</th>
                        <th className="py-3 px-4 text-left text-gold-200 font-semibold">Description</th>
                        <th className="py-3 px-4 text-left text-gold-200 font-semibold">Amount</th>
                        <th className="py-3 px-4 text-left text-gold-200 font-semibold">Status</th>
                        <th className="py-3 px-4 text-left text-gold-200 font-semibold">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: 'Jan 25, 2024', description: 'Professional Plan', amount: '$79.00', status: 'Paid' },
                        { date: 'Dec 25, 2023', description: 'Professional Plan', amount: '$79.00', status: 'Paid' },
                        { date: 'Nov 25, 2023', description: 'Professional Plan', amount: '$79.00', status: 'Paid' },
                        { date: 'Oct 25, 2023', description: 'Starter to Professional', amount: '$50.00', status: 'Paid' }
                      ].map((invoice, index) => (
                        <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-4 text-white">{invoice.date}</td>
                          <td className="py-3 px-4 text-white">{invoice.description}</td>
                          <td className="py-3 px-4 text-white">{invoice.amount}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-linear-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300">
                              {invoice.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="small">
                              <i className="fas fa-download"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Payment Method">
            <div className="space-y-6">
              <div className="p-4 rounded-xl glass-light">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <i className="fab fa-cc-visa text-white"></i>
                    </div>
                    <div>
                      <p className="text-white">Visa ending in 4242</p>
                      <p className="text-slate-400 text-sm">Expires 12/2025</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-linear-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300">
                    Primary
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="secondary" size="small" className="flex-1">
                    <i className="fas fa-edit mr-2"></i>
                    Edit
                  </Button>
                  <Button variant="ghost" size="small" className="flex-1 hover:bg-red-500/20">
                    <i className="fas fa-trash text-red-400 mr-2"></i>
                    Remove
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4">Add New Card</h4>
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                    />
                    <Input
                      label="CVC"
                      placeholder="123"
                    />
                  </div>
                  <Input
                    label="Cardholder Name"
                    placeholder="John Doe"
                  />
                  <Button className="w-full">Add Payment Method</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Danger Zone */}
      <Card title="Danger Zone">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl glass-light border border-red-500/30">
            <div>
              <p className="text-white font-medium">Delete Account</p>
              <p className="text-slate-400 text-sm mt-1">Permanently delete your account and all data</p>
            </div>
            <Button variant="danger">
              Delete Account
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl glass-light border border-amber-500/30">
            <div>
              <p className="text-white font-medium">Export Data</p>
              <p className="text-slate-400 text-sm mt-1">Download all your data in JSON format</p>
            </div>
            <Button variant="secondary">
              <i className="fas fa-download mr-2"></i>
              Export Data
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl glass-light border border-slate-700">
            <div>
              <p className="text-white font-medium">Reset Settings</p>
              <p className="text-slate-400 text-sm mt-1">Reset all settings to default values</p>
            </div>
            <Button variant="ghost" className="hover:bg-amber-500/20">
              <i className="fas fa-undo mr-2"></i>
              Reset
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Settings
