from ConsultCafeApp.models import Person, PersonLocation
from django.db.models import Q
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
	people = Person.objects.all()
	people = serializers.serialize('json', people)
	return HttpResponse(people, content_type='application/json', status=200)

def add(request):
	data = QueryDict(request.body)
	person = Person(
			username=data['username'],
			age=data['age'],
			sex=data['sex'],
			busType=data['busType'],
			kitchen=data['kitchen'],
			token=data['token'],
			created=timezone.now(),
			updated=timezone.now()
		)

	person.save()
	return HttpResponse(serializers.serialize('json', Person.objects.all().filter(pk=person.username)), status=201)

def edit(request, id):
	person = Person.objects.get(pk=id)

	if person is None:
		return HttpResponse(status=404)

	data = QueryDict(request.body)

	Person.objects.filter(pk=id).update(
		age=data['age'],
		sex=data['sex'],
		busType=data['busType'],
		kitchen=data['kitchen'],
		updated=timezone.now()
	)

	return HttpResponse(status=200)

def remove(id):
	person = Person.objects.get(pk=id)

	if person is None:
		return HttpResponse(status=404)

	Person.objects.filter(pk=id).delete()

	return HttpResponse(status=200)

def personLocs(request):
	return HttpResponse(serializers.serialize('json', PersonLocation.objects.all()), content_type='application/json', status=200)