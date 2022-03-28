const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store({
  defaults: {
    client_url: 'http://localhost:3000'
  }
})

const isMac = process.platform === 'darwin'

// Hide the app from the doc
app.dock.hide()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createClientWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    minWidth: 600,
    height: 600,
    minHeight: 400,
    icon: path.resolve(__dirname, 'assets', 'app-icons', 'AppIcon.png'),
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 14, y: 14 },
    backgroundColor: '#18181b'
  });

  // Get host client url
  let clientURL = store.get('client_url')

  // and load the index.html of the app.
  mainWindow.loadURL(clientURL)

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  app.dock.show()
};

const createSettingsWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden'
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'settings.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray
app.whenReady().then(_ => {
  let imagePath = path.resolve(__dirname, 'assets', isMac ? 'trayTemplate.png' : 'tray.png')
  const icon = nativeImage.createFromPath(imagePath)
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Fuse v.', enabled: false },
    {
      label: 'Server online',
      enabled: true,
      icon: path.resolve(__dirname, 'assets', 'status-online.png')
    },
    { type: 'separator' },
    { label: 'Open Fuse', type: 'normal', click: createClientWindow },
    { type: 'separator' },
    { label: 'Settings...', type: 'normal', click: createSettingsWindow },
    { type: 'separator' },
    { label: 'Quit', type: 'normal', role: 'quit' }
  ])

  tray.setToolTip('Fuse Server')
  tray.setContextMenu(contextMenu)

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
  app.dock.hide()
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createClientWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
