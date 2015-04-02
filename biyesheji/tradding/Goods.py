#*_* coding:utf-8*_*
# Goods.py
from django.db import models
from User import Customer
from ThumbnailImageField import ThumbnailImageField
class Goods(models.Model):
	"""Goods is the core element of this tradding system """
	goods_id = models.CharField(max_length=100,blank=False,null=False,primary_key=True)
	user = models.ForeignKey(Customer)
	title    = models.CharField(max_length=100,blank=False,null=True)
	special = models.CharField(max_length=200,blank=False)
	price    = models.CharField(max_length=20,blank=False)
	number = models.CharField(max_length=20,blank=False)
	bool_onsale = models.BooleanField(default=True)
	bool_delete = models.BooleanField(default=False)
	description= models.TextField()
	@models.permalink
	def get_absolute_url(self):
		return ('products_detail',None,{'object_id':self.goods_id})
	
class Goods_picture(models.Model):
	"""goods has its own description picture """
	# pic_id = models.CharField(max_length=100,primary_key=True)
	goods = models.ForeignKey(Goods,related_name="goods_photo")
	image = ThumbnailImageField(upload_to='goods_photo')
	@models.permalink
	def get_absolute_url(self):
		return ('photos_detail',None,{'object_id':self.id})
class Picture(models.Model):
	"""docstring for Picture"""
	user = models.ForeignKey(Customer)
	image = ThumbnailImageField(upload_to='goods_photo')
		
