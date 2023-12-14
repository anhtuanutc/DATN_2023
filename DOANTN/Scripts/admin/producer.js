const rowsPerPage = 5;
let currentPage = 1;
var total = 0;
$(document).ready(function () {
    Laystate();
    displayData(currentPage);
    document.getElementById("prev-btn").style.display = 'none';
});
function checkprodcer(check_add) {
    if (check_add == 1) {
         if ($("input[name='producer_name1']").val() == '') {
            return alert("vui lòng nhập tên nhà sản xuất");
        } else if ($("input[name='producer_address1']").val() == '') {
            return alert("vui lòng nhập địa chỉ");
        } else {
            return true;
        }
    } else {
        if ($("input[name='producer_id']").val() == '') {
            return alert("Vui lòng nhập mã nhà sản xuất");
        } else if ($("input[name='producer_name']").val() == '') {
            return alert("vui lòng nhập tên nhà sản xuất");
        } else if ($("input[name='producer_address']").val() == '') {
            return alert("vui lòng nhập địa chỉ");
        } else {
            return true;
        }
    }
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
                if (reponse[i].state_id == 1 || reponse[i].state_id ==10) {
                    table = table + '<hr>'
                    table = table + '<option value="' + reponse[i].state_id + '">' + reponse[i].state_name + '</option>'
                }
            }
            document.getElementById('value1').innerHTML = table;
            document.getElementById('value2').innerHTML = table;
        },
        fail: function (response) { }
    });
}
function LaytheomaTB(producer_id) {
    $.ajax({
        url: '/Layproducer/' + producer_id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (res) {
            alert("Lỗi mã");
        },
        success: function (res) {
            $("#producer_id1").val(res.producer_id),
                $("#producer_name1").val(res.producer_name),
                $("#producer_address1").val(res.producer_address),
                $('#value1').val(res.state)
        },
        fail: function (response) { }
    })
}
function GetAll(startIndex, endIndex) {
    $.ajax({
        url: '/Layproducer/',
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
                table = table + '<td>' + reponse[i].producer_id + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].producer_name + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].producer_address + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].state_name + '</td>';
                table = table + '<td style="max-width : 150px" > <button type="button" class="btn btn-danger" onclick="HienThiSua(),LaytheomaTB(\'' + reponse[i].producer_id + '\')">Edit Producer</button></td>';
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