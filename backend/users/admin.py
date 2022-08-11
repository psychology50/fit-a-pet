from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from django.forms import Textarea
from django.db import models

@admin.register(CustomUser)
class UserAdminConfig(UserAdmin):
    ordering = ('-create_dt',)
    list_display = ('user_id', 'username', 'nickname', 'is_active', 'is_staff')

    fieldsets = (
        (None, {'fields': ('nickname', 'username', 'password', 'create_dt',)}),
        ('Personal', {'fields': ('email', 'phone', 'profile_img',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields' : ('nickname', 'username', 'password', 'is_active', 'is_staff')}
        ),
    )