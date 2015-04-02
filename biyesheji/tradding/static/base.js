// base.js
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
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}
var currentIndex = 1;
function slideTo (index) {
	if(index=="-") currentIndex = (currentIndex-1)<1?(currentIndex-1+8):(currentIndex-1);
	else if(index=="+") currentIndex = (currentIndex+1)>8?(currentIndex+1-8):(currentIndex+1);
	else currentIndex = parseInt(index);
	// alert(currentIndex);
	var ul = document.getElementById("slidecontent").childNodes;
	for(var i=0;i<ul.length;i++){
		// alert(ul[i].childNodes[0].name);
		if(ul[i].childNodes[0].name=="f_"+currentIndex){
			ul[i].style.zIndex=2;
			ul[i].style.opacity=1.0;
		}
		else{
			ul[i].style.zIndex=1;
			ul[i].style.opacity=0;
		}
	}
	var ul_b = document.getElementById("slidelabel_nav").childNodes;
	for (var i = 0; i < ul_b.length; i++) {
		if(parseInt(ul_b[i].textContent)==currentIndex){
			ul_b[i].className="on";
		}
		else ul_b[i].className="";
	}	
}
var curNum=0;
function slideToS (index) {
	var ul = document.getElementById("tehui").children;
	if(curNum+index<0) curNum=7;
	else if(curNum+index>7) curNum=0;
	else curNum = curNum+index;
	// alert(curNum);
	for (var i = 1; i < ul.length; i++) {
		if(i==curNum){
			ul[i].style.zIndex=2;
			ul[i].style.opacity=1.0;
		}
		else {
			ul[i].style.zIndex=1;
			ul[i].style.opacity=0;
		}
	};
}
function init () {
	//中间左边
	var arrs=document.getElementsByClassName("n_b");
	for(var i=0;i<arrs.length;i++){
		arrs[i].onmouseover = function  () {
			var t=document.getElementsByClassName("n_b");
			//alert(t.length);
			for(var j=0;j<t.length;j++){
				//alert(t[j].attributes['data-submenu-id'].value);
				document.getElementById(t[j].attributes['data-submenu-id'].value).style.display="none";
				removeClass(t[j],"on");				
			}
			addClass(this,"on");
			document.getElementById(this.attributes['data-submenu-id'].value).style.display="block";
		}
		arrs[i].onmouseout = function  () {
			removeClass(this,"on");
			document.getElementById(this.attributes['data-submenu-id'].value).style.display="none";
		}
	}
	var arrss=document.getElementsByClassName("new_pub_nav_pop");
	for(var i=0;i<arrss.length;i++){
		arrss[i].onmouseover = function  () {
			var s = "li_label_"+this.id.replace("__ddnav_sort","");
			// alert(s);
			addClass(document.getElementById(s),"on");
			this.style.display="block";
		}
		arrss[i].onmouseout = function  () {
			var s = "li_label_"+this.id.replace("__ddnav_sort","");
			// alert(s);
			removeClass(document.getElementById(s),"on");
			this.style.display="none";
		}
	}
	//中间的中间
	// var btn_l = document.getElementById("btn_l");
	// var btn_r = document.getElementById("btn_r");
	// btn_l.onclick = function  () {
	// 	slideTo("-");
	// }
	// btn_r.onclick = function  () {
	// 	slideTo("+");
	// }
	// var ul = document.getElementById("slidelabel_nav").childNodes;
	// for (var i = 0; i < ul.length; i++) {
	// 	ul[i].onmouseover = function  () {
	// 		slideTo(this.textContent);
	// 	}
	// };	
	// setInterval(function  () {
	// 	if(currentIndex+1>8) currentIndex=0;
	// 	slideTo(currentIndex+1);
	// },3000);
	var c_left = document.getElementById("c_left");
	var c_right = document.getElementById("c_right");
	c_left.onclick = function  () {
		slideToS(-1);
	}
	c_right.onclick = function  () {
		slideToS(1);
	}
	setInterval(function  () {
		if(curNum+1>8) curNum=0;
		slideToS(curNum+1);
	},4000);
	//中间的左边
	var cxgg_title = document.getElementById("cxgg_title");
	var fwgg_title = document.getElementById("fwgg_title");
	var cxgg_content = document.getElementById("cxgg_content");
	var fwgg_content = document.getElementById("fwgg_content");
	cxgg_title.onmouseover = function  () {
		cxgg_content.style.left = "0px";
		fwgg_content.style.left = "233px";
		addClass(cxgg_title,"on");
		removeClass(fwgg_title,"on");
	}
	fwgg_title.onmouseover = function  () {
		cxgg_content.style.left = "-233px";
		fwgg_content.style.left = "0px";
		addClass(fwgg_title,"on");
		removeClass(cxgg_title,"on");
	}
	setInterval(function  () {
		if(hasClass(cxgg_title,"on")){
			cxgg_content.style.left = "-233px";
			fwgg_content.style.left = "0px";
			addClass(fwgg_title,"on");
			removeClass(cxgg_title,"on");
		}
		else{
			cxgg_content.style.left = "0px";
			fwgg_content.style.left = "233px";
			addClass(cxgg_title,"on");
			removeClass(fwgg_title,"on");
		}
	},4000)
}
window.onload = init;
function li_On (a,b,c) {
	// body...
}
function li_Out (a,b,c) {
	// body...
}