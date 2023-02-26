from django.db.models import F
from django.contrib.auth import get_user_model

from rest_framework import serializers

from pets.models import *

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

