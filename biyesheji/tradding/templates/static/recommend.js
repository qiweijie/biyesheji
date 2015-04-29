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
	$.post('/system/recommend',
		{
			hello:"hello"
		},
		 function(data, textStatus, xhr) {
		 	document.getElementById("search_hot").innerHTML = data;
	});
    $.post('/system/recommend_user_goods',
        {
            hello:"hello"
        },
         function(data, textStatus, xhr) {
            document.getElementById("user_recommend").innerHTML = data;
    });
}
window.onload = init;