const { BrowserWindow, app } = require('electron')
const path = require('path')
const express = require('express')
const serveApp = express()

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

  //let loadPath = path.join(app.getAppPath(), '..', 'out', 'workspace.html')
  let loadPath = path.join(app.getAppPath(), 'app', 'workspace.html')
  //window.loadFile(loadPath)
  //window.loadURL(`file://${loadPath}`)
  window.loadURL('http://localhost:5000/workspace.html')
}

serveApp.use(express.static(path.join(__dirname, 'app')))
serveApp.listen(5000)

app.whenReady().then(_ => {

  createWindow()

  console.log('Configuring electron app window')
  
  app.on('activate', _ => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', _ => {
  if (process.platform !== 'darwin') app.quit()
})