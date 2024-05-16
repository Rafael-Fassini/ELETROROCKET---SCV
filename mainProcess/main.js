const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { insertDataCreateMissionInDB, selectDataCreateMissionInDB } = require('./database.js');
const { error } = require('node:console');



let mainWindow = null;

const createWindow = (routehtmlPage) => {
  if (!mainWindow) {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
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
  createWindow('views/mainMenu.html');

  ipcMain.handle('abrirJanelaCriarMissao', () => {
    createWindow('views/createMission.html');
  });

  ipcMain.handle('abrirJanelaSelecionarMissao', () => {
    createWindow('views/listMission.html');
  });

  ipcMain.handle('voltarAoMenuPrincipal', () => {
    createWindow('views/mainMenu.html');
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

























