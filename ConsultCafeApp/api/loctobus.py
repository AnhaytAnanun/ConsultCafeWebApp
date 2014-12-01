from ConsultCafeApp.models import Resto
from django.db.models import Q
from django.http import HttpResponse
from django.http import QueryDict
from django.utils import timezone
from django.core import serializers
import json
import logging

def businessForLocation(request):
	polygonCoords = request.GET.getlist('polygon[]');

	if len(polygonCoords) == 0 :
		return HttpResponse(status=400)

	return HttpResponse(status=200)