const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
        nodeIntegration: true,
        nativeWindowOpen: true,
        },
    });
    mainWindow.loadURL(
        isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`,
    );
    // Open the DevTools.
    //mainWindow.webContents.openDevTools()
    mainWindow.on('closed', () => (mainWindow = null));

    if (!isDev) {
        autoUpdater.checkForUpdatesAndNotify();
    }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

autoUpdater.on('update-available', (_event, releaseNotes, releaseName) => {
    const dialogOpts = {
        type: 'info',
        buttons: ['ok'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version is being downloaded.',
    };

    dialog.showMessageBox(dialogOpts, (response) => {

    });
});

autoUpdater.on('update-downloaded', (_event, releaseNotes, releaseName) => {
    const dialogOpts = {
        type: 'info',
        buttons: ['restart', 'later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.',
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
});


const schema = {
    theme: {
        type: 'string',
        default: 'dark',
    },
    user_name: {
        type: 'string',
        default: '',
    },
    user_api_key: {
        type: 'string',
        default: '',
    },
    fav_artists: {
        type: 'array',
        default: [],
    },
    fav_tags: {
        type: 'array',
        default: [],
    },
    fav_pools: {
        type: 'array',
        default: [],
    },
};

const store = new Store({schema});