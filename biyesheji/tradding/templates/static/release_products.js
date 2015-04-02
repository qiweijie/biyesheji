// release_products.js
function check_title (title) {
	title.nextElementSibling.innerText = 30-title.value.length;
	if(title.value.length>30){
		title.value=title.value.substring(0,30)
		title.nextElementSibling.innerText = 0;
	}
}
function check_special (special) {
	special.nextElementSibling.innerText = 150-special.value.length;
	if(special.value.length>150){
		special.value=special.value.substring(0,150)
		special.nextElementSibling.innerText = 0;
	}
}
function check_price (price) {
	// var t = /^[1-9]?[0-9]*\.[0-9]*$/;
	if(!isNaN(price.value)){
		price.nextElementSibling.nextElementSibling.innerText="";
	}
	else{
		price.nextElementSibling.nextElementSibling.innerText="只能填数字（包含小数）";
		this.value="";
	}
}
function check_num (num) {
	var t = /^[1-9]?[0-9]*$/;
	if(t.test(num.value)){
		num.nextElementSibling.nextElementSibling.innerText="";
	}
	else{
		num.nextElementSibling.nextElementSibling.innerText="只能填整数";
		this.value="";
	}
}
function submit_photo () {
	var data = new FormData();
	$.each($("#inputfile")[0].files, function(i, file) {
		data.append('upload_file',file);
	});
	data.append('user_id',document.getElementById("user_id").value);
	$.ajax({
		url: '/tradding/products/upload_photo',
		type: 'POST',
		data: data,
		cache:false,
		contentType:false,
		processData:false,
		success:function  (data) {
			document.getElementById("J_Multimage").innerHTML = data;
			// document.getElementById("submit_product").disabled=false;
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
function submit_pro () {
	title = document.getElementById("product_title").value;
	special = document.getElementById("product_special").value;
	price = document.getElementById("product_price").value;
	number = document.getElementById("product_number").value;
	discription = tinyMCE.activeEditor.getContent();
	var data = new FormData();
	data.append('title',title);data.append('special',special);data.append('price',price);data.append('number',number);
	data.append('discription',discription);data.append('user_id',document.getElementById("user_id").value);
	goods_id = document.getElementById("goods_id").value;
	if(goods_id!=""){
		data.append('goods_id',goods_id);
	}
	$.ajax({
		url: '/tradding/products/release_products',
		type: 'POST',
		data: data,
		cache:false,
		contentType:false,
		processData:false,
		success:function  (data) {
		 	window.location.reload();
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
function offsale_goods (goods_id) {
	$.post('/tradding/products/offsale_goods',
		{
			goods_id:goods_id
		},
		 function(data, textStatus, xhr) {
		 	window.location.reload();
	});
}
function onsale_goods (goods_id) {
	$.post('/tradding/products/onsale_goods',
		{
			goods_id:goods_id
		},
		 function(data, textStatus, xhr) {
			window.location.reload();
	});
}
function delete_goods (goods_id) {
	$.post('/tradding/products/delete_goods',
		{
			goods_id:goods_id
		},
		 function(data, textStatus, xhr) {
			window.location.reload();
	});
}
function resale_goods (goods_id) {
	$.post('/tradding/products/resale_goods',
		{
			goods_id:goods_id
		},
		 function(data, textStatus, xhr) {
			window.location.reload();
	});
}
