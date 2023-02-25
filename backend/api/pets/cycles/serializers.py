from django.db.models import F
from django.contrib.auth import get_user_model

from rest_framework import serializers

from pets.models import *
from api.pets.serializers import DetailSerializer

class CycleSerializer(serializers.ModelSerializer):
    detail = DetailSerializer(many=True)
    class Meta:
        model = Cycle
        ordering = ['cycle_id']
        fields = '__all__'

class CreateCycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cycle
        fields = '__all__'
