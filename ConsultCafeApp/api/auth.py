from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
import logging

def signup(request):
	user = User.objects.create_user(request.POST['username'], request.POST['email'], request.POST['pwd1'])
	user.save()

	login(request, user)

	return redirect('/')

def loginUser(request):
	username = request.POST['username']
	password = request.POST['password']

	user = authenticate(username=username, password=password)

	if user is not None :
		login(request, user)
		return redirect('/')