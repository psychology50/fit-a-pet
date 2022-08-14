from django.db import transaction

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.generics import CreateAPIView, UpdateAPIView

from users.models import CustomUser
from pets.models import Pet, Member
from .serializers import *
from api.users.serializers import UserListSerializer
from .permissions import MemberPermission

class PetViewSet(ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    def get_permissions(self):
        # print(self.action)
        if self.action == 'create' or self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated, MemberPermission]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            request.data['master'] = request.user.user_id
            member = request.data.pop('member')
            member.append(request.user.nickname)
        except KeyError:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            instance = serializer.save()
            id_list = CustomUser.objects.filter(nickname__in=member).values_list('user_id', flat=True)
            for id in id_list:
                s = MemberSerializer(data={"user_id": id, "pet_id": instance.pet_id})
                s.is_valid(raise_exception=True)
                s.save()

        headers = self.get_success_headers(serializer.data)
        users = CustomUser.objects.filter(nickname__in=member).values('nickname', 'username', 'profile_img')
        users_s = UserListSerializer(users, many=True)
        return Response({
                "pet_info": {
                    "pet_name": instance.pet_name, "birthday": instance.birthday,
                    "code": instance.code, "profile_img": instance.profile_img or None,
                    "master": {
                        "nickname": request.user.nickname, "username": request.user.username,
                        "profile_img": request.user.profile_img or None
                    }, 
                },
                "member_info": users_s.data, 
            },status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request):
        member = Member.objects.filter(user_id=request.user)
        pet_list = self.queryset.filter(pet_id__in=member.values_list('pet_id')).order_by('pet_id')
        serializer = ListPetSerializer(pet_list, many=True)
        return Response(serializer.data)

    @action(methods=['GET'] ,detail=True)
    def pet_detail(self, request, *args, **kwargs):
        pet_id = kwargs.pop('pk', False)
        pet_data = self.queryset.get(pet_id=pet_id)
        serializer = DetailPetSerializer(pet_data)
        return Response(serializer.data)
        
    def update(self, request, *args, **kwargs):
        pass

    def partial_update(self, request, *args, **kwargs):
        pass

    def destroy(self, request, *args, **kwargs):
        pass

class CycleViewSet(ModelViewSet):
    queryset = Cycle.objects.all()
    serializer_class = CycleSerializer

    def get_permissions(self):
        if self.action == 'create' or self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated, MemberPermission]
        return [permission() for permission in permission_classes]

    def retrieve(self, request, *args, **kwargs):
        print(kwargs) # {'pet_pk': '1', 'pk': '1'}
        pass

class EventCreateView(CreateAPIView):
    queryset = Event
    serializer_class = EventSerializer

class EventUpdateView(UpdateAPIView):
    queryset = Event
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]


