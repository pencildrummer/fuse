const { BrowserWindow, app } = require('electron')
const path = require('path')

const createWindow = _ => {
  const window = new BrowserWindow({
    minWidth: 360,
    minHeight: 300,
    width: 1000,
    height: 700,
    backgroundColor: '#27272a',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: {
      x: 14,
      y: 14
    }
  })
  window.webContents.openDevTools()

  window.loadURL('http://localhost:3000/')
}

app.whenReady().then(_ => {

  // Start NextJS localhost
  import('./server.mjs')

  createWindow()

  console.log('Configuring electron app window')
  
  app.on('activate', _ => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', _ => {
  if (process.platform !== 'darwin') app.quit()
})