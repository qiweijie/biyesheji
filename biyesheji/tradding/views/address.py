# address.py
#*_* coding:utf-8*_*
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from tradding.User import User,Customer
from tradding.Address import Address
from django.shortcuts import render_to_response,render,HttpResponse,Http404,HttpResponseRedirect,RequestContext
# import time,datetime
# from django.core.mail import send_mail
def personal_address(request):
	if request.session.get('login',False):
		user = Customer.objects.get(username=request.session['username'])
		addresses = Address.objects.filter(user=user,bool_delete=False).order_by('-bool_default')
		num = 20-addresses.count()
		return render_to_response("person/personal_address.html",{'user_name':request.session['username'],'logout_url':request.session['logout_url'],
			'user':user,'addresses':addresses,'num':num})
	else :
		return HttpResponseRedirect('/tradding/login?url=personal_address')
def add_address(request):
	address = request.POST['address'] if 'address' in request.POST else ''
	if address:
		name,phone_number,addr,is_default,user_id = address.split("*_*")
	else:
		name=''; phone_number=''; addr=''; is_default='';user_id='';
	if name and phone_number and addr and is_default and user_id:
		user = Customer.objects.get(pk=user_id)
		#bool first time upload
		addresses = Address.objects.filter(user=user)
		if len(addresses)==0:
			is_default="true"
		addr_id = Address.objects.count()
		bool_default = True if is_default=="true" else False
		new_addr = Address(address_id=addr_id,user=user,name=name,phone_number=phone_number,address=addr,bool_default=bool_default,bool_delete=False)
		new_addr.save()
		if bool_default:
			for address in addresses:
				address.bool_default=False
				address.save()			
		return HttpResponse("")
	else:
		return HttpResponse("ok")

def change_address(request):
	address = request.POST['address'] if 'address' in request.POST else ''
	if address:
		name,phone_number,addr,addr_id = address.split("*_*")
	else:
		name=''; phone_number=''; addr=''; addr_id='';
	if name and phone_number and addr and addr_id:
		edit_addr = Address.objects.get(pk=addr_id[-1:])
		edit_addr.name=name
		edit_addr.phone_number = phone_number
		edit_addr.address = addr
		edit_addr.save()
		return HttpResponse("")
	else:
		return HttpResponse("ok"+user_id)
def set_default(request):
	addr_id = request.POST['addr_id'] if 'addr_id' in request.POST else ''
	if addr_id:
		addr=Address.objects.get(pk=addr_id)
		user = addr.user
		addresses = Address.objects.filter(user=user)
		for address in addresses:
			address.bool_default=False
			address.save()
		addr.bool_default=True
		addr.save()
		return HttpResponse("")
	else:
		return HttpResponse("ok")
def delete(request):
	addr_id = request.POST['addr_id'] if 'addr_id' in request.POST else ''
	if addr_id:
		addr=Address.objects.get(pk=addr_id)
		addr.bool_delete=True
		addr.save()
		return HttpResponse("")
	else:
		return HttpResponse("ok"+addr_id)