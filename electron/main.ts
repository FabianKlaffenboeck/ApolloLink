import {app, BrowserWindow} from 'electron'
import {fileURLToPath} from 'node:url'
import path from 'node:path'
import {autoDetect, WindowsCanDeviceKvaser} from "@fklab/candongle-kvaser";
import {CanMessage} from "@fklab/candongle-interface";

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
        },
    })

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

let kaderDongle: WindowsCanDeviceKvaser | null = null

function callback(id: number, data: number[], length: number) {
    if (kaderDongle != null) {

        const list: CanMessage[] = [{id: id + 1, dlc: 8, data: [1, 2, 3, 4, 5, 6, 7, 8]}]
        kaderDongle.write(list)
    }
}

app.whenReady().then(() => {
    createWindow()

    autoDetect().list().then(it => console.log(it))


    autoDetect().open({path: 0, baudRate: 5000000}).then(dongle => {

        kaderDongle = dongle
        const list: CanMessage[] = []

        for (let i = 0; i < 5; i++) {
            list.push({id: 0x10, dlc: 8, data: [1,2,3,4,5,6,7,8]})
        }

        // dongle.setMessageCallback(callback)

        dongle.write(list)
    })
})