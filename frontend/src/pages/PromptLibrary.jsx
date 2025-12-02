import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookTemplate, Plus, Search, Filter, Copy, Check, Edit2, 
  Trash2, X, Save, Star, TrendingUp 
} from 'lucide-react'
import Navbar from '../components/Navbar'
import { promptAPI } from '../api/services'
import { useNavigate } from 'react-router-dom'

const PromptLibrary = () => {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState([])
  const [filteredTemplates, setFilteredTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    description: '',
    prompt: '',
    category: 'general',
  })

  const categories = [
    { id: 'all', label: 'All Templates', color: 'bg-gray-500' },
    { id: 'general', label: 'General', color: 'bg-blue-500' },
    { id: 'writing', label: 'Writing', color: 'bg-purple-500' },
    { id: 'tutor', label: 'Learning', color: 'bg-green-500' },
    { id: 'code', label: 'Coding', color: 'bg-orange-500' },
    { id: 'translator', label: 'Translation', color: 'bg-indigo-500' },
  ]

  useEffect(() => {
    fetchTemplates()
  }, [])

  useEffect(() => {
    filterTemplates()
  }, [templates, searchQuery, selectedCategory])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const response = await promptAPI.getTemplates()
      setTemplates(response.templates || [])
    } catch (error) {
      console.error('Error fetching templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterTemplates = () => {
    let filtered = templates

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredTemplates(filtered)
  }

  const handleCreateTemplate = async () => {
    if (!newTemplate.title || !newTemplate.prompt) {
      alert('Please fill in title and prompt')
      return
    }

    try {
      const response = await promptAPI.createTemplate(newTemplate)
      setTemplates([response.template, ...templates])
      setShowCreateModal(false)
      setNewTemplate({ title: '', description: '', prompt: '', category: 'general' })
    } catch (error) {
      console.error('Error creating template:', error)
      alert('Failed to create template')
    }
  }

  const handleUseTemplate = async (template) => {
    try {
      await promptAPI.useTemplate(template.id)
      navigate('/chat', { state: { prompt: template.prompt, mode: template.category } })
    } catch (error) {
      console.error('Error using template:', error)
    }
  }

  const handleCopyPrompt = (prompt, id) => {
    navigator.clipboard.writeText(prompt)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDeleteTemplate = async (templateId) => {
    if (!confirm('Are you sure you want to delete this template?')) return

    try {
      await promptAPI.deleteTemplate(templateId)
      setTemplates(templates.filter(t => t.id !== templateId))
    } catch (error) {
      console.error('Error deleting template:', error)
      alert('Failed to delete template')
    }
  }

  return (
    <div className="min-h-screen animated-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookTemplate className="w-8 h-8 text-cyber-blue-400" />
                <h1 className="text-4xl font-bold gradient-text">Prompt Library</h1>
              </div>
              <p className="text-gray-400 text-lg">
                Discover and save powerful prompts for your AI conversations
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-neon-purple-500/50 transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Template
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-8 glass rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyber-blue-400 text-white placeholder-gray-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? `${cat.color} text-white shadow-lg`
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-400">
            Showing {filteredTemplates.length} of {templates.length} templates
          </div>
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading templates...</div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <BookTemplate className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No templates found. Create your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-2xl p-6 hover:scale-105 transition-all group relative"
              >
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold text-white ${
                    categories.find(c => c.id === template.category)?.color || 'bg-gray-500'
                  }`}>
                    {template.category}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2 pr-20">{template.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{template.description}</p>
                </div>

                {/* Prompt Preview */}
                <div className="mb-4 p-3 bg-black/20 rounded-lg">
                  <p className="text-gray-300 text-sm line-clamp-3">{template.prompt}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  {template.is_public && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>Public</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{template.usage_count || 0} uses</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 px-4 py-2 bg-gradient-blue text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    Use Template
                  </motion.button>
                  
                  <button
                    onClick={() => handleCopyPrompt(template.prompt, template.id)}
                    className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
                    title="Copy prompt"
                  >
                    {copiedId === template.id ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {!template.is_public && (
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="p-2 glass rounded-lg hover:bg-red-500/20 transition-colors"
                      title="Delete template"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Create Template Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCreateModal(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="glass rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto neon-glow">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold gradient-text">Create New Template</h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Template Title *
                      </label>
                      <input
                        type="text"
                        value={newTemplate.title}
                        onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyber-blue-400 text-white"
                        placeholder="e.g., Blog Post Generator"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <input
                        type="text"
                        value={newTemplate.description}
                        onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyber-blue-400 text-white"
                        placeholder="Brief description of this template"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={newTemplate.category}
                        onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyber-blue-400 text-white cursor-pointer"
                      >
                        {categories.filter(c => c.id !== 'all').map((cat) => (
                          <option key={cat.id} value={cat.id} className="bg-gray-800">
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Prompt *
                      </label>
                      <textarea
                        value={newTemplate.prompt}
                        onChange={(e) => setNewTemplate({ ...newTemplate, prompt: e.target.value })}
                        rows={8}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyber-blue-400 text-white resize-none"
                        placeholder="Enter your prompt template here. Use {placeholders} for variables."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Tip: Use curly braces for placeholders, e.g., {'{topic}'}, {'{language}'}
                      </p>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCreateTemplate}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-purple text-white font-semibold rounded-xl shadow-lg hover:shadow-neon-purple-500/50 transition-all"
                      >
                        <Save className="w-5 h-5" />
                        Create Template
                      </motion.button>
                      
                      <button
                        onClick={() => setShowCreateModal(false)}
                        className="px-6 py-3 glass hover:bg-white/10 text-gray-300 font-semibold rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PromptLibrary

