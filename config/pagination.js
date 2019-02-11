function pagination(page, num_rows, limit) {
    let total_page = Math.ceil(num_rows / limit);
    $(".pagination").append(
        $("<li>").on("click", () => page != 1 ? onload(page - 1, limit) : false).addClass(`page-item ${page == 1 ? 'disabled' : ''}`).append(
            $("<a>").attr("href", "#").addClass("page-link").append(
                $("<span>").html("&laquo;")
            )
        ));
    for (let i = 1; i <= total_page; i++) {
        $(".pagination").append(
            $("<li>").on("click", () => onload(i, limit)).addClass(`page-item ${i == page ? 'active' : ''}`).append(
                $("<a>").addClass("page-link").attr("href", "#").text(i)
            )
        )
    }
    $(".pagination").append(
        $("<li>").on("click", () => page != total_page ? onload(page + 1, limit) : false).addClass(`page-item ${page == total_page ? 'disabled' : ''}`).append(
            $("<a>").attr("href", "#").addClass("page-link").append(
                $("<span>").html("&raquo;")
            )
        ));
}