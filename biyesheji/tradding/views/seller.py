# seller.py
#*_* coding:utf-8*_*
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.User import User,Customer
from tradding.Address import Address
from tradding.Goods import Goods,Goods_picture,Picture
from tradding.models import BrowseRecord
from django.shortcuts import render_to_response,render,HttpResponse,Http404,HttpResponseRedirect,RequestContext
def seller_center(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		return render_to_response("seller/seller_center.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user})
	else :
		return HttpResponseRedirect('/tradding/login?url=seller_center')
def products(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		all_pic = Picture.objects.filter(user = user)
		if len(all_pic)>6:
			all_pic=all_pic[len(all_pic)-6:]
		return render_to_response("seller/products.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'all_pic':all_pic})
	else :
		return HttpResponseRedirect('/tradding/login?url=products')

def upload_photo(request):
	f = request.FILES['upload_file']
	p = Picture()
	p.image = f
	user_id = request.POST['user_id']
	user = Customer.objects.get(pk=user_id)
	p.user = user
	p.save()
	# return HttpResponse(user_id)
	all_pic = Picture.objects.filter(user = user)
	if len(all_pic)>6:
		all_pic=all_pic[len(all_pic)-6:]
	return render_to_response("seller/temp_pic.html",{'all_pic':all_pic})

def release_products(request):
	if request.method == 'POST':	
		title = request.POST["title"]
		special = request.POST["special"]
		price = request.POST["price"]
		number = request.POST["number"]
		discription = request.POST["discription"]
		user_id = request.POST['user_id']
		user = Customer.objects.get(pk=user_id)
		all_pic = Picture.objects.filter(user=user)
		if len(all_pic)>6:
			all_pic=all_pic[len(all_pic)-6:]
		if 'goods_id' in request.POST:
			old_goods = Goods.objects.get(pk=request.POST['goods_id'])
			old_goods.title=title;old_goods.special=special;old_goods.price=price;old_goods.number=number;old_goods.description=discription;
			old_goods.save()
			for pic in all_pic:
				if old_goods.goods_photo.all().count() <7:
					new_goods_pic = Goods_picture()
					new_goods_pic.goods = old_goods
					new_goods_pic.image = pic.image
					new_goods_pic.save()
		else:
			goods_id = Goods.objects.count()
			new_goods = Goods(goods_id=goods_id,user=user,title=title,special=special,price=price,number=number,description=discription)
			new_goods.save()
			for pic in all_pic:
				new_goods_pic = Goods_picture()
				new_goods_pic.goods = new_goods
				new_goods_pic.image = pic.image
				new_goods_pic.save()
		all_pic = Picture.objects.filter(user=user)
		for temp_pic in all_pic:
			temp_pic.delete()
		return HttpResponse("ok");
	else:
		if request.session.get('login',False):
			user = Customer.objects.get(username=request.session['username'])
			goods_id = request.GET['goods_id'] if 'goods_id' in request.GET else ''
			goods = Goods.objects.get(pk=goods_id)
			return render_to_response("seller/products.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
				'user':user,'goods':goods,})
		else :
			return HttpResponseRedirect('/tradding/login?url=products')

def selling_products(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		all_goods = Goods.objects.filter(user=user,bool_onsale=True,bool_delete=False)
		return render_to_response("seller/selling_products.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'all_goods':all_goods})
	else :
		return HttpResponseRedirect('/tradding/login?url=seller_center')

def offsale_goods(request):
	if request.method == 'POST':
		goods_id = request.POST['goods_id'] if 'goods_id' in request.POST else ''
		if goods_id:
			goods = Goods.objects.get(pk=goods_id)
			goods.bool_onsale = False
			goods.save()
			return HttpResponse("ok")
	else:
		return HttpResponseRedirect('/tradding/login?url=seller_center')

def onsale_goods(request):
	if request.method == 'POST':
		goods_id = request.POST['goods_id'] if 'goods_id' in request.POST else ''
		if goods_id:
			goods = Goods.objects.get(pk=goods_id)
			goods.bool_onsale = True
			goods.save()
			return HttpResponse("ok")
	else:
		return HttpResponseRedirect('/tradding/login?url=seller_center')

def delete_goods(request):
	if request.method == 'POST':
		goods_id = request.POST['goods_id'] if 'goods_id' in request.POST else ''
		if goods_id:
			goods = Goods.objects.get(pk=goods_id)
			goods.bool_delete = True
			goods.save()
			return HttpResponse("ok")
	else:
		return HttpResponseRedirect('/tradding/login?url=seller_center')

def resale_goods(request):
	if request.method == 'POST':
		goods_id = request.POST['goods_id'] if 'goods_id' in request.POST else ''
		if goods_id:
			goods = Goods.objects.get(pk=goods_id)
			goods.bool_delete = False
			goods.save()
			return HttpResponse("ok")
	else:
		return HttpResponseRedirect('/tradding/login?url=seller_center')

def warehousing_products(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		all_goods = Goods.objects.filter(user=user,bool_onsale=False,bool_delete=False)
		return render_to_response("seller/warehousing_products.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'all_goods':all_goods})
	else :
		return HttpResponseRedirect('/tradding/login?url=seller_center')

def history_products(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		all_goods = Goods.objects.filter(user=user,bool_delete=True)
		return render_to_response("seller/history_products.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'all_goods':all_goods})
	else :
		return HttpResponseRedirect('/tradding/login?url=seller_center')
def products_detail(request,object_id=1):
	g = Goods.objects.get(pk=object_id)
	if request.META.has_key('HTTP_X_FORWARDED_FOR'):
	    ip =  request.META['HTTP_X_FORWARDED_FOR']
	else:
	    ip = request.META['REMOTE_ADDR']
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		customer = user	
		#first time
		if not customer.recent_browse:
			customer.recent_browse="*"
			customer.save()
		try:
			b_r = BrowseRecord.objects.get(customer_id=user,goods_id=g)
			b_r.save()
		except:
			b = BrowseRecord()
			b.customer_id = user
			b.goods_id = g
			b.ip=ip
			b.save()
			customer.add_browse_record(b.id)
			customer.save()
		return render_to_response("seller/products_detail.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'object':g},context_instance=RequestContext(request))
	else:
		user = ''
		return render_to_response("seller/products_detail.html",{'user':user,'object':g})
def seller(request,object_id=1):
	c = Customer.objects.get(pk=object_id)
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		return render_to_response("seller/seller.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'object':c},context_instance=RequestContext(request))
	else:
		user = ''
		return render_to_response("seller/seller.html",{'user':user,'object':c})