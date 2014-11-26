from django.contrib.gis.db import models

# Resto, respresenting restaurants

class Resto(models.Model):
	name = models.CharField(max_length=50)
	type = models.CharField(max_length=50)
	kitchen = models.CharField(max_length=50)
	
	location = models.PointField()

	customers = models.FloatField()
	wages = models.IntegerField()
	rent = models.IntegerField()
	income = models.IntegerField()
	area = models.FloatField()

	created = models.DateTimeField()
	updated = models.DateTimeField()

# Person, respresenting person personal data

class Person(models.Model):
	name = models.CharField(max_length=50)
	age = models.IntegerField()
	nationality = models.CharField(max_length=50)

	token = models.CharField(max_length=32)

	created = models.DateTimeField()
	updated = models.DateTimeField()

# PersonLocation, respresenting person location data
# Uses rects for Damphster-Sheffer

class PersonLocation(models.Model):
	location = models.PolygonField()

	created = models.DateTimeField()

# RentRect, representing rent at some location.
# Uses rects for Damphster-Sheffer

class RentRect(models.Model):
	rect = models.IntegerField()

	rent = models.PolygonField()	

	created = models.DateTimeField()
	updated = models.DateTimeField()