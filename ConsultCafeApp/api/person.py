from ConsultCafeApp.models import Person
from ConsultCafeApp.models import PersonLocation
from django.http import HttpResponse
from django.http import QueryDict
from django.utils import timezone
from django.core import serializers
import json
import logging

def addLocation(request, id):
	person = Person.get(pk=id)

	if person is None:
		return HttpResponse(status=404)

	data = QueryDict(request.body)

	personLocation = PersonLocation(
			location='POINT(%s %s)' % (data['longitude'], data['lattitude']),
			created='timezone.now()'
		)
	personLocation.save()

	return HttpResponse(200)