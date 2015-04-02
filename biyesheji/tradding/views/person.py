# person.py
#*_* coding:utf-8*_*
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.User import User,Customer
from django.shortcuts import render_to_response,render,HttpResponse,Http404,HttpResponseRedirect,RequestContext
import time,datetime
from django.core.mail import send_mail
# Create your views here.
def personal_center(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		last_login= datetime.datetime.strptime(time.ctime(float(request.session['time'])),"%a %b %d %H:%M:%S %Y")
		last_login = last_login.strftime("%Y-%m-%d %H:%M:%S")
		return render_to_response("person/personal_center.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'last_login':last_login})
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_center')

def shopping_cart(request):
	return render_to_response("person/shopping_cart.html")

def order_list(request):
	return render_to_response("person/order_list.html")

def change(request):
	user_id=''
	now_pwd=''	
	da = request.POST['nickname'] if 'nickname' in request.POST else ''
	if da:
		nickname,user_id = da.split("*_*")
	else:
		nickname=''
	pwd = request.POST['pwd'] if 'pwd' in request.POST else ''
	if pwd:
		now_pwd,new_pwd,user_id = pwd.split("*_*")
	else:
		new_pwd=''
	tel_num = request.POST['tel_num'] if 'tel_num' in request.POST else ''
	if tel_num:
		now_pwd,phonenumber,user_id = tel_num.split("*_*")
	else:
		phonenumber = ''
	email = request.POST['email'] if 'email' in request.POST else ''
	if email:
		now_pwd,email,user_id = email.split("*_*")
	else:
		email=''
	if nickname and user_id:
		user=Customer.objects.get(pk=user_id)
		user.nickname = nickname
		user.save();
		return HttpResponse(nickname)
	elif now_pwd and new_pwd and user_id:
		user = Customer.objects.get(pk=user_id)
		if user.check_password(now_pwd):
			user.set_password(new_pwd)
			user.save()
			return HttpResponse("")
		else:
			return HttpResponse("error")
	elif now_pwd and phonenumber and user_id:
		user = Customer.objects.get(pk=user_id)
		if user.check_password(now_pwd):
			user.phone_number = phonenumber
			user.save()
			return HttpResponse("")
		else:
			return HttpResponse("error")
	elif now_pwd and email and user_id:
		user = Customer.objects.get(pk=user_id)
		if user.check_password(now_pwd):
			user.email = email
			user.save()
			message = "用户名："+user.username+"\n"+"密码："+user.password
			try:
				send_mail('用户信息', message, '2bitt@sina.com', [email],fail_silently=False)
			except :
				return HttpResponse("ok")			
			return HttpResponse("")
		else:
			return HttpResponse("error")
	else:
		return HttpResponse("ok")
