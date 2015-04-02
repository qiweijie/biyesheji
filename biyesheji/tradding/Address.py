#*_* coding:utf-8*_*
# Address.py
from django.db import models
from User import Customer

class Address(models.Model):
	"""Address for shopping """
	address_id = models.CharField(max_length=10,primary_key=True)
	user = models.ForeignKey(Customer,related_name="address_user")
	name = models.CharField(max_length=10,blank=False)
	phone_number = models.CharField(max_length=20,blank=False)
	address = models.CharField(max_length=200,blank=False)
	bool_default = models.BooleanField()
	bool_delete = models.BooleanField()

