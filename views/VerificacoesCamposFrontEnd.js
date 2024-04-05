function verificarFormatoLatitude(event, nextFieldID){
    var latitude = document.getElementById("latitude").value;
    if (!/^(-?\d{1,2}(\.\d{0,6})?|90(\.\d{0,6})?)$/.test(latitude) || parseFloat(latitude) > 90) {
        document.getElementById("latitude").value = ""; 
    };
    proximoCampo(event, nextFieldID);
};

function verificarFormatoLongitude(event){
    var longitude = document.getElementById("longitude").value;
    if (!/^(-?\d{1,3}(\.\d{0,6})?|180(\.\d{0,6})?)$/.test(longitude) || parseFloat(longitude) > 180) {
        document.getElementById("longitude").value = ""; 
    };
    proximoCampo(event, nextFieldID);
};

function verificarNumerosCampos(id) { 
    var campo = document.getElementById(id);
    var valor = campo.value;

    campo.value = valor.replace(/\D/g, "");
};

function proximoCampo(event, nextFieldID) {
    if (event.key === "Enter") {
        var fieldValue = event.target.value.trim();
        if (fieldValue !== "") {
            document.getElementById(nextFieldID).focus();
        }
    }
}

function popUpConfirmarAcao() {
    var confirmacao = window.confirm("Tem certeza de que deseja Salvar?");

    if (confirmacao) {
        alert("Ação confirmada!"); 
    } else {
        alert("Ação cancelada!"); 
    };
};

function openPopup() {
    document.getElementById("popupContainer").style.display = "block";
};

function confirmAction() {
    closePopup()
};

function cancelAction() {
    closePopup();
};

function closePopup() {
    document.getElementById("popupContainer").style.display = "none";
};




