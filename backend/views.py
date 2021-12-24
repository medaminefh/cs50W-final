import json
from django.http.response import JsonResponse
from .models import User, Post
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def index(_):
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
    
        return JsonResponse({"msg": "Succeed", "blogs": serializer})
    except Exception as e:
        print(f'tweets err : {e}')

        return JsonResponse({"err": "Oops something went wrong!"})
    


@csrf_exempt
def twt(req,postId):
    if req.method == "PATCH":
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