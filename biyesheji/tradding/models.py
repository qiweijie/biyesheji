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

class BrowseRecord(models.Model):
	"""docstring for BrowseRecord,record the products those the customer has browsed
	"""
	customer_id = models.ForeignKey(Customer,related_name="browse_customer")
	goods_id = models.ForeignKey(Goods,related_name="browse_goods")
	time = models.DateTimeField(auto_now_add=True)	
	ip = models.CharField(max_length=40)	
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
		
		