from ConsultCafeApp.models import Business
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
	businesses = Business.objects.all()
	businesses = serializers.serialize('json', businesses)
	return HttpResponse(businesses, content_type='application/json', status=200)

def add(request):
	data = QueryDict(request.body)
	business = Business(
			name=data['name'],
			wage=data['wage'],
			income=data['income'],
			created=timezone.now(),
			updated=timezone.now()
		)

	business.save()
	return HttpResponse(serializers.serialize('json', Business.objects.all().filter(pk=business.name)), status=201)

def edit(request, id):
	business = Business.objects.get(pk=id)

	if business is None:
		return HttpResponse(status=404)

	data = QueryDict(request.body)

	Business.objects.filter(pk=id).update(
		name=data.get('name', business.name),
		wage=data.get('wage', business.wage),
		income=data.get('income', business.income),
		updated=timezone.now()
	)

	return HttpResponse(status=200)

def remove(id):
	business = Business.objects.get(pk=id)

	if business is None:
		return HttpResponse(status=404)

	Business.objects.filter(pk=id).delete()

	return HttpResponse(status=200)