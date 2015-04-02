#*_* coding:utf-8*_*
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.User import User,Customer
from django.shortcuts import render_to_response,render,HttpResponse,Http404,HttpResponseRedirect,RequestContext
import time,datetime
# Create your views here.
def authencation(username,password):
	try:
		temp_user= User.objects.get(username=username)
	except :
		return False
	return temp_user.password==password
def login(request):
	url = request.GET['url'] if 'url' in request.GET else ''
	if request.method =='GET':
		return render_to_response('login.html',{},context_instance=RequestContext(request))
	if request.method =='POST':
		user_name = request.POST['username']
		pass_word = request.POST['password']
		if authencation(user_name, pass_word):
			msg="ok"
			request.session['username']=user_name
			request.session['authencation']=True
			request.session['login']=True
			login_time = str(int(time.time()))
			request.session['time']=login_time
			request.session['logout_url']="/tradding/logout?username="+user_name+"&login_time="+login_time
			if url:
				return HttpResponseRedirect("/tradding/"+url)
			else:
				return render_to_response('temp.html',{'msg':msg,'username':user_name,'user_name':user_name,'login_time':login_time,'pass_word':pass_word,'label':authencation(user_name, pass_word)},context_instance=RequestContext(request))
		else:
			msg="用户名密码错误"
			return render_to_response('login.html',{'msg':msg,'user_name':user_name,'pass_word':pass_word,'label':authencation(user_name, pass_word)},context_instance=RequestContext(request))
def check_username(request):
	if request.method=='POST':
		username = request.POST['username']
		try:
			temp_user = User.objects.get(username=username)
		except:
			return HttpResponse("")
		return HttpResponse("exist");
	else:
		return HttpResponse("error");
def register(request):
	if request.method =='GET':
		return render_to_response('register.html',{},context_instance=RequestContext(request))
	if request.method =='POST':
		username = request.POST['username']
		password = request.POST['password']
		email = request.POST['email']
		user_id = User.objects.count()
		new_customer = Customer(user_id,username,password,email=email)
		try :
			new_customer.save()
			user_name = username
			request.session['username']=user_name
			request.session['authencation']=True
			request.session['login']=True
			login_time = str(int(time.time()))
			request.session['time']=login_time
			request.session['logout_url']="/tradding/logout?username="+user_name+"&login_time="+login_time
			return render_to_response('temp.html',{'username':username,'login_time':login_time},context_instance=RequestContext(request))
		except:
			msg = "errot"
			return render_to_response("register.html",{'msg':msg},context_instance=RequestContext(request))
def home(request):
	if request.session.get('login',False):
		return render_to_response('home.html',{'user_name':request.session['username'],'logout_url':request.session['logout_url']})
	else:
		return render_to_response("home.html")
def logout(request):
	user_name = request.GET['username'] if 'username' in request.GET else ''
	login_time = request.GET['login_time'] if 'login_time' in request.GET else ''
	if user_name and login_time:
		request.session['authencation']=False
		request.session['login']=False
		login_time = str(int(time.time()))
		request.session['time']=login_time
		return render_to_response("home.html")