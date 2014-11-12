from django.contrib.gis.db import models

# Create your models here.

class Resto(models.Model):
	name = models.CharField(max_length=50)
	type = models.CharField(max_length=50)
	
	location = models.PointField()

	customers = models.FloatField()
	wages = models.IntegerField()
	rent = models.IntegerField()
	income = models.IntegerField()
	area = models.FloatField()

	created = models.DateTimeField()
	updated = models.DateTimeField()