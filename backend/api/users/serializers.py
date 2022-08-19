from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

CustomUser = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.get("password")
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def validate(self, attrs):
        nickname = attrs["nickname"]
        password = attrs["password"]
        if CustomUser.objects.filter(nickname=nickname).exists():
            raise serializers.ValidationError("이미 존재하는 닉네임입니다.")
        validate_password(password)

        return attrs


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["nickname", "username", "profile_img"]


class RefreshTokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {"bad_token": "Token is invalid or expired"}

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail("bad_token")


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "email", "phone", "profile_img"]
