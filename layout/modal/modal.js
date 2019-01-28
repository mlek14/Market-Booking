function showModal() {
    $("#modal").modal("show");
}

function hideModal() {
    $("#modal").modal("hide");
}

function setModal(label, content) {
    $("#modalLabel").text(label);
    $("#modalBody").text(content);
}