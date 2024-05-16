window.onload=function() {
    document.getElementById("btnResgatarMissoesCadastradas").addEventListener("click", async () => {
      const dataRegisteredMissions =  await getDataMission();
      dataRegisteredMissions.forEach(id => {
        printRegisteredMissionsInInterface(id.nomeMissao, id.dataVoo, id.apogeuPrevisto);
      });
    });
};
  
async function getDataMission() {
    try {
        dataRegisteredMissions = await window.electronAPI.getDataCreateMission();
        console.log('Dados da missão:', dataRegisteredMissions);
        return dataRegisteredMissions;

        } catch (error) {
          throw new Error('Erro ao obter dados da missão RENDERERJS:', error);
        };
};
  
function printRegisteredMissionsInInterface(nome, data, apogeu) {
    try {
        var listMissions = document.getElementById("listMissions");
  
        var getRegisteredMission = document.createElement("div");
        getRegisteredMission.classList.add("content-mission");
    
        getRegisteredMission.innerHTML = `
            <table align="center">
            <tr>
                <td id="nameMission">${nome}</td>
                <td id="dateMission">${data}</td>
            </tr>
            <tr>
                <td id="apogeePreview">${apogeu} Metros</td>
                <td id="statusMission">Status</td>
            </tr>
            </table>
        `;
    
        listMissions.appendChild(getRegisteredMission);
    
        } catch (error) {
            throw new Error("erro na função printRegister", error);
        };
};
  