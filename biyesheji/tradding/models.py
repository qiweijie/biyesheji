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
