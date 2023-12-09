const rowsPerPage = 5;
let currentPage = 1;
var total = 0;

//Khởi tạo ban đầu
$(document).ready(function () {
    reload(currentPage);
    openTab(event, 'EditInfo');

});

//Load lại trang
function reload(currentPage) {
    var myCookieValue = getCookieValue('hawuser_id');
    displayData(currentPage, myCookieValue);
    GetByID(myCookieValue);
    document.getElementById("prev-btn").style.display = 'none';
    document.getElementById("btn_cancel").style.display = 'none';
    document.getElementById("btn_save").style.display = 'none';
}
//Lấy user đăng nhập
function getCookieValue(cookieName) {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return '';
}

//API của trang web
////GET
//Lấy danh sách đơn hàng của user
function GetAll(myCookieValue, startIndex, endIndex) {
    $.ajax({
        url: '/GetDS/' + myCookieValue,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (reponse) {
            alert("Lỗi");
        },
        success: function (reponse) {
            total = reponse.length;
            if (total <= rowsPerPage) {
                document.getElementById("next-btn").style.display = 'none';
                document.getElementById("prev-btn").style.display = 'none';
            }
            let table = '';
            for (var i = startIndex; i < endIndex; ++i) {
                let STT = i + 1;
                table = table + '<tr>'
                table = table + '<td style = "text-align: center">' + STT + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].ProductList + '</td>';
                table = table + '<td style="max-width : 80px;text-align: right;">' + reponse[i].order_total_price + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].Date + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].state_name + '</td>';
                if (reponse[i].state_id == 12) {
                    table = table + '<td style="max-width : 150px" > <button type="button" class="btn btn-danger" onclick="CancelOrder(\'' + reponse[i].order_id + '\')">Hủy đơn hàng</button></td>'
                } else {
                    table = table + '<td style="max-width : 150px">' + '</td>';
                }
                //Thêm nút hủy đơn nếu đơn đang chuẩn bị
                table = table + '<tr>'

                document.getElementById('data').innerHTML = table;
                document.getElementById('totalItem').innerHTML = 'Tổng số bản ghi: ' + total;
            }
        },
        fail: function (response) { }
    })
}
//Lấy thông tin profile
function GetByID(myCookieValue) {
    $.ajax({
        url: '/ProfileById/' + myCookieValue,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (reponse) {
            alert("Lỗi");
        },
        success: function (reponse) {
            var _res = reponse;
            $("#name").val(_res.user_name);
            $("#email").val(_res.user_email);
            $("#phone").val(_res.user_phone);
            $("#address").val(_res.user_address);
            $("#avatar-preview").attr("src", _res.avatar_img);

        },
        fail: function (response) { }
    })
}
//Đổi mật khẩu
function changePassWord() {
    var formData = new FormData();
    var myCookieValue = getCookieValue('hawuser_id');
    formData.append('user_id', Number(myCookieValue));
    formData.append('new_pass', $("#new_pass").val());
    $.ajax({
        type: 'POST',
        url: '/api/upload/password',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            alert('Thay đổi mật khẩu thành công, vui lòng đăng nhập lại để cập nhật sự thay đổi');
            $("#new_pass").val('');
            $("#confim_pass").val('');
            $("#old_pass").val('');

        },
        error: function (error) {
            alert('Thay đổi mật khẩu không thành công');
        }
    })
}
//Hủy đơn hàng
function CancelOrder(order_id) {
    var confirmation = confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
    if (confirmation) {
        var formData = new FormData();
        formData.append('order_id', Number(order_id));
        $.ajax({
            type: 'POST',
            url: '/api/upload/state_order',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                alert('Hủy đơn hàng thành công');
                var myCookieValue = getCookieValue('hawuser_id');
                displayData(1, myCookieValue);
            },
            error: function (error) {
                alert('Hủy đơn hàng không thành công');
            }
        })
    }

}

//Giao diện web
function prevBtn() {
    var myCookieValue = getCookieValue('hawuser_id');
    if (currentPage > 1) {
        currentPage--;
        displayData(currentPage, myCookieValue);
        document.getElementById("next-btn").style.display = 'inline';
        document.getElementById("prev-btn").style.display = 'inline';
    } if (currentPage - 1 <= 0) {
        //Trang đầu ẩn nút prev
        document.getElementById("prev-btn").style.display = 'none';
    }
}
function nextBtn() {
    var myCookieValue = getCookieValue('hawuser_id');
    const maxPage = Math.ceil(total / rowsPerPage);
    if (currentPage < maxPage) {
        currentPage++;
        displayData(currentPage, myCookieValue);
        document.getElementById("next-btn").style.display = 'inline';
        document.getElementById("prev-btn").style.display = 'inline';
    } if (currentPage + 1 > maxPage) {
        document.getElementById("next-btn").style.display = 'none';
    }
}
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
function displayData(page, myCookieValue) {
    var startIndex = (page - 1) * rowsPerPage;
    var pageInfo = document.getElementById('page-info');
    var endIndex = startIndex + rowsPerPage;
    if (endIndex > total && total != 0) endIndex = total;
    GetAll(myCookieValue, startIndex, endIndex);
    pageInfo.textContent = `Page ${currentPage}`;
}
function btn_edit() {
    $('input').prop('readonly', false);
    $('textarea').prop('readonly', false);
    document.getElementById("btn_cancel").style.display = 'inline';
    document.getElementById("btn_save").style.display = 'inline';
    document.getElementById("btn_edit").style.display = 'none';
    $("#btn_image").css("display", "inline");
}
function btn_cancel() {
    $('input').prop('readonly', true);
    $('textarea').prop('readonly', true);
    document.getElementById("btn_cancel").style.display = 'none';
    document.getElementById("btn_save").style.display = 'none';
    document.getElementById("btn_edit").style.display = 'inline';
    $("#btn_image").css("display", "none");
    //Lấy lại dữ liệu cũ
    reload(currentPage);
}
function btn_save() {
    saveProflie();
}
function Getimage() {
    document.getElementById('avatar').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const preview = document.getElementById('avatar-preview');
        let formData = new FormData();

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                var myCookieValue = getCookieValue('hawuser_id');
                preview.src = e.target.result;
                formData.append('image', file);
                formData.append('user_id', Number(myCookieValue));
                saveImageToAPI(formData);
            }
            reader.readAsDataURL(file);
        } else {
            preview.src = "placeholder.png"; // Ảnh mặc định nếu không chọn file
        }
    });
}
function btn_change() {
    if ($("#new_pass").val() == $("#confim_pass").val()) {
        if ($("#new_pass").val() != $("#old_pass").val()) {
            var confirmation = confirm("Bạn có chắc chắn muốn đổi mật khẩu không?");
            if (confirmation) {
                changePassWord();
            }
        }
        else alert("Pass mới không được giống Pass cũ");
    }
    else alert("Pass mới phải giống xác nhận mật khẩu mới");
}