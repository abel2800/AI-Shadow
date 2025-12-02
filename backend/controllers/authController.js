import bcrypt from 'bcryptjs'
import pool from '../config/database.js'
import { generateToken } from '../middleware/auth.js'

// Register new user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      })
    }

    // Check if user already exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    )

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const result = await pool.query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING id, name, email, created_at`,
      [name, email.toLowerCase(), hashedPassword]
    )

    const user = result.rows[0]

    // Create user stats entry
    await pool.query(
      'INSERT INTO user_stats (user_id) VALUES ($1)',
      [user.id]
    )

    // Generate token
    const token = generateToken(user.id, user.email)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
      },
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    })
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      })
    }

    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const user = result.rows[0]

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    // Update last active
    await pool.query(
      'UPDATE user_stats SET last_active = CURRENT_TIMESTAMP WHERE user_id = $1',
      [user.id]
    )

    // Generate token
    const token = generateToken(user.id, user.email)

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        preferences: user.preferences,
        createdAt: user.created_at,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message,
    })
  }
}

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId

    const result = await pool.query(
      `SELECT u.id, u.name, u.email, u.avatar_url, u.preferences, u.created_at,
              s.total_chats, s.total_messages, s.total_tokens, s.favorite_mode, s.last_active
       FROM users u
       LEFT JOIN user_stats s ON u.id = s.user_id
       WHERE u.id = $1`,
      [userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    const user = result.rows[0]

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        preferences: user.preferences,
        createdAt: user.created_at,
        stats: {
          totalChats: user.total_chats,
          totalMessages: user.total_messages,
          totalTokens: user.total_tokens,
          favoriteMode: user.favorite_mode,
          lastActive: user.last_active,
        },
      },
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    })
  }
}

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId
    const { name, avatar_url, preferences } = req.body

    const updates = []
    const values = []
    let paramIndex = 1

    if (name) {
      updates.push(`name = $${paramIndex}`)
      values.push(name)
      paramIndex++
    }

    if (avatar_url !== undefined) {
      updates.push(`avatar_url = $${paramIndex}`)
      values.push(avatar_url)
      paramIndex++
    }

    if (preferences) {
      updates.push(`preferences = $${paramIndex}`)
      values.push(JSON.stringify(preferences))
      paramIndex++
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)

    if (updates.length === 1) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update',
      })
    }

    values.push(userId)

    const result = await pool.query(
      `UPDATE users SET ${updates.join(', ')} 
       WHERE id = $${paramIndex} 
       RETURNING id, name, email, avatar_url, preferences, updated_at`,
      values
    )

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: result.rows[0],
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    })
  }
}

