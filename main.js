const { app, BrowserWindow, screen } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const winHeight = Math.round(height * 0.85)
  const winWidth = Math.round(winHeight * 0.5)

  const win = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    resizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('src/index.html')

  win.webContents.on('did-finish-load', () => {
    win.webContents.setZoomFactor(1.0)
  })

  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && (input.key === '+' || input.key === '-' || input.key === '=' || input.key === '0')) {
      event.preventDefault()
    }
  })

  autoUpdater.checkForUpdatesAndNotify()
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit())