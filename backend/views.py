from django.http.response import JsonResponse
#from .models import User, Post, Like, Comment, Count

# Create your views here.


def index(req):
    return JsonResponse({"msg": "Hello World!"})
