from ConsultCafeApp.models import RentRect
from django.http import HttpResponse
from django.http import QueryDict
from django.utils import timezone
from django.core import serializers
import json
import logging

logger = logging.getLogger("consultcafe")
widthConstant = 0.00002

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
	rentrects = serializers.serialize('json', RentRect.objects.all())
	return HttpResponse(rentrects, content_type='application/json', status=200)

def add(request):
	data = QueryDict(request.body)

	startLongitude = data['longitude']
	startLattitude = data['lattitude']
	endLongitude = startLongitudet + widthConstant
	endLattitude = startLattitude + widthConstant

	rentrect = RentRect(
			rect='POLYGON(((%s , %s) , (%s , %s)), ())' % (startLongitudet, startLattitude, endLongitude, endLattitude),
			rent=data.get('rent', rentrect.rent),
			created=timezone.now(),
			updated=timezone.now()
		)

	rentrect.save()
	return HttpResponse(serializers.serialize('json', RentRect.objects.all().filter(pk=rentrect.id)), status=201)

def edit(request, id):
	rentrect = RentRect.objects.get(pk=id)

	if rentrect is None:
		return HttpResponse(status=404)

	data = QueryDict(request.body)

	startLongitude = data.get('longitude', rentrect.location.x)
	startLattitude = data.get('lattitude', rentrect.location.y)
	endLongitude = startLongitudet + widthConstant
	endLattitude = startLattitude + widthConstant

	RentRect.objects.filter(pk=id).update(
		rect='POLYGON(((%s , %s) , (%s , %s)), ())' % (startLongitudet, startLattitude, endLongitude, endLattitude)
		rent=data.get('rent', rentrect.rent),
		updated=timezone.now()
	)

	return HttpResponse(status=200)

def remove(id):
	rentrect = RentRect.objects.get(pk=id)

	if rentrect is None:
		return HttpResponse(status=404)

	RentRect.objects.filter(pk=id).delete()

	return HttpResponse(status=200)