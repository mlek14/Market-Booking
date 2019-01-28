window.onload = function () {
    $("#navbar").load("../layout/navbar_staff.html");
    getStaff();
}

function getStaff() {
    $.getJSON("../api/staff/get_staff.php", response => {
        console.log(response);
        // response.forEach(staff => {
        //     $("#role").append($("<option>").attr("value", role.Id).text(role.role_name));
        // });
    });
}