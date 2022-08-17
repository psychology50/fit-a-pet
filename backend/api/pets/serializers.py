from json import loads, dumps

from django.db.models import F
from django.contrib.auth import get_user_model

from rest_framework import serializers

from pets.models import *

CustomUser = get_user_model()

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
    birthday = serializers.DateField(format='%Y-%m-%d')
    class Meta:
        model = Pet
        fields = '__all__'

class DetailSerializer(serializers.ModelSerializer):
    clear_dt = serializers.SerializerMethodField(source="achievement")

    class Meta:
        model = CycleDetail
        ordering = ['cycle_id']
        fields = '__all__'

    def get_clear_dt(self, obj):
        date = obj.achievement.all().order_by('-date').values_list('date', flat=True)
        return date[0] if date else None

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

class CreateDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CycleDetail
        fields = '__all__'

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
        ordering = ['-date']
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
