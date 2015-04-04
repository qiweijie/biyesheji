# order.py
#*_* coding:utf-8*_*
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.User import User,Customer,Favorite_shop
from tradding.models import ShoppingCartItem,BrowseRecord
from tradding.Goods import Goods
from django.shortcuts import render_to_response,render,HttpResponse,Http404,HttpResponseRedirect,RequestContext
import time,datetime

def add(request):
	if request.method == 'POST':
		goods_id = request.POST['goods_id'] if 'goods_id' in request.POST else ''
		user_id  = request.POST['user_id'] if 'user_id' in request.POST else ''
		if goods_id and user_id:
			goods = Goods.objects.get(pk=goods_id)
			user = Customer.objects.get(pk=user_id)
			return render_to_response("order/add_order.html",{'user':user,'goods':goods},context_instance=RequestContext(request))
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_center')