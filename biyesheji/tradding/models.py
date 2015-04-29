#*_* coding:utf-8*_*
# Create your models here.
from django.db import models
from Goods import Goods,Goods_picture
from User import User,Customer
from Address import Address

class ShoppingCartItem(models.Model):
	"""docstring for ShoppingCart, record the products those the customer has packeted in his ShoppingCart
	"""
	customer_id = models.ForeignKey(Customer,related_name="cart_customer")
	goods_id = models.ForeignKey(Goods,related_name="cart_product")
	time = models.DateTimeField(auto_now=True)	
	bool_delete = models.BooleanField(default=False)

class BrowseRecord(models.Model):
	"""docstring for BrowseRecord,record the products those the customer has browsed
	"""
	customer_id = models.ForeignKey(Customer,related_name="browse_customer")
	goods_id = models.ForeignKey(Goods,related_name="browse_goods")
	time = models.DateTimeField(auto_now_add=True)	
	ip = models.CharField(max_length=40)
	bool_delete = models.BooleanField(default=False)	
class Order(models.Model):
	"""docstring for Order"""
	user = models.ForeignKey(Customer,related_name="order_user")
	goods = models.ForeignKey(Goods,related_name="order_goods")
	address = models.ForeignKey(Address,related_name="order_address")
	goods_number = models.CharField(max_length=10)
	additional = models.CharField(max_length=200)
	time = models.DateTimeField(auto_now_add=True)
	ing = models.BooleanField(default=True)
	confirm = models.BooleanField(default=False)
	cancle = models.BooleanField(default=False)
	@models.permalink
	def get_absolute_url(self):
		return ('order_detail',None,{'object_id':self.id})

class Courier(models.Model):
	"""docstring for Courier"""
	company = models.CharField(max_length=10)
	express_id = models.CharField(max_length=50)
	time = models.DateTimeField(auto_now_add=True)
	order = models.OneToOneField(Order,related_name="courier_order")
class Evaluate(models.Model):
    """
    Description: Model Description
    """
    order = models.OneToOneField(Order,related_name='order_evaluate')
    match = models.CharField(max_length=1)
    quality = models.CharField(max_length=1)
    status = models.CharField(max_length=1)
    pr_service = models.CharField(max_length=1)
    courier_speed = models.CharField(max_length=1)
    af_service = models.CharField(max_length=1)
    goods_evaluate = models.TextField()
    service_evaluate = models.TextField()
    time = models.DateTimeField(auto_now_add=True)

class Search_Record(models.Model):
	"""docstring for Search_Record"""
	key = models.CharField(max_length=100)
	user_id = models.CharField(max_length=20)
	ip =  models.CharField(max_length=40)
	time = models.DateTimeField(auto_now_add=True)	

class Stop(models.Model):
	"""docstring for Stop"""
	name =  models.CharField(max_length=20,primary_key=True)

class Dict(models.Model):
	"""docstring for Dict"""
	name = models.CharField(max_length=20,primary_key=True)

class Goods_label(models.Model):
	"""docstring for Goods_span"""
	goods_id = models.CharField(max_length=20)
	label = models.TextField()
	def delete_goods_label(self,label):
		self.label = self.label.replace("*_*"+str(label)+"*_*","*_*")
	def add_goods_label(self,label):
		self.delete_goods_label(label)
		self.label = self.label+str(label)+"*_*"

class Label_goods(models.Model):
	"""docstring for Label_goods"""
	name = models.CharField(max_length=20)
	goods_id = models.TextField()
	def delete_goods_id(self,goods_id):
		self.goods_id = self.goods_id.replace('*'+str(goods_id)+'*','*')
	def add_goods_id(self,goods_id):
		self.delete_goods_id(goods_id)
		self.goods_id = self.goods_id+str(goods_id)+'*'

class Goods_similarty(models.Model):
	"""docstring for Goods_similarty"""
	small_goods_id = models.CharField(max_length=20)
	big_goods_id = models.CharField(max_length=20)
	similarty = models.FloatField()

class Record_caculate_goods_id(models.Model):
	"""docstring for Record_caculate_goods_id"""
	time = models.DateTimeField(auto_now_add=True)
	max_goods_id = models.CharField(max_length=20)
	number = models.CharField(max_length=20)
		
class User_goods_level(models.Model):
	"""docstring for User_goods_level"""
	user_id = models.CharField(max_length=20)
	goods_id = models.CharField(max_length=20)
	evaluation = models.IntegerField()

class Record_caculate_love_id(models.Model):
	"""docstring for Record_caculate_goods_id"""
	time = models.DateTimeField(auto_now_add=True)
	max_browse_id = models.CharField(max_length=20)
	max_cart_id = models.CharField(max_length=20)
	max_order_id = models.CharField(max_length=20)
	number = models.CharField(max_length=20)