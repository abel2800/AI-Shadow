import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Send, Loader2, Settings2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import ChatSidebar from '../components/ChatSidebar'
import MessageBubble from '../components/MessageBubble'
import { useStore } from '../store/useStore'
import { chatAPI } from '../api/services'

const Chat = () => {
  const { chatId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { sidebarOpen, toggleSidebar, chats, setChats } = useStore()
  
  const [currentChat, setCurrentChat] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(location.state?.mode || 'general')
  const [model, setModel] = useState('gpt-3.5-turbo')
  const messagesEndRef = useRef(null)

  const modes = [
    { 
      id: 'general', 
      label: 'Emotional Support',
      subtitle: 'I\'m here to listen and support you',
      prompts: [
        'I need someone to talk to',
        'I\'m feeling overwhelmed today',
        'Help me understand my emotions',
        'I\'m struggling with loneliness',
      ]
    },
    { 
      id: 'writing', 
      label: 'Journal & Express',
      subtitle: 'Let\'s explore your feelings through writing',
      prompts: [
        'Help me journal my thoughts',
        'I want to write a letter to myself',
        'Help me express what I\'m feeling',
        'Guide me through a writing exercise',
      ]
    },
    { 
      id: 'tutor', 
      label: 'Learning Companion',
      subtitle: 'Let\'s learn together, stress-free',
      prompts: [
        'Help me understand this concept',
        'I\'m anxious about studying',
        'Explain this in simple terms',
        'I need help with homework',
      ]
    },
    { 
      id: 'code', 
      label: 'Coding Support',
      subtitle: 'Patient help with your code',
      prompts: [
        'I\'m stuck on this bug',
        'Coding is frustrating today',
        'Help me understand this error',
        'I feel like I\'m not good enough',
      ]
    },
    { 
      id: 'translator', 
      label: 'Language Bridge',
      subtitle: 'Connect across languages with care',
      prompts: [
        'Help me translate this message',
        'How do I say this in [language]?',
        'Explain this cultural context',
        'Help me communicate my feelings',
      ]
    },
    { 
      id: 'advisor', 
      label: 'Life Companion',
      subtitle: 'Let\'s think through this together',
      prompts: [
        'I need to make a difficult decision',
        'Help me see this from different angles',
        'I\'m not sure what to do',
        'How do I handle this situation?',
      ]
    },
  ]

  useEffect(() => {
    if (chatId) {
      loadChat(chatId)
    } else {
      setCurrentChat(null)
    }
  }, [chatId])

  useEffect(() => {
    scrollToBottom()
  }, [currentChat?.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadChat = async (id) => {
    try {
      const response = await chatAPI.getChat(id)
      setCurrentChat(response.chat)
      setMode(response.chat.mode)
      setModel(response.chat.model || 'gpt-3.5-turbo')
    } catch (error) {
      console.error('Error loading chat:', error)
    }
  }

  const handleSendMessage = async (e) => {
    e?.preventDefault()
    if (!message.trim() || loading) return

    const userMessage = message.trim()
    setMessage('')
    setLoading(true)

    // Optimistically add user message
    const tempUserMsg = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    }

    setCurrentChat((prev) => ({
      ...prev,
      messages: [...(prev?.messages || []), tempUserMsg],
    }))

    try {
      const response = await chatAPI.sendMessage({
        chatId: currentChat?.id,
        message: userMessage,
        mode,
        model,
      })

      setCurrentChat(response.chat)

      // Update chat history if it's a new chat
      if (!currentChat?.id && response.chat.id) {
        navigate(`/chat/${response.chat.id}`, { replace: true })
        const chatsData = await chatAPI.getChatHistory()
        setChats(chatsData.chats || [])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Remove optimistic message on error
      setCurrentChat((prev) => ({
        ...prev,
        messages: prev.messages.slice(0, -1),
      }))
      alert('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getModeInfo = () => {
    const modeInfo = modes.find((m) => m.id === mode)
    return modeInfo || { label: 'AI Assistant', subtitle: 'I\'m here with you' }
  }

  return (
    <div className="h-screen flex flex-col animated-bg">
      <Navbar />
      
      <div className="flex-1 flex overflow-hidden relative">
        <ChatSidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          currentChatId={chatId ? parseInt(chatId) : null}
        />
        
        <div className="flex-1 flex flex-col">
          {/* Chat Header - Stunning redesign */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-strong border-b border-white/10 px-6 py-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 29, 46, 0.9) 0%, rgba(15, 15, 26, 0.9) 100%)',
            }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 animate-gradient-x" />
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                {/* Animated icon */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center relative animate-pulse-glow"
                  style={{
                    boxShadow: '0 8px 24px 0 rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
                  }}
                >
                  <Heart className="w-6 h-6 text-white" fill="currentColor" />
                </motion.div>
                
                <div>
                  <motion.h2 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg font-bold gradient-text"
                  >
                    {getModeInfo().label}
                  </motion.h2>
                  <motion.p 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-gray-400"
                  >
                    {getModeInfo().subtitle}
                  </motion.p>
                </div>
              </div>

              {/* Mode Selector - Styled */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20 blur-lg transition-opacity" />
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus-ring cursor-pointer hover:bg-white/10 hover:border-purple-400/50 transition-all appearance-none pr-10 relative z-10 font-medium"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '1.5em 1.5em',
                    }}
                  >
                    {modes.map((m) => (
                      <option key={m.id} value={m.id} className="bg-gray-900">
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {!currentChat || currentChat.messages?.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex items-center justify-center px-6 relative"
              >
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-purple-500/20"
                      animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 100 - 50, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: '80%',
                      }}
                    />
                  ))}
                </div>
                
                <div className="text-center max-w-3xl relative z-10">
                  {/* Animated main icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="relative mx-auto mb-8 w-28 h-28"
                  >
                    {/* Outer glow rings */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.2, 0.5],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 blur-2xl"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.1, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 blur-xl"
                    />
                    
                    {/* Main icon */}
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-full h-full rounded-3xl bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 flex items-center justify-center"
                      style={{
                        boxShadow: '0 12px 40px 0 rgba(139, 92, 246, 0.5), 0 0 0 1px rgba(255,255,255,0.15) inset',
                      }}
                    >
                      <Heart className="w-14 h-14 text-white drop-shadow-lg" fill="currentColor" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Title with animated gradient */}
                  <motion.h3 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold mb-4"
                  >
                    <span className="gradient-text">{getModeInfo().label}</span>
                  </motion.h3>
                  
                  {/* Subtitle */}
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-300 text-lg mb-3"
                  >
                    {getModeInfo().subtitle}
                  </motion.p>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-gray-500 mb-10 flex items-center justify-center gap-2"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                    Choose a prompt below or type your own message
                  </motion.p>

                  {/* Quick Prompts - Stunning cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getModeInfo().prompts?.map((prompt, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMessage(prompt)}
                        className="group relative px-5 py-4 rounded-xl text-sm text-gray-300 hover:text-white border border-white/10 hover:border-purple-400/50 transition-all text-left overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                          boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        {/* Hover glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                        
                        {/* Content */}
                        <span className="relative z-10 font-medium">{prompt}</span>
                        
                        {/* Arrow icon on hover */}
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400"
                        >
                          →
                        </motion.span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6 max-w-4xl mx-auto">
                {currentChat.messages.map((msg, index) => (
                  <MessageBubble key={index} message={msg} />
                ))}
                
                {/* Loading indicator */}
                {loading && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center warm-glow">
                      <Heart className="w-5 h-5 text-white" fill="currentColor" />
                    </div>
                    <div className="glass rounded-2xl px-5 py-3">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area - Stunning redesign */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-strong border-t border-white/10 px-6 py-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 29, 46, 0.95) 0%, rgba(15, 15, 26, 0.95) 100%)',
            }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent" />
            
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative z-10">
              <div className="flex gap-3 items-end">
                {/* Message input with glow effect */}
                <div className="flex-1 relative group">
                  {/* Glow on focus */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-500" />
                  
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Share what's on your mind... (Enter to send, Shift+Enter for new line)"
                    disabled={loading}
                    rows={1}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus-ring text-white placeholder-gray-500 resize-none transition-all disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
                    style={{
                      minHeight: '56px',
                      maxHeight: '150px',
                      boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
                    }}
                    onInput={(e) => {
                      e.target.style.height = 'auto'
                      e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px'
                    }}
                  />
                </div>

                {/* Send button with amazing effects */}
                <motion.button
                  whileHover={{ scale: loading || !message.trim() ? 1 : 1.1, rotate: loading || !message.trim() ? 0 : 5 }}
                  whileTap={{ scale: loading || !message.trim() ? 1 : 0.9 }}
                  type="submit"
                  disabled={!message.trim() || loading}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 relative overflow-hidden group ripple"
                  style={{
                    boxShadow: message.trim() && !loading
                      ? '0 8px 24px 0 rgba(139, 92, 246, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset'
                      : '0 4px 12px 0 rgba(139, 92, 246, 0.2)',
                  }}
                >
                  {/* Shine effect */}
                  {!loading && message.trim() && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  )}
                  
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Send className="w-6 h-6" />
                  )}
                </motion.button>
              </div>

              {/* Footer message with subtle animation */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 text-xs text-gray-500 text-center flex items-center justify-center gap-2"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500/50 animate-pulse" />
                AI Shadow is a companion, not a therapist. In crisis, call 
                <span className="text-purple-400 font-semibold">988</span> 
                (US) or your local emergency services.
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Chat

