from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('register/', views.register, name="register"),
    path('login/', views.login_view, name="login"),
    path('blogs/', views.tweets, name="tweets"),
    path('blogs/<str:postId>',views.twt,name="twt")
    
]
