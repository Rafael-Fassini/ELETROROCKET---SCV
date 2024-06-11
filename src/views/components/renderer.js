document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnSelecionarMissao").addEventListener("click", () => {
    window.electronAPI.abrirJanelaSelecionarMissao();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnCriarMissao").addEventListener("click", () => {
    window.electronAPI.abrirJanelaCriarMissao();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnSalvarFormulario").addEventListener("click", () => {
    document.getElementById("popupContainer").style.display = "flex";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".cancel-button").addEventListener('click', () => {
    document.getElementById("popupContainer").style.display = "none";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".confirm-button").addEventListener("click", () => {
    document.getElementById("popupContainer").style.display = "none";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnSideBar").addEventListener("click", function() {
    document.getElementById("popupContainerExit").style.display = "flex";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#popupContainerExit .cancel-button").forEach(button => {
    button.addEventListener("click", function() {
      document.getElementById("popupContainerExit").style.display = "none";
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#popupContainerExit .exit-button").forEach(button => {
    button.addEventListener("click", function() {
      window.electronAPI.voltarAoMenuPrincipal();
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnConfirmOpenLaunchPanel").addEventListener("click", () => {
    document.getElementById("popupContainerOpenLaunchPanel").style.display = "none";
    window.electronAPI.openWindowExecuteMission();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnCancelOpenLaunchPanel").addEventListener("click", () => {
    document.getElementById("popupContainerOpenLaunchPanel").style.display = "none";
  });
});


