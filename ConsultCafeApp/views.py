from django.shortcuts import render
from django.shortcuts import redirect

# Create your views here.

def main(request):
	if request.user.is_authenticated():
		return render(request, 'mainMenu.html')
	else:
		return redirect('/login')

def login(request):
	if request.user.is_authenticated():
		return redirect('/mainMenu')
	else:
		return render(request, 'login.html')

def busToLoc(request):
	if request.user.is_authenticated():
		return render(request, 'busToLoc.html')
	else:
		return redirect('/login')

def heatMap(request):
	if request.user.is_authenticated():
		return render(request, 'heatMap.html')
	else:
		return redirect('/login')

def locToBus(request):
	if request.user.is_authenticated():
		return render(request, 'locToBus.html')
	else:
		return redirect('/login')

def menuGenerator(request):
	if request.user.is_authenticated():
		return render(request, 'menuGenerator.html')
	else:
		return redirect('/login')

def notFound(request):
	if request.user.is_authenticated():
		return render(request, 'notFound.html')
	else:
		return redirect('/login')