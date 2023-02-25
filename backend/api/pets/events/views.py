from django.http import Http404
from django.db import transaction
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

from pets.models import *
from .serializers import *
from api.pets.permissions import MemberPermission

class EventViewSet(ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):
        permission_classes = [IsAuthenticated, MemberPermission]
        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        pet_id = kwargs.pop('pet_pk', False)
        request.data['pet_id'] = int(pet_id)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        event_id = int(kwargs.pop('pk', False))
        instance = self.queryset.filter(event_id=event_id)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        event_id = int(kwargs.pop('pk', False))
        instance = self.queryset.filter(event_id=event_id)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['GET'], detail=True)
    def complete(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_clear == True:
            instance.is_clear = False
        else :
            instance.is_clear = True
        instance.save()
        return Response()