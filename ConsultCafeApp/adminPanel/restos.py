from django.shortcuts import render

def restos(request):
	return render(request, 'admin/restos.html')