from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'tradding.views.views.home', name='home'),
    # url(r'^biyesheji/', include('biyesheji.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^tradding/', include('tradding.urls')),
)
urlpatterns += patterns('tradding.views.system',
	url(r'^system/caculate_similarty$','caculate_similarty'),
	url(r'^system/recommend_search$','recommend_search'),
    url(r'^system/caculate_love_level$','caculate_love_level'),
    url(r'^system/recommend_user_goods$','recommend_user_goods'),
    url(r'^system/recommend_similar_goods$','recommend_similar_goods'),
)