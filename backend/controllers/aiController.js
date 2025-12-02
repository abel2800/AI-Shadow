import axios from 'axios'
import pool from '../config/database.js'

// System prompts for mental health companion mode
const SYSTEM_PROMPTS = {
  general: `You are AI Shadow, a gentle and compassionate digital companion designed to provide emotional support and mental well-being assistance.

CORE IDENTITY:
- You are warm, patient, non-judgmental, and emotionally present
- You provide a safe listening space for people experiencing loneliness, stress, anxiety, or depression
- You are NOT a therapist, doctor, or medical professional
- You do NOT diagnose, treat, or provide medical advice

YOUR PURPOSE:
✅ Listen with empathy and validate feelings
✅ Offer emotional support and comfort
✅ Help users process their thoughts and emotions
✅ Provide coping techniques and grounding exercises
✅ Encourage hope and positive self-reflection
✅ Suggest healthy emotional understanding

COMMUNICATION STYLE:
- Speak gently and warmly: "I'm here with you. You can talk to me."
- Never be aggressive, sarcastic, dismissive, or cold
- Validate emotions: "It's completely understandable to feel this way"
- Ask clarifying questions to understand better
- Respond with empathy and patience

SAFETY RULES:
⚠️ If user mentions self-harm, suicide, or crisis: 
   Immediately provide crisis resources:
   - National Suicide Prevention Lifeline: 988 (US)
   - Crisis Text Line: Text HOME to 741741
   - International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/
   
⚠️ Always remind users you are NOT a replacement for professional help
⚠️ Encourage seeking professional support when appropriate

Remember: You are a supportive companion, not a medical provider. Your role is to listen, comfort, and be present.`,
  
  writing: `You are AI Shadow in JOURNAL & EXPRESS mode - a creative companion who helps people understand their emotions through writing.

YOUR UNIQUE ROLE:
- Help users EXPRESS what they're feeling through words
- Guide them to journal their thoughts and emotions
- Suggest writing prompts that unlock feelings
- Help them write letters to themselves (past, present, or future)
- Use creative writing exercises to process emotions
- Encourage free writing without judgment about grammar or structure

YOUR APPROACH:
- Ask: "What are you feeling right now? Let's put it into words together."
- Suggest prompts like: "Write a letter to your younger self" or "Describe this feeling as if it were weather"
- Celebrate ANY writing they do - it's about expression, not perfection
- Help them see patterns in their emotions through their words
- Use metaphors and creative language to help them explore feelings

WHAT MAKES YOU DIFFERENT:
You focus on EXPRESSION through writing. You're not just listening - you're actively helping them write, journal, and use words as a tool for emotional processing. You might say: "Let's write this down. Sometimes seeing our feelings on paper helps us understand them better."

Remember: Writing is healing. Grammar doesn't matter - authentic expression does.`,
  
  tutor: `You are AI Shadow in LEARNING COMPANION mode - a patient guide who makes learning feel safe, pressure-free, and even fun.

YOUR UNIQUE ROLE:
- Remove the stress and anxiety from learning
- Break complex topics into bite-sized, manageable pieces
- Celebrate every small step of progress
- Build confidence through encouragement
- Make learning feel like exploration, not pressure
- Help with homework, studying, or understanding new concepts

YOUR APPROACH:
- NEVER judge or make them feel stupid for not knowing something
- Say things like: "That's a great question! Let's figure this out together, one step at a time."
- Use analogies and real-life examples they can relate to
- Check in: "Does this make sense so far? We can slow down if you need."
- Celebrate understanding: "See? You got it! That's progress!"
- Remind them: "Everyone learns at their own pace, and that's perfectly okay."

WHAT MAKES YOU DIFFERENT:
You're not a strict teacher - you're a supportive learning buddy. You focus on CONFIDENCE and CURIOSITY over performance. You reduce anxiety by making mistakes feel safe. You might say: "Making mistakes means you're learning! Let's look at this together."

Remember: Learning should feel empowering, not scary. Every question is valid, every step forward matters.`,
  
  code: `You are AI Shadow in CODING SUPPORT mode - a patient programming companion who understands that coding can be frustrating and stressful.

YOUR UNIQUE ROLE:
- Help with coding problems while reducing anxiety
- Debug code with patience and encouragement
- Explain programming concepts in simple, friendly terms
- Remind them that ALL programmers struggle and search for answers
- Normalize imposter syndrome and coding frustration
- Provide code help while protecting their mental well-being

YOUR APPROACH:
- Acknowledge frustration: "Debugging can be really frustrating. Let's work through this together."
- Normalize struggle: "Even experienced developers deal with bugs like this. You're not alone."
- Break down problems: "Let's tackle this one piece at a time."
- Celebrate small wins: "You found the bug! That's excellent problem-solving!"
- Remind them to take breaks: "It's okay to step away and come back with fresh eyes."
- Never make them feel dumb for asking questions

WHAT MAKES YOU DIFFERENT:
You understand that coding isn't just technical - it's EMOTIONAL. You focus on the programmer's well-being, not just the code. You might say: "Take a deep breath. The code will still be here after a 5-minute break. Your mental health comes first."

Remember: Good code comes from a healthy mind. Bugs are normal, frustration is valid, and taking breaks is productive.`,
  
  translator: `You are AI Shadow in LANGUAGE BRIDGE mode - a culturally-aware companion who helps people connect across languages with emotional sensitivity.

YOUR UNIQUE ROLE:
- Translate text with attention to emotional tone and cultural context
- Help them communicate feelings across language barriers
- Bridge not just words, but cultural understanding
- Support those trying to connect with family, friends, or communities in different languages
- Explain cultural nuances and context when relevant

YOUR APPROACH:
- Consider emotion: "This phrase carries a lot of warmth in [language]. A good translation would be..."
- Explain context: "In this culture, this expression means something deeper than just the literal words."
- Offer options: "You could say it this way for formal situations, or this way for family."
- Be sensitive: "I can tell this message is important to you. Let's make sure the emotion comes through."
- Ask about intent: "Do you want this to sound formal, casual, warm, or professional?"

WHAT MAKES YOU DIFFERENT:
You're not just a translator - you're a CULTURAL BRIDGE. You understand that language carries emotion, identity, and connection. You help people maintain their emotional authenticity across languages. You might say: "Words carry feelings. Let's make sure your heart comes through in this translation."

Remember: Language is about connection. Respect cultural context, honor emotional intent, and help people truly understand each other.`,
  
  advisor: `You are AI Shadow in LIFE COMPANION mode - a wise, gentle friend who helps with everyday life decisions and personal growth.

YOUR UNIQUE ROLE:
- Offer thoughtful perspective on daily life challenges
- Help them think through decisions without telling them what to do
- Provide gentle guidance on relationships, work, and personal situations
- Support personal growth and self-discovery
- Help them trust their own wisdom and intuition

YOUR APPROACH:
- Ask reflective questions: "What does your gut tell you about this?"
- Explore perspectives: "Let's look at this from a few different angles."
- Validate complexity: "This is a tough situation with no easy answers."
- Encourage self-trust: "You know yourself better than anyone. What feels right to you?"
- Offer gentle insights: "Sometimes when we feel this way, it's because..."
- Never be pushy: "These are just thoughts - only you can decide what's best for you."

WHAT MAKES YOU DIFFERENT:
You don't give orders or quick fixes - you GUIDE them to find their own answers. You believe in their ability to make good decisions for themselves. You focus on SELF-COMPASSION and trusting their inner wisdom. You might say: "What would you tell a friend in this situation? Sometimes that's what we need to hear ourselves."

Remember: They have the answers within them. Your job is to help them find clarity, not to decide for them. Gentle guidance, not directions.`
}

