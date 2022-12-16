const path = require('path');
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, './e621.ico'),
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });
    mainWindow.loadURL(
        isDev? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`,
    );
    
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
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

setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify();
}, 60000);

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
    loged_in: {
        type: 'boolean',
        default: false,
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

ipcMain.on('get-data', (event, arg) => {
    event.returnValue = store.get(arg);
});

ipcMain.on('set-data', (event, arg, arg1) => {
    store.set(arg, arg1);
    event.returnValue = true;
});