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
)

class CustomUserView(APIView):
    permission_classes = [ AllowAny ]

    def post(self, request):
        reg_serializer = CustomUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save() # Query Type
            
            return Response(
                {
                    "user": CustomUserSerializer(new_user).data, # JSON Type
                    "message": "회원가입이 완료되었습니다!"
                },
                status = status.HTTP_201_CREATED,
            )
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserListView(ListAPIView):
    permission_classes = [ IsAuthenticated ]
    queryset = CustomUser.objects.all()
    serializer_class = UserListSerializer


class SignInUserView(APIView):
    permission_classes = [ AllowAny ]

    def post(self, request):
        nickname = request.data.get("nickname")
        password = request.data.get("password")
        if not nickname or not password:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(
            nickname = nickname,
            password = password,
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
    permission_classes = [ IsAuthenticated ]

    def post(self, request, *args):
        user = RefreshTokenSerializer(data=request.data)
        user.is_valid(raise_exception=True)
        user.save()

        reset = ''
        res = Response(
            {
                "message": "logout success" 
            }, status=status.HTTP_204_NO_CONTENT
        )
        res.set_cookie('access', reset)
        res.set_cookie('refresh', reset)

        return Response(
                {
                   "message": "logout success" 
                }, status=status.HTTP_204_NO_CONTENT)