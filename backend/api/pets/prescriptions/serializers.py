from django.db.models import F
from django.contrib.auth import get_user_model

from rest_framework import serializers

from pets.models import *

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'