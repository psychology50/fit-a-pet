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

class ListPetEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        ordering = ['-date']
        fields = ['event_name', 'date', 'is_clear']

class ListPetSerializer(serializers.ModelSerializer):
    cycle = ListPetCycleSerializer(many=True, source="cycle_set")
    event = ListPetEventSerializer(many=True, source="event_set")
    class Meta:
        model = Pet
        fields = ['pet_name', 'birthday', 'code', 'cycle', 'event']

class DetailPetSerializer(serializers.ModelSerializer):
    cycle = ListPetCycleSerializer(many=True, source="cycle_set")
    event = serializers.SerializerMethodField(source="event_set")
    active_img = serializers.SerializerMethodField()
    prescription = serializers.SerializerMethodField()
    master = serializers.StringRelatedField()
    class Meta:
        model = Pet
        fields = ['pet_name', 'master', 'birthday', 'code', 'cycle', 'event', 'active_img', 'prescription']

    def get_event(self, obj):
        return obj.event_set.order_by('-date').values('event_name', 'date', 'is_clear')

    def get_active_img(self, obj):
        return obj.active_img.order_by('-create_dt').values('create_dt', 'image', 'caption')

    def get_prescription(self, obj):
        return obj.prescription.order_by('-create_dt').values('create_dt', 'content')


class EventSerializer(serializers.ModelSerializer):
    model = Event
    fields = '__all__'

