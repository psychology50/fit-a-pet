from django.contrib import admin
from .models import *

@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    ordering = ('master',)
    list_display = ('pet_id', 'pet_name', 'code', 'today', 'master')

    fieldsets = (
        (None, {'fields': ('today',)}),
        ('Personal', {'fields': ('pet_name', 'birthday', 'profile_img', 'master')})
    )

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    ordering = ('user_id', 'pet_id',)
    list_display = ('user_id', 'pet_id',)

@admin.register(ActiveImage)
class ActiveImageAdmin(admin.ModelAdmin):
    ordering = ('pet_id',)
    list_display = ('image_id', 'pet_id', 'create_dt',)

@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    ordering = ('pet_id',)
    list_display = ('prescription_id', 'pet_id', 'create_dt',)

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    ordering = ('pet_id', 'event_id',)
    list_display = ('event_id', 'event_name', 'pet_id', 'date', 'is_clear',)

@admin.register(Cycle)
class CycleAdmin(admin.ModelAdmin):
    ordering = ('pet_id', 'cycle_id',)
    list_display = ('cycle_id', 'cycle_name', 'pet_id',)

@admin.register(AchieveCycle)
class AchieveCycleAdmin(admin.ModelAdmin):
    ordering = ('cycle_id',)
    list_display = ('achieve_id', 'cycle_id', 'date',)
