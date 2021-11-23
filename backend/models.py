from django.contrib.auth.models import User
from django.db import models


class Post(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Count(models.Model):
    postId = models.ForeignKey(
        Post, on_delete=models.CASCADE)
    counter = models.IntegerField(default=0)

    def __str__(self):
        return f"Post N°{self.id}"

    def serialize(self):
        return {
            "id": self.id,
            "postId": self.postId
        }


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.CharField(max_length=50)

    def __str__(self):
        return f"Comment N°{self.id} created by {self.user.username} on the {self.post} ==> {self.comment}"


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} liked ${self.post}"
