from django.http import Http404
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
from api.users.serializers import UserListSerializer
from .serializers import *
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
                "pet_info": serializer.data,
                "member_info": users_s.data, 
            },status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request):
        member = Member.objects.filter(user_id=request.user)
        pet_list = self.queryset.filter(pet_id__in=member.values_list('pet_id')).order_by('pet_id')
        serializer = ListPetSerializer(pet_list, many=True)
        return Response(serializer.data)

    @action(methods=['GET'], detail=True)
    def pet_detail(self, request, *args, **kwargs):
        pet_id = kwargs.pop('pk', False)
        pet_data = self.queryset.get(pet_id=pet_id)
        serializer = DetailPetSerializer(pet_data)
        return Response(serializer.data)
        
    @action(methods=['DELETE'], detail=True)
    def pet_delete(self, request, *args, **kwargs):
        try:
            pet_id = int(kwargs.pop('pk', False))
            instance = self.queryset.filter(pet_id=pet_id)
            self.perform_destroy(instance)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

class CycleViewSet(ModelViewSet):
    queryset = Cycle.objects.all()
    serializer_class = CycleSerializer

    def get_permissions(self):
        if self.action == 'create' or self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated, MemberPermission]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        try:
            pet_id = int(kwargs.pop('pet_pk', False))
            is_cycle = request.data['is_cycle']
            request.data['pet_id'] = pet_id
        except KeyError:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        pet_id = kwargs.pop('pet_pk', False)

        cycles = self.queryset.filter(pet_id=pet_id)
        serializer = self.get_serializer(cycles, many=True)

        return Response(serializer.data)

    @action(methods=['DELETE'], detail=True)
    def cycle_delete(self, request, *args, **kwargs):
        try:
            cycle_id = int(kwargs.pop('pk', False))
            instance = self.queryset.filter(cycle_id=cycle_id)
            self.perform_destroy(instance)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

class EventCreateView(CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

class EventUpdateView(UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]