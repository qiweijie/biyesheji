# person.py
#*_* coding:utf-8*_*
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.User import User,Customer,Favorite_shop
from tradding.models import ShoppingCartItem,BrowseRecord
from tradding.Goods import Goods
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
def add_fav(request):
	data = request.POST['add_fav'] if 'add_fav' in request.POST else ''
	if data:
		seller_id,customer_id = data.split("*_*")
		if seller_id and customer_id:
			seller = Customer.objects.get(pk=seller_id)
			customer = Customer.objects.get(pk=customer_id)
			#first time
			if not customer.favorite_shops:
				customer.favorite_shops="*"
				customer.save()
			#是否已经存在该收藏项favorite_shop(f_s)
			try:
				f_s = Favorite_shop.objects.get(customer_id=customer,shop_id=seller)
				f_s.save()
			#如果不存在，新建一个
			except :
				f = Favorite_shop()
				f.customer_id = customer
				f.shop_id = seller 
				f.save()
				customer.add_favorite_shops(f.id)
				customer.save()
			return HttpResponse("")
	else:
		return HttpResponse("ok")
def favorite(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		favorite_shops = user.favorite_shops.split("*")
		items =[]
		for f_s in favorite_shops:
			if f_s:
				items.append(Favorite_shop.objects.get(pk=f_s))
		return render_to_response("person/favorites.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'items':items})
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def shopping_cart(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		shopping_carts = user.shopping_cart.split("*")
		items =[]
		for f_s in shopping_carts:
			if f_s:
				items.append(ShoppingCartItem.objects.get(pk=f_s))
		return render_to_response("person/shopping_cart.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'items':items},context_instance=RequestContext(request))
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def browsed(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		recent_browse = user.recent_browse.split("*")
		items =[]
		for f_s in recent_browse:
			if f_s:
				items.append(BrowseRecord.objects.get(pk=f_s))
		return render_to_response("person/recent_browsed.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'items':items})
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def delete_browsed(request):	
	if request.method == 'POST':
		browsed = request.POST['browsed_id'] if 'browsed_id' in request.POST else ''
		browsed_id,user_id = browsed.split("*_*")
		if browsed_id and user_id:
			browsed = BrowseRecord.objects.get(pk=browsed_id)
			user = Customer.objects.get(pk=user_id)
			user.delete_browse_record(browsed.id)
			user.save()
			browsed.delete()
			return HttpResponse("")
	else:
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def delete_fav(request):
	if request.method == 'POST':
		fav = request.POST['fav_id'] if 'fav_id' in request.POST else ''
		fav_id,user_id = fav.split("*_*")
		if fav_id and user_id:
			fav = Favorite_shop.objects.get(pk=fav_id)
			user = Customer.objects.get(pk=user_id)
			user.delete_favorite_shops(fav.id)
			user.save()
			fav.delete()
			return HttpResponse("")
	else:
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def add_pro(request):
	data = request.POST['add_pro'] if 'add_pro' in request.POST else ''
	if data:
		goods_id,customer_id = data.split("*_*")
		if goods_id and customer_id:
			goods = Goods.objects.get(pk=goods_id)
			customer = Customer.objects.get(pk=customer_id)
			#first time
			if not customer.shopping_cart:
				customer.shopping_cart="*"
				customer.save()
			try:
				#是否已经存在该购物车项s_c
				s_c = ShoppingCartItem.objects.get(customer_id=customer,goods_id=goods)
				s_c.save()
			except :
				c = ShoppingCartItem()
				c.customer_id = customer
				c.goods_id = goods 
				c.save()
				customer.add_shopping_item(c.id)
				customer.save()
			return HttpResponse("")
	else:
		return HttpResponse("ok")
def delete_cart_pro(request):
	if request.method == 'POST':
		cart_pro = request.POST['cart_pro_id'] if 'cart_pro_id' in request.POST else ''
		cart_pro_id,user_id = cart_pro.split("*_*")
		if cart_pro_id and user_id:
			cart_pro = ShoppingCartItem.objects.get(pk=cart_pro_id)
			user = Customer.objects.get(pk=user_id)
			user.delete_shopping_item(cart_pro.id)
			user.save()
			cart_pro.delete()
			return HttpResponse("")
	else:
		return HttpResponseRedirect('/tradding/login?url=personal_center')