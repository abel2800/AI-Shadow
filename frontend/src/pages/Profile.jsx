import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, TrendingUp, MessageSquare, Zap, Award } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useStore } from '../store/useStore'
import { authAPI } from '../api/services'

const Profile = () => {
  const { user } = useStore()
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile()
      setProfileData(response.user)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen animated-bg">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-xl">Loading profile...</div>
        </div>
      </div>
    )
  }

  const stats = profileData?.stats || {}

  return (
    <div className="min-h-screen animated-bg">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Header */}
          <div className="glass rounded-3xl p-8 mb-6 neon-glow">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-2xl bg-gradient-blue flex items-center justify-center neon-glow cursor-pointer"
              >
                <User className="w-16 h-16 text-white" />
              </motion.div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold gradient-text mb-3">{profileData?.name}</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    <span>{profileData?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>
                      Joined {profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-4 py-2 bg-gradient-blue rounded-lg text-white text-sm font-semibold">
                    Free Tier
                  </span>
                  {stats.favoriteMode && (
                    <span className="px-4 py-2 glass rounded-lg text-gray-300 text-sm">
                      Favorite: <span className="capitalize">{stats.favoriteMode}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform"
            >
              <MessageSquare className="w-12 h-12 text-cyber-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold gradient-text mb-1">
                {stats.totalChats || 0}
              </div>
              <div className="text-gray-400 text-sm">Total Conversations</div>
              <div className="mt-2 flex items-center justify-center gap-1 text-green-500 text-xs">
                <TrendingUp className="w-4 h-4" />
                <span>Active</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform"
            >
              <Zap className="w-12 h-12 text-neon-purple-500 mx-auto mb-3" />
              <div className="text-3xl font-bold gradient-text mb-1">
                {stats.totalMessages || 0}
              </div>
              <div className="text-gray-400 text-sm">Messages Exchanged</div>
              <div className="mt-2 flex items-center justify-center gap-1 text-green-500 text-xs">
                <TrendingUp className="w-4 h-4" />
                <span>Growing</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform"
            >
              <Award className="w-12 h-12 text-neon-cyan-500 mx-auto mb-3" />
              <div className="text-3xl font-bold gradient-text mb-1">
                {stats.totalTokens ? Math.round(stats.totalTokens / 1000) : 0}K
              </div>
              <div className="text-gray-400 text-sm">Tokens Processed</div>
              <div className="mt-2 text-xs text-gray-500">Unlimited</div>
            </motion.div>
          </div>

          {/* Activity Overview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Activity Overview</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <div className="text-white font-medium">Last Active</div>
                  <div className="text-gray-400 text-sm">
                    {stats.lastActive ? new Date(stats.lastActive).toLocaleString() : 'Just now'}
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <div className="text-white font-medium">Favorite AI Mode</div>
                  <div className="text-gray-400 text-sm capitalize">
                    {stats.favoriteMode || 'Not set yet'}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <div className="text-white font-medium">Account Status</div>
                  <div className="text-gray-400 text-sm">Active & Verified</div>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-lg text-sm font-semibold">
                  Verified
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile

