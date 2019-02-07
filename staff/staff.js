$(() => {
    $("#navbar").load("../layout/navbar_staff.html");
    $("#alert").load("../layout/modal/modal.html");
    getStaff();
})

function confirmStaff(staffId) {
    $.get(`../api/staff/confirm_staff.php?staffId=${staffId}`, res => {
        if (res) {
            setModal("ยืนยันเจ้าหน้าที่", "ยืนยันสำเร็จ");
            showModal();
        } else {
            setModal("ยืนยันเจ้าหน้าที่", "การยืนยันล้มเหลว");
            showModal();
        }
    });
}

function cancelStaff(staffId) {
    $.get(`../api/staff/cancel_staff.php?staffId=${staffId}`, res => {
        if (res) {
            setModal("ยกเลิกเจ้าหน้าที่", "ยกเลิกสำเร็จ");
            showModal();
        } else {
            setModal("ยกเลิกเจ้าหน้าที่", "การยกเลิกล้มเหลว");
            showModal();
        }
    });
}

function deleteStaff(staffId) {
    $.get(`../api/staff/delete_staff.php?staffId=${staffId}`, res => {
        if (res) {
            setModal("ลบข้อมูลเจ้าหน้าที่", "ลบข้อมูลสำเร็จ");
            showModal();
        } else {
            setModal("ลบข้อมูลเจ้าหน้าที่", "การลบข้อมูลล้มเหลว");
            showModal();
        }
    });
}

function getStaff(page = 1, limit = 10) {
    $.get(`../api/staff/get_staff.php?page=${page}&limit=${limit}`, response => {
        console.log(response);
        let counter = ((page - 1) * limit) + 1;

        // Add data to table
        response.data.forEach(staff => {
            let btn_confirm = null, btn_cancel = null, btn_delete = null, _badge = null;
            if (staff.staff_status == "new") {
                btn_confirm = $("<a>").append($("<span>").addClass("oi oi-check text-success mr-3").attr("onclick", `confirmStaff(${staff.Id})`)).attr("href", "#");
                btn_cancel = $("<a>").append($("<span>").addClass("oi oi-x text-danger").attr("onclick", `cancelStaff(${staff.Id})`)).attr("href", "#");
                _badge = { text: "รอการยืนยัน", class: "badge badge-warning" };
            }
            else if (staff.staff_status == "con") {
                btn_delete = $("<a>").append($("<span>").addClass("oi oi-trash text-dark").attr("onclick", `deleteStaff(${staff.Id})`)).attr("href", "#");
                _badge = { text: "ยืนยันแล้ว", class: "badge badge-success" };
            }
            else if (staff.staff_status == "can") {
                btn_delete = $("<a>").append($("<span>").addClass("oi oi-trash text-dark").attr("onclick", `deleteStaff(${staff.Id})`)).attr("href", "#");
                _badge = { text: "ยกเลิกแล้ว", class: "badge badge-danger" };
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
                            $("<span>").text(_badge.text)
                                .addClass(_badge.class)))
                    .append($("<td>").text(staff.create_dt))
                    .append($("<td>").text(staff.update_dt || "-"))
                    .append($("<td>").append(btn_confirm).append(btn_cancel).append(btn_delete))
                );
            counter++;
        });

        // Pagination
        let no_btn_pagi = Math.ceil(response.num_rows / response.limit);
        // Prev page
        $("#pagination")
            .append($("<li>").addClass(`page-item ${page == 1 ? 'disabled' : ''}`)
                .append($("<a>").addClass("page-link").attr("aria-label", "Previous").attr("onclick", `pagination(${page - 1})`)
                    .append($("<span>").attr("aria-hidden", "true").html("&laquo;"))
                    .append($("<span>").addClass("sr-only").text("Previous"))))
        // Number of page
        for (i = 1; i <= no_btn_pagi; i++) {
            $("#pagination")
                .append($("<li>").addClass(`page-item ${i == page ? 'active' : ''}`)
                    .append($("<a>").addClass("page-link").attr("onclick", `pagination(${i})`).text(i)))
        }
        // Next page
        $("#pagination")
            .append($("<li>").addClass(`page-item ${no_btn_pagi == page ? 'disabled' : ''}`)
                .append($("<a>").addClass("page-link").attr("aria-label", "Next").attr("onclick", `pagination(${page + 1})`)
                    .append($("<span>").attr("aria-hidden", "true").html("&raquo;"))
                    .append($("<span>").addClass("sr-only").text("Next"))));
    }, "json");
}

function pagination(page) {
    $("#pagination").html(null);
    $("#table-body").html(null);
    getStaff(page);
    console.log(page);
}