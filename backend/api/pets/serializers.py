from json import loads, dumps

from django.db.models import F
from django.contrib.auth import get_user_model

from rest_framework import serializers

from pets.models import *

CustomUser = get_user_model()

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class PetSerializer(serializers.ModelSerializer):
    birthday = serializers.DateField(format='%Y-%m-%d')
    class Meta:
        model = Pet
        fields = '__all__'

class CycleSerializer(serializers.ModelSerializer):
    clear_dt = serializers.SerializerMethodField(source="achievement")
    class Meta:
        model = Cycle
        ordering = ['cycle_id']
        fields = '__all__'
    
    def get_clear_dt(self, param):
        date = param.achievement.order_by('-date').values_list('date', flat=True)
        res = date[0] if date else None
        return res

class ListPetSerializer(serializers.ModelSerializer):
    cycle = CycleSerializer(many=True, source="cycle_set")
    class Meta:
        model = Pet
        fields = ['pet_id', 'pet_name', 'birthday', 'code', 'cycle']

class DetailPetSerializer(serializers.ModelSerializer):
    master = serializers.StringRelatedField()
    class Meta:
        model = Pet
        fields = ['pet_id', 'pet_name', 'master', 'birthday', 'code']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EventUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['event_name', 'date']

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'

class PrescriptionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['content', 'create_dt']

class ActiveImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveImage
        fields = ['image']

class ActiveImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActiveImage
        fields = '__all__'
