const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  abrirJanelaCriarMissao: () => {
    ipcRenderer.invoke('abrirJanelaCriarMissao');
  },

  abrirJanelaSelecionarMissao: () => {
    ipcRenderer.invoke('abrirJanelaSelecionarMissao');
  },

  submitForm: async (formData) => {
    try {
        await ipcRenderer.send('submit-form', formData);
        console.log('Dados enviados com sucesso:', formData);
    } catch (error) {
        console.error("Erro ao enviar dados:", error);
    };
  },

  getDataCreateMission: async () => {
    try {
      const dataCreateMission = await ipcRenderer.invoke('get-Data-CreateMission');
      return dataCreateMission;
    } catch (error) {
        console.error('Erro no preload:', error);
        return null;
    };
  },

  voltarAoMenuPrincipal: () => {
    ipcRenderer.invoke('voltarAoMenuPrincipal');
  }

});




