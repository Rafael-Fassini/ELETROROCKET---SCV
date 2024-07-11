document.getElementById("nomeMissao").addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        var fieldValue = event.target.value.trim();
        if (fieldValue !== "") {
            document.getElementById("objetivoMissao").focus();
        };
    };
});

document.getElementById("objetivoMissao").addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        var fieldValue = event.target.value.trim();
        if (fieldValue !== "") {
            document.getElementById("apogeuPrevisto").focus();
        };
    };
});

document.getElementById("apogeuPrevisto").addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        var fieldValue = event.target.value.trim();
        if (fieldValue !== "") {
            document.getElementById("altitudeRelacaoNivelMar").focus();
        };
    };
});

document.getElementById("altitudeRelacaoNivelMar").addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    };
});



document.getElementById("apogeuPrevisto").addEventListener('keydown', () => {
    var campo = document.getElementById("apogeuPrevisto");
    var valor = campo.value;
    campo.value = valor.replace(/\D/g, "");
  
});


