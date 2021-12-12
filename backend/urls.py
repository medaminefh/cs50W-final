from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('register/', views.register, name="register"),
    path('login/', views.login_view, name="login"),
    path('tweets/', views.tweets, name="tweets"),
    path('tweet/', views.tweet, name="tweet"),
    path('tweet/<str:postId>',views.twt,name="twt")
]
