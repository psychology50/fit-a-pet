from json import loads, dumps

from django.db.models import F
from django.contrib.auth import get_user_model

from rest_framework import serializers

from pets.models import *
from .cycles.serializers import CycleSerializer

CustomUser = get_user_model()

class CreateMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class MemberSerializer(serializers.ModelSerializer):
    master = serializers.StringRelatedField()
    member = serializers.SerializerMethodField(source='member_set')
    class Meta:
        model = Pet
        fields = ['pet_id', 'master', 'member']
    
    def get_member(self, obj):
        return obj.member_set.annotate(
            username = F('user_id__username'),
            nickname = F('user_id__nickname'),
            profile_img = F('user_id__profile_img')
        ).values('user_id', 'username', 'nickname', 'profile_img')

class PetSerializer(serializers.ModelSerializer):
    # birthday = serializers.DateField(format='%Y-%m-%d')
    class Meta:
        model = Pet
        fields = '__all__'

class DetailPetSerializer(serializers.ModelSerializer):
    master = serializers.StringRelatedField()
    class Meta:
        model = Pet
        fields = ['pet_id', 'pet_name', 'gender', 'master', 'birthday', 'code']

class ListPetSerializer(serializers.ModelSerializer):
    cycle = CycleSerializer(many=True, source="cycle_set")
    class Meta:
        model = Pet
        fields = ['pet_id', 'pet_name', 'gender', 'birthday', 'code', 'cycle']