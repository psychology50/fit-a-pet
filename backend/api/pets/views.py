from operator import invert
from django.http import Http404
from django.db import transaction
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework  import generics

from users.models import CustomUser
from pets.models import *
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

class EventCreateView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, MemberPermission]

    def create(self, request, *args, **kwargs):
        request.data['pet_id'] = kwargs.pop('pk', False)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class EventUpdateView(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventUpdateSerializer
    permission_classes = [IsAuthenticated, MemberPermission]
    
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs['event_pk']}
        obj = get_object_or_404(queryset, **filter_kwargs)

        self.check_object_permissions(self.request, obj)

        return obj
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, MemberPermission]

class EventDeleteView(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, MemberPermission]

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs['event_pk']}
        obj = get_object_or_404(queryset, **filter_kwargs)

        self.check_object_permissions(self.request, obj)

        return obj

class EventCompleteView(generics.GenericAPIView):
    queryset = Event.objects.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_clear == True:
            instance.is_clear = False
        else :
            instance.is_clear = True
        instance.save()
        return Response()

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs['event_pk']}
        obj = get_object_or_404(queryset, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj
