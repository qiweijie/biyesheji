#*_* coding:utf-8*_*
# system.py
import sys,urllib2
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.User import User,Customer
from tradding.Goods import Goods
from tradding.models import BrowseRecord,Search_Record,Dict,Stop,Goods_label,Label_goods,Goods_similarty,Order
from tradding.models import Record_caculate_goods_id,Record_caculate_love_id,User_goods_level,ShoppingCartItem
from django.db.models import Count,Max,Avg,Q,F
from django.shortcuts import render_to_response,render,HttpResponse,Http404,HttpResponseRedirect,RequestContext
import time,datetime

def caculate_goods(goods_id1,goods_id2):
	if goods_id1 == goods_id2:
		return
	small_goods_id = goods_id1 if goods_id1<goods_id2 else goods_id2
	big_goods_id = goods_id1 if goods_id1>goods_id2 else goods_id2
	test = Goods_similarty.objects.filter(small_goods_id=small_goods_id,big_goods_id=big_goods_id)
	if test:#already caculated
		return
	else:
		small_goods_labels = Goods_label.objects.get(goods_id=small_goods_id).label.split("*_*")[1:-1]
		big_goods_labels = Goods_label.objects.get(goods_id=big_goods_id).label.split("*_*")[1:-1]
		small_and_big = set(small_goods_labels).intersection(set(big_goods_labels))
		small_or_big = set(small_goods_labels).union(set(big_goods_labels))
		similarty = float(len(small_and_big))/len(small_or_big)
		new = Goods_similarty(small_goods_id=small_goods_id,big_goods_id=big_goods_id,similarty=similarty)
		new.save()
def caculate_similarty(request):
	if Record_caculate_goods_id.objects.all().count():
		max_goods_id = Record_caculate_goods_id.objects.all().aggregate(Max('max_goods_id'))['max_goods_id__max']
	else :
		max_goods_id=-1
	all_goods = Goods.objects.filter(goods_id__gt=max_goods_id).order_by("goods_id")
	for goods in all_goods:
		goods_label = Goods_label.objects.get(goods_id=goods.goods_id)
		labels = goods_label.label.split("*_*")[1:-1]
		for label in labels:
			label_goods = Label_goods.objects.get(name=label)
			label_goods_ids = label_goods.goods_id.split("*")[1:-1]
			for id in label_goods_ids:
				caculate_goods(goods.goods_id,id)
	max_goods_id_now = Goods.objects.all().aggregate(Max('goods_id'))['goods_id__max']
	number=max_goods_id_now-max_goods_id
	new_record = Record_caculate_goods_id(max_goods_id=max_goods_id_now,number=number)
	new_record.save()
	return HttpResponse(str(max_goods_id_now)+"hello"+str(number))

def recommend_search(request):
	hot_term = Search_Record.objects.values('key').annotate(num=Count('user_id')).order_by("-num")
	result_a = []
	result_a.append("热搜: ")
	for term in hot_term:
		a='<a href="/tradding/search?key=%s" title="%s">%s</a>' %(term['key'],term['key'],term['key'])
		result_a.append(a+'\n')
	return HttpResponse(result_a)


