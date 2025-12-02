import React from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageSquare, Globe, Heart, AlertTriangle } from 'lucide-react'

const CrisisResources = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const resources = [
    {
      icon: Phone,
      name: 'National Suicide Prevention Lifeline',
      country: 'United States',
      contact: 'Call 988',
      available: '24/7',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: MessageSquare,
      name: 'Crisis Text Line',
      country: 'United States',
      contact: 'Text HOME to 741741',
      available: '24/7',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Phone,
      name: 'SAMHSA National Helpline',
      country: 'United States',
      contact: '1-800-662-4357',
      available: '24/7',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Globe,
      name: 'International Association for Suicide Prevention',
      country: 'International',
      contact: 'Visit iasp.info/resources/Crisis_Centres',
      available: 'Varies by country',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: Phone,
      name: 'Emergency Services',
      country: 'Your Location',
      contact: 'Call 911 (US) or local emergency number',
      available: '24/7',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">
              Crisis Resources & Support
            </h2>
            <p className="text-gray-400">
              If you're in crisis or need immediate help, please reach out to these professional resources.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Important Notice */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-1">You Are Not Alone</h3>
              <p className="text-gray-300 text-sm">
                AI Shadow is a supportive companion, but we are NOT a replacement for professional mental health care.
                If you're experiencing a crisis, please contact one of these resources immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Resources List */}
        <div className="space-y-4 mb-6">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-4 hover:scale-102 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg ${resource.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <resource.icon className={`w-6 h-6 ${resource.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{resource.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{resource.country}</p>
                  <p className={`${resource.color} font-medium mb-1`}>{resource.contact}</p>
                  <p className="text-gray-500 text-sm">Available: {resource.available}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
          <h3 className="text-white font-semibold mb-2">Additional Mental Health Resources</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• <strong>Mental Health America:</strong> Visit mhanational.org</li>
            <li>• <strong>NAMI (National Alliance on Mental Illness):</strong> Call 1-800-950-6264 or visit nami.org</li>
            <li>• <strong>Therapy Directories:</strong> Psychology Today, BetterHelp, Talkspace</li>
            <li>• <strong>Substance Abuse:</strong> SAMHSA's National Helpline: 1-800-662-4357</li>
          </ul>
        </div>

        {/* Warning Signs */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2">When to Seek Immediate Help</h3>
          <p className="text-gray-300 text-sm mb-2">
            Please reach out to emergency services or a crisis line if you:
          </p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li>• Have thoughts of harming yourself or others</li>
            <li>• Are experiencing a mental health emergency</li>
            <li>• Feel unable to keep yourself safe</li>
            <li>• Need immediate support or intervention</li>
          </ul>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-blue rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-cyber-blue-500/50 transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CrisisResources

