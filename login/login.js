window.onload = function () {
    $("#alert").load("../layout/modal/modal.html");
};

$(document).ready(() => {
    $("#loginForm").submit((e) => {
        login();
        e.preventDefault();
    })
})

function login() {
    let body = {
        email: $("#email").val(),
        password: $("#password").val()
    }
    $.post("../api/login_staff.php", body, res => {

        if (res.success) {
            window.localStorage.setItem("userData", JSON.stringify(res));
            if (res.data.staff_roleId == 1) {
                window.location.href = "../staff";
            }
            else if (res.data.staff_roleId == 2) {
                window.location.href = "../staff";
            }
        }
        else {
            setModal("Login", res.message);
            showModal();
        }
    }, "json");

}