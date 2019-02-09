$(() => {
    var user = JSON.parse(window.localStorage.getItem("user_data"));
    if (user != null && user.user_typeId == 2) {
        console.log(user);
        $("#navbar").load("navbar.html");
        $("#booking").load("booking.html");
    } else {
        window.location.href = baseUrl;
    }
});

function loadBooking() {
    $("#booking").load("booking.html");
    $("#payment").html(null);
    $("#history").html(null);
}

function loadPayment() {
    $("#booking").html(null);
    $("#payment").load("payment.html");
    $("#history").html(null);
}

function loadHistory() {
    $("#booking").html(null);
    $("#payment").html(null);
    $("#history").load("history.html");
}