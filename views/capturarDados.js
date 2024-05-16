document.getElementById("cadastroMissao").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log('passei');
    try {
        const formData = getFormData();
        console.log(formData);
        window.electronAPI.submitForm(formData);
    } catch (error) {
        console.error("erro capturar dados", error);
    };
});

function getFormData() {
    const formData = {
        nomeMissao: document.getElementById("nomeMissao").value,
        objetivoMissao: document.getElementById("objetivoMissao").value,
        apogeuPrevisto: document.getElementById("apogeuPrevisto").value,
        altitudeRelacaoNivelMar: document.getElementById("altitudeRelacaoNivelMar").value,
        hora: document.getElementById("hora").value,
        data: document.getElementById("data").value
    };

    return formData;
};

