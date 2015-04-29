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
function select_addr (address_id,a,input_id) {
	all_tr = document.getElementsByClassName("addr");
	for(var i=0;i<all_tr.length;i++){
		all_tr[i].className="addr hide";
	}
	sel=document.getElementById(address_id)
	sel.className="addr select_addr";
	a.className="modify-address hide";
	a.nextElementSibling.className="delete-address";
	document.getElementById("add_new_addr").className="add-address-ctrl hide";
	input = document.getElementById(input_id);
	input.className="select_input input_";
}
function re_select_addr (a) {
	all_tr = document.getElementsByClassName("addr");
	for(var i=0;i<all_tr.length;i++){
		all_tr[i].className="addr";
	}
	a.className="delete-address hide";
	a.previousElementSibling.className="modify-address";
	document.getElementById("add_new_addr").className="add-address-ctrl";
	all_input = document.getElementsByClassName("input_");
	for(var i=0;i<all_input.length;i++){
		all_input[i].className="input_";
	}
}
function add_order () {
	select_input = document.getElementsByClassName("select_input")[0];
	if(!select_input) alert("请先确认收货地址");
	else{
		address_id = select_input.value;
		goods_id = document.getElementById("goods_id").value;
		user_id = document.getElementById("user_id").value;
		goods_number = document.getElementById("J_IptAmount").value;
		additional = document.getElementById("supplement").value;
		// alert(goods_number);
		var data = new FormData();
		data.append('address_id',address_id);data.append('goods_id',goods_id);data.append('user_id',user_id);
		data.append('goods_number',goods_number);data.append('additional',additional);
		$.ajax({
			url: '/tradding/order/confirm_order',
			type: 'POST',
			cache:false,
			contentType:false,
			processData:false,
			data: data,
			success:function  (data) {
				if(data=="ok"){
					alert("网络状态不好，请稍后重试");
				}
				else{
					window.location.href="/tradding/order";
				}
			}
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}
}
function confirm_tradding (order_id) {
	$.post('/tradding/order/confirm_tradding',
		{
			order_id:order_id
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
function cancle_tradding (order_id) {
	$.post('/tradding/order/cancle_tradding',
		{
			order_id:order_id
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

function show_add_courier (order_id) {
	document.getElementsByClassName("overlayer")[0].style.display='block';
	document.getElementById("popup-address").style.display='block';
	document.getElementById("order_id").value=order_id;
}
function add_courier () {
	courier = document.getElementById("courier");
	index = courier.selectedIndex;
	company = courier.options[index].value;
	express_id = document.getElementById("express_id").value;
	order_id=document.getElementById("order_id").value;
	var data = new FormData();
	data.append('order_id',order_id);
	data.append('company',company);
	data.append('express_id',express_id);
	$.ajax({
		url: '/tradding/seller/courier/add_courier',
		type: 'POST',
		cache:false,
		contentType:false,
		processData:false,
		data: data,
		success:function  (data) {
			if(data=="ok"){
				alert("网络状态不好，请稍后重试");
			}
			else{
				window.location.href="/tradding/seller/courier";
			}
		}
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}
function init_a () {
	all_span = document.getElementsByClassName("commstar");
	for(var i=0;i<all_span.length;i++){
		all_children_a = all_span[i].children;
		for (var j = 0; j < all_children_a.length; j++) {
			// alert(all_children_a.length);
			all_children_a[j].onclick=function () {
				 active_a (this);
			}
		};
	}
}
function active_a (a) {
	parentNode = a.parentNode;
	all_children_a = parentNode.children;
	for (var i = 0; i < all_children_a.length; i++) {
		all_children_a[i].className = all_children_a[i].className.replace(" active","");
	};
	a.className=a.className+" active";
}
function submit_evaluation () {
	all_active = document.getElementsByClassName("active");
	data = new FormData();
	if(all_active.length<6) alert("亲爱的，你还有没评价的项哦");
	else{
		for (var i = 0; i < all_active.length; i++) {
			parentNode = all_active[i].parentNode;
			input = parentNode.nextElementSibling;
			data.append(input.name,all_active[i].className.replace("star","").replace(" active",""));
		};
	}
	order_id=document.getElementById("order_id").value;
	service_evaluate = document.getElementById("service_evaluate").value;
	goods_evaluate = document.getElementById("goods_evaluate").value;
	// alert(goods_evaluate);
	data.append('order_id',order_id);data.append('goods_evaluate',goods_evaluate);data.append('service_evaluate',service_evaluate);
	$.ajax({
		url: '/tradding/evaluate/add_evaluation',
		type: 'POST',
		cache:false,
		contentType:false,
		processData:false,
		data: data,
		success:function  (data) {
			if(data=="ok"){
				alert("网络状态不好，请稍后重试");
			}
			else{
				window.location.reload();
			}
		}
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}