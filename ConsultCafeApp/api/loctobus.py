from ConsultCafeApp.models import Resto
from ConsultCafeApp.models import Person, PersonLocation
from ConsultCafeApp.models import Business
from django.db.models import Q
from django.http import HttpResponse
from django.http import QueryDict
from django.utils import timezone
from django.core import serializers
from django.contrib.gis.geos import GEOSGeometry
import random
import json
import logging

logger = logging.getLogger("consultcafe")

def businessForLocation(request):
	polygonCoords = request.GET['polygon']
	minAge = request.GET['minAge']
	maxAge = request.GET['maxAge']
	sex = request.GET['sex[]']

	if len(polygonCoords) == 0 :
		return HttpResponse(status=400)

	polygon = GEOSGeometry(polygonCoords)
	polygon = polygon.convex_hull
	
	busenesses = Business.objects.all()
	data = {}

	for buseness in busenesses :
		data[buseness.name] = {}

		userScore = 0.0
		userCount = 0.0
		locsCount = 0.0
		people = Person.objects.filter(age__gte=minAge, age__lte=maxAge, sex__in=sex, busType=buseness.name)

		if len(people) > 0 :
			for person in people :
				locs = PersonLocation.objects.filter(username=person.username)
				locsScore = 0.0

				for location in locs :
					locsScore = locsScore + location.location.distance(polygon)	
					locsCount = locsCount + 1

				userScore = userScore + locsScore / locsCount
				userCount = userCount + 1

			userScore = userScore / userCount

		data[buseness.name]['userScore'] = userScore

		restos = Resto.objects.filter(type=buseness.name)

		restoScore = 0.0
		restoCount = 0.0
		income = 0.0
		wages = 0.0
		restoMaxCustomers = 0.0

		for resto in restos :
			if resto.customers > restoMaxCustomers :
				restoMaxCustomers = resto.customers

			income = income + resto.income
			wages = wages + resto.wages
			restoCount = restoCount + 1

		data[buseness.name]['wagesScore'] = (wages + buseness.wage * 2) / restoCount
		data[buseness.name]['incomeScore'] = (income + buseness.income * 2) / restoCount
		data[buseness.name]['customersScore'] = userCount * 1.35 - restoMaxCustomers * 0.75

	logger.error(data)

	return HttpResponse(json.dumps(data), content_type='application/json', status=200)

def ohMohMadadoh(request):
	PersonLocation.objects.all().delete()

	# arrayLat = [40.179798, 40.179320, 40.184755, 40.183599, 40.187812, 40.175082, 40.173959]
	# arrayLong = [44.517052, 44.527530, 44.519806, 44.515246, 44.515761, 44.526071, 44.513690]

	lato = 40.180722
	longo = 44.515428

	k = 1

	for person in Person.objects.all() :
		n = random.randrange(150, 300)
		
		for i in xrange(1, n):
			longi = longo + random.randrange(-100, 100) * 0.0001
			lati = lato + random.randrange(-100, 100) * 0.0001
			loc = PersonLocation(username=person.username,
				created=timezone.now(),
				location='POINT(%s %s)' % (longi, lati))
			loc.save()

	k = k + 1



	return HttpResponse(status=200)

	# restos = PersonLocation.objects.all()
	# restos = serializers.serialize('json', restos)
	# return HttpResponse(restos, content_type='application/json', status=200)