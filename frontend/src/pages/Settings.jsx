import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database, Save, Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useStore } from '../store/useStore'
import { authAPI } from '../api/services'

const Settings = () => {
  const { user, setUser } = useStore()
  const [activeTab, setActiveTab] = useState('account')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data', icon: Database },
  ]

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await authAPI.updateProfile(formData)
      setUser(response.user)
      localStorage.setItem('user', JSON.stringify(response.user))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen animated-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <SettingsIcon className="w-8 h-8 text-cyber-blue-400" />
              <h1 className="text-4xl font-bold gradient-text">Settings</h1>
            </div>
            <p className="text-gray-400 text-lg">Manage your account and preferences</p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Tabs Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:w-64"
            >
              <div className="glass rounded-2xl p-4 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-blue text-white shadow-lg'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <div className="glass rounded-2xl p-8">
                {/* Account Settings */}
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Account Settings</h2>
                      <p className="text-gray-400">Manage your account information</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyber-blue-400 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      disabled={saving || saved}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-blue text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {saved ? (
                        <>
                          <Check className="w-5 h-5" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          {saving ? 'Saving...' : 'Save Changes'}
                        </>
                      )}
                    </motion.button>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Notification Preferences</h2>
                      <p className="text-gray-400">Choose what you want to be notified about</p>
                    </div>

                    {[
                      { label: 'Email Notifications', description: 'Receive email updates about your activity' },
                      { label: 'Chat Updates', description: 'Get notified when AI responds to your messages' },
                      { label: 'Weekly Summary', description: 'Receive a weekly summary of your AI usage' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <div className="text-white font-medium">{item.label}</div>
                          <div className="text-gray-400 text-sm">{item.description}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-blue"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Privacy */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Privacy & Security</h2>
                      <p className="text-gray-400">Control your privacy settings</p>
                    </div>

                    <div className="p-6 bg-gradient-blue/10 border border-cyber-blue-500/30 rounded-xl">
                      <h3 className="text-white font-semibold mb-2">🔒 Your Data is Safe</h3>
                      <p className="text-gray-400 text-sm">
                        All your conversations are encrypted and stored securely. We never share your data with third parties.
                      </p>
                    </div>

                    {[
                      { label: 'Save Chat History', description: 'Store your conversations for future reference' },
                      { label: 'Share Usage Analytics', description: 'Help us improve AI Shadow with anonymous usage data' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <div className="text-white font-medium">{item.label}</div>
                          <div className="text-gray-400 text-sm">{item.description}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-blue"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Appearance */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Appearance</h2>
                      <p className="text-gray-400">Customize how AI Shadow looks</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 glass rounded-xl border-2 border-cyber-blue-500 cursor-pointer">
                          <div className="text-white font-medium mb-1">Dark Mode</div>
                          <div className="text-gray-400 text-sm">Current theme</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border-2 border-transparent hover:border-white/20 cursor-pointer opacity-50">
                          <div className="text-white font-medium mb-1">Light Mode</div>
                          <div className="text-gray-400 text-sm">Coming soon</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Font Size</label>
                      <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyber-blue-400">
                        <option>Small</option>
                        <option selected>Medium (Default)</option>
                        <option>Large</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Data */}
                {activeTab === 'data' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Data Management</h2>
                      <p className="text-gray-400">Export or delete your data</p>
                    </div>

                    <div className="space-y-4">
                      <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors">
                        <div className="text-white font-medium">Export Chat History</div>
                        <div className="text-gray-400 text-sm">Download all your conversations as JSON</div>
                      </button>

                      <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition-colors">
                        <div className="text-white font-medium">Download User Data</div>
                        <div className="text-gray-400 text-sm">Get a copy of all your account data</div>
                      </button>

                      <button className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-left transition-colors">
                        <div className="text-red-400 font-medium">Delete Account</div>
                        <div className="text-gray-400 text-sm">Permanently delete your account and all data</div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

