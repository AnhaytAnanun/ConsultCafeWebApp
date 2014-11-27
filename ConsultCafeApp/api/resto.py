from ConsultCafeApp.models import Resto
from django.http import HttpResponse
from django.http import QueryDict
from django.utils import timezone
from django.core import serializers
import json
import logging

logger = logging.getLogger("consultcafe")

def plainRouter(request):
	if request.method == 'GET':
		return query(request)
	elif request.method == 'POST':
		return add(request)
	else:
		return HttpResponse(status=400)

def idRouter(request, id):
	if request.method == 'PUT':
		return edit(request, id)
	elif request.method == 'DELETE':
		return remove(id)
	else:
		return HttpResponse(status=400)

def query(request):
	logger.debug(request)
	restos = serializers.serialize('json', Resto.objects.all())
	return HttpResponse(restos, content_type='application/json', status=200)

def add(request):
	data = QueryDict(request.body)
	resto = Resto(
			name=data['name'],
			type=data['type'],
			kitchen=data['kitchen'],
			location='POINT(%s %s)' % (data['longitude'], data['lattitude']),
			customers=data['customers'],
			wages=data['wages'],
			rent=data['rent'],
			income=data['income'],
			area=data['area'],
			created=timezone.now(),
			updated=timezone.now()
		)

	resto.save()
	return HttpResponse(serializers.serialize('json', Resto.objects.all().filter(pk=resto.id)), status=201)

def edit(request, id):
	resto = Resto.objects.get(pk=id)

	if resto is None:
		return HttpResponse(status=404)

	data = QueryDict(request.body)

	longitude = data.get('longitude', resto.location.x)
	lattitude = data.get('lattitude', resto.location.y)

	Resto.objects.filter(pk=id).update(
		name=data.get('name', resto.name),
		type=data.get('type', resto.type),
		kitchen=data.get('kitchen', resto.kitchen),
		location='POINT(%s %s)' % (longitude, lattitude),
		customers=data.get('customers', resto.customers),
		wages=data.get('wages', resto.wages),
		rent=data.get('rent', resto.rent),
		income=data.get('income', resto.income),
		area=data.get('area', resto.area),
		updated=timezone.now()
	)

	return HttpResponse(status=200)

def remove(id):
	resto = Resto.objects.get(pk=id)

	if resto is None:
		return HttpResponse(status=404)

	Resto.objects.filter(pk=id).delete()

	return HttpResponse(status=200)