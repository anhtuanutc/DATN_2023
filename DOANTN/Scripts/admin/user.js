const rowsPerPage = 5;
let currentPage = 1;
var total = 0;
$(document).ready(function () {
    displayData(currentPage);
    document.getElementById("prev-btn").style.display = 'none';
});

function GetAll(startIndex, endIndex) {
    $.ajax({
        url: '/tttt/',
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
                if (reponse[i].isActive == 1) {
                    reponse[i].isActive = "Đã kích hoạt"
                }
                else {
                    reponse[i].isActive = "Chưa kích hoạt"
                }
                if (reponse[i].question == null || reponse[i].question == "") {
                    reponse[i].question = "Không có";
                }
                if (reponse[i].answer == null || reponse[i].answer == "") {
                    reponse[i].answer = "Không có";
                }
                if (reponse[i].user_phone == null || reponse[i].user_phone == "") {
                    reponse[i].user_phone = "Không có";
                }
                if (reponse[i].user_address == null || reponse[i].user_address == "") {
                    reponse[i].user_address = "Không có";
                }
                let STT = i + 1;
                table = table + '<tr>'
                table = table + '<td>' + STT + '</td>';
                table = table + '<td>' + reponse[i].user_id + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].user_name + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].user_email + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].user_phone + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].user_address + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].user_password + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].CreatedAt + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].isActive + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].question + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].answer + '</td>';
                table = table + '<td style="max-width : 150px" > <button type="button" class="btn btn-danger" onclick="HienThiChiTiet(),LayDHTheoMaKH(\'' + reponse[i].user_id + '\'),LayChiTietKhachHang(\'' + reponse[i].user_id + '\')">Xem Thêm</button></td>';
                table = table + '<tr>'

                document.getElementById('data').innerHTML = table;
                document.getElementById('totalItem').innerHTML = 'Tổng số bản ghi: ' + len;
            }
        },
        fail: function (response) { }
    })
}
function LayChiTietKhachHang(user_id) {
    $.ajax({
        url: '/Thongke/' + user_id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (response) {
            alert("Không");
        },
        success: function (reponse) {
            let table = '';
            if (reponse.SoLanMua == null) {
                reponse.SoLanMua = 0;
            }
            if (reponse.isActive == 1) {
                reponse.isActive = "Đã kích hoạt"
            }
            else {
                reponse.isActive = "Chưa kích hoạt"
            }
            table = table + '<p style="max-width:150px">' + reponse.user_id + '</p>';
            table = table + '<p>' + reponse.user_name + '</p>';
            table = table + '<p>' + reponse.user_phone + '</p>';
            table = table + '<p>' + reponse.user_address + '</p>';
            table = table + '<p>' + reponse.user_email + '</p>';
            table = table + '<p>' + reponse.CreatedAt + '</p>';
            table = table + '<p>' + reponse.isActive + '</p>';
            table = table + '<p>' + reponse.SoLanMua + '</p>';
            $("#avatar-preview1").attr("src", reponse.avatar_img);
            document.getElementById('TTKH').innerHTML = table;
        },
        fail: function (response) { }
    });
}
function LayChiTietHoaDon(order_id) {
    $.ajax({
        url: '/ctOrder/' + order_id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (reponse) {
            alert("Lỗi");
        },
        success: function (reponse) {
            const len = reponse.length;
            let table = '';
            for (var i = 0; i < len; ++i) {
                let STT = i + 1;
                table = table + '<tr>'
                table = table + '<td>' + STT + '</td>';
                table = table + '<td>' + reponse[i].order_id + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].product_name + '</td>';
                table = table + '<td> <div ><img src="' + reponse[i].product_img + '" style="width : 38px; height : 38px " /></div> </td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].price + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].quantity + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].price * reponse[i].quantity + '</td>';
                table = table + '<tr>'

                document.getElementById('CTDH').innerHTML = table;
            }
        },
        fail: function (response) { }
    })
}
function LayDHTheoMaKH(quser_id) {
    $.ajax({
        url: '/tttt/' + quser_id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (reponse) {
            alert("Không");
        },
        success: function (reponse) {
            const len = reponse.length;
            let table = '';
            if (reponse.length == 0) {
                table = table + '<p style="text-align:center">Khách hàng này chưa mua sản phẩm</p>';
                document.getElementById('3').innerHTML = table;
            } else {
                for (var i = 0; i < len; ++i) {
                    table = table + '<tr>'
                    table = table + '<td style="max-width:150px">' + reponse[i].order_id + '</td>';
                    table = table + '<td>' + reponse[i].order_receiver_note + '</td>';
                    table = table + '<td>' + reponse[i].date + '</td>';
                    table = table + '<td>' + reponse[i].state_name + '</td>';
                    table = table + '<td> <button type="button" class="btn btn-danger" onclick="LayChiTietHoaDon(\'' + reponse[i].order_id + '\'),HienThi()">Xem Thêm</button> </td>';
                    table = table + '<tr>'
                }
                document.getElementById('listDH').innerHTML = table;
            };
        },
        fail: function (response) { }
    });
}
function HienThiChiTiet() {
    document.getElementById("1").style.display = 'inline';
    document.getElementById("0").style.display = 'none';
}
function HienThi() {
    document.getElementById("2").style.display = 'inline';
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