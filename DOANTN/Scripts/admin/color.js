const rowsPerPage = 5;
let currentPage = 1;
var total = 0;
$(document).ready(function () {
    displayData(currentPage);
    document.getElementById("prev-btn").style.display = 'none';
});
function LaytheomaTB(color_id) {
    $.ajax({
        url: '/LayMau/' + color_id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (res) {
            alert("Lỗi mã");
        },
        success: function (res) {
            $("#txtThietBi").val(res.color_id),
                $("#txtTen").val(res.color_name),
                $("#txtEmail").val(res.color_img)
        },
        fail: function (response) { }
    })
}
function checkcolor() {
    if ($("input[name='MaThietBi1']").val() == '') {
        alert("Vui lòng nhập mã màu");
    } else if ($("input[name='Ten1']").val() == '') {
        alert("vui lòng nhập tên tên màu");
    } else if ($("input[name='Email1']").val() == '') {
        alert("vui lòng nhập link màu ảnh");
    } else {
        AddColor();
    }
}
function GetAll(startIndex, endIndex) {
    $.ajax({
        url: '/LayMau/',
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
                table = table + '<td>' + reponse[i].color_id + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].color_name + '</td>';
                table = table + '<td> <div ><img src="' + reponse[i].color_img + '" style="width : 38px; height : 38px " /></div> </td>';
                table = table + '<td style="max-width : 150px" > <button type="button" class="btn btn-danger" onclick="HienThiSua(),LaytheomaTB(\'' + reponse[i].color_id + '\')">Sửa</button></td>';
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