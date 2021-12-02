import json
from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from .models import User, Post, Like, Comment, Count
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def index(req):
    return JsonResponse({"msg": "Hello World!"})


def tweets(req):
    try:
        tweets = Post.objects.all()

        serialize = []

        for tweet in tweets:
            serialize.append(tweet)

        return JsonResponse({"msg": "Succeed", "tweets": serialize})
    except Exception as e:
        print(f'tweets err : {e}')

        return JsonResponse({"err": "Oops something went wrong!"})
    return JsonResponse({"msg": "Hello Tweets"})


def tweet(req):
    if req.user.is_authenticated:
        if req.method == "POST":
            try:

                body_unicode = req.body.decode('utf-8')
                body = json.loads(body_unicode)

                content = body['content']
                user = req.user
                post = Post.objects.create(user=user, content=content)
                post.save()
                return JsonResponse({"tweet": {"content": post.content, "user": user.username}})
            except Exception as e:
                print(f'tweet Post error : {e}')
                return JsonResponse({"err": "Something wrong happened"})
        if req.method == "PUT":
            try:
                body_unicode = req.body.decode('utf-8')
                body = json.loads(body_unicode)

                content = body['content']
                id = body['id']

                tweet = Post.objects.get(pk=id)
                user = req.user

                tweet.content = content
                tweet.save(update_fields=["content"])

                return JsonResponse({"msg": "Updated!", "tweet": {"content": tweet.content}})

            except Exception as e:
                print(f'tweet Put error :{e}')
                return JsonResponse({"err": "Oops something went wrong!"})
        if req.method == "DELETE":
            try:
                body_unicode = req.body.decode('utf-8')
                body = json.loads(body_unicode)

                id = body['id']

                tweet = Post.objects.get(pk=id)
                tweet.delete()

                return JsonResponse({"msg": "Deleted!"})

            except Exception as e:
                print(f'tweet Delete error :{e}')
                return JsonResponse({"err": "Oops something went wrong!"})
        return JsonResponse({"msg": "Hello Tweet"})

    return JsonResponse({"msg": "Hello Tweet"})


@csrf_exempt
def register(req):
    if req.method == "POST":
        body_unicode = req.body.decode('utf-8')
        body = json.loads(body_unicode)

        username = body['username']
        email = body['email']

        password = body['password']

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()

        except IntegrityError:
            return JsonResponse({"msg": "Username already taken"})
        login(req, user)
        return JsonResponse({"msg": f"You're Logged in {username}"})
    else:
        return JsonResponse({"err": "Post requests only"})


@csrf_exempt
def login_view(req):
    if req.method == "POST":
        body_unicode = req.body.decode('utf-8')
        body = json.loads(body_unicode)
        print(body)
        # Attempt to sign user in
        username = body["username"]
        password = body["password"]
        user = authenticate(req, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(req, user)
            return JsonResponse({"msg": "Logged in", "user": {"username": user.username, "email": user.email}})
        else:
            return JsonResponse({"msg": "Invalid username and/or password."})
    else:
        return JsonResponse({"msg": "Post requests only"})


def logout_view(req):
    logout(req)
    return JsonResponse({"msg": "Logged Out"})
