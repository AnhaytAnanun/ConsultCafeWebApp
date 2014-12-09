from django.shortcuts import render

def people(request):
	return render(request, 'admin/people.html')