$(() => {
    $("#alert").load("../layout/modal/modal.html");
    getUserRole();
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
        }
        else {
            $("#modal").modal("show");
            $(".modal-header").text("สมัครสมาชิก");
            $(".modal-body").text("การสมัครสมาชิกล้มเหลว กรุณาลองใหม่อีกครั้ง")
        }
    }, "json");
}

function back() {
    window.location.href = "../";
}

function gotoLogin() {
    window.location.href = "../login";
}

function getUserRole() {
    $.getJSON("../api/userrole/getuserrole.php", data => {
        data.forEach(role => {
            $("#role").append($("<option>").attr("value", role.Id).text(role.role_name));
        });
    });
}