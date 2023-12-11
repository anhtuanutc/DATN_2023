const rowsPerPage = 5;
let currentPage = 1;
var total = 0;
var ton_old = 0;
$(document).ready(function () {
    displayData(currentPage);
    document.getElementById("prev-btn").style.display = 'none';
    LoadCombobox();
});
function CapNhatTonGia(id) {
    $.ajax({
        url: '/api/productColorById/' + id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (res) {
            alert("Lỗi mã");
        },
        success: function (res) {
            HienThiSua();
            $("#txtTon").val(res.amount);
            $("#txtGia").val(res.product_price);
            $("#txtID").val(res.id);
            ton_old = res.amount;
        },
        fail: function (response) { }
    })
}
function LoadCombobox() {
    $.ajax({
        url: '/api/GetCombobox/productColor/',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (res) {
            alert("Lỗi mã");
        },
        success: function (res) {
            const len_color = res[0].ColorIdList.length;
            const len_product = res[0].ProductIdList.length;
            const len_size = res[0].SizeList.length;
            let table_color = '';
            let table_product = '';
            let table_size = '';
            for (var i = 0; i < len_color; ++i) {
                table_color = table_color + '<hr>'
                table_color = table_color + '<option value="' + res[0].ColorIdList[i].color_id + '">' + res[0].ColorIdList[i].color_name + '</option>'
            }
            for (var i = 0; i < len_product; ++i) {
                table_product = table_product + '<hr>'
                table_product = table_product + '<option value="' + res[0].ProductIdList[i].product_id + '">' + res[0].ProductIdList[i].product_name + '</option>'
            }
            for (var i = 0; i < len_size; ++i) {
                table_size = table_size + '<hr>'
                table_size = table_size + '<option value="' + res[0].SizeList[i].size + '">' + res[0].SizeList[i].size + '</option>'
            }
            document.getElementById('color_id').innerHTML = table_color;
            document.getElementById('product_id').innerHTML = table_product;
            document.getElementById('size').innerHTML = table_size;

            //Khởi tạo giá trị mặc định
            $("#amount").val(0);
            $("#product_price").val(0);
        },
        fail: function (response) { }
    })
}
function checkmanage(check_add) {
    if (check_add == 1) {
        var ton = $("input[name='amount']").val();
        var gia = $("input[name='product_price']").val();
        if (ton === '' || isNaN(ton) || parseInt(ton) <= 0 || !Number.isInteger(parseFloat(ton))) {
            return alert("Tồn không được nhập đúng định dạng, vui lòng thử lại!");
        }else if (gia === '' || isNaN(gia) || parseFloat(gia) <= 0 || !Number.isInteger(parseFloat(gia))) {
            return alert("Giá hiện tại không được nhập đúng định dạng, vui lòng thử lại!");
        } else {
            return true;
        }
    }
    else {
        var ton = $("input[name='Ton']").val();
        var gia = $("input[name='Gia']").val();
        if (ton === '' || isNaN(ton) || parseInt(ton) <= 0 || !Number.isInteger(parseFloat(ton))) {
            return alert("Tồn không được nhập đúng định dạng, vui lòng thử lại!");
        } else if (parseInt(ton_old) > parseInt(ton)) {
            return alert("Tồn mới phải lớn hơn tồn cũ");
        } else if (gia === '' || isNaN(gia) || parseFloat(gia) <= 0 || !Number.isInteger(parseFloat(gia))) {
            return alert("Giá hiện tại không được nhập đúng định dạng, vui lòng thử lại!");
        } else {
            return true;
        }
    }

}
function GetAll(startIndex, endIndex) {
    $.ajax({
        url: '/api/GetDS_Item_productColor/',
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
                table = table + '<td style = "text-align: center">' + STT + '</td>';
                table = table + '<td style = "text-align: center">' + reponse[i].id + '</td>';
                table = table + '<td style="max-width : 200px;text-align: center">' + reponse[i].product_name + '</td>';
                table = table + '<td style="max-width : 200px;text-align: center">' + reponse[i].color_name + '</td>';
                table = table + '<td style="max-width : 80px;text-align: center">' + reponse[i].size + '</td>';
                table = table + '<td style="width : 80px !important">' + reponse[i].amount + '</td>';
                table = table + '<td style="max-width : 100px;float:right">' + reponse[i].product_price + '</td>';
                table = table + '<td style="max-width : 200px;padding-left: 4%;"> <button type="button" class="btn btn-danger" onclick="CapNhatTonGia(\'' + reponse[i].id + '\')">Cập nhật tồn kho/giá</button><button type="button" class="btn btn-danger"onclick="Delete_inventory_price(\'' + reponse[i].id + '\')" style ="margin-left:5%">Xóa</button></td>';
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