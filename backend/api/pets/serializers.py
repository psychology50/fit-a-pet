from dataclasses import field
from email.policy import default
from json import loads, dumps

from django.db.models import F
from django.contrib.auth import get_user_model

from rest_framework import serializers

from pets.models import *

CustomUser = get_user_model()

class PetSerializer(serializers.ModelSerializer):
    birthday = serializers.DateField(format='%Y-%m-%d')
    class Meta:
        model = Pet
        exclude = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class ListPetCycleSerializer(serializers.ModelSerializer):
    clear_dt = serializers.SerializerMethodField(source="achievement")
    class Meta:
        model = Cycle
        ordering = ['cycle_id']
        exclude = ['cycle_id', 'pet_id']
    
    def get_clear_dt(self, param):
        date = param.achievement.order_by('-date').values_list('date', flat=True)
        res = date[0] if date else None
        return res

class ListPetSerializer(serializers.ModelSerializer):
    cycle = ListPetCycleSerializer(many=True, source="cycle_set")
    class Meta:
        model = Pet
        fields = ['pet_id', 'pet_name', 'birthday', 'code', 'cycle']

class DetailPetSerializer(serializers.ModelSerializer):
    master = serializers.StringRelatedField()
    class Meta:
        model = Pet
        fields = ['pet_id', 'pet_name', 'master', 'birthday', 'code']

    def get_event(self, obj):
        return obj.event_set.order_by('-date').values('event_name', 'date', 'is_clear')

    def get_active_img(self, obj):
        return obj.active_img.order_by('-create_dt').values('create_dt', 'image', 'caption')

    def get_prescription(self, obj):
        return obj.prescription.order_by('-create_dt').values('create_dt', 'content')


class EventSerializer(serializers.ModelSerializer):
    model = Event
    fields = ['event_name', 'pet_id']


class CycleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cycle
        fields = '__all__'

