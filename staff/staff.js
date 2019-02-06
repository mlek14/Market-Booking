window.onload = function () {
    $("#navbar").load("../layout/navbar_staff.html");
    getStaff();
}

function confirmStaff(id) {
    console.log('confirm staff id : '+id);
}

function cancelStaff(id){
    console.log('cancel staff id : '+id);
}

function getStaff(page = 1) {
    $.get(`../api/staff/get_staff.php?page=${page}`, response => {
        console.log(response);
        let counter = 1, btn_confirm, btn_cancel, btn_delete;

        // Add data to table
        response.data.forEach(staff => {
            if (staff.staff_status == "new") {
                btn_confirm = `<button id='btnConfirm' class='btn btn-sm btn-outline-success mr-1' onclick=confirmStaff(${staff.Id})>ยืนยัน</button>`;
                btn_cancel = `<button id='btnCancel' class='btn btn-sm btn-outline-danger' onclick=cancelStaff(${staff.Id})>ยกเลิก</button>`;
                btn_delete = "";
            }
            else if (staff.staff_status == "con") {
                btn_confirm = "";
                btn_cancel = "";
                btn_delete = "<button id='btnDelete' class='btn btn-sm btn-outline-dark'>ลบ</button>";
            }
            $("#table-body")
                .append($("<tr>")
                    .append($("<td>").text(counter))
                    .append($("<td>").text(staff.role_name))
                    .append($("<td>").text(`${staff.staff_firstname} ${staff.staff_lastname}`))
                    .append($("<td>").text(staff.staff_email))
                    .append($("<td>").text(staff.staff_username))
                    .append($("<td>").text(staff.staff_phone_no))
                    .append(
                        $("<td>").append(
                            $("<span>").text(staff.staff_status == 'con' ? 'ยืนยันแล้ว' : 'รอการยืนยัน')
                                .addClass(staff.staff_status == 'con' ? 'badge badge-success' : 'badge badge-warning')))
                    .append($("<td>").text(staff.create_dt))
                    .append($("<td>").text(staff.update_dt || "-"))
                    .append($("<td>").html(btn_confirm + btn_cancel + btn_delete))
                );
            counter++;
        });

        // Pagination
        let no_btn_pagi = Math.ceil(response.num_rows / response.limit);
        // Prev page
        $("#pagination")
            .append($("<li>").addClass(`page-item ${page == 1 ? 'disabled':''}`)
                .append($("<a>").addClass("page-link").attr("aria-label", "Previous").attr("onclick", `pagination(${page-1})`)
                    .append($("<span>").attr("aria-hidden", "true").html("&laquo;"))
                    .append($("<span>").addClass("sr-only").text("Previous"))))
        // Number of page
        for (i = 1; i <= no_btn_pagi; i++) {
            $("#pagination")
                .append($("<li>").addClass(`page-item ${i == page ? 'active' : ''}`)
                    .append($("<a>").addClass("page-link").attr("onclick", `pagination(${page})`).text(i)))
        }
        // Next page
        $("#pagination")
            .append($("<li>").addClass(`page-item ${no_btn_pagi == page ? 'disabled':''}`)
                .append($("<a>").addClass("page-link").attr("aria-label", "Next").attr("onclick", `pagination(${page+1})`)
                    .append($("<span>").attr("aria-hidden", "true").html("&raquo;"))
                    .append($("<span>").addClass("sr-only").text("Next"))));
    }, "json");
}

function pagination(page){
    console.log(page);
}