#*_* coding:utf-8*_*
# system.py
import sys,urllib2
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.User import User,Customer
from tradding.Goods import Goods
from tradding.models import BrowseRecord,Search_Record,Dict,Stop,Goods_label,Label_goods,Goods_similarty,Record_caculate_goods_id
from django.db.models import Count,Max,Avg
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
		small_and_big = set(small_goods_labels).union(set(big_goods_labels))
		small_or_big = set(small_goods_labels).intersection(set(big_goods_labels))
		similarty = float(len(small_and_big)/len(small_or_big))
		new = Goods_similarty(small_goods_id=small_goods_id,big_goods_id=big_goods_id,similarty=similarty)
		new.save()
def caculate_similarty(request):
	if Record_caculate_goods_id.objects.all().count():
		max_goods_id = Record_caculate_goods_id.objects.all().aggregate(Max('max_goods_id'))['max_goods_id__max']
	else :
		max_goods_id=-1
	all_goods = Goods.objects.filter(goods_id_gt=max_goods_id).order_by("goods_id")
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