from django.shortcuts import render
import logging

logger = logging.getLogger("consultcafe")

# Create your views here.

def main(request):
	logger.debug('Tuta???')
	return render(request, 'index.html')

def login(request):
	return render(request, 'login.html')

def busToLoc(request):
	return render(request, 'busToLoc.html')

def heatMap(request):
	return render(request, 'heatMap.html')

def locToBus(request):
	return render(request, 'locToBus.html')

def menuGenerator(request):
	return render(request, 'menuGenerator.html')

from ConsultCafe.models import Resto
from datetime import datetime

def add(request):
	resto = Resto(
			name='Woodrock',
			type='Pub',
			location='POINT(0 0)',
			customers=200,
			wages=200,
			rent=200,
			income=200,
			area=200,
			created=datetime.now(),
			updated=datetime.now()
		)
	logger.debug('Goodbye, cruel world!')
	resto.save()
	logger.debug('Wait, I\'ve resto! %s' + str(resto.id))
	return render(request, 'index.html')