def caculate_love_level(request):
	if Record_caculate_love_id.objects.all().count():
		max_browse_id = Record_caculate_love_id.objects.all().aggregate(Max('max_browse_id'))['max_browse_id__max']
		max_cart_id = Record_caculate_love_id.objects.all().aggregate(Max('max_cart_id'))['max_cart_id__max']
		max_order_id = Record_caculate_love_id.objects.all().aggregate(Max('max_order_id'))['max_order_id__max']
	else :
		max_browse_id=-1
		max_cart_id=-1
		max_order_id=-1
	all_browses = BrowseRecord.objects.filter(id__gt=max_browse_id).order_by("id")
	for browse in all_browses:
		new_love_level = User_goods_level(user_id=browse.customer_id.user_id,goods_id=browse.goods_id.goods_id,evaluation=5)
		new_love_level.save()
	max_browse_id_now = BrowseRecord.objects.all().aggregate(Max('id'))['id__max']

	all_carts = ShoppingCartItem.objects.filter(id__gt=max_cart_id).order_by("id")
	for cart in all_carts:
		test = User_goods_level.objects.filter(user_id=cart.customer_id.user_id,goods_id=cart.goods_id.goods_id)
		if test:
			test[0].evaluation += 10
			test[0].save()
	max_cart_id_now = ShoppingCartItem.objects.all().aggregate(Max('id'))['id__max']

	all_orders = Order.objects.filter(id__gt=max_order_id).order_by("id")
	for order in all_orders:
		test = User_goods_level.objects.filter(user_id=order.user.user_id,goods_id=order.goods.goods_id)
		if test:
			test[0].evaluation += 10
			test[0].save()
	max_order_id_now = Order.objects.all().aggregate(Max('id'))['id__max']
	number=len(all_browses)+len(all_carts)+len(all_orders)
	new_record = Record_caculate_love_id(max_browse_id=max_browse_id_now,max_cart_id=max_cart_id_now,max_order_id=max_order_id_now,number=number)
	new_record.save()
	return HttpResponse("hello"+str(number)+"*"+str(all_browses)+"*"+str(all_carts)+"*"+str(all_orders))

def recommend_user_goods(request):
	recommend_user_goods=True
	if request.session.get('login',False):
		username = request.session['username']
		user = Customer.objects.get(username=username)
		user_goods_levels = User_goods_level.objects.filter(user_id=user.user_id).order_by("-evaluation")[:3]
		user_love_goods_ids = [u.goods_id for u in user_goods_levels]
		candidate_goods_records = []
		for goods_id in user_love_goods_ids:
			related_goods = Goods_similarty.objects.filter(Q(small_goods_id=goods_id)|
				Q(big_goods_id=goods_id)).order_by("-similarty")[:3]
			for record in related_goods:
				candidate_goods_records.append(record)
		goods_record = sorted(candidate_goods_records,key=lambda goods:goods.similarty,reverse=True)[:3]
		record_goods_ids = []
		for record in goods_record:
			record_goods_ids.append(record.small_goods_id)
			record_goods_ids.append(record.big_goods_id)
		result_goods_ids = set(record_goods_ids)-set(user_love_goods_ids)
		highest_similarty_goods = [ Goods.objects.get(pk=goods_id) for goods_id in result_goods_ids ]
	else:
		username=''
		highest_similarty_goods=''
	return render_to_response("user_recommend.html",
		{"username":username,"highest_similarty_goods":highest_similarty_goods,"recommend_user_goods":recommend_user_goods
		# ,'user_love_goods_ids':user_love_goods_ids,
		# "candidate_goods_records":candidate_goods_records,"goods_record":goods_record
		# ,"result_goods_ids":result_goods_ids
		},
		context_instance=RequestContext(request))

def recommend_similar_goods(request):
	goods_id = request.POST['goods_id'] if 'goods_id' in request.POST else ''
	recommend_similar_goods=True
	if goods_id:
		similar_goods_records = Goods_similarty.objects.filter(Q(small_goods_id=goods_id)|
				Q(big_goods_id=goods_id)).order_by("-similarty")[:3]
		record_goods_ids = []
		for record in similar_goods_records:
			record_goods_ids.append(record.small_goods_id)
			record_goods_ids.append(record.big_goods_id)
		result_goods_ids = set(record_goods_ids)-set([goods_id])
		highest_similarty_goods = [ Goods.objects.get(pk=goods_id) for goods_id in result_goods_ids ]
	return render_to_response("user_recommend.html",
		{"highest_similarty_goods":highest_similarty_goods,"recommend_similar_goods":recommend_similar_goods},
		context_instance=RequestContext(request))