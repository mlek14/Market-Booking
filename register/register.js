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

    $.post(baseUrl + "api/user/register.php", body, res => res, "json")
        .done((res) => {
            $("#alertSuccess").show();
        })
        .fail((err) => {
            $("#alertFail").show();
        });
}

function back() {
    window.history.back();
}

(() => {
    $("#alertSuccess").hide();
    $("#alertFail").hide();
    $.getJSON(baseUrl + "api/userrole/getuserrole.php", data => {
        data.forEach(role => {
            $("#role").append($("<option>").attr("value", role.Id).text(role.role_name));
        });
    });
})();