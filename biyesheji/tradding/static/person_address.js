// person_address.js
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});	
function show_add () {
	add = document.getElementsByClassName("add-address-ctrl")[0];
	add_form = document.getElementById("new-address-form");
	cancle_add=document.getElementById("cancle_add");
	add.style.display='none';
	add_form.style.display="table-row";
	cancle_add.style.display="inline"
}
function cancleadd () {
	add = document.getElementsByClassName("add-address-ctrl")[0];
	add_form = document.getElementById("new-address-form");
	cancle_add=document.getElementById("cancle_add");
	add.style.display='table-row';
	add_form.style.display="none";
	cancle_add.style.display="none"
}
function isChinese (word) {
	var re = /[^\u4e00-\u9fa5]/; 
	if(re.test(word)) return false;
	else return true;
}
function check_username (name) {
	next_warn = name.nextElementSibling;
	next_warn.innerText="";
	if(name.value==""){
		next_warn.innerText="收货人姓名不能为空";
	}
	else if(isChinese(name.value)){
	}
	else{
		next_warn.innerText="收货人姓名要为中文";
	}
}
function check_tel (tel) {
	next_warn = tel.nextElementSibling;
	next_warn.innerText="";
	if(tel.value==""){
		next_warn.innerText="联系方式不能为空";
	}
	else if(tel.value.length!=11){
		next_warn.innerText="不是手机号码？请确认！";
	}
	else{
	}
}
function check_addr (addr) {
	next_warn = addr.nextElementSibling;
	next_warn.innerText="";
	if(addr.value==""){
		next_warn.innerText="收货地址不能为空";
	}
	else{
	}
}
function add_addr () {
	username = document.getElementById("username");
	telnum = document.getElementById("telnum");
	address = document.getElementById("address");
	isDefault = document.getElementById("isDefault");
	$.post('/tradding/personal_address/add',
		{
			address:username.value+"*_*"+telnum.value+"*_*"+address.value+"*_*"+isDefault.checked+"*_*"+document.getElementById("user_id").value
		},
		function(data, textStatus, xhr) {
		if(data==""){
			window.location.reload();
		}
        else if(data=="ok")
        {
        	alert('网络状况不好，请稍后尝试');
        }
	});
}
function show (t) {
	te = t.getElementsByClassName("setdefault")[0];
	te.style.display='block';
}
function close_edit () {
	document.getElementsByClassName("overlayer")[0].style.display='none';
	document.getElementById("popup-address").style.display='none';
}
function edit (addr_id) {
	document.getElementsByClassName("overlayer")[0].style.display='block';
	document.getElementById("popup-address").style.display='block';
	parent_td = document.getElementById(addr_id).parentNode;
	td = parent_td.nextElementSibling;
	edit_username = document.getElementById("edit_username");
	edit_telnum = document.getElementById("edit_telnum");
	edit_address = document.getElementById("edit_address");
	edit_username.value=td.children[0].innerText;
	edit_telnum.value = td.children[1].children[0].innerText;
	edit_address.value = td.children[3].innerText;
	document.getElementById("address_id").value=addr_id;
	// alert(edit_username);
}
function save_edit () {
	edit_username = document.getElementById("edit_username");
	edit_telnum = document.getElementById("edit_telnum");
	edit_address = document.getElementById("edit_address");
	$.post('/tradding/personal_address/change',
		{
			address:edit_username.value+"*_*"+edit_telnum.value+"*_*"+edit_address.value+"*_*"+document.getElementById("address_id").value
		},
		function(data, textStatus, xhr) {
		if(data==""){
			window.location.reload();
		}
        else if(data=="ok")
        {
        	alert('网络状况不好，请稍后尝试');
        }
	});
}
function set_default (addr_id) {
	$.post('/tradding/personal_address/set_default',
		{
			addr_id:addr_id
		},
		function(data, textStatus, xhr) {
		if(data==""){
			window.location.reload();
		}
        else if(data=="ok")
        {
        	alert('网络状况不好，请稍后尝试');
        }
	});
}
function delete_addr (addr_id) {
	$.post('/tradding/personal_address/delete',
		{
			addr_id:addr_id
		},
		function(data, textStatus, xhr) {
		if(data==""){
			window.location.reload();
		}
        else if(data=="ok")
        {
        	alert('网络状况不好，请稍后尝试');
        }
	});
}