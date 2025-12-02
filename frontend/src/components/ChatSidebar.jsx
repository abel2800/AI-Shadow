import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, MessageSquare, Trash2, ChevronLeft, ChevronRight, 
  Search, X, Pin, Archive, Edit2 
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { chatAPI } from '../api/services'

const ChatSidebar = ({ isOpen, onToggle, currentChatId }) => {
  const navigate = useNavigate()
  const { chats, deleteChat: removeChat } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)

  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (query.trim().length === 0) {
      setSearchResults([])
      setSearching(false)
      return
    }

    setSearching(true)
    try {
      const response = await chatAPI.searchChats(query)
      setSearchResults(response.chats || [])
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setSearching(false)
    }
  }

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`)
    setSearchQuery('')
    setSearchResults([])
  }

  const handleNewChat = () => {
    navigate('/chat')
    setSearchQuery('')
    setSearchResults([])
  }

  const handleDeleteChat = async (chatId, e) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to delete this chat?')) {
      try {
        await chatAPI.deleteChat(chatId)
        removeChat(chatId)
        if (currentChatId === chatId) {
          navigate('/chat')
        }
      } catch (error) {
        console.error('Delete error:', error)
      }
    }
  }

  const displayChats = searchQuery.trim().length > 0 ? searchResults : chats

  return (
    <>
      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={onToggle}
            />
            
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-80 glass-strong border-r border-white/20 flex flex-col h-full relative z-50"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 29, 46, 0.95) 0%, rgba(15, 15, 26, 0.95) 100%)',
                boxShadow: '0 8px 32px 0 rgba(167, 139, 250, 0.15)',
              }}
            >
              {/* Close Button (Mobile) */}
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggle}
                className="absolute -right-12 top-4 lg:hidden w-10 h-10 rounded-xl glass-strong flex items-center justify-center hover:bg-white/10 transition-colors"
                style={{
                  boxShadow: '0 4px 16px 0 rgba(167, 139, 250, 0.3)',
                }}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </motion.button>

              {/* Header with animated gradient */}
              <div className="p-6 border-b border-white/10 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 animate-gradient-x" />
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNewChat}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl relative overflow-hidden group"
                  style={{
                    boxShadow: '0 8px 24px 0 rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  
                  <motion.div
                    animate={{ rotate: [0, 90, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.div>
                  <span className="relative z-10">New Chat</span>
                </motion.button>
              </div>

              {/* Search with glow effect */}
              <div className="p-6 pt-4">
                <div className="relative group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400 z-10" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-white/10 text-white placeholder-gray-500 transition-all relative z-10"
                    style={{
                      boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ rotate: 90 }}
                      onClick={() => handleSearch('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white z-10"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Chat List with stunning cards */}
              <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3 custom-scrollbar">
                {searching ? (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-center py-8 text-purple-400"
                  >
                    Searching...
                  </motion.div>
                ) : displayChats.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12 px-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-purple-400" />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {searchQuery ? 'No chats found' : 'Your conversations will appear here.\nStart by creating a new chat!'}
                    </p>
                  </motion.div>
                ) : (
                  displayChats.map((chat, index) => (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      onClick={() => handleChatClick(chat.id)}
                      className={`group relative flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                        currentChatId === parseInt(chat.id)
                          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50'
                          : 'hover:bg-white/5 border border-white/5 hover:border-white/10'
                      }`}
                      style={{
                        boxShadow: currentChatId === parseInt(chat.id)
                          ? '0 4px 20px 0 rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.1) inset'
                          : '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      {/* Gradient border effect on hover */}
                      {currentChatId === parseInt(chat.id) && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-20 blur-sm"
                          animate={{
                            opacity: [0.1, 0.2, 0.1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      
                      {/* Icon with animated background */}
                      <div className="relative">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center relative z-10 ${
                            currentChatId === parseInt(chat.id)
                              ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                              : 'bg-white/5 group-hover:bg-purple-500/20'
                          }`}
                        >
                          <MessageSquare className={`w-5 h-5 ${
                            currentChatId === parseInt(chat.id) ? 'text-white' : 'text-purple-400'
                          }`} />
                        </motion.div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0 relative z-10">
                        <div className="text-white text-sm font-semibold truncate mb-1">
                          {chat.title || 'New Conversation'}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 capitalize">
                            {chat.mode || 'general'}
                          </span>
                          <span>•</span>
                          <span>{new Date(chat.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {/* Delete button with animation */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleDeleteChat(chat.id, e)}
                        className="opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-red-500/20 rounded-lg relative z-10"
                        style={{
                          boxShadow: '0 2px 8px 0 rgba(239, 68, 68, 0.2)',
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Floating Toggle Button - Fixed positioning */}
      <motion.button
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggle}
        className={`fixed left-4 bottom-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          isOpen
            ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/30'
            : 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30'
        }`}
        style={{
          boxShadow: isOpen
            ? '0 8px 24px 0 rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset'
            : '0 8px 24px 0 rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {isOpen ? <X className="w-5 h-5 text-white" /> : <MessageSquare className="w-5 h-5 text-white" />}
        </motion.div>
      </motion.button>
    </>
  )
}

export default ChatSidebar
