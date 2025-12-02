import pool from '../config/database.js'

const setupDatabase = async () => {
  try {
    console.log('🔧 Setting up database schema...')

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(500),
        preferences JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Users table created')

    // Create chats table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chats (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(500) DEFAULT 'New Chat',
        mode VARCHAR(50) DEFAULT 'general',
        model VARCHAR(100) DEFAULT 'gpt-3.5-turbo',
        is_pinned BOOLEAN DEFAULT false,
        is_archived BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Chats table created')

    // Create messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
        role VARCHAR(50) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
        content TEXT NOT NULL,
        tokens INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Messages table created')

    // Create prompt templates table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS prompt_templates (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        prompt TEXT NOT NULL,
        category VARCHAR(100) DEFAULT 'general',
        is_public BOOLEAN DEFAULT false,
        usage_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Prompt templates table created')

    // Create user stats table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_stats (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        total_chats INTEGER DEFAULT 0,
        total_messages INTEGER DEFAULT 0,
        total_tokens INTEGER DEFAULT 0,
        favorite_mode VARCHAR(50),
        last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ User stats table created')

    // Create indexes for better performance
    await pool.query('CREATE INDEX IF NOT EXISTS idx_chats_user_id ON chats(user_id)')
    await pool.query('CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id)')
    await pool.query('CREATE INDEX IF NOT EXISTS idx_chats_created_at ON chats(created_at DESC)')
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)')
    console.log('✅ Indexes created')

    // Insert default prompt templates
    await pool.query(`
      INSERT INTO prompt_templates (title, description, prompt, category, is_public)
      VALUES 
        ('Code Explainer', 'Explain code in simple terms', 'Please explain the following code in simple, easy-to-understand terms:\n\n{code}', 'code', true),
        ('Essay Writer', 'Write a well-structured essay', 'Write a comprehensive essay on the topic: {topic}\n\nInclude an introduction, body paragraphs, and conclusion.', 'writing', true),
        ('Language Translator', 'Translate text between languages', 'Translate the following text from {source_language} to {target_language}:\n\n{text}', 'translator', true),
        ('Study Helper', 'Help understand complex topics', 'Explain the following concept in a way that''s easy for a student to understand:\n\n{concept}', 'tutor', true),
        ('Email Writer', 'Compose professional emails', 'Write a professional email with the following details:\nTo: {recipient}\nSubject: {subject}\nPurpose: {purpose}', 'writing', true),
        ('Debug Assistant', 'Help fix code errors', 'Help me debug this code. Here''s the error I''m getting:\n\nError: {error}\n\nCode:\n{code}', 'code', true)
      ON CONFLICT DO NOTHING
    `)
    console.log('✅ Default prompt templates inserted')

    console.log('🎉 Database setup completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error setting up database:', error)
    process.exit(1)
  }
}

setupDatabase()

