// product.js

function big (img_id) {
	imgs = document.getElementsByClassName("goods_img");
	for(var i = 0; i < imgs.length;i++){
		imgs[i].style.zIndex = "1";
	}
	imgs = document.getElementsByClassName("small_img");
	for(var i = 0; i < imgs.length;i++){
		imgs[i].style.border = 'none';
	}
	document.getElementById("big"+img_id).style.zIndex="2";
	document.getElementById(img_id).style.border = 'solid';
}
function reduce_one () {
	amount = document.getElementById("J_IptAmount");
	if(amount.value<=1) {
		document.getElementById("J_Reduce").className="tb-reduce  tb-iconfont tb-disable-reduce"
		return;
	}
	amount.value = amount.value-1;
	if(amount.value<=1) {
		document.getElementById("J_Reduce").className="tb-reduce  tb-iconfont tb-disable-reduce"
		return;
	}
}
function increase_one () {
	amount = document.getElementById("J_IptAmount");
	amount.value = amount.value-1+2;
	if(amount.value>1) {
		document.getElementById("J_Reduce").className="tb-reduce  tb-iconfont"
		return;
	}
}
function amount_change (a) {
	// alert(a.value);
	if(a.value<=1){
		document.getElementById("J_Reduce").className="tb-reduce  tb-iconfont tb-disable-reduce"
	}
	else{
		document.getElementById("J_Reduce").className="tb-reduce  tb-iconfont "
	}
}
function bool_login () {
	user_id = document.getElementById("user_id").value;
	if(user_id) return user_id;
	else return false;
}
function add_fav (user_id) {
	if(bool_login()){
		$.post('/tradding/favorite/add_fav', 
		{
			add_fav: user_id+"*_*"+bool_login()
		}
		, function(data, textStatus, xhr) {			
        if(data=="")
        {
        	alert("已经收藏好了，主人^_^");
        }
        else if(data=="ok")
        {
        	alert('网络状况不好，请稍后尝试');
        }
		});
	}
	else alert('主人，你还没登陆呢。。。');
}

function add_pro (user_id) {
	if(bool_login()){
		$.post('/tradding/shopping_cart/add_pro', 
		{
			add_pro: user_id+"*_*"+bool_login()
		}
		, function(data, textStatus, xhr) {			
        if(data=="")
        {
        	alert("已经妥妥的放入购物车了，主人^_^");
        }
        else if(data=="ok")
        {
        	alert('网络状况不好，请稍后尝试');
        }
		});
	}
	else alert('主人，你还没登陆呢。。。');
}