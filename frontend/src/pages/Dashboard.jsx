import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Heart, PenTool, GraduationCap, Code, Globe, HandHeart,
  TrendingUp, Clock, Zap, MessageCircleHeart, ArrowRight, BarChart, MessageSquare
} from 'lucide-react'
import Navbar from '../components/Navbar'
import { useStore } from '../store/useStore'
import { chatAPI, authAPI } from '../api/services'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useStore()
  const [stats, setStats] = useState(null)
  const [recentChats, setRecentChats] = useState([])
  const [loading, setLoading] = useState(true)

  const aiModes = [
    {
      id: 'general',
      title: 'Emotional Support',
      icon: Heart,
      description: 'Talk about your feelings, stress, or loneliness. I\'m here to listen without judgment.',
      color: 'from-purple-400 to-pink-400',
      gradient: 'bg-gradient-purple',
    },
    {
      id: 'writing',
      title: 'Journal & Express',
      icon: PenTool,
      description: 'Express emotions through journaling, letters, or creative writing exercises.',
      color: 'from-blue-400 to-purple-400',
      gradient: 'bg-gradient-blue',
    },
    {
      id: 'tutor',
      title: 'Learning Companion',
      icon: GraduationCap,
      description: 'Study and learn in a stress-free environment. Celebrate every small victory.',
      color: 'from-teal-400 to-cyan-400',
      gradient: 'bg-gradient-to-r from-teal-400 to-cyan-400',
    },
    {
      id: 'code',
      title: 'Coding Support',
      icon: Code,
      description: 'Debug and learn programming with patience. Normalize coding frustration.',
      color: 'from-indigo-400 to-blue-400',
      gradient: 'bg-gradient-to-r from-indigo-400 to-blue-400',
    },
    {
      id: 'translator',
      title: 'Language Bridge',
      icon: Globe,
      description: 'Translate with emotional and cultural sensitivity. Bridge hearts, not just words.',
      color: 'from-violet-400 to-purple-400',
      gradient: 'bg-gradient-to-r from-violet-400 to-purple-400',
    },
    {
      id: 'advisor',
      title: 'Life Companion',
      icon: HandHeart,
      description: 'Think through decisions together. Find your own answers with gentle guidance.',
      color: 'from-pink-400 to-rose-400',
      gradient: 'bg-gradient-to-r from-pink-400 to-rose-400',
    },
  ]

  const fetchData = async () => {
    try {
      setLoading(true)
      const [profileData, chatsData] = await Promise.all([
        authAPI.getProfile(),
        chatAPI.getChatHistory({ limit: 5 })
      ])
      
      setStats(profileData.user.stats)
      setRecentChats(chatsData.chats || [])
      // Removed setChats to prevent infinite loop
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
    
    const loadData = async () => {
      if (mounted) {
        await fetchData()
      }
    }
    
    loadData()
    
    return () => {
      mounted = false
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleModeSelect = (mode) => {
    navigate('/chat', { state: { mode: mode.id } })
  }

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`)
  }

  return (
    <div className="min-h-screen animated-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-3">
            Welcome back, <span className="gradient-text">{user?.name || 'Friend'}</span>
          </h1>
          <p className="text-xl text-gray-400">
            I'm here for you. This is your safe space to share, reflect, and find comfort.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-10 h-10 text-cyber-blue-400" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold gradient-text mb-1">
              {loading ? '...' : (stats?.totalChats || 0)}
            </div>
            <div className="text-gray-400 text-sm">Total Chats</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-10 h-10 text-neon-purple-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold gradient-text mb-1">
              {loading ? '...' : (stats?.totalMessages || 0)}
            </div>
            <div className="text-gray-400 text-sm">Messages Sent</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <BarChart className="w-10 h-10 text-neon-cyan-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold gradient-text mb-1">
              {loading ? '...' : (stats?.totalTokens ? Math.round(stats.totalTokens / 1000) + 'K' : '0')}
            </div>
            <div className="text-gray-400 text-sm">Tokens Used</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-10 h-10 text-neon-pink-500" />
            </div>
            <div className="text-3xl font-bold gradient-text mb-1">24/7</div>
            <div className="text-gray-400 text-sm">Always Available</div>
          </motion.div>
        </div>

        {/* AI Modes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">How Can I Support You Today?</h2>
            <button
              onClick={() => navigate('/chat')}
              className="flex items-center gap-2 text-cyber-blue-400 hover:text-cyber-blue-300 transition-colors"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => handleModeSelect(mode)}
                className="glass rounded-2xl p-6 cursor-pointer hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" 
                     style={{ background: `linear-gradient(135deg, ${mode.color})` }}
                />
                <div className={`w-14 h-14 rounded-xl ${mode.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <mode.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{mode.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed min-h-[3rem]">{mode.description}</p>
                <div className="mt-4 flex items-center text-neon-purple-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Start Chat <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Chats */}
        {recentChats.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Conversations</h2>
              <button
                onClick={() => navigate('/chat')}
                className="flex items-center gap-2 text-cyber-blue-400 hover:text-cyber-blue-300 transition-colors"
              >
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentChats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  onClick={() => handleChatClick(chat.id)}
                  className="glass rounded-xl p-4 cursor-pointer hover:scale-102 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-neon-purple-500 flex-shrink-0 mt-1" fill="currentColor" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate mb-1">{chat.title}</h3>
                      <p className="text-gray-400 text-sm truncate mb-2">
                        {chat.first_message || 'No messages yet'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="capitalize">{chat.mode || 'general'}</span>
                        <span>•</span>
                        <span>{chat.message_count || 0} messages</span>
                        <span>•</span>
                        <span>{new Date(chat.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

