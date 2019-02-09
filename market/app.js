$(() => {
    var user = JSON.parse(window.localStorage.getItem("user_data"));
    if (user != null && user.user_typeId == 1) {
        console.log(user);
        $("#navbar").load("navbar.html");
        $("#market").load("market.html");
    } else {
        window.location.href = baseUrl;
    }
});

function loadMarket() {
    $("#market").load("market.html");
    $("#payment").html(null);
    $("#history").html(null);
}

function loadPayment() {
    $("#market").html(null);
    $("#payment").load("payment.html");
    $("#history").html(null);
}

function loadHistory() {
    $("#market").html(null);
    $("#payment").html(null);
    $("#history").load("history.html");
}