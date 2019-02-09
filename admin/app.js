$(() => {
    var user = JSON.parse(window.localStorage.getItem("user_data"));
    if (user.admin) {
        console.log(user);
        $("#navbar").load("navbar.html");
        $("#market").load("market.html");
    } else {
        window.location.href = baseUrl;
    }
});

function loadMarket() {
    $("#market").load("market.html");
    $("#user").html(null);
    $("#history").html(null);
}

function loadUser() {
    $("#market").html(null);
    $("#user").load("user.html");
    $("#history").html(null);
}

function loadHistory() {
    $("#market").html(null);
    $("#user").html(null);
    $("#history").load("history.html");
}