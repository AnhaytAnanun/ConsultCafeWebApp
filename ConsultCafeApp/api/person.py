from ConsultCafeApp.models import Person
from ConsultCafeApp.models import PersonLocation
from django.http import HttpResponse
from django.http import QueryDict
from django.utils import timezone
from django.core import serializers
import json
import uuid
import logging

def registerPerson(request):
	data = QueryDict(request.body)

	person = Person(
			name=data['name'],
			age=data['age'],
			nationality=data['nationality'],
			token=uuid.uuid1().hex,
			created=timezone.now(),
			updated=timezone.now()
		)
	personLocation.save()

	responseData = {}
	responseData.token = token

	return HttpResponse(status=201)

def editPerson(request, id, uuid):
	data = QueryDict(request.body)
	person = Person.get(pk=id, token=uuid)
	token = uuid.uuid1().hex

	if person is None
		return HttpResponse(status=404)

	Person.filter(pk=id,token=uuid),update(
			name=data.get('name', person.name)
			age=data.get('age', person.age),
			nationality=data.get('nationality', person.nationality),
			token=token,
			created=timezone.now(),
			updated=timezone.now()
		)

	return HttpResponse(status=200)

def addLocation(request, id, uuid):
	person = Person.filter(pk=id, token=uuid)

	if person.length() == 0:
		return HttpResponse(status=404)

	data = QueryDict(request.body)
	token = uuid.uuid1().hex

	person.update(
			token=token
		)

	personLocation = PersonLocation(
			location='POINT(%s %s)' % (data['longitude'], data['lattitude']),
			created=timezone.now()
		)
	personLocation.save()

	return HttpResponse(status=200)