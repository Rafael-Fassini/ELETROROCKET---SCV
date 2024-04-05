const { app, BrowserWindow, screen } = require('electron');

let mainWindow;

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    resizable: false // Não permitir redimensionamento
  });

  mainWindow.loadFile('views/executeMission.html');

  // Centralizar a janela na tela
  mainWindow.center();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Redimensionar a janela quando um novo monitor é adicionado
  app.on('display-added', () => {
    if (mainWindow) {
      const { width, height } = screen.getPrimaryDisplay().workAreaSize;
      mainWindow.setSize(width, height);
      mainWindow.center(); // Centralizar a janela após redimensionar
    }
  });

  // Redimensionar a janela quando um monitor é removido
  app.on('display-removed', () => {
    if (mainWindow) {
      const { width, height } = screen.getPrimaryDisplay().workAreaSize;
      mainWindow.setSize(width, height);
      mainWindow.center(); // Centralizar a janela após redimensionar
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});























