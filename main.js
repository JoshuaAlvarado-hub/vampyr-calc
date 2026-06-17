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
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('src/index.html')

  win.webContents.on('did-finish-load', () => {
    win.webContents.setZoomFactor(1.0)
    win.webContents.executeJavaScript(`
      const calc = document.getElementById('calc');
      const decor = document.getElementById('top-decor');
      const calcRect = calc.getBoundingClientRect();
      const decorRect = decor.getBoundingClientRect();
      const topEdge = Math.min(calcRect.top, decorRect.top);
      const bottom = calcRect.bottom;
      [calcRect.width, bottom - topEdge]
    `).then(([w, h]) => {
      win.setContentSize(Math.ceil(w), Math.ceil(h + 20))
    })
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