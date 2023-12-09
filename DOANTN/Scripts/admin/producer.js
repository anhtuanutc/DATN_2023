$(document).ready(function () {
    Laystate();
    GetAll();
});
function checkprodcer() {
    if ($("input[name='producer_id1']").val() == '') {
        alert("Vui lòng nhập mã nhà sản xuất");
    } else if ($("input[name='producer_name1']").val() == '') {
        alert("vui lòng nhập tên nhà sản xuất");
    } else if ($("input[name='producer_address1']").val() == '') {
        alert("vui lòng nhập địa chỉ");
    } else {
        addproducer();
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
                table = table + '<hr>'
                table = table + '<option value="' + reponse[i].state_id + '">' + reponse[i].state_name + '</option>'
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
                $("stateEdit").val(res.state)

        },
        fail: function (response) { }
    })
}
function GetAll() {
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
            let table = '';
            for (var i = 0; i < len; ++i) {
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