window.onload=function() {
  document.getElementById("btnSelecionarMissao").addEventListener("click", () => {
    window.electronAPI.abrirJanelaSelecionarMissao();
  });

  document.getElementById("btnCriarMissao").addEventListener("click", () => {
    window.electronAPI.abrirJanelaCriarMissao();
  });
};


document.getElementById("btnSideBar").addEventListener("click", () => {
  window.electronAPI.voltarAoMenuPrincipal();
});







