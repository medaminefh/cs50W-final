import json
from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from .models import User, Post, Like, Comment, Count
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def index(req):
    return JsonResponse({"msg": "Hello World!"})

@csrf_exempt
def tweets(req):

    if req.method == "POST":
        try:
            body_unicode = req.body.decode('utf-8')
            body = json.loads(body_unicode)

            title = body['title']
            short = body['short']
            long = body['long']
            
            userId = body["userId"]
            user = User.objects.get(pk=userId)
            post = Post.objects.create(user=user, title=title,short=short,long=long)
            post.save()
            return JsonResponse({"blog": {"id":post.id,"title": post.title, "user": user.username}})
        except Exception as e:
            print(f'tweet Post error : {e}')
            return JsonResponse({"err": "Something wrong happened"})
    

    try:
        tweets = Post.objects.all().order_by("-updated_at")
        serializer = []
        for tweet in tweets:
            
            serializer.append(tweet.serialize())
    
        print("hello Tweets",serializer)
        return JsonResponse({"msg": "Succeed", "blogs": serializer})
    except Exception as e:
        print(f'tweets err : {e}')

        return JsonResponse({"err": "Oops something went wrong!"})
    


@csrf_exempt
def twt(req,postId):
    print(postId)
    if req.method == "POST":
        try:

            body_unicode = req.body.decode('utf-8')
            body = json.loads(body_unicode)

            userId = body['userId']
            comment = body['comment']
            like = body['like']

            user = User.objects.get(pk = userId)

            tweet = Post.objects.get(pk = postId)
            
            if like:

                try:
                    tweetLiked = Like.objects.get(post=tweet, user=user)
                except:
                    tweetLiked = None

                if tweetLiked:
                    tweetLiked.delete()
                    return JsonResponse({"Success": "Disliked"}, status=200)
                
                tweetLiked = Like.objects.create(user=user, tweet=tweet)
                tweetLiked.save()

            if comment:
                comment = Comment.objects.create(user = user , post = tweet, comment=comment)
                comment.save()
            
            

            return JsonResponse({"Success": "Liked Succussfully"}, status=200)
            pass
        except Exception as e:
            print("Err with like or commenting a post",e)
            return JsonResponse({"err":"Oops something went wrong!"})
    if req.method == "PUT":
        try:
            body_unicode = req.body.decode('utf-8')
            body = json.loads(body_unicode)

            title = body['title']
            short = body['short']
            long = body['long']
            userId = body['userId']

            
            tweet = Post.objects.get(pk=postId)
            user = User.objects.get(pk=userId)

            if tweet.user != user:
                
                return JsonResponse({"msg":"Not Allowed to modify others tweets"})

            tweet.title = title
            tweet.long = long
            tweet.short = short
            tweet.save(update_fields=["title", "long", "short" ,"updated_at"])

            return JsonResponse({"msg": "Updated!"})

        except Exception as e:
            print(f'tweet Put error :{e}')
            return JsonResponse({"err": "Oops something went wrong!"})
    if req.method == "DELETE":

        try:
            body_unicode = req.body.decode('utf-8')
            body = json.loads(body_unicode)

            userId = body['userId']

            user = User.objects.get(pk=userId)


            tweet = Post.objects.get(pk=postId)
            if tweet.user != user :
                return JsonResponse({"msg":"Not allowed to delete others posts"})
            tweet.delete()

            return JsonResponse({"msg": "Deleted!"})

        except Exception as e:
            print(f'tweet Delete error :{e}')
            return JsonResponse({"err": "Oops something went wrong!"})

    try :

        tweet = Post.objects.get(pk=postId)
        tweet = tweet.serialize()

        return JsonResponse(tweet)
    except Exception as e:
        print("Err with getting the post",e)
        return JsonResponse({"err":"No post with that Id"})

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