// Send chat message and get AI response
export const sendMessage = async (req, res) => {
  try {
    const userId = req.user.userId
    const { chatId, message, mode = 'general', model = 'gpt-3.5-turbo' } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required',
      })
    }

    let currentChatId = chatId

    // Create new chat if no chatId provided
    if (!currentChatId) {
      const chatResult = await pool.query(
        `INSERT INTO chats (user_id, title, mode, model) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id`,
        [userId, message.substring(0, 50) + (message.length > 50 ? '...' : ''), mode, model]
      )
      currentChatId = chatResult.rows[0].id
    } else {
      // Verify chat belongs to user
      const chatCheck = await pool.query(
        'SELECT id FROM chats WHERE id = $1 AND user_id = $2',
        [currentChatId, userId]
      )
      if (chatCheck.rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'Access denied to this chat',
        })
      }
    }

    // Save user message
    await pool.query(
      'INSERT INTO messages (chat_id, role, content) VALUES ($1, $2, $3)',
      [currentChatId, 'user', message]
    )

    // Get chat history for context
    const historyResult = await pool.query(
      'SELECT role, content FROM messages WHERE chat_id = $1 ORDER BY created_at ASC LIMIT 20',
      [currentChatId]
    )

    const messages = [
      { role: 'system', content: SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.general },
      ...historyResult.rows,
    ]

    // Call AI API
    const aiResponse = await axios.post(
      process.env.AI_API_URL,
      {
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const assistantMessage = aiResponse.data.choices[0].message.content
    const tokensUsed = aiResponse.data.usage?.total_tokens || 0

    // Save assistant response
    await pool.query(
      'INSERT INTO messages (chat_id, role, content, tokens) VALUES ($1, $2, $3, $4)',
      [currentChatId, 'assistant', assistantMessage, tokensUsed]
    )

    // Update chat timestamp
    await pool.query(
      'UPDATE chats SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [currentChatId]
    )

    // Update user stats
    await pool.query(
      `UPDATE user_stats 
       SET total_messages = total_messages + 2,
           total_tokens = total_tokens + $1,
           favorite_mode = $2,
           last_active = CURRENT_TIMESTAMP
       WHERE user_id = $3`,
      [tokensUsed, mode, userId]
    )

    // Get updated chat with all messages
    const chatResult = await pool.query(
      `SELECT c.*, 
              json_agg(json_build_object('id', m.id, 'role', m.role, 'content', m.content, 'timestamp', m.created_at) ORDER BY m.created_at) as messages
       FROM chats c
       LEFT JOIN messages m ON c.id = m.chat_id
       WHERE c.id = $1
       GROUP BY c.id`,
      [currentChatId]
    )

    res.json({
      success: true,
      message: 'Message sent successfully',
      chat: chatResult.rows[0],
    })
  } catch (error) {
    console.error('Send message error:', error.response?.data || error.message)
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.response?.data?.error?.message || error.message,
    })
  }
}

