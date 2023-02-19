from rest_framework import serializers

class LoginUserBodySerializer(serializers.Serializer):
   nickname = serializers.CharField(help_text="닉네임")
   password = serializers.CharField(help_text="패스워드")
