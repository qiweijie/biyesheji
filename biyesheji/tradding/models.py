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

class Courier(models.Model):
	"""docstring for Courier"""
	company = models.CharField(max_length=10)
	express_id = models.CharField(max_length=50)
	time = models.DateTimeField(auto_now_add=True)
	order = models.ForeignKey(Order,related_name="courier_order")

		