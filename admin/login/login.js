$(() => {
    $("#alert").load("../../layout/modal/modal.html");
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
    $.post("../../api/login_admin.php", body, res => {
        if (res.success) {
            window.localStorage.setItem("user_data", JSON.stringify(res.data));
            if (res.data) {
                window.location.href = baseUrl + "admin";
            }
        }
        else {
            $("#modal").modal("show");
            $(".modal-header").text("เข้าสู่ระบบ").addClass("bg-dark");
            $(".modal-body").text("การเข้าสู่ระบบล้มเหลว");
        }
    }, "json");
}