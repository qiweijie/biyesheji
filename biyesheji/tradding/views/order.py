#*_* coding:utf-8*_*
# order.py
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.Address import Address
from tradding.User import User,Customer,Favorite_shop
from tradding.models import ShoppingCartItem,BrowseRecord,Order,Courier
from tradding.Goods import Goods
from django.shortcuts import render_to_response,render,HttpResponse,Http404,HttpResponseRedirect,RequestContext
import time,datetime

def order(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		return render_to_response("order/order_list.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user})
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def add(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		if request.method == 'POST':
			goods_id = request.POST['goods_id'] if 'goods_id' in request.POST else ''
			user_id  = request.POST['user_id'] if 'user_id' in request.POST else ''
			product_number  = request.POST['product_number'] if 'product_number' in request.POST else '1'
			product_number = product_number if product_number else '1'
			if goods_id and user_id:
				goods = Goods.objects.get(pk=goods_id)
				user = Customer.objects.get(pk=user_id)
				return render_to_response("order/add_order.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
					'user':user,'goods':goods,'product_number':product_number},context_instance=RequestContext(request))
		return HttpResponseRedirect('/tradding/login?url=personal_center')
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_center')

def confirm_order(request):
	if request.method == 'POST':
		goods_id = request.POST['goods_id'] if 'goods_id' in request.POST else ''
		user_id  = request.POST['user_id'] if 'user_id' in request.POST else ''
		address_id = request.POST['address_id'] if 'address_id' in request.POST else ''
		additional = request.POST['additional'] if 'additional' in request.POST else ''
		goods_number = request.POST['goods_number'] if 'goods_number' in request.POST else ''
		user = Customer.objects.get(pk=user_id);address = Address.objects.get(pk=address_id);goods = Goods.objects.get(pk=goods_id)
		if user and address and goods:
			try:
				cart_item = ShoppingCartItem.objects.get(customer_id=user,goods_id=goods)
				user.delete_shopping_item(cart_item.id)
				user.save()
			except :
				pass
			new_order = Order(user=user,goods=goods,address=address,goods_number=goods_number,additional=additional)
			new_order.save()
			return HttpResponse("")
		else:
			return HttpResponse("ok")
	else:
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def confirm_tradding(request):
	if request.method == 'POST':
		order_id = request.POST['order_id'] if 'order_id' in request.POST else ''
		if order_id:
			order = Order.objects.get(pk=order_id)
			order.ing = False
			order.confirm = True
			order.cancle = False
			order.save()
			return HttpResponse("")
		else:
			return HttpResponse("ok")
	else:
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def cancle_tradding(request):
	if request.method == 'POST':
		order_id = request.POST['order_id'] if 'order_id' in request.POST else ''
		if order_id:
			order = Order.objects.get(pk=order_id)
			order.ing = False
			order.confirm = False
			order.cancle = True
			order.save()
			return HttpResponse("")
		else:
			return HttpResponse("ok")
	else:
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def add_courier(request):
	if request.method == 'POST':
		company = request.POST['company'] if 'company' in request.POST else ''
		express_id = request.POST['express_id'] if 'express_id' in request.POST else ''
		order_id = request.POST['order_id'] if 'order_id' in request.POST else ''
		if company and express_id and order_id:
			try:
				order = Order.objects.get(pk=order_id)
				new_courier = Courier(company=company,express_id=express_id,order=order)
				new_courier.save()
				return HttpResponse("")
			except :
				pass
			return HttpResponse("ok")
		else:
			return HttpResponse("ok")
	else:
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def seller_order(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		return render_to_response("seller/seller_order.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user})
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def seller_courier(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		return render_to_response("order/seller_courier.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user})
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_center')
def order_detail(request,object_id=1):
	order = Order.objects.get(pk=object_id)
	if request.session.get('login',False):
		return render_to_response("order/order_detail.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'order':order},context_instance=RequestContext(request))
	else:
		return HttpResponseRedirect('/tradding/login?url=personal_center')
