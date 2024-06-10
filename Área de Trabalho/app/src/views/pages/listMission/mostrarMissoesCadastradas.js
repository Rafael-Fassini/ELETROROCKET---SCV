const displayedMissionIds = []; 

document.getElementById("btnResgatarMissoesCadastradas").addEventListener("click", async () => {
    const dataRegisteredMissions = await getDataMission();
    dataRegisteredMissions.forEach(mission => {
        if (!displayedMissionIds.includes(mission.idMissao)) { 
            printRegisteredMissionsInInterface(mission.nomeMissao, mission.dataVoo, mission.apogeuPrevisto, "available");
            displayedMissionIds.push(mission.idMissao); 
        }
    });
});

async function getDataMission() {
    try {
        const dataRegisteredMissions = await window.electronAPI.getDataCreateMission();
        console.log('Dados da missão:', dataRegisteredMissions);
        return dataRegisteredMissions;
    } catch (error) {
        throw new Error('Erro ao obter dados da missão RENDERERJS:', error);
    }
}

function printRegisteredMissionsInInterface(nome, data, apogeu, status) {
    try {
        const listMissions = document.getElementById("listMissions");

        const getRegisteredMission = document.createElement("button"); 
        getRegisteredMission.classList.add("content-mission");

        
        if (status === "executed") {
            getRegisteredMission.style.borderColor = "green";
        } else {
            getRegisteredMission.style.borderColor = "red";
        }

        getRegisteredMission.innerHTML = `
            <table>
                <tr>
                    <td id="nameMission"><strong>Missão:</strong> ${nome}</td>
                    <td id="dateMission"><strong>Data:</strong> ${data}</td>
                </tr>
                <tr>
                    <td id="apogeePreview"><strong>Apogeu Previsto:</strong> ${apogeu} Metros</td>
                    <td id="statusMission"><strong>Status:</strong> ${status === "executed" ? "Executada" : "Disponível"}</td>
                </tr>
            </table>
        `;


        getRegisteredMission.addEventListener("click", () => {
            document.getElementById("popupContainerOpenLaunchPanel").style.display = "flex";
        });

        listMissions.appendChild(getRegisteredMission);

    } catch (error) {
        throw new Error("Erro na função printRegister", error);
    }
}
