from ConsultCafeApp.models import Resto
from django.http import HttpResponse
from django.http import QueryDict
from django.utils import timezone
from django.core import serializers
import json
import logging

def heatmapResto():
	