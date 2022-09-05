from ast import Sub
from django.http import Http404
from django.db import transaction
from django.shortcuts import get_object_or_404
from django.db.models import OuterRef, Subquery

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

def create_init_cycle_data(id):
    return [
        {
            "cycle_name": "식사", "is_cycle": True, "pet_id": id,
            "mon": True, "tue": True, "wed": True, "thu": True, "fri": True, "sat": True, "sun": True,
            "detail": [
                {"detail_name": "아침", "time": "08:00"},
                {"detail_name": "점심", "time": "13:00"},
                {"detail_name": "저녁", "time": "18:00"},
            ]
        },
        {
            "cycle_name": "산책", "is_cycle": False, "pet_id": id, "limit_at": 2,
            "detail": [{"datail_name": None}]
        },
        {
            "cycle_name": "목욕", "is_cycle": False, "pet_id": id, "limit_at": 7,
            "detail": [{"datail_name": None}]
        }
    ]

class PetViewSet(ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    def get_permissions(self):
        if self.action == 'create' or self.action == 'list' or self.action == 'event_list':
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
            for id in id_list: # create Pet
                s = CreateMemberSerializer(data={"user_id": id, "pet_id": instance.pet_id})
                s.is_valid(raise_exception=True)
                s.save()
            cycle_data = create_init_cycle_data(instance.pet_id)
            for data in cycle_data: # create Regular Cycle
                detail_data = data.pop('detail', False)
                s = CreateCycleSerializer(data=data)
                s.is_valid(raise_exception=True)
                s.save()
                for data2 in detail_data:
                    data2['cycle_id'] = s.data['cycle_id']
                    s2 = CreateDetailSerializer(data=data2)
                    s2.is_valid(raise_exception=True)
                    s2.save()

        headers = self.get_success_headers(serializer.data)        
        return Response(status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request):
        member = Member.objects.filter(user_id=request.user)
        pet_list = self.queryset.filter(pet_id__in=member.values('pet_id')).order_by('pet_id')
        serializer = ListPetSerializer(pet_list, many=True)
        return Response(serializer.data)

    @action(methods=['GET'], detail=False)
    def event_list(self, request):
        event_list = self.queryset.filter(member__user_id=request.user.user_id)\
                                  .values_list('event__event_id', flat=True)
        event_query = Event.objects.filter(event_id__in = event_list).filter(is_clear = False).order_by('date')
        serializer = EventSerializer(event_query, many=True)        
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['GET'], detail=True)
    def member_list(self, request, *args, **kwargs):
        pet_id = kwargs.pop('pk', False)
        pet = self.queryset.get(pet_id=int(pet_id))
        serializer = MemberSerializer(pet)
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
        permission_classes = [IsAuthenticated, MemberPermission]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        try:
            pet_id = kwargs.pop('pet_pk', False)
            detail_data = request.data.pop('detail', False)
            request.data['pet_id'] = int(pet_id)
        except KeyError:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CreateCycleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            instance = serializer.save()
            for d in detail_data:
                d['cycle_id'] = instance.cycle_id
                s = CreateDetailSerializer(data=d)
                s.is_valid(raise_exception=True)
                s.save()

        headers = self.get_success_headers(serializer.data)
        return Response({}, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        pet_id = kwargs.pop('pet_pk', False)

        cycles = self.queryset.filter(pet_id=pet_id)
        serializer = self.get_serializer(cycles, many=True)

        return Response(serializer.data)

    @action(methods=['POST'], detail=False)
    def clear_cycle(self, request, *args, **kwargs):
        pet_id = kwargs.pop('pet_pk', False)
        

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
    serializer_class = EventSerializer
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

        self.check_object_permissions(self.request, obj)

        return obj

class PrescriptionCreateView(generics.CreateAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticated, MemberPermission]

    def create(self, request, *args, **kwargs):
        request.data['pet_id'] = kwargs.pop('pk', False)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class PrescriptionUpdateView(generics.UpdateAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticated, MemberPermission]
    
    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs['prescription_pk']}
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
    
class PrescriptionListView(generics.ListAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticated, MemberPermission]

class PrescriptionDeleteView(generics.DestroyAPIView):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticated, MemberPermission]

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())

        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
            (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs['prescription_pk']}
        obj = get_object_or_404(queryset, **filter_kwargs)

        self.check_object_permissions(self.request, obj)

        return obj


class ActiveImageCreateView(generics.CreateAPIView):
    queryset = ActiveImage.objects.all()
    serializer_class = ActiveImageSerializer
    permission_classes = [IsAuthenticated, MemberPermission]

    def create(self, request, *args, **kwargs):
        request.data['pet_id'] = kwargs.pop('pk', False)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ActiveImageListView(generics.ListAPIView):
    queryset = ActiveImage.objects.all()
    serializer_class = ActiveImageSerializer
    permission_classes = [IsAuthenticated, MemberPermission]
        
class ActiveImageRetrieveView(generics.RetrieveAPIView):
    queryset = ActiveImage.objects.all()
    serializer_class = ActiveImageSerializer
    permission_classes = [IsAuthenticated, MemberPermission]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class ActiveImageUpdateView(generics.UpdateAPIView):
    queryset = ActiveImage.objects.all()
    serializer_class = ActiveImageSerializer
    permission_classes = [IsAuthenticated, MemberPermission]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
    
class ActiveImageDeleteView(generics.DestroyAPIView):
    queryset = ActiveImage.objects.all()
    serializer_class = ActiveImageSerializer
    permission_classes = [IsAuthenticated, MemberPermission]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)



