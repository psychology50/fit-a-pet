from django.db.models import F
from django.contrib.auth import get_user_model

from rest_framework import serializers

from pets.models import *

CustomUser = get_user_model()

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        ordering = ['-date']
        fields = '__all__'