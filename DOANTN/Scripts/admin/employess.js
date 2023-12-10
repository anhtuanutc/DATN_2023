const rowsPerPage = 5;
let currentPage = 1;
var total = 0;
$(document).ready(function () {
    displayData(currentPage);
    document.getElementById("prev-btn").style.display = 'none';
});
function LaytheomaTB(admin_id) {
    $.ajax({
        url: '/getadmin/' + admin_id,
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        error: function (res) {
            alert("Lỗi mã");
        },
        success: function (res) {
            $("#txtThietBi").val(res.admin_id),
                $("#txtTen").val(res.admin_name),
                $("#txtEmail").val(res.admin_email),
                $("#txtDienThoai").val(res.admin_phone),
                $("#txtPass").val(res.admin_password),
                $('#value2_edit').val(res.admin_isEmployee.toString())
        },
        fail: function (response) { }
    })
}
function check(check_add) {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (check_add == 1) {
        var mobile = $('#txtPhone').val();
        var email = $('#txtEmail1').val();
        if ($("input[name='Ten1']").val() == '') {
            return alert("vui lòng nhập tên Nhân viên");
        } else if ($("input[name='Email1']").val() == '') {
            return alert("vui lòng nhập email");
        } else if (emailRegex.test(email) == false) {
            return alert("Email không đúng định dạng!");
        } else if (mobile == '') {
            return alert("vui lòng nhập sdt");
        } else if (vnf_regex.test(mobile) == false) {
            return alert('Số điện thoại của bạn không đúng định dạng!');
        } else if ($("input[name='DiaChi1']").val() == '') {
            return alert("vui lòng nhập Mật Khẩu");
        } else {
            return true;
        }
    } else {
        var mobile= $('#txtDienThoai').val();
        var email = $('#txtEmail').val();
        if ($("input[name='Ten']").val() == '') {
            return alert("vui lòng nhập tên Nhân viên");
        } else if ($("input[name='Email']").val() == '') {
            return alert("vui lòng nhập email");
        } else if (emailRegex.test(email) == false) {
            return alert("Email không đúng định dạng!");
        } else if (mobile == '') {
            return alert("vui lòng nhập sdt");
        } else if (vnf_regex.test(mobile) == false) {
            return alert('Số điện thoại của bạn không đúng định dạng!');
        } else if ($("input[name='DiaChi']").val() == '') {
            return alert("vui lòng nhập Mật Khẩu");
        } else {
            return true;
        }
    }
    
}
function GetAll(startIndex, endIndex) {
    $.ajax({
        url: '/LayTaiKhoan/',
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
                table = table + '<td>' + reponse[i].admin_id + '</td>';
                table = table + '<td style="max-width : 200px">' + reponse[i].admin_name + '</td>';
                table = table + '<td style="max-width : 150px">' + reponse[i].admin_email + '</td>';
                table = table + '<td style="max-width : 150px">' + reponse[i].admin_phone + '</td>';
                table = table + '<td style="max-width : 150px">' + reponse[i].admin_password + '</td>';
                table = table + '<td style="max-width : 150px">' + reponse[i].admin_isEmployee + '</td>';
                table = table + '<td style="max-width : 150px" > <button type="button" class="btn btn-danger" onclick="HienThiSua(),LaytheomaTB(\'' + reponse[i].admin_id + '\')">Sửa</button> <button type="button" class="btn btn-danger" onclick="XoaContact(\'' + reponse[i].admin_id + '\')">Xóa</button></td>';
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
function Getimage() {
    document.getElementById('avatar').addEventListener('change', function (e) {
        const file = e.target.files[0];
        const preview = document.getElementById('avatar-preview');
        let formData = new FormData();

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                var myCookieValue = getCookieValue('Employee');
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