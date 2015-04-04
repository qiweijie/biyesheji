// person.js
function checkPassword(b){
	var a=new Object();
	if(isEmptyPassword(b)){
		a.success=false;
	a.msg="请输入6-20位密码。";
	return a
	}
	if(isTooShort(b)){
		a.success=false;
		a.msg="请输入6-20位密码。";
	return a
	}
	if(isAllSameChars(b)){
		a.success=false;
		a.msg="不能为同一字符！";
	return a
	}
	if(hasAllIncreaseChars(b)||hasAllDecreaseChars(b)){
		a.success=false;
		a.msg="不能输入连续字符！";
	return a
	}
	if(isAllNum(b)){
		a.success=false;
		a.msg="不能为纯数字！";
	return a
	}
	if(isAllLetter(b)){
		a.success=false;
		a.msg="不能为纯字母！";
	return a
	}
	if(isAllSymbol(b)){
		a.success=false;
		a.msg="不能为纯符号！";
	return a
	}
	if(hasIllegalSymbol(b)){
		a.success=false;
		a.msg="密码只能由英文、数字及符号组成。";
	return a
	}
	a.success=true;
	a.msg="OK.";
	return a
}
function isEmptyPassword(a){
	return a==null||a.length==0}

	function isTooShort(a){
	return a.length<6}

	function hasNum(b){
	var a=/\d/;
	return a.test(b)}

	function isAllNum(b){
		var a=/^\d+$/;
	return a.test(b)}

	function hasLetter(b){
		var a=/[a-zA-Z]/;
	return a.test(b)}

	function isAllLetter(b){
		var a=/^[a-zA-Z]+$/;
	return a.test(b)}

	function hasSymbol(b){
		var a=/[^0-9a-zA-Z\s<>;'\\]/;
return a.test(b)
}
function isAllSymbol(b){
	var a=/^[^0-9a-zA-Z\s<>;'\\]+$/;
return a.test(b)
}
function hasSpace(b){
	var a=/\s/g;
	return a.test(b)}

	function hasIllegalSymbol(c){
		var b=/[\s<>;'\\]/;
var a=/[\u4e00-\u9fa5]/;
return b.test(c)||a.test(c)
}
function isAllSameChars(d){
	if(d==null||d.length<2){
	return false;}
	var c=d.charCodeAt(0);
var b=1;
for(b=1;
	b<d.length;
b++){
	var a=d.charCodeAt(b);
	if(a!=c){
		return false}

	}

	return true}

function hasRepeat6Chars(b){
		var a=/(.)\1\1\1\1\1/;
	return a.test(b)}

function hasIncrease6Chars(e){
	if(e==null||e.length<6){
		return false}
	var d=e.charCodeAt(0);
	var c=1;
	var b=1;
	for(b=1;b<e.length;b++){
		var a=e.charCodeAt(b);
		if(a==d+1){
			c++;
		if(c>=6){
			return true}
		}
		else{c=1}

			d=a
	}
	return false
}
function hasDecrease6Chars(e){
		if(e==null||e.length<6){
		return false}
		var d=e.charCodeAt(0);
	var c=1;
	var b=1;
	for(b=1;b<e.length;b++){
		var a=e.charCodeAt(b);
		if(a==d-1){
			c++;
			if(c>=6){
			return true
			}
		}
		else{		c=1}
			d=a
		}

	return false
}
function hasAllIncreaseChars(f){
		if(f==null){
		return false}
		var d=f.length;
var e=f.charCodeAt(0);
var c=1;
var b=1;
for(b=1;
	b<f.length;
b++){
	var a=f.charCodeAt(b);
	if(a==e+1){
		c++;
	if(c>=d){
		return true}
	}
	else{		c=1}
		e=a}
		return false
}
function hasAllDecreaseChars(f){
		if(f==null){
		return false}

		var d=f.length;
var e=f.charCodeAt(0);
var c=1;
var b=1;
for(b=1;
	b<d;
b++){
	var a=f.charCodeAt(b);
	if(a==e-1){
		c++;
	if(c>=d){
		return true}

	}

	else{
		c=1}

		e=a}

		return false}
function checkPasswordStrength(b){
		var a="A";
	if(isTooShort(b)){
		a="A"}
	else{
		if(hasNum(b)&&hasLetter(b)&&hasSymbol(b)){
		a="C"}
		else{
			if(hasNum(b)&&hasLetter(b)){
			a="B"}
			else{
				if(hasNum(b)&&hasSymbol(b)){
				a="B"}
				else{
					if(hasSymbol(b)&&hasLetter(b)){
					a="B"}
					else{
						if(isAllNum(b)||isAllLetter(b)||isAllSymbol(b)){
						a="A"
						}}
				}
			}
		}
	}
	return a
}

function allCategoryShow () {
	var t=document.getElementById("search_all_category");
	t.style.border="1px solid #c8c8c8";
	t.style.height="286px";
}
function allCategoryHide () {
	var t=document.getElementById("search_all_category");
	t.style.border="0px";
	t.style.height="0px";
}
function key_onclick () {
	var t = document.getElementById("label_key");
	t.style.color="rgb(255, 255, 255)";
}
function key_onblur () {
	var t = document.getElementById("label_key");
	t.style.color="rgb(102, 102, 102)";
}
function selectCategory () {
	// body...
}
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
function change() {
	// nickname = document.getElementById("nickname");
	nickname = document.getElementsByClassName("nickname")[0];
	change_nickname=document.getElementById("change_nickname");
	ensure_nickname=document.getElementById("ensure_nickname");
	cancle_nickname=document.getElementById("cancle_nickname");
	input_nickname =document.getElementById("input_nickname");
	nickname.style.display='none';
	change_nickname.style.display='none';
	input_nickname.style.display = 'inline-block';
	ensure_nickname.style.display='inline-block';
	cancle_nickname.style.display='inline';
}
function cancle () {
	// nickname = document.getElementById("nickname");
	nickname = document.getElementsByClassName("nickname")[0];
	change_nickname=document.getElementById("change_nickname");
	ensure_nickname=document.getElementById("ensure_nickname");
	cancle_nickname=document.getElementById("cancle_nickname");
	input_nickname =document.getElementById("input_nickname");
	nickname.style.display='inline';
	change_nickname.style.display='inline';
	input_nickname.style.display = 'none';
	ensure_nickname.style.display='none';
	cancle_nickname.style.display='none';
}
function check (name) {
	ensure_nickname=document.getElementById("ensure_nickname");
	if(name.value.length>1 && name.value.length<16){
		ensure_nickname.disabled=false;
	}
}
function ensure (name) {
	// nickname = document.getElementById("nickname");
	nickname = document.getElementsByClassName("nickname")[0];
	change_nickname=document.getElementById("change_nickname");
	ensure_nickname=document.getElementById("ensure_nickname");
	cancle_nickname=document.getElementById("cancle_nickname");
	input_nickname =document.getElementById("input_nickname");
	var da=document.getElementById("input_nickname").value+"*_*"+document.getElementsByClassName("userid")[0].innerText;
	$.post('/tradding/personal_center/change', 
        {
        	nickname:da
        },
         function(data, textStatus, xhr) {
        /*optional stuff to do after success */
        if(data=="")
        {
        	nickname.innerHTML="alert('网络状况不好，请稍后尝试')";
        }
        else
        {
        	nickname.innerText=data;
        }
    });
	nickname.style.display='inline';
	change_nickname.style.display='inline';
	input_nickname.style.display = 'none';
	ensure_nickname.style.display='none';
	cancle_nickname.style.display='none';
}
function close_ () {
	document.getElementById("popup-modifypsw").style.display='none';
	document.getElementById("popup-modifytel").style.display='none';
	document.getElementById("popup-modifyemail").style.display='none';
	document.getElementsByClassName("overlayer")[0].style.display='none';
}
function show () {
	document.getElementById("popup-modifypsw").style.display='block';
	document.getElementsByClassName("overlayer")[0].style.display='block';
}
function checkNow (p) {
	if(p.value=="") return;
	errorA = checkPassword(p.value);
	e=document.getElementById("normalReg_password_tip1");
	if(errorA.msg!="OK."){
		e.innerText=errorA.msg;	
		document.getElementById("normalReg_password_icon1").style.display="none";	
	}
	else{
		e.innerText="";	
		// document.getElementById("normalReg_password_icon1").style.display="block";
	}
	e.className="input-tip c-error";
}
function checkP (p) {
	if(p.value=="") return;
	errorA = checkPassword(p.value);
	e=document.getElementById("normalReg_password_tip");
	if(errorA.msg!="OK."){
		e.innerText=errorA.msg;	
		document.getElementById("normalReg_password_icon").style.display="none";	
	}
	else{
		e.innerText="";	
		document.getElementById("normalReg_password_icon").style.display="block";
	}
	e.className="input-tip c-error";
}
function comfirmP(p){
	document.getElementById("normalReg_passwordVerify_icon").style.display="none";
	if(p.value=="") return;
	np=document.getElementById("normalReg_password");
	e = document.getElementById("normalReg_passwordVerify_tip");
	if(p.value==np.value){
		e.innerText="";	
		document.getElementById("normalReg_passwordVerify_icon").style.display="block";
	}
	else{
		e.innerText="您两次输入的密码不一致，请重新输入。";	
		document.getElementById("normalReg_passwordVerify_icon").style.display="none";
	}
	if(document.getElementById("normalReg_password_icon").style.display=='block'
		&&document.getElementById("normalReg_passwordVerify_icon").style.display=='block')
		document.getElementById("J-doresetpassword").disabled=false;
}
function change_pwd () {
	now_pwd = document.getElementById("normalReg_password1").value;
	new_pwd = document.getElementById("normalReg_password").value;
	pwd = now_pwd+"*_*"+new_pwd+"*_*"+document.getElementsByClassName("userid")[0].innerText;
	$.post('/tradding/personal_center/change', 
        {
        	pwd:pwd
        },
         function(data, textStatus, xhr) {
        /*optional stuff to do after success */
        if(data=="")
        {
        	close_();
			alert("ok");
        }
        else if(data=="ok")
        {
        	alert('网络状况不好，请稍后尝试');
        }
        else if(data=="error")
        {
        	alert("原密码错误！请重新输入")
        }
    });
}
function show_attach () {
	document.getElementById("popup-modifytel").style.display='block';
	document.getElementsByClassName("overlayer")[0].style.display='block';
}
function checkNow2 (p) {
	if(p.value=="") return;
	errorA = checkPassword(p.value);
	e=document.getElementById("normalReg_password_tip2");
	if(errorA.msg!="OK."){
		e.innerText=errorA.msg;	
		document.getElementById("normalReg_password_icon2").style.display="none";	
	}
	else{
		e.innerText="";	
		// document.getElementById("normalReg_password_icon2").style.display="block";
	}
	e.className="input-tip c-error";
}
function check_phone (tel) {
	if(tel.value.length!=11){
		alert("请输入11位手机号码");
	}
	else{
    	document.getElementById("normalReg_username_icon").style.display='block';
	}
	if(document.getElementById("normalReg_username_icon").style.display=='block')
		document.getElementById("doresetpassword").disabled=false;
}
function attach_tel () {
	now_pwd = document.getElementById("normalReg_password2").value;
	phone_number = document.getElementById("phonenumber").value;
	tel_num = now_pwd+"*_*"+phone_number+"*_*"+document.getElementsByClassName("userid")[0].innerText;
	$.post('/tradding/personal_center/change', 
        {
        	tel_num:tel_num
        },
         function(data, textStatus, xhr) {
        /*optional stuff to do after success */
        if(data=="")
        {
        	close_();
        	document.getElementById("phone_number").innerText=phone_number;
			alert("ok");
        }
        else if(data=="ok")
        {
        	alert('网络状况不好，请稍后尝试');
        }
        else if(data=="error")
        {
        	alert("原密码错误！请重新输入")
        }
    });
}
function show_email () {
	document.getElementById("popup-modifyemail").style.display='block';
	document.getElementsByClassName("overlayer")[0].style.display='block';
}
function checkNow3 (p) {
	if(p.value=="") return;
	errorA = checkPassword(p.value);
	e=document.getElementById("normalReg_password_tip3");
	if(errorA.msg!="OK."){
		e.innerText=errorA.msg;	
		document.getElementById("normalReg_password_icon3").style.display="none";	
	}
	else{
		e.innerText="";	
		// document.getElementById("normalReg_password_icon3").style.display="block";
	}
	e.className="input-tip c-error";
}
function checkE(e){
	 var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/; 
	 if(e.value=="") {document.getElementById("normalReg_email_tip").innerText="";
	 	return;}
	 if(pattern.test(e.value)){
		document.getElementById("normalReg_email_tip").innerText="";
		document.getElementById("normalReg_email_icon").style.display="block";
		document.getElementById("email").disabled=false;
	 }
	 else{
		document.getElementById("normalReg_email_tip").innerText="您的邮箱格式不正确，请重新输入";
		document.getElementById("normalReg_email_icon").style.display="none";
	 }
}
function bundle_email () {
	now_pwd = document.getElementById("normalReg_password3").value;
	email = document.getElementById("normalReg_email").value;
	email_ = now_pwd+"*_*"+email+"*_*"+document.getElementsByClassName("userid")[0].innerText;
	$.post('/tradding/personal_center/change', 
        {
        	email:email_
        },
         function(data, textStatus, xhr) {
        /*optional stuff to do after success */
        if(data=="")
        {
        	close_();
        	document.getElementById("e_mail").innerText=email;
			alert("相关信息已发到验证邮箱，请注意查收");
        }
        else if(data=="ok")
        {
        	alert('网络状况不好，请稍后尝试');
        }
        else if(data=="error")
        {
        	alert("原密码错误！请重新输入")
        }
    });
}

function delete_fav (fav_id) {
	$.post('/tradding/favorite/delete_fav',
		{
			fav_id:fav_id+"*_*"+document.getElementById("user_id").value
		}, function(data, textStatus, xhr) {
			if(data==""){
				window.location.reload();				
			}
	        else if(data=="ok")
	        {
	        	alert('网络状况不好，请稍后尝试');
	        }
		});	
}
function delete_browsed (browsed_id) {
	$.post('/tradding/browsed/delete',
		{
			browsed_id:browsed_id+"*_*"+document.getElementById("user_id").value
		}, function(data, textStatus, xhr) {
			if(data==""){
				window.location.reload();				
			}
	        else if(data=="ok")
	        {
	        	alert('网络状况不好，请稍后尝试');
	        }
		});	
}
function delete_cart_pro (cart_pro_id) {
	$.post('/tradding/shopping_cart/delete_cart_pro',
		{
			cart_pro_id:cart_pro_id+"*_*"+document.getElementById("user_id").value
		}, function(data, textStatus, xhr) {
			if(data==""){
				window.location.reload();				
			}
	        else if(data=="ok")
	        {
	        	alert('网络状况不好，请稍后尝试');
	        }
		});	
}
function buy (goods_id) {
	var form = document.getElementById("add_order");
	form.submit();
}