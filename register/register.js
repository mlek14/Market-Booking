window.onload = function () {
    $("#alert").load("../layout/modal/modal.html");
    getUserRole();

    // setTimeout(() => {
    //     $('#modal').on("hidden.bs.modal", () => {
    //         window.location.reload();
    //     });
    // });
};

$(document).ready(() => {
    $("#registerForm").submit((e) => {
        register();
        e.preventDefault();
    });
});

function register() {
    let body = {
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        email: $("#email").val(),
        phone_no: $("#phone_no").val(),
        username: $("#username").val(),
        password: $("#password").val(),
        role: $("#role").val()
    };

    $.post("../api/register.php", body, res => {
        if (res.success) {
            setModal("Registration", "Success!");
            showModal();

        }
        else {
            setModal("Registration", res.message);
            showModal();
        }
    }, "json");
}

function back() {
    window.location.href = "../";
}

function getUserRole() {
    $.getJSON(baseUrl + "api/userrole/getuserrole.php", data => {
        data.forEach(role => {
            $("#role").append($("<option>").attr("value", role.Id).text(role.role_name));
        });
    });
}