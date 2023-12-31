﻿const rowsPerPage = 5;
let currentPage = 1;
var total = 0;
$(document).ready(function () {
    Laystate();
    Layproducer();
    Laycategory();
    displayData(currentPage);
    document.getElementById("prev-btn").style.display = 'none';

});
function checkproduct(check_add) {
    if (check_add == 1) {
        if ($("input[name='product_name2']").val() == '') {
            return alert("vui lòng nhập tên Sản Phẩm");
        } else {
            return true;
        }
    } else {
        if ($("input[name='product_id1']").val() == '') {
            return alert("Vui lòng nhập mã Sản phẩm");
        } else if ($("input[name='product_name1']").val() == '') {
            return alert("vui lòng nhập tên Sản Phẩm");
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
                if (reponse[i].state_id == 1 || reponse[i].state_id == 10) {
                    table = table + '<hr>'
                    table = table + '<option value="' + reponse[i].state_id + '">' + reponse[i].state_name + '</option>'
                }
                
            }
            document.getElementById('value1').innerHTML = table;
            document.getElementById('value4').innerHTML = table;
        },
        fail: function (response) { }
    });
}
function Layproducer() {
    $.ajax({
        url: '/layproducerr',
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
                table = table + '<option value="' + reponse[i].producer_id + '">' + reponse[i].producer_name + '</option>'
            }
            document.getElementById('value2').innerHTML = table;
            document.getElementById('value5').innerHTML = table;
        },
        fail: function (response) { }
    });
}
function Laycategory() {
    $.ajax({
        url: '/laycategory',
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
                table = table + '<option value="' + reponse[i].category_id + '">' + reponse[i].category_name + '</option>'
            }
            document.getElementById('value3').innerHTML = table;
            document.getElementById('value6').innerHTML = table;
        },
        fail: function (response) { }
    });
}
function LaytheomaTB(product_id) {
    $.ajax({
        url: '/Layproduct/' + product_id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (res) {
            alert("Lỗi mã");
        },
        success: function (res) {
            $("#product_id1").val(res.product_id),
                $("#product_name1").val(res.product_name),
                $("#product_alias1").val(res.product_alias),
                $("#product_description1").val(res.product_description),
                $("#product_content1").val(res.product_content),
                $("#product_img1").val(res.product_img),
                $("#avatar-preview1").attr("src", res.product_img),
                $("#product_sub_img1").val(res.product_sub_img),
                $("#value1").val(res.state),
                $("#value2").val(res.product_producer),
                $("#value3").val(res.category_id)
        },
        fail: function (response) { }
    })
}
function GetAll(startIndex, endIndex) {
    $.ajax({
        url: '/Layproduct/',
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (reponse) {
            alert("Lỗi");
        },
        success: function (reponse) {
            let table = '';
            const len = reponse.length;
            total = reponse.length;
            if (len <= rowsPerPage) {
                document.getElementById("next-btn").style.display = 'none';
                document.getElementById("prev-btn").style.display = 'none';
            }
            for (var i = startIndex; i < endIndex; ++i) {
                if (reponse[i].product_sub_img == null || reponse[i].product_sub_img == "") {
                    reponse[i].product_sub_img = "Không có";
                }
                let STT = i + 1;
                table = table + '<tr>'
                table = table + '<td>' + STT + '</td>';
                table = table + '<td>' + reponse[i].product_id + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].product_name + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].product_alias + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].product_description + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].product_content + '</td>';
                table = table + '<td> <div ><img src="' + reponse[i].product_img + '" style="width : 38px; height : 38px " /></div> </td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].product_sub_img + '</td>';
                table = table + '<td style="max-width : 150px" > <button type="button" class="btn btn-danger" onclick="HienThiSua(),LaytheomaTB(\'' + reponse[i].product_id + '\')">Sửa</button></td>';
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

function Getimage() {
    //Edit
    document.getElementById('img_product1').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const preview = document.getElementById('avatar-preview1');
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        } else {
            preview.src = "placeholder.png"; // Ảnh mặc định nếu không chọn file
        }
    });
    //Add
    document.getElementById('img_product2').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const preview = document.getElementById('avatar-preview2');
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        } else {
            preview.src = "placeholder.png"; // Ảnh mặc định nếu không chọn file
        }
    });
}

