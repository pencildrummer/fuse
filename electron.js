const { app, BrowserWindow, session } = require('electron')

const createWindow = _ => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  win.webContents.openDevTools()

  win.loadURL('http://localhost:3000/workspace')
}

app.whenReady().then(_ => {
  console.log('Starting server')
  return import('./src/server/index.js')
}).then(_ => {

  console.log('Configuring electron app window')
  
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'none\'']
      }
    })
  })

  createWindow()

  app.on('activate', _ => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', _ => {
  if (process.platform !== 'darwin') app.quit()
})