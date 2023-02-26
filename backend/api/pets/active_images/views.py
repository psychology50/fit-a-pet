from django.http import Http404
from django.db import transaction
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework  import generics

from pets.models import *
from .serializers import *
from ..permissions import MemberPermission

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
