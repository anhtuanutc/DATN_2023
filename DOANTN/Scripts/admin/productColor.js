﻿$(document).ready(function () {
    Laycolor();
    Layproduct();
    GetAll();
});
function checkproductcolor() {
    if ($("input[name='id']").val() == '') {
        alert("Vui lòng nhập mã màu sản phẩm");
    } else if ($("input[name='size']").val() == '') {
        alert("vui lòng nhập kích thước sản phẩm");
    } else if (Soduong($("input[name='amount']").val()) == false) {
        alert("vui lòng nhập số lượng sản phẩm");
    } else if (Soduong($("input[name='product_price']").val()) == false) {
        alert("vui lòng nhập giá sản phẩm");
    } else if (Soduong($("input[name='product_sale']").val()) == false) {
        alert("vui lòng nhập giá sau giảm");
    } else if (Soduong($("input[name='product_discount']").val()) == false) {
        alert("vui lòng nhập chiết khấu");
    } else {
        addproductcolor();
    }
}
function Soduong(so) {
    if (parseInt(so) > 0) {
        return true;
    } else return false;
}
function Laycolor() {
    $.ajax({
        url: '/laycolor',
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
                table = table + '<option value="' + reponse[i].color_id + '">' + reponse[i].color_name + '</option>'
            }
            document.getElementById('color_id12').innerHTML = table;
            document.getElementById('color_id2').innerHTML = table;
        },
        fail: function (response) { }
    });
}
function Layproduct() {
    $.ajax({
        url: '/Layproduct',
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
                table = table + '<option value="' + reponse[i].product_id + '">' + reponse[i].product_name + '</option>'
            }
            document.getElementById('product_id12').innerHTML = table;
            document.getElementById('product_id2').innerHTML = table;
        },
        fail: function (response) { }
    });
}
function LaytheomaTB(id) {
    $.ajax({
        url: '/xyzz/' + id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (res) {
            alert("Lỗi mã");
        },
        success: function (res) {

            $("#id12").val(res.id),
                $("#size12").val(res.size),
                $("#amount12").val(res.amount),
                $("#product_price12").val(res.product_price),
                $("#product_sale12").val(res.product_sale),
                $("#product_discount12").val(res.product_discount)
        },
        fail: function (response) { }
    })
}
function GetAll() {
    $.ajax({
        url: '/Layproductcolor/',
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
                if (reponse[i].product_sale == null || reponse[i].product_sale == "") {
                    reponse[i].product_sale = "Không có";
                }
                if (reponse[i].product_discount == null || reponse[i].product_discount == "") {
                    reponse[i].product_discount = "Không có";
                }
                let STT = i + 1;
                table = table + '<tr>'
                table = table + '<td>' + STT + '</td>';
                table = table + '<td>' + reponse[i].id + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].color_name + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].product_name + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].size + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].amount + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].product_price + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].product_sale + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].product_discount + '</td>';
                table = table + '<td style="max-width : 150px" > <button type="button" class="btn btn-danger" onclick="HienThiSua(),LaytheomaTB(\'' + reponse[i].id + '\'),Laycolor(\'' + reponse[i].color_id + '\'),Layproduct(\'' + reponse[i].product_id + '\')">Sửa</button> </td>';
                table = table + '<tr>'

                document.getElementById('data').innerHTML = table;
            }
        },
        fail: function (response) { }
    });
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