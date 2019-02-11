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
        type: $("#type").val()
    };

    $.post("../api/register.php", body, res => {
        if (res.success) {
            $("#modal").modal("show").on("hidden.bs.modal", () => {
                window.location.reload()
            });
            $(".modal-header").text("สมัครสมาชิก");
            $(".modal-body").text("สำเร็จ")
        }
        else {
            $("#modal").modal("show");
            $(".modal-header").text("สมัครสมาชิก");
            $(".modal-body").text("การสมัครสมาชิกล้มเหลว กรุณาลองใหม่อีกครั้ง")
        }
    }, "json");
}

function gotoLogin() {
    window.location.href = "../login";
}

function getUserRole() {
    $.getJSON("../api/user_type/get.php", data => {
        data.forEach(role => {
            $("#type").append($("<option>").attr("value", role.ID).text(role.name));
        });
    });
}