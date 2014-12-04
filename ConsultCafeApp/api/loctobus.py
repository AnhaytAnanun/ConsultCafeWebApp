from ConsultCafeApp.models import Resto
from ConsultCafeApp.models import Person
from ConsultCafeApp.models import Business
from django.db.models import Q
from django.http import HttpResponse
from django.http import QueryDict
from django.utils import timezone
from django.core import serializers
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
	polygon = polygon.convex_hull()

	busenesses = Business.objects.all()

	for buseness in busenesses :
		people = Person.objects.filter(age__gte=minAge, age__lte=maxAge, sex__in=sex)
		people = people.select_related()
		people = people.annotate(score=Average(Dist('location', polygon)))
		print(people)

	return HttpResponse(status=200)




# Remove this after #

from django.db.models import Aggregate, FloatField
from django.db.models.sql.aggregates import Aggregate as SQLAggregate


class Dist(Aggregate):
    def add_to_query(self, query, alias, col, source, is_summary):
        source = FloatField()
        aggregate = SQLDist(
            col, source=source, is_summary=is_summary, **self.extra)
        query.aggregates[alias] = aggregate


class SQLDist(SQLAggregate):
    sql_function = 'ST_Distance_Sphere'
    sql_template = "%(function)s(ST_GeomFromText('%(point)s'), %(field)s)"