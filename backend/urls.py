from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('blogs/', views.tweets, name="tweets"),
    path('blogs/<str:postId>',views.twt,name="twt")
    
]
