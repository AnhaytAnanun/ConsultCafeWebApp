from django.conf.urls import patterns, include, url
from django.contrib import admin
from ConsultCafeApp import views
from ConsultCafeApp.api import resto
from ConsultCafeApp.api import business
from ConsultCafeApp.api import person
from ConsultCafeApp.api import loctobus
from ConsultCafeApp.api import auth
from ConsultCafeApp.adminPanel import restos
from ConsultCafeApp.adminPanel import businesses
from ConsultCafeApp.adminPanel import people

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'consultcafe.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^admin/', include(admin.site.urls)),

    url(r'^$', views.main),
    url(r'^login$', views.login),
    url(r'^busToLoc$', views.busToLoc),
    url(r'^locToBus$', views.locToBus),
    url(r'^heatMap$', views.heatMap),
    url(r'^menuGenerator$', views.menuGenerator),

    ##
    # Admin panel urls
    ##

    url(r'^api/resto/$', resto.plainRouter),
    url(r'^api/resto/(?P<id>[0-9]+)/$', resto.idRouter),

    url(r'^api/business/$', business.plainRouter),
    url(r'^api/business/(?P<id>[a-z]+)/$', business.idRouter),

    url(r'^api/person/$', person.plainRouter),
    url(r'^api/person/(?P<id>[a-z]+)/$', person.idRouter),

    url(r'^api/loctobus', loctobus.businessForLocation),

    url(r'^api/login/$', auth.loginUser),
    url(r'^api/signup/$', auth.signup),

    url(r'^admin/restos/$', restos.restos),
    url(r'^admin/business/$', businesses.business),
    url(r'^admin/people/$', people.people),

    url(r'^.*$', views.notFound)
)