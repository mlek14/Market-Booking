$(() => {
    $("#alert").load("../layout/modal/modal.html");
    $("#loginForm").submit((e) => {
        login();
        e.preventDefault();
    })
})

function login() {
    let body = {
        email: $("#email").val(),
        password: $("#password").val()
    };
    $.post("../api/login.php", body, res => {
        if (res.success) {
            window.localStorage.setItem("user_data", JSON.stringify(res.data));
            window.location.href = "../user";
        }
        else {
            $("#modal").modal("show");
            $(".modal-header").text("เข้าสู่ระบบ");
            $(".modal-body").text("การเข้าสู่ระบบล้มเหลว");
        }
    }, "json");
}