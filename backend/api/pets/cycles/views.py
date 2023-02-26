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
from ..permissions import MemberPermission

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