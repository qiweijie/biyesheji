#*_* coding:utf-8*_*
# evaluate.py
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.Address import Address
from tradding.User import User,Customer,Favorite_shop
from tradding.models import ShoppingCartItem,BrowseRecord,Order,Courier,Evaluate
from tradding.Goods import Goods
from django.shortcuts import render_to_response,render,HttpResponse,Http404,HttpResponseRedirect,RequestContext
import time,datetime

def evaluate_order(request,order_id=1):
	order = Order.objects.get(pk=order_id)
	li = ['1','2','3','4','5']
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		return render_to_response("evaluate/evaluate_order.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'order':order,'li':li})
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_center')

def add_evaluation(request):
	if request.method == 'POST':
		match = request.POST['match'] if 'match' in request.POST else ''
		quality = request.POST['quality'] if 'quality' in request.POST else ''
		status = request.POST['status'] if 'status' in request.POST else ''
		pr_service = request.POST['pr_service'] if 'pr_service' in request.POST else ''
		courier_speed = request.POST['courier_speed'] if 'courier_speed' in request.POST else ''
		af_service = request.POST['af_service'] if 'af_service' in request.POST else ''
		order_id = request.POST['order_id'] if 'order_id' in request.POST else ''
		goods_evaluate = request.POST['goods_evaluate'] if 'goods_evaluate' in request.POST else ''
		service_evaluate = request.POST['service_evaluate'] if 'service_evaluate' in request.POST else ''
		if order_id and match and quality and status and pr_service and courier_speed and af_service:
			order = Order.objects.get(pk=order_id)
			new_evaluation = Evaluate(match=match,quality=quality,status=status,pr_service=pr_service,courier_speed=courier_speed,af_service=af_service,order=order,
				goods_evaluate=goods_evaluate,service_evaluate=service_evaluate)
			new_evaluation.save()
			return HttpResponse("")
		else:
			return HttpResponse("ok")
	else:
		return HttpResponseRedirect("/")
