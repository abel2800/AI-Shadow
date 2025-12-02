import React from 'react'
import { motion } from 'framer-motion'
import { User, Bot, Copy, Check } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const MessageBubble = ({ message }) => {
  const [copied, setCopied] = React.useState(false)
  const isUser = message.role === 'user'

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gradient-purple'
            : 'bg-gradient-blue neon-glow'
        }`}
      >
        {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
      </div>

      {/* Message Content */}
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-5 py-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-purple text-white'
              : 'glass text-white'
          } relative group-hover:shadow-lg transition-shadow`}
        >
          {/* Copy button for AI messages */}
          {!isUser && (
            <button
              onClick={() => handleCopy(message.content)}
              className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 glass rounded-lg hover:bg-white/10"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          )}

          <div className={`text-sm markdown-content ${isUser ? 'whitespace-pre-wrap' : ''}`}>
            {isUser ? (
              message.content
            ) : (
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <div className="relative my-4">
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            onClick={() => handleCopy(String(children).replace(/\n$/, ''))}
                            className="p-2 bg-black/30 rounded-lg hover:bg-black/50 transition-colors"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: '12px',
                            padding: '20px',
                            fontSize: '14px',
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className="bg-black/30 px-2 py-1 rounded text-cyan-400" {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        </div>
        
        {/* Timestamp */}
        <div className={`text-xs mt-2 px-2 ${isUser ? 'text-purple-300' : 'text-gray-500'}`}>
          {new Date(message.timestamp || Date.now()).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default MessageBubble

