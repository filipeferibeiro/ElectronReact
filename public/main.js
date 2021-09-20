const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

require('@electron/remote/main').initialize();

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });
    
    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    require('@electron/remote/main').enable(win.webContents);
}

app.on('ready', createWindow);

// Encerra quando todas as janelas estao fechadas
app.on('window-all-closed', () => {
    // No macOS so se fecha quando o comando cmd + q e pressionado
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // No macOS quando o app ainda esta rodando na dock e se quer abrir uma janela
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
