from django.db.models import F
from django.contrib.auth import get_user_model

from rest_framework import serializers

from pets.models import *

class ActiveImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveImage
        fields = '__all__'

class ActiveImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveImage
        fields = '__all__'
