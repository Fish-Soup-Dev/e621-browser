const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
const E621 = require('e621');
const open = require('open');
const checkInternetConnected = require('check-internet-connected');

let mainWindow;
let devtools;

function createWindow() {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, './e621.ico'),
        width: 1330,
        height: 760,
        minWidth: 840,
        minHeight: 640,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    if (isDev) {
        devtools = new BrowserWindow();
        mainWindow.webContents.setDevToolsWebContents(devtools.webContents);
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
    else {
        autoUpdater.checkForUpdatesAndNotify();
    }

    mainWindow.loadURL(
        isDev? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`,
    );

    mainWindow.on('closed', () => (mainWindow = null));
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

// todo not working
// function isOnline() {
//     checkInternetConnected().catch((ex) => {
//         const dialogOpts = {
//             type: 'Warning',
//             buttons: ['ok', 'close', 'retry'],
//             title: 'Warning no nextwork found',
//             message: 'The program could not connect to the internet'
//         };

//         console.log("error");
    
//         dialog.showMessageBox(dialogOpts, (response) => {});
//     })
// }

setInterval(() => {
    if (!isDev) {
        autoUpdater.checkForUpdatesAndNotify();
    }
}, 50000);

//? Update checker
//-----------------------------------------------------------------------------------
let update_available = false;

autoUpdater.on('update-available', (_event) => {
    update_available = true;
});

ipcMain.on('get-is-update-available', (event) => {
    event.returnValue = update_available;
})

ipcMain.on('restart-and-update', (_event) => {
    const dialogOpts = {
        type: 'info',
        buttons: ['later', 'update now'],
        title: 'Application Update',
        message: 'Update E621 Browser?',
        detail: 'A new version is available. Updating will restart the program.',
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 1) {
            if (process.platform === 'win32') {
                autoUpdater.quitAndInstall();
            }
            else if (process.platform === 'linux') {
                (async () => {
                    await open("https://github.com/Fish-Soup-Dev/e621-browser/releases/latest", {wait: true});
                })();
            }
        }
    });
})
//-----------------------------------------------------------------------------------

const schema = {
    theme: {
        type: 'string',
        default: 'dark',
    },
    logged_in: {
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
    download_path: {
        type: 'string',
        default: '',
    },
    fav_posts: {
        type: 'array',
        default: [],
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

//? Loggin
//-----------------------------------------------------------------------------------
const e621 = new E621({authUser: store.get('user_name'), authKey: store.get('user_api_key')});
//const e621 = new E621();
//-----------------------------------------------------------------------------------

let global_blacklist = [
    "gore",
    "scat",
    "watersports",
    "young -rating:s",
    "loli",
    "shota"
];

//? E621 Page Search
//-----------------------------------------------------------------------------------
let search_text = "";
let search_page = 1;

ipcMain.on('get-page-number', (event) => {
    event.returnValue = search_page;
})

ipcMain.on('get-search-text', (event) => {
    event.returnValue = search_text;
})

ipcMain.on('get-posts-from-search', (event, search_string, keep_last_search, page_number, keep_last_page) => {
    if (!keep_last_search) {
        search_text = search_string;
    }

    if (!keep_last_page) {
        search_page = page_number;
    }

    const searchOptions = {
        tags: search_text + " -" + global_blacklist.join(' -'),
        page: search_page,
        limit: 75
    };

    e621.posts.search(searchOptions).then(data => {
        event.returnValue = data;
    })
})
//-----------------------------------------------------------------------------------

//? E621 post
//-----------------------------------------------------------------------------------
ipcMain.on('get-post', (event, post_id) => {
    e621.posts.get(post_id).then(data => {
        event.returnValue = data;
    }).catch(error => {
        console.log(error)
    })
})

ipcMain.on('like-post', (event, post_id, vote_bool) => {
    e621.posts.vote(post_id, vote_bool).then(data => {
        event.returnValue = data;
    }).catch(error => {
        console.log(error)
    })
})

ipcMain.on('fav-post', (event, post_id) => {
    e621.users.addFavorite(post_id).then(data => {
        event.returnValue = data;
    }).catch(error => {
        console.log(error)
    })
})

ipcMain.on('unfav-post', (event, post_id) => {
    e621.users.removeFavorite(post_id).then(data => {
        event.returnValue = data;
    }).catch(error => {
        console.log(error)
    })
})
//-----------------------------------------------------------------------------------

