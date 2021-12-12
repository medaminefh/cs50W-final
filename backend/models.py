from django.contrib.auth.models import User
from django.db import models


class Post(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255,blank=False,default="Hello World!")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def serialize(self):
        return {
            "user":self.user.username,
            "title":self.title,
            "content":self.content,
            "createdAt":self.created_at,
            'updatedAt':self.updated_at
        }


class Count(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE)
    counter = models.IntegerField(default=0)

    def __str__(self):
        return f"Post N°{self.id}"

    def serialize(self):
        return {
            "id": self.id,
            "postId": self.post.id
        }


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.CharField(max_length=50)

    def __str__(self):
        return f"Comment N°{self.id} created by {self.user.username} on the {self.post.title} ==> {self.comment}"
    
    def serialize(self):
        return {
            "user":self.user.username,
            "postId":self.post.id,
            "postTitle":self.post.title,
            "comment":self.comment,
        }

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} liked ${self.post}"

    def serialize(self):
        return {
            "user":self.user.username,
            "title":self.post.title,
            "content":self.post.content
        }