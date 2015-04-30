#*_* coding:utf-8*_*
# segment.py
import sys,urllib2
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.User import User,Customer
from tradding.Goods import Goods
from tradding.models import BrowseRecord,Search_Record,Dict,Stop,Goods_label,Label_goods
from django.db.models import Count,Max,Avg
from django.shortcuts import render_to_response,render,HttpResponse,Http404,HttpResponseRedirect,RequestContext
import time,datetime
def init_term(request):
	# t = urllib2.urlopen("http://irsearch-irsearch.stor.sinaapp.com/bdist.txt").read()
	# w = file("tem.txt",'w')
	# w.write(t)
	# w.close()
	# bd = file("tem.txt",'r')
	# d = bd.readline()
	# d = d[3:]
	# d = d.strip()
	# di = Dict(name=d)
	# di.save()
	# while True:
	# 	line = bd.readline()
	# 	if len(line)==0:
	# 		break
	# 	line = line.strip()
	# 	di = Dict(name=line)
	# 	di.save()
	# t = urllib2.urlopen("http://irsearch-irsearch.stor.sinaapp.com/stopword.txt").read()
	# w = file("tem.txt",'w')
	# w.write(t)
	# w.close()
	# sto= file("tem.txt",'r')
	# s = sto.readline()
	# s = s[3:]
	# s = s.strip()
	# st = Stop(name=s)
	# st.save()
	# while True:
	# 	line = sto.readline()
	# 	if len(line)==0:
	# 		break
	# 	line = line.strip()
	# 	st = Stop(name=line)
	# 	st.save()
	return HttpResponse("ok")

# def fenci(query):
# 	res = [[]for i in range(3)]
# 	res[0]=[]
# 	res[1]=[]
# 	res[2]=[]
# 	res[1].append(query+'\n')
# 	dt = Dict.objects.filter(name=query)
# 	if  dt:
# 		res[1].append(dt[0].name+'****')
# 	query_length = len(query)
# 	index = 0
# 	max_length = 5
# 	temp=u''
# 	while index<query_length:
# 		s = query[index:index+1]
# 		temp = temp+s
# 		res[1].append(temp+'//'+'\n')
# 		index = index+1
# 		if len(temp)<max_length and index<query_length:
# 			continue
# 		else:
# 			t = temp
# 			res[1].append(temp+'*'+'\n')
# 			while True:
# 				if len(temp)==0:
# 					temp = t[1:]
# 					# if index+1>query_length:
# 					# 	t = temp
# 					# 	res[1].append(temp+'*'+'\n')
# 					# 	while True:
# 					# 		if len(t)==0:
# 					# 			break
# 					# 		dt = Dict.objects.filter(name=temp)
# 					# 		if dt:
# 					# 			#in the dictionary
# 					# 			# res[1].append(Dict.objects.get(name=temp).name+'&&')
# 					# 			# not stopword
# 					# 			res[2].append(temp)
# 					# 			st = Stop.objects.filter(name=temp)
# 					# 			if st:
# 					# 				res[1].append(temp+'##'+'\n')
# 					# 			else:
# 					# 				res[0].append(temp)
# 					# 				res[1].append(temp+'##'+'\n')
# 					# 			temp = t[len(temp):len(t)]
# 					# 			t = temp
# 					# 			res[1].append(temp+'*'+'\n')
# 					# 		else:
# 					# 			#not in dictionary
# 					# 			if len(temp)>0:
# 					# 				temp = temp[0:len(temp)-1]
# 					# 				res[1].append(temp+'%*'+'\n')
# 					# else :
# 					# 	break
# 					break
# 				dt = Dict.objects.filter(name=temp)
# 				if dt:
# 					#in the dictionary
# 					# res[1].append(Dict.objects.get(name=temp).name+'&&')
# 					# not stopword
# 					res[2].append(temp)
# 					st = Stop.objects.filter(name=temp)
# 					if st:
# 						res[1].append(temp+'##'+'\n')
# 					else:
# 						res[0].append(temp)
# 						res[1].append(temp+'##'+'\n')
# 					temp = t[len(temp):len(t)]
# 					res[1].append(temp+'$*'+'\n')
# 					if len(temp)!=0 and index+1>query_length:
# 						t = temp
# 						res[1].append(temp+'*'+'\n')
# 						while True:
# 							if len(temp)==0:
# 								temp = t[1:]
# 								continue
# 							if len(t)==0:
# 								break
# 							dt = Dict.objects.filter(name=temp)
# 							if dt:
# 								#in the dictionary
# 								# res[1].append(Dict.objects.get(name=temp).name+'&&')
# 								# not stopword
# 								res[2].append(temp)
# 								st = Stop.objects.filter(name=temp)
# 								if st:
# 									res[1].append(temp+'##'+'\n')
# 								else:
# 									res[0].append(temp)
# 									res[1].append(temp+'##'+'\n')
# 								temp = t[len(temp):len(t)]
# 								t = temp
# 								res[1].append(temp+'*'+'\n')
# 							else:
# 								#not in dictionary
# 								if len(temp)>0:
# 									temp = temp[0:len(temp)-1]
# 									res[1].append(temp+'%*'+'\n')
# 					else:
# 						break
# 				else:
# 					#not in dictionary
# 					if len(temp)>0:
# 						temp = temp[0:len(temp)-1]
# 						res[1].append(temp+'%*'+'\n')
# 	# Dict.objects.get(name='123sfsdf')			
# 	return res
def fenci(query):
	res = [[]for i in range(3)]
	res[0]=[]
	res[1]=[]
	res[2]=[]
	res[1].append(query+'\n')
	dt = Dict.objects.filter(name=query)
	if  dt:
		res[1].append(dt[0].name+'****')
	query_length = len(query)
	index = 0
	max_length = 5
	temp=u''
	t=u''
	while index<query_length:
		s = query[index:index+1]
		temp = temp+s
		res[1].append(temp+'//'+'\n')
		index = index+1
		if len(temp)<max_length and index<query_length:
			continue
		else:
			t = temp
			res[1].append(temp+'*'+'\n')
			while True:
				dt = Dict.objects.filter(name=temp)
				if dt:
					res[2].append(temp)
					st = Stop.objects.filter(name=temp)
					if st:
						res[1].append(temp+'##'+'\n')
					else:
						res[0].append(temp)
						res[1].append(temp+'##'+'\n')
					temp = t[len(temp):len(t)]
					t=temp
					res[1].append(temp+'$*'+'\n')
					if index+1>query_length:
						if len(temp)==0:
							break
						else:
							continue
					else:
						break
					# break
				else:
					#not in dictionary
					if len(temp)>0:
						temp = temp[0:len(temp)-1]
						res[1].append(temp+'%*'+'\n')
					if len(temp)==0:
						temp = t[1:]
						t=temp
						res[1].append(temp+'~%*'+'\n')
						if index+1>query_length:
							if len(temp)==0:
								break
							else:
								continue
						else:
							break
						# break
	# Dict.objects.get(name='123sfsdf')			
	return res

