$(window).on('load', () => {
    var user = JSON.parse(window.localStorage.getItem("user_data"));
    if (user == null || !user.admin) {
        window.location.href = "../login";
    }
    $("#navbar").load("../navbar.html");
    $("#alert").load("../../layout/modal/modal.html");
    onload();
});

$(() => {
    $("#modal").on("hidden.bs.modal", (e) => {
        window.location.reload()
        console.log(e)
    })
})

function onload(page = 1, limit = 10) {
    $("#tbody").html(null);
    $(".pagination").html(null);
    getUser(page, limit).then(res => {
        let data = JSON.parse(res);
        tbody(data);
        pagination(parseInt(data.page), parseInt(data.num_rows), parseInt(data.limit));
    });
}

function getUser(page, limit) {
    return $.get(`${baseUrl}api/user/get.php?page=${page}&limit=${limit}`, res => res);
}

function tbody(data) {
    let counter = 1;
    data.data.forEach(i => {
        let user_status, btn_con, btn_can, btn_rmv;
        if (i.status == 'new') {
            user_status = $("<span>").text("รอการยืนยัน").addClass("badge badge-warning");
            btn_con = $("<span>").on("click", () => confirmUser(i.ID)).addClass("text-success btn").append($("<i>").addClass("fa fa-check"));
            btn_can = $("<span>").on("click", () => cancelUser(i.ID)).addClass("text-danger btn").append($("<i>").addClass("fa fa-times"));
        } else if (i.status == "con") {
            user_status = $("<span>").text("ยืนยันแล้ว").addClass("badge badge-success");
            btn_rmv = $("<span>").on("click", () => removeUser(i.ID)).addClass("text-dark btn").append($("<i>").addClass("fa fa-trash-alt"));
        } else if (i.status == "can") {
            user_status = $("<span>").text("ยกเลิกแล้ว").addClass("badge badge-danger");
            btn_rmv = $("<span>").on("click", () => removeUser(i.ID)).addClass("text-dark btn").append($("<i>").addClass("fa fa-trash-alt"));
        }

        run_no = (data.limit * (data.page - 1)) + counter;
        tbody_td = $("<td>");
        $("#tbody").append(
            $("<tr>")
                .append($("<td>").text(run_no))
                .append($("<td>").text(i.firstname + ' ' + i.lastname))
                .append($("<td>").text(i.email))
                .append($("<td>").text(i.phone_no))
                .append($("<td>").append(user_status).addClass("text-center"))
                .append($("<td>").text(i.create_dt))
                .append($("<td>").text(i.update_dt))
                .append($("<td>").addClass("text-center")
                    .append(btn_con)
                    .append(btn_can)
                    .append(btn_rmv)
                )
        );
        counter++;
    });
}

function confirmUser(userId) {
    $.get(`${baseUrl}api/user/confirm.php?userId=${userId}`, res => {
        if (res) {
            $("#modal").modal("show");
            $(".modal-header").text("ยืนยันสมาชิก");
            $(".modal-body").text("ยืนยันสำเร็จ");
        } else {
            $("#modal").modal("show");
            $(".modal-header").text("ยืนยันสมาชิก");
            $(".modal-body").text("เกิดข้อผิดพลาด");
        }
    });
}

function cancelUser(userId) {
    $.get(`${baseUrl}api/user/cancel.php?userId=${userId}`, res => {
        if (res) {
            $("#modal").modal("show");
            $(".modal-header").text("ยกเลิกสมาชิก");
            $(".modal-body").text("ยกเลิกสำเร็จ");
        } else {
            $("#modal").modal("show");
            $(".modal-header").text("ยกเลิกสมาชิก");
            $(".modal-body").text("เกิดข้อผิดพลาด");
        }
    });
}

function removeUser(userId) {
    $.get(`${baseUrl}api/user/remove.php?userId=${userId}`, res => {
        if (res) {
            $("#modal").modal("show");
            $(".modal-header").text("ลบสมาชิก");
            $(".modal-body").text("ลบสำเร็จ");
        } else {
            $("#modal").modal("show");
            $(".modal-header").text("ลบสมาชิก");
            $(".modal-body").text("เกิดข้อผิดพลาด");
        }
    });
}