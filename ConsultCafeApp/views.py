from django.shortcuts import render

# Create your views here.

def main(request):
	return render(request, 'mainMenu.html')

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