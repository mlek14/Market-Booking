$(() => {
    $("#navbar").load("../navbar.html");
    var user = JSON.parse(window.localStorage.getItem("user_data"));
    if (user != null && user.admin) {
        console.log(user);
    } else {
        window.location.href = "../login";
    }
});