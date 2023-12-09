const rowsPerPage = 5;
let currentPage = 1;
var total = 0;
var state_name = '';
var id_sp = '';
$(document).ready(function () {
    Laystate();
    displayData(currentPage);
    document.getElementById("prev-btn").style.display = 'none';
});
function LayUser(user_id) {
    $.ajax({
        url: '/asd/' + user_id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {

        },
        success: function (reponse) {
            let table = '';
            table = table + '<hr>'
            table = table + '<option value="' + reponse.user_id + '">' + reponse.user_name + '</option>'
            document.getElementById('User').innerHTML = table;
        },
        fail: function (response) { }
    });
}
function Laystate() {
    $.ajax({
        url: '/laystate',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {

        },
        success: function (reponse) {
            const len = reponse.length;
            let table = '';
            for (var i = 0; i < len; ++i) {
                table = table + '<hr>'
                table = table + '<option value="' + reponse[i].state_id + '">' + reponse[i].state_name + '</option>'
            }
            document.getElementById('value11').innerHTML = table;
        },
        fail: function (response) { }
    });
}
function LaytheomaTB(order_id) {
    $.ajax({
        url: '/Layorder/' + order_id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (res) {
            alert("Lỗi mã");
        },
        success: function (res) {
            $("#a").val(res.order_id),
                $("#c").val(res.order_receiver_note),
                $("#d").val(res.order_total_price),
                $("#value11").val(res.state_id)
        },
        fail: function (response) { }
    })
}
function Capnhatlaisoluong(order_id) {
    var url = '/ctOrder/' + order_id
    $.ajax({
        url: url,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            alert("Không thành công");
        },
        success: function (reponse) {
            for (let i = 0; i < reponse.length; i++) {
                TraHang(reponse[i].id, reponse[i].quantity);
            }

        }
    });
}
function TraHang(id, soluong) {
    var url = '/api/Order_product_producer_API/?id=' + id + '&soluong=' + soluong
    $.ajax({
        url: url,
        method: 'PUT',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            alert("Không");
        },
        success: function (reponse) {
        }
    });
}
function HienThiSua() {
    document.getElementById("Edit").style.display = 'inline';
    document.getElementById("Tim").style.display = 'none';
    document.getElementById("HienThi").style.display = 'none';
}
function HienThiAdd() {
    document.getElementById("Edit").style.display = 'none';
    document.getElementById("Tim").style.display = 'none';
    //  document.getElementById("Add").style.display = 'inline';
}
function HienThi() {
    document.getElementById("Edit").style.display = 'none';
    document.getElementById("Tim").style.display = 'inline';
    //    document.getElementById("Add").style.display = 'none';
}
function HienThi1() {
    document.getElementById("HienThi").style.display = 'inline';
}

function displayData(page) {
    var startIndex = (page - 1) * rowsPerPage;
    var pageInfo = document.getElementById('page-info');
    var endIndex = startIndex + rowsPerPage;
    if (endIndex > total && total != 0) endIndex = total;
    GetAll(startIndex, endIndex);
    pageInfo.textContent = `Page ${currentPage}`;
}
function prevBtn() {
    if (currentPage > 1) {
        currentPage--;
        displayData(currentPage);
        document.getElementById("next-btn").style.display = 'inline';
        document.getElementById("prev-btn").style.display = 'inline';
    } if (currentPage - 1 <= 0) {
        //Trang đầu ẩn nút prev
        document.getElementById("prev-btn").style.display = 'none';
    }
}
function nextBtn() {
    const maxPage = Math.ceil(total / rowsPerPage);
    if (currentPage < maxPage) {
        currentPage++;
        displayData(currentPage);
        document.getElementById("next-btn").style.display = 'inline';
        document.getElementById("prev-btn").style.display = 'inline';
    } if (currentPage + 1 > maxPage) {
        document.getElementById("next-btn").style.display = 'none';
    }
}
function Laytheoarder(order_id) {
    $.ajax({
        url: '/ctOrder/' + order_id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (reponse) {
            alert("Lỗi mã");
        },
        success: function (reponse) {
            const len = reponse.length;
            let table = '';
            id_sp = order_id;
            for (var i = 0; i < len; ++i) {
                let STT = i + 1;
                state_name = reponse[0].state_name;
                table = table + '<tr>'
                table = table + '<td>' + reponse[i].order_id + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].product_name + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].color_name + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].size + '</td>';
                table = table + '<td> <div ><img src="' + reponse[i].product_img + '" style="width : 38px; height : 38px " /></div> </td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].quantity + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].price + '</td>';
                table = table + '<tr>'

                document.getElementById('ChiTietHoaDon').innerHTML = table;
            }
        },
        fail: function (response) { }
    })
}
function GetAll(startIndex, endIndex) {
    $.ajax({
        url: '/Layorder/',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (reponse) {
            alert("Lỗi");
        },
        success: function (reponse) {
            const len = reponse.length;
            total = reponse.length;
            if (len <= rowsPerPage) {
                document.getElementById("next-btn").style.display = 'none';
                document.getElementById("prev-btn").style.display = 'none';
            }
            let table = '';
            for (var i = startIndex; i < endIndex; ++i) {
                if (reponse[i].order_receiver_note == null || reponse[i].order_receiver_note == '') {
                    reponse[i].order_receiver_note = "Không có yêu cầu gì";
                }
                let STT = i + 1;
                table = table + '<tr>'
                table = table + '<td>' + STT + '</td>';
                table = table + '<td>' + reponse[i].order_id + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].user_name + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].order_receiver_note + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].order_total_price + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].state_name + '</td>';
                var check = reponse[i].state_name.toLowerCase();
                if (check.includes("hủy")) {
                    table = table + '<td style="max-width : 150px" > <button type="button" class="btn btn-danger" onclick="XoaCTHD(\'' + reponse[i].order_id + '\'),abc(\'' + reponse[i].order_detail_id + '\')">Xóa</button> <button type="button" class="btn btn-danger" onclick="HienThi1(),Laytheoarder(\'' + reponse[i].order_id + '\')">Chi Tiết</button></td>';
                    //        table = table + '<td style="max-width : 200px"><button type="button" class="btn btn-danger" onclick="HienThiSua(),LaytheomaTB(\'' + reponse[i].order_id + '\'),LayUser(\'' + reponse[i].user_id + '\')">Sửa</button></td>';
                }
                else if (check.includes("giao hàng")) {
                    table = table + '<td style="max-width : 150px" > <button type="button" class="btn btn-danger" onclick="HienThi1(),Laytheoarder(\'' + reponse[i].order_id + '\')">Chi Tiết</button></td>';
                }
                else {
                    table = table + '<td style="max-width : 150px" > <button type="button" class="btn btn-danger" onclick="HienThiSua(),LaytheomaTB(\'' + reponse[i].order_id + '\'),LayUser(\'' + reponse[i].user_id + '\')">Sửa</button> <button type="button" class="btn btn-danger" onclick="HienThi1(),Laytheoarder(\'' + reponse[i].order_id + '\')">Chi Tiết</button></td>';
                }
                table = table + '<tr>'

                document.getElementById('data').innerHTML = table;
                document.getElementById('totalItem').innerHTML = 'Tổng số bản ghi: ' + len;
            }
        },
        fail: function (response) { }
    })
}