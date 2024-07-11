import { clearFormCriarMissao } from "../../components/animacoes.js";


function saveFormDataInDataBase() {
    try {
        const formData = getFormData();
        window.electronAPI.submitForm(formData);
    } catch (error) {
        console.error("erro capturar dados", error);
    };
};


function getFormData() {
    const formData = {
        nomeMissao: document.getElementById("nomeMissao").value,
        objetivoMissao: document.getElementById("objetivoMissao").value,
        apogeuPrevisto: document.getElementById("apogeuPrevisto").value,
        altitudeRelacaoNivelMar: document.getElementById("altitudeRelacaoNivelMar").value,
        hora: document.getElementById("hora").value,
        data: document.getElementById("data").value
    };

    formData.hora = formData.hora + ":00";

    return formData;
};


document.getElementById("confirmButton").addEventListener('click', () => {
    saveFormDataInDataBase();
    alert("Cadastro realizado com sucesso!");
    clearFormCriarMissao();
});
