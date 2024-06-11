const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { insertDataCreateMissionInDB, selectDataCreateMissionInDB } = require('../repositories/database.js');
const { error } = require('node:console');



let mainWindow = null;

const createWindow = (routehtmlPage) => {
  if (!mainWindow) {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 800,
      minWidth: 800,
      minHeight: 800,
      webPreferences: { 
        preload: path.join(__dirname, 'preload.js')
      }
    });

    mainWindow.loadFile(routehtmlPage);

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  } else {
    mainWindow.loadFile(routehtmlPage);
  }
};


app.whenReady().then(() => {
  createWindow(path.join('src', 'views', 'pages', 'mainMenu.html'));

  ipcMain.handle('abrirJanelaCriarMissao', () => {
    createWindow(path.join('src', 'views', 'createMission', 'createMission.html'));
  });

  ipcMain.handle('openWindowExecuteMission', () => {
    createWindow(path.join('src', 'views', 'pages', 'executeMission', 'executeMission.html'));
  });

  ipcMain.handle('abrirJanelaSelecionarMissao', () => {
    createWindow(path.join('src', 'views', 'pages', 'listMission', 'listMission.html'));
  });

  ipcMain.handle('voltarAoMenuPrincipal', () => {
    createWindow(path.join('src', 'views', 'pages', 'mainMenu.html'));
  });

  ipcMain.on('submit-form', async(event, formData) => {
    try {
      await insertDataCreateMissionInDB(formData);
      console.log('Dados recebidos no processo principal:', formData);
    } catch (error) {
      console.error("Erro no processo principal:", error);
      event.reply('submit-form-error', error.message);
    };
  });

  ipcMain.handle('get-Data-CreateMission', async () => {
    try {
      const dataCreateMission =  await selectDataCreateMissionInDB();
      return dataCreateMission;
    }
    catch (error) {
      console.error('Erro ao obter dados da missão:', error);
      throw error;
    };
  });
});


app.on('activate', () => {
  if (mainWindow === null) {
    createWindow('views/mainMenu.html');
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

























