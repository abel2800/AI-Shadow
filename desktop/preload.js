const { contextBridge, ipcRenderer } = require('electron')

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  
  // Storage
  storeGet: (key) => ipcRenderer.invoke('store-get', key),
  storeSet: (key, value) => ipcRenderer.invoke('store-set', key, value),
  storeDelete: (key) => ipcRenderer.invoke('store-delete', key),
  
  // Platform info
  platform: process.platform,
  isDesktop: true,
})

// Add custom styles for desktop app
window.addEventListener('DOMContentLoaded', () => {
  // Add a class to body to identify as desktop app
  document.body.classList.add('electron-app')
  
  // Add custom CSS for desktop
  const style = document.createElement('style')
  style.textContent = `
    .electron-app {
      user-select: none;
    }
    
    .electron-app input,
    .electron-app textarea {
      user-select: text;
    }
    
    /* Custom scrollbar for desktop */
    .electron-app ::-webkit-scrollbar {
      width: 10px;
    }
    
    .electron-app ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }
    
    .electron-app ::-webkit-scrollbar-thumb {
      background: rgba(26, 141, 255, 0.5);
      border-radius: 5px;
    }
    
    .electron-app ::-webkit-scrollbar-thumb:hover {
      background: rgba(26, 141, 255, 0.7);
    }
  `
  document.head.appendChild(style)
  
  console.log('🖥️ AI Shadow Desktop App Loaded')
  console.log('💙 Your mental health companion is ready')
})