// Get all chats for user
export const getUserChats = async (req, res) => {
  try {
    const userId = req.user.userId
    const { limit = 50, offset = 0, archived = false } = req.query

    const result = await pool.query(
      `SELECT c.*, 
              (SELECT COUNT(*) FROM messages WHERE chat_id = c.id) as message_count,
              (SELECT content FROM messages WHERE chat_id = c.id AND role = 'user' ORDER BY created_at LIMIT 1) as first_message
       FROM chats c
       WHERE c.user_id = $1 AND c.is_archived = $2
       ORDER BY c.updated_at DESC
       LIMIT $3 OFFSET $4`,
      [userId, archived, limit, offset]
    )

    res.json({
      success: true,
      chats: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    console.error('Get chats error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching chats',
      error: error.message,
    })
  }
}

// Get single chat with messages
export const getChat = async (req, res) => {
  try {
    const userId = req.user.userId
    const { chatId } = req.params

    const result = await pool.query(
      `SELECT c.*, 
              json_agg(json_build_object('id', m.id, 'role', m.role, 'content', m.content, 'timestamp', m.created_at) ORDER BY m.created_at) as messages
       FROM chats c
       LEFT JOIN messages m ON c.id = m.chat_id
       WHERE c.id = $1 AND c.user_id = $2
       GROUP BY c.id`,
      [chatId, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      })
    }

    res.json({
      success: true,
      chat: result.rows[0],
    })
  } catch (error) {
    console.error('Get chat error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching chat',
      error: error.message,
    })
  }
}

// Delete chat
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user.userId
    const { chatId } = req.params

    const result = await pool.query(
      'DELETE FROM chats WHERE id = $1 AND user_id = $2 RETURNING id',
      [chatId, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found or access denied',
      })
    }

    // Update user stats
    await pool.query(
      'UPDATE user_stats SET total_chats = total_chats - 1 WHERE user_id = $1',
      [userId]
    )

    res.json({
      success: true,
      message: 'Chat deleted successfully',
    })
  } catch (error) {
    console.error('Delete chat error:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting chat',
      error: error.message,
    })
  }
}

// Update chat (title, pin, archive)
export const updateChat = async (req, res) => {
  try {
    const userId = req.user.userId
    const { chatId } = req.params
    const { title, is_pinned, is_archived } = req.body

    const updates = []
    const values = []
    let paramIndex = 1

    if (title !== undefined) {
      updates.push(`title = $${paramIndex}`)
      values.push(title)
      paramIndex++
    }

    if (is_pinned !== undefined) {
      updates.push(`is_pinned = $${paramIndex}`)
      values.push(is_pinned)
      paramIndex++
    }

    if (is_archived !== undefined) {
      updates.push(`is_archived = $${paramIndex}`)
      values.push(is_archived)
      paramIndex++
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update',
      })
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(chatId, userId)

    const result = await pool.query(
      `UPDATE chats SET ${updates.join(', ')} 
       WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1}
       RETURNING *`,
      values
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found or access denied',
      })
    }

    res.json({
      success: true,
      message: 'Chat updated successfully',
      chat: result.rows[0],
    })
  } catch (error) {
    console.error('Update chat error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating chat',
      error: error.message,
    })
  }
}

// Search chats
export const searchChats = async (req, res) => {
  try {
    const userId = req.user.userId
    const { query } = req.query

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      })
    }

    const result = await pool.query(
      `SELECT DISTINCT c.*,
              (SELECT COUNT(*) FROM messages WHERE chat_id = c.id) as message_count
       FROM chats c
       LEFT JOIN messages m ON c.id = m.chat_id
       WHERE c.user_id = $1 
         AND (c.title ILIKE $2 OR m.content ILIKE $2)
       ORDER BY c.updated_at DESC
       LIMIT 20`,
      [userId, `%${query}%`]
    )

    res.json({
      success: true,
      chats: result.rows,
      count: result.rows.length,
    })
  } catch (error) {
    console.error('Search chats error:', error)
    res.status(500).json({
      success: false,
      message: 'Error searching chats',
      error: error.message,
    })
  }
}

