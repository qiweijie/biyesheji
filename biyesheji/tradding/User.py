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
	favorite_shops = models.TextField()
	@models.permalink
	def get_absolute_url(self):
		return ('seller',None,{'object_id':self.user_id})
	#add browse record
	def add_browse_record(self,record_id):
		self.delete_browse_record(str(record_id))
		self.recent_browse = self.recent_browse+str(record_id)+'*'
	#delete browse record
	def delete_browse_record(self,record_id):
		self.recent_browse = self.recent_browse.replace('*'+str(record_id)+'*', '*')
	#add shopping item
	def add_shopping_item(self,item_id):
		self.delete_shopping_item(str(item_id))
		self.shopping_cart = self.shopping_cart+str(item_id)+'*'
	#delete shopping item
	def delete_shopping_item(self,item_id):
		self.shopping_cart = self.shopping_cart.replace('*'+str(item_id)+'*', '*')
	#return the number of the product in the shopping cart
	def num_of_shopping_cart(self):
		return self.shopping_cart.count('*')-1
	#add bought product
	def add_bought_product(slef,goods_id):
		self.has_bought = self.has_bought+str(goods_id)+'*'
	#add favorite_shops
	def add_favorite_shops(self,favorite_shop_id):
		self.delete_favorite_shops(str(favorite_shop_id))
		self.favorite_shops = self.favorite_shops+str(favorite_shop_id)+"*"
	#delete favorite_shops
	def delete_favorite_shops(self,favorite_shop_id):
		self.favorite_shops = self.favorite_shops.replace('*'+str(favorite_shop_id)+"*", '*')
	
class Favorite_shop(models.Model):
	"""Favorite shops or products"""
	#用户
	customer_id = models.ForeignKey(Customer,related_name="favorite_customer_name")
	#喜欢的商店对应的用户id
	shop_id = models.ForeignKey(Customer,related_name="favorite_shop_name")
	#auto_now无论是你添加还是修改对象，时间为你添加或者修改的时间。auto_now_add为添加时的时间，更新对象时不会有变动。
	time = models.DateField(auto_now_add=True)		