#*_* coding:utf-8*_*
# urls.py
from django.conf.urls import patterns, include, url
from Goods import Goods,Goods_picture
urlpatterns = patterns('tradding.views.views',
	url(r'^$', 'home'),
	url(r'^login$', 'login'),
	url(r'^register/check$', 'check_username'),
	url(r'^register$', 'register'),
	url(r'^logout', 'logout')
)
#personal urls
urlpatterns += patterns('tradding.views.person',
	url(r'^personal_center$', 'personal_center'),
	url(r'^order_list$', 'order_list'),
	url(r'^shopping_cart$', 'shopping_cart'),
)
# personal center
urlpatterns += patterns('tradding.views.person',
	url(r'^personal_center/change', 'change'),
)
#address
urlpatterns += patterns('tradding.views.address',
	url(r'^personal_address/add', 'add_address'),
	url(r'^personal_address/change', 'change_address'),
	url(r'^personal_address/set_default', 'set_default'),
	url(r'^personal_address/delete', 'delete'),
	url(r'^personal_address', 'personal_address'),
)
#seller
urlpatterns += patterns('tradding.views.seller',
	url(r'seller_center', 'seller_center'),
)
#products
urlpatterns += patterns('django.views.generic',
    url(r'^products/products/(?P<object_id>\d+)$', 'list_detail.object_detail',
        kwargs={
            'queryset':Goods.objects.all(),
            'template_name':'seller/products_detail.html'
            },
            name='products_detail'
        ),
    url(r'^products/photos/(?P<object_id>\d+)$', 'list_detail.object_detail',
        kwargs={
            'queryset':Goods_picture.objects.all(),
            'template_name':'seller/photos_detail.html'
            },
            name='photos_detail'
        ),
)
urlpatterns += patterns('tradding.views.seller',
	url(r'^products/release_products', 'release_products'),
	url(r'^products/selling_products', 'selling_products'),
	url(r'^products/edit/', 'release_products'),
	url(r'^products/warehousing_products', 'warehousing_products'),
	url(r'^products/history_products', 'history_products'),
	url(r'^products/upload_photo', 'upload_photo'),
	url(r'^products/offsale_goods', 'offsale_goods'),
	url(r'^products/onsale_goods', 'onsale_goods'),
	url(r'^products/delete_goods', 'delete_goods'),
	url(r'^products/resale_goods', 'resale_goods'),
	url(r'^products$', 'products'),
)
