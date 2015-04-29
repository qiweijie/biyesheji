// recommend.js

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
function init () {
	$.post('/system/recommend_search',
		{
			hello:"hello"
		},
		 function(data, textStatus, xhr) {
		 	document.getElementById("search_hot").innerHTML = data;
	});
if(document.getElementById("test_")){
    $.post('/system/recommend_similar_goods',
        {
            goods_id:document.getElementById("goods_id").value
        },
         function(data, textStatus, xhr) {
            document.getElementById("goods_recommend").innerHTML = data;
    });    
}
if(document.getElementById("test_user")){
    $.post('/system/recommend_user_goods',
        {
            hello:"hello"
        },
         function(data, textStatus, xhr) {
            document.getElementById("user_recommend").innerHTML = data;
    });   
}
}
window.onload = init;