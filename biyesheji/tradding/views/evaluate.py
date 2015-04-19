#*_* coding:utf-8*_*
# evaluate.py
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.Address import Address
from tradding.User import User,Customer,Favorite_shop
from tradding.models import ShoppingCartItem,BrowseRecord,Order,Courier
from tradding.Goods import Goods
from django.shortcuts import render_to_response,render,HttpResponse,Http404,HttpResponseRedirect,RequestContext
import time,datetime

def evaluate_order(request,order_id=1):
	order = Order.objects.get(pk=order_id)
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		return render_to_response("evaluate/evaluate_order.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'order':order})
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_center')