var ch = ch ||{};

ch.init = function(){
	ch.lotId = "lot001";
	$("#tab").change(function(){
		ch.lotId = $(this).val()
		$(".lot-box").hide();
		$("#"+ch.lotId).show();
		$(".box-ico").attr("class","box-ico "+ch.lotId)
		ch.luncBtn(ch.lotId);
	})
	
	$("#lotTab li").click(function(){
		var inx = $("#lotTab li").index($(this))
		ch.lotId = ["lot001","lot113","lot106","lot107"][inx];
		$("#lotTab li").removeClass("hover");
		$(this).addClass("hover")
		$("#lotName").html($(this).html())
		$(".lot-box").hide();
		$("#"+ch.lotId).show();
		$(".box-ico").attr("class","box-ico "+ch.lotId)
		ch.luncBtn(ch.lotId);
	})
	
	
	
	
	
	$(".sssq").click(function(){ch.luncBtn(ch.lotId)})
	$(".buy").click(function(){ch.buyBtn(ch.lotId)})
	$("#"+ch.lotId).show();
	ch.luncBtn("lot001")
}
ch.luncBtn = function(lotId){
	ch.lotId = lotId ;
	ch.luckTimer = false;
	ch.i = 0 ;
	ch.luckTimer = setInterval(ch.luckFn,30)
}
ch.luckFn = function(){
	if (ch.i >= 20){
		clearTimeout(ch.luckTimer);
	}else{
		ch.ball=ch.getBall(ch.lotId);
		ch.setBall(ch.ball,ch.lotId);
	}
	ch.i++;
}
ch.random = function(arr, n){
	var arr = arr.slice(),re=[],n=n||1;
	for (var i=0 ; i<n ; i++){
		var t=r(arr.length);
		re.push(arr[t]);
		arr.splice(t,1);
	}
	function r( n,m ){
		return Math.floor( Math.random() * ( n || 9999 ) + ( m || 0 ) );
	}
	return re.length==1?re[0]:re;
}
ch.create = function (n, len, b){
	var arr = [],b=b||1;
	for (var i=n; i<=len * b; i+=b) arr.push(i);
	return arr;
}
ch.getBall = function(lotId){
	return {
		"lot001":function(){return ch.random(ch.create(1,32),6).concat(ch.random(ch.create(1,16),1))},
		"lot113":function(){return ch.random(ch.create(1,35),5).concat(ch.random(ch.create(1,12),2))},
		"lot106":function(){return ch.random(ch.create(1,11),5)},
		"lot107":function(){return ch.random(ch.create(1,11),5)}
	}[lotId]()
}
ch.setBall = function(ball,lotId){
	for (var i = 0, len = ball.length; i < len; i++){
		$("#"+lotId+" .ball span:eq("+i+")").html(ch.format(ball[i],2));
	}
}
//数字前补零
ch.format = function (val,len){
		var len=len||1
		return Array(len).join("0").concat(val).slice(-len);
}
ch.buyBtn = function(lotId){
	var ball = []
	$("#"+lotId+" .ball span").each(function(i) {
		ball.push($(this).html());
	});
	
	if (lotId == "lot001"){
		var ball1 = ball.slice().splice(0,6);
		var ball2 = ball.slice().splice(6,1);
		window.open("/ssq/?nbs="+ball1.join("O")+"A"+ball2.join("O")+"&type=0002#xhk");
	}
	
	if (lotId == "lot113"){
		var ball1 = ball.slice().splice(0,5);
		var ball2 = ball.slice().splice(5,2);
		window.open("/dlt/?nbs="+ball1.join("O")+"A"+ball2.join("O")+"&type=0002#xhk");
	}
	if (lotId == "lot106"){
		window.open("/lottery/jx115/?nbs="+ball.join("O")+"&type=0502#xhk");
	}
	if (lotId == "lot107"){
		window.open("/lottery/sd115/?nbs="+ball.join("O")+"&type=0502#xhk");
	}
}
$(function(){
	ch.init()
})