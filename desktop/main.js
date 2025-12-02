const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron')
const path = require('path')
const Store = require('electron-store')

// Initialize electron-store for persistent data
const store = new Store()

let mainWindow = null
let tray = null

// Development mode check
const isDev = process.argv.includes('--dev')
const BACKEND_URL = isDev ? 'http://localhost:5000' : 'http://localhost:5000'
const FRONTEND_URL = isDev ? 'http://localhost:5173' : 'http://localhost:5173'

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    // icon: path.join(__dirname, 'assets', 'icon.png'), // Commented out until icon is added
    backgroundColor: '#1a1d2e', // Updated to match new calming theme
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
    },
    autoHideMenuBar: false,
    frame: true,
    show: false, // Don't show until ready
    title: 'AI Shadow - Your Companion'
  })

  // Load the web app
  mainWindow.loadURL(FRONTEND_URL)
  
  // Open DevTools in development mode
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
  
  // Handle loading errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription)
    console.log('Make sure the frontend is running on', FRONTEND_URL)
  })

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    
    // Show welcome message on first run
    if (!store.get('hasRunBefore')) {
      store.set('hasRunBefore', true)
      mainWindow.webContents.executeJavaScript(`
        console.log('Welcome to AI Shadow - Your Mental Health Companion')
      `)
    }
  })

  // Handle window close
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault()
      mainWindow.hide()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Create application menu
  createMenu()
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Chat',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              window.location.href = '/chat'
            `)
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.isQuitting = true
            app.quit()
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Dashboard',
          accelerator: 'CmdOrCtrl+D',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              window.location.href = '/dashboard'
            `)
          }
        },
        {
          label: 'Profile',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              window.location.href = '/profile'
            `)
          }
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Crisis Resources',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              alert(
                'Crisis Resources:\\n\\n' +
                '🆘 National Suicide Prevention Lifeline\\n' +
                '📞 Call: 988 (US)\\n\\n' +
                '💬 Crisis Text Line\\n' +
                '📱 Text HOME to 741741\\n\\n' +
                '🌍 International Resources\\n' +
                '🔗 https://www.iasp.info/resources/Crisis_Centres/\\n\\n' +
                'Remember: AI Shadow is NOT a replacement for professional help.\\n' +
                'If you\\'re in crisis, please reach out to these resources immediately.'
              )
            `)
          }
        },
        {
          label: 'About AI Shadow',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              alert(
                'AI Shadow v1.0\\n\\n' +
                'Your Digital Companion for Mental Well-Being\\n\\n' +
                '💙 We provide emotional support and a safe listening space\\n' +
                '⚠️ We are NOT therapists or medical professionals\\n' +
                '🤝 We encourage seeking professional help when needed\\n\\n' +
                'Made with care for mental health awareness'
              )
            `)
          }
        },
        { type: 'separator' },
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://github.com/yourusername/ai-shadow')
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

function createTray() {
  // Create system tray icon (skip if no icon file exists)
  try {
    const iconPath = path.join(__dirname, 'assets', 'icon.png')
    const fs = require('fs')
    
    if (fs.existsSync(iconPath)) {
      tray = new Tray(iconPath)
      
      const contextMenu = Menu.buildFromTemplate([
        {
          label: 'Show AI Shadow',
          click: () => {
            mainWindow.show()
          }
        },
        {
          label: 'New Chat',
          click: () => {
            mainWindow.show()
            mainWindow.webContents.executeJavaScript(`
              window.location.href = '/chat'
            `)
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          click: () => {
            app.isQuitting = true
            app.quit()
          }
        }
      ])
      
      tray.setToolTip('AI Shadow - Your Companion')
      tray.setContextMenu(contextMenu)
      
      tray.on('click', () => {
        mainWindow.show()
      })
      
      console.log('✅ System tray icon created')
    } else {
      console.log('ℹ️  No tray icon found (this is optional)')
    }
  } catch (error) {
    console.log('ℹ️  System tray not available:', error.message)
  }
}

// App event handlers
app.whenReady().then(() => {
  createWindow()
  createTray()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    } else {
      mainWindow.show()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  app.isQuitting = true
})

// IPC handlers for communication between main and renderer
ipcMain.handle('get-app-version', () => {
  return app.getVersion()
})

ipcMain.handle('get-app-path', () => {
  return app.getAppPath()
})

ipcMain.handle('store-get', (event, key) => {
  return store.get(key)
})

ipcMain.handle('store-set', (event, key, value) => {
  store.set(key, value)
  return true
})

ipcMain.handle('store-delete', (event, key) => {
  store.delete(key)
  return true
})

// Handle deep linking (for future features like opening specific chats)
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('aishadow', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('aishadow')
}

console.log('🌟 AI Shadow Desktop App Starting...')
console.log(`📍 Backend URL: ${BACKEND_URL}`)
console.log(`📍 Frontend URL: ${FRONTEND_URL}`)
console.log(`🔧 Dev Mode: ${isDev}`)

