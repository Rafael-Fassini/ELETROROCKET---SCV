window.onload = function() {
    document.getElementById("nomeMissao").focus(); 
};

export function clearFormCriarMissao() {
    document.getElementById("nomeMissao").value = "",
    document.getElementById("objetivoMissao").value = "",
    document.getElementById("apogeuPrevisto").value = "",
    document.getElementById("altitudeRelacaoNivelMar").value = "",
    document.getElementById("hora").value = "",
    document.getElementById("data").value = ""
};