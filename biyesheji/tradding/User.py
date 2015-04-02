#*_* coding:utf-8*_*
# user.py
from django.db import models
class User(models.Model):
	"""user is the basis of the user system,it owns the basic information the all the user,
	includes the customer,businessman as well as admin.
	"""
	#nessary information
	user_id = models.CharField(max_length=10,primary_key=True)
	username = models.CharField(max_length=50,blank=False)
	password = models.CharField(max_length=20,blank=False)
	def get_username(self):
		return self.username
	def set_password(self,new_password):
		self.password=new_password
	def check_password(self,pwd):
		return self.password==pwd

# class BrowseRecord(models.Model):
# 	"""docstring for BrowseRecord,record the products those the customer has browsed
# 	"""
# 	customer_id = models.ForeignKey(User)
# 	goods_id = models.ForeignKey(Goods)
# 	time = models.DateTimeField(auto_now_add=True)	
# 	ip = models.CharField(max_length=40)	

# class ShoppingCartItem(models.Model):
# 	"""docstring for ShoppingCart, record the products those the customer has packeted in his ShoppingCart
# 	"""
# 	customer_id = models.ForeignKey(User)
# 	goods_id = models.ForeignKey(Goods)
# 	time = models.DateTimeField(auto_now=True)		

class Customer(User):
	""" docstring for Customer,browse products,buy something,and so after-sales service
		docstring for RecentBrowse and ShoppingCartItem,each time a BrowseRecord or a ShoppingCartItem is generated, 
		attach this id to the customer's recent_browse or shopping_cart,all the ids will be stored as the format 'id*id*...*id'
		all the things buied will be associated to the order system
	"""
	#Supplementary information
	nickname = models.CharField(max_length=50,blank=True)
	email = models.CharField(max_length=50,blank=True)
	phone_number = models.CharField(max_length=11,blank=True)
	address = models.CharField(max_length=100,blank=True)
	#behavior record
	recent_browse = models.TextField()	
	shopping_cart = models.TextField()
	has_bought = models.TextField()
	#add browse record
	def add_browse_record(self,record_id):
		self.recent_browse = self.recent_browse+record_id+'*'
	#delete browse record
	def delete_browse_record(self,record_id):
		self.recent_browse = self.recent_browse.replace(record_id+'*', '')
	#add shopping item
	def add_shopping_item(self,item_id):
		self.shopping_cart = self.shopping_cart+item_id+'*'
	#delete shopping item
	def delete_shopping_item(self,item_id):
		self.shopping_cart = self.shopping_cart.replace(item_id+'*', '')
	#return the number of the product in the shopping cart
	def num_of_shopping_cart(self):
		return self.shopping_cart.count('*')
	#add bought product
	def add_bought_product(slef,goods_id):
		self.has_bought = self.has_bought+goods_id+'*'
	#
		