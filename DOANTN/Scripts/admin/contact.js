const rowsPerPage = 5;
let currentPage = 1;
var total = 0;
$(document).ready(function () {
    displayData(currentPage);
    document.getElementById("prev-btn").style.display = 'none';
});
function LaytheomaTB(id) {
    $.ajax({
        url: '/LayLienHe/' + id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (res) {
            alert("Lỗi mã");
        },
        success: function (res) {
            $("#txtThietBi").val(res.id),
                $("#txtTen").val(res.name),
                $("#txtEmail").val(res.email),
                $("#txtDienThoai").val(res.phone),
                $("#txtDiaChi").val(res.address),
                $("#txtCmt").val(res.comment)
        },
        fail: function (response) { }
    })
}
function check() {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    var mobile = $('#txtPhone').val();

    if ($("input[name='MaThietBi1']").val() == '') {
        alert("Vui lòng nhập mã ");
    } else if ($("input[name='Ten1']").val() == '') {
        alert("vui lòng nhập tên ");
    } else if ($("input[name='Email1']").val() == '') {
        alert("vui lòng nhập email");
    } else if (mobile == '') {
        alert("vui lòng nhập sdt");
    } else if (vnf_regex.test(mobile) == false) {
        alert('Số điện thoại của bạn không đúng định dạng!');
    } else if ($("input[name='DiaChi1']").val() == '') {
        alert("vui lòng nhập Mật Khẩu");
    } else {
        AddContact();
    }
}
function GetAll(startIndex, endIndex) {
    $.ajax({
        url: '/LayLienHe/',
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
                let STT = i + 1;
                table = table + '<tr>'
                table = table + '<td>' + STT + '</td>';
                table = table + '<td>' + reponse[i].id + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].name + '</td>';
                table = table + '<td style="max-width : 150px">' + reponse[i].email + '</td>';
                table = table + '<td style="max-width : 150px">' + reponse[i].phone + '</td>';
                table = table + '<td style="max-width : 150px">' + reponse[i].address + '</td>';
                table = table + '<td style="max-width : 150px">' + reponse[i].comment + '</td>';
                table = table + '<td style="max-width : 150px" > <button type="button" class="btn btn-danger" onclick="HienThiSua(),LaytheomaTB(\'' + reponse[i].id + '\')">Sửa</button> <button type="button" class="btn btn-danger" onclick="XoaContact(\'' + reponse[i].id + '\')">Xóa</button></td>';
                table = table + '<tr>'

                document.getElementById('data').innerHTML = table;
            }
        },
        fail: function (response) { }
    })
}
function HienThiSua() {
    document.getElementById("Edit").style.display = 'inline';
    document.getElementById("Tim").style.display = 'none';
    document.getElementById("Add").style.display = 'none';
}
function HienThiAdd() {
    document.getElementById("Edit").style.display = 'none';
    document.getElementById("Tim").style.display = 'none';
    document.getElementById("Add").style.display = 'inline';
}
function HienThi() {
    document.getElementById("Edit").style.display = 'none';
    document.getElementById("Tim").style.display = 'inline';
    document.getElementById("Add").style.display = 'none';
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