from django.conf.urls import patterns, include, url
from django.contrib import admin
from ConsultCafeApp import views
from ConsultCafeApp.api import resto
from ConsultCafeApp.adminPanel import restos

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'consultcafe.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^admin/', include(admin.site.urls)),

    url(r'^api/resto/$', resto.plainRouter),
    url(r'^api/resto/(?P<id>[0-9]+)/$', resto.idRouter),

    url(r'^admin/restos/$', restos.restos)

    # url('', views.main),
)