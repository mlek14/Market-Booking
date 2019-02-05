window.onload = function () {
    $("#navbar").load("../layout/navbar_staff.html");
    getStaff(1);
}

function getStaff(page) {
    $.get("../api/staff/get_staff.php?page=1", response => {
        console.log(response);
        let counter = 1;
        let staff_status;
        let status_badge;
        let btn_confirm;
        let btn_cancel;
        let btn_delete;

        // Add data to table
        response.data.forEach(staff => {
            if (staff.staff_status == "new")
            {
                staff_status = "รอการยืนยัน"
                status_badge = "badge badge-warning"
                btn_confirm = $("<button>").addClass("btn btn-sm btn-outline-success mr-1").text("ยืนยัน");
                btn_cancel = $("<button>").addClass("btn btn-sm btn-outline-danger").text("ยกเลิก");
                btn_delete = null;
            }
            else if (staff.staff_status == "con") 
            {
                staff_status = "ยืนยันแล้ว";
                status_badge = "badge badge-success";
                btn_confirm = null;
                btn_cancel = null;
                btn_delete = $("<button>").addClass("btn btn-sm btn-outline-dark").text("ลบ");
            }
            $("#table-body")
                .append($("<tr>")
                    .append($("<td>").text(counter))
                    .append($("<td>").text(staff.role_name))
                    .append($("<td>").text(`${staff.staff_firstname} ${staff.staff_lastname}`))
                    .append($("<td>").text(staff.staff_email))
                    .append($("<td>").text(staff.staff_username))
                    .append($("<td>").text(staff.staff_phone_no))
                    .append($("<td>").append($("<span>").text(staff_status).addClass(status_badge)))
                    .append($("<td>").text(staff.create_dt))
                    .append($("<td>").text(staff.update_dt || "-"))
                    .append($("<td>")
                        .append(btn_confirm)
                        .append(btn_cancel)
                        .append(btn_delete)
                    )
                );
            counter++;
        });

        // Pagination
        let no_btn_pagi = Math.ceil(response.num_rows / response.limit);
        // Prev page
        $("#pagination")
            .append($("<li>").addClass("page-item")
                .append($("<a>").addClass("page-link").attr("aria-label","Previous").attr("href","#")
                    .append($("<span>").attr("aria-hidden", "true").html("&laquo;"))
                    .append($("<span>").addClass("sr-only").text("Previous"))))
        // Number of page
        for (i = 1; i <= no_btn_pagi; i++)
        {
            $("#pagination")
                .append($("<li>").addClass("page-item")
                    .append($("<a>").addClass("page-link").attr("href","#").text(i)))
        }
        // Next page
        $("#pagination")
            .append($("<li>").addClass("page-item")
                .append($("<a>").addClass("page-link").attr("aria-label","Next").attr("href","#")
                    .append($("<span>").attr("aria-hidden", "true").html("&raquo;"))
                    .append($("<span>").addClass("sr-only").text("Next"))));
    }, "json");
}