def segment_title(request):
	if request.method == 'POST':
		goods_id = request.POST['goods_id'] if 'goods_id' in request.POST else ''
		if goods_id:
			goods = Goods.objects.get(pk=goods_id)
			title = goods.title.replace(" ","")
			res = fenci(title)
			test = Goods_label.objects.filter(goods_id=goods_id)
			if test:
				goods_label = test[0]
			else:
				goods_label = Goods_label()
				goods_label.goods_id = goods_id
				goods_label.label = "*_*"
			for label in res[0]:
				goods_label.add_goods_label(label)
				test = Label_goods.objects.filter(name=label)
				if test:#label exist
					test[0].add_goods_id(goods_id)
					test[0].save()
				else:#label not exist
					new_label_goods = Label_goods(name=label)
					new_label_goods.goods_id  = "*"
					new_label_goods.add_goods_id(goods_id)
					new_label_goods.save()
			goods_label.save()
			return HttpResponse(res)
	else:
		# goods_id = request.GET['goods_id'] if 'goods_id' in request.GET else ''
		# if goods_id:
		# 	goods = Goods.objects.get(pk=goods_id)
		# 	title = goods.title.replace(" ","")
		# 	res = fenci(title)
		# 	test = Goods_label.objects.filter(goods_id=goods_id)
		# 	if test:
		# 		goods_label = test[0]
		# 	else:
		# 		goods_label = Goods_label()
		# 		goods_label.goods_id = goods_id
		# 		goods_label.label = "*_*"
		# 	for label in res[0]:
		# 		goods_label.add_goods_label(label)
		# 		test = Label_goods.objects.filter(name=label)
		# 		if test:#label exist
		# 			test[0].add_goods_id(goods_id)
		# 			test[0].save()
		# 		else:#label not exist
		# 			new_label_goods = Label_goods(name=label)
		# 			new_label_goods.goods_id  = "*"
		# 			new_label_goods.add_goods_id(goods_id)
		# 			new_label_goods.save()
		# 	goods_label.save()
		# 	return render_to_response("test.html",{"res":res})
		return HttpResponse("only post accepted!")
def search(request):
	key = request.GET['key'] if 'key' in request.GET else ''
	if request.META.has_key('HTTP_X_FORWARDED_FOR'):
	    ip =  request.META['HTTP_X_FORWARDED_FOR']
	else:
	    ip = request.META['REMOTE_ADDR']
	if request.session.get('login',False):
		user_id = User.objects.get(username=request.session['username']).user_id
	else:
		user_id = '-1'
	new_search_record = Search_Record(key=key,user_id=user_id,ip=ip)
	new_search_record.save()
	hot_browsed = BrowseRecord.objects.values('goods_id').annotate(num=Count('customer_id')).order_by("-num")
	hot_browsed = [ Goods.objects.get(pk=g['goods_id']) for g in hot_browsed][:10]

	res = fenci(key)
	all_goods = []
	for label in res[0]:
		try:
			label_goods = Label_goods.objects.get(name=label)
			all_goods += label_goods.goods_id.split("*")[1:-1]
		except :
			continue
	result_dict ={}
	for goods_id in all_goods:
		goods_labels = Goods_label.objects.get(goods_id=goods_id).label.split("*_*")[1:-1]
		key_and_goods = set(list(res[0])).intersection(set(goods_labels))
		key_or_goods  = set(list(res[0])).union(set(goods_labels))
		similarty = float(len(key_and_goods))/len(key_or_goods)
		result_dict[goods_id]=similarty
	ordered_goods_id_list = sorted(result_dict.items(),key=lambda e:e[1],reverse=True)
	ordered_goods_list = [ Goods.objects.get(pk=goods_id[0]) for goods_id in ordered_goods_id_list ]
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		return render_to_response("search_result.html",{"key":key,'hot_browsed':hot_browsed,
			'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,"ordered_goods_list":ordered_goods_list,"res":res[0]})
	else:
		user=''
		return render_to_response("search_result.html",{"key":key,'hot_browsed':hot_browsed,'user':user,"ordered_goods_list":ordered_goods_list})