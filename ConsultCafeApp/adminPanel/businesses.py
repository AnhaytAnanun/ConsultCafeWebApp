from django.shortcuts import render

def business(request):
	return render(request, 'admin/business.html')