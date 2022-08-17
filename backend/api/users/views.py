from telnetlib import STATUS
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.generics import ListAPIView
from users.models import CustomUser
from .serializers import (
    CustomUserSerializer,
    RefreshTokenSerializer,
    UserListSerializer,
    UserProfileSerializer,
)
from pets.models import Member


class CustomUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = CustomUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()  # Query Type

            return Response(
                {
                    "user": CustomUserSerializer(new_user).data,  # JSON Type
                    "message": "회원가입이 완료되었습니다!",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.all()
    serializer_class = UserListSerializer


class SignInUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        nickname = request.data.get("nickname")
        password = request.data.get("password")
        if not nickname or not password:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(
            nickname=nickname,
            password=password,
        )
        if user:
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)

            res = Response(
                {
                    "refresh": str(token),
                    "access": str(token.access_token),
                },
                status=status.HTTP_200_OK,
            )
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)
            return res
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class SignOutUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args):
        user = RefreshTokenSerializer(data=request.data)
        user.is_valid(raise_exception=True)
        user.save()

        reset = ""
        res = Response({"message": "logout success"}, status=status.HTTP_204_NO_CONTENT)
        res.set_cookie("access", reset)
        res.set_cookie("refresh", reset)

        return Response({"message": "logout success"}, status=status.HTTP_204_NO_CONTENT)


class DeleteUserView(APIView):
    def delete(self, request):
        User = CustomUser.objects.get(user_id=request.user.user_id)
        member = Member.objects.filter(user_id=request.user.user_id)
        member.delete()
        User.delete()
        return Response(status=status.HTTP_200_OK)


class ProfileView(APIView):
    def get(self, request, *args, **kwargs):
        user = CustomUser.objects.get(user_id=request.user.user_id)
        if user.profile_img:
            return Response(
                {
                    "user_id": user.user_id,
                    "username": user.username,
                    "email": user.email,
                    "phone": user.phone,
                    "profile_img": user.profile_img,
                }
            )
        else:
            return Response(
                {
                    "user_id": user.user_id,
                    "username": user.username,
                    "email": user.email,
                    "phone": user.phone,
                }
            )

    def patch(self, request):
        user = CustomUser.objects.get(user_id=request.user.user_id)
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
