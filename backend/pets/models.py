from statistics import mode
from venv import create
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

import uuid
import base64
import codecs

def generate_random_slug_code(length=8):
    """
    generates random code of given length
    """
    return base64.urlsafe_b64encode(
        codecs.encode(uuid.uuid4().bytes, "base64").rstrip()
    ).decode()[:length]

CustomUser = get_user_model()

class Pet(models.Model):
    pet_id = models.BigAutoField(
        primary_key=True,
        unique=True,
        verbose_name='pet_id'
    )
    pet_name = models.CharField(max_length=45, verbose_name="pet_name")
    birthday = models.DateField()
    code = models.CharField(
        max_length=45,
        unique=True,
        editable=False,
        default=generate_random_slug_code,
        verbose_name="code",
    )
    today = models.DateField(default=timezone.now, blank=True, null=True)
    profile_img = models.ImageField(blank=True, null=True)
    master = models.ForeignKey(CustomUser, on_delete=models.CASCADE, db_column='user_id', related_name="master")

    def __str__(self):
        return self.pet_name

class Member(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, db_column='user_id',)
    pet_id = models.ForeignKey(Pet, on_delete=models.CASCADE, db_column='pet_id',)

class ActiveImage(models.Model):
    image_id = models.BigAutoField(
        primary_key=True,
        unique=True,
        verbose_name='image_id'
    )
    image = models.ImageField(blank=True, null=True)
    caption = models.CharField(max_length=45, verbose_name="caption", blank=True, null=True)
    create_dt = models.DateField(default=timezone.now, blank=True, null=True)
    pet_id = models.ForeignKey(Pet, on_delete=models.CASCADE, db_column='pet_id', related_name='active_img')

    def __str__(self):
        return f"{self.create_dt}"

class Prescription(models.Model):
    prescription_id = models.BigAutoField(
        primary_key=True,
        unique=True,
        verbose_name='prescription_id'
    )
    content = models.TextField()
    create_dt = models.DateField(blank=True, null=True)
    pet_id = models.ForeignKey(Pet, on_delete=models.CASCADE, db_column='pet_id', related_name='prescription')

    def __str__(self):
        return f"{self.create_dt}"

class Event(models.Model):
    event_id =  models.BigAutoField(
        primary_key=True,
        unique=True,
        verbose_name='event_id'
    )
    event_name = models.CharField(max_length=45)
    date = models.DateField() # 이벤트 날짜 입력
    is_clear = models.BooleanField(default=False)
    pet_id = models.ForeignKey(Pet, on_delete=models.CASCADE, db_column='pet_id')
    
    def __str__(self):
        return self.event_name

class Cycle(models.Model):
    cycle_id = models.BigAutoField(
        primary_key=True,
        unique=True,
        verbose_name='cycle_id'
    )
    cycle_name = models.CharField(max_length=45)
    is_notify = models.BooleanField(default=False)
    pet_id = models.ForeignKey(Pet, on_delete=models.CASCADE, db_column='pet_id')
    limit_at = models.DateField()
    # 주기성 이벤트
    mon = models.BooleanField(default=False)
    tue = models.BooleanField(default=False)
    wed = models.BooleanField(default=False)
    thu = models.BooleanField(default=False)
    fri = models.BooleanField(default=False)
    sat = models.BooleanField(default=False)
    sun = models.BooleanField(default=False)
    time = models.CharField(max_length=45) # 몇 시에 반복할지(일정 패턴)
    # 무작위성 이벤트
    is_cycle = models.BooleanField(default=True) # 반복은 하는데 규칙적이진 않은 경우. (가장 마지막 갱신 데이터 조회) 

    def __str__(self):
        return self.cycle_name

class AchieveCycle(models.Model):
    achieve_id = models.BigAutoField(
        primary_key=True,
        unique=True,
        verbose_name='achieve_id'
    )
    date = models.DateTimeField(default=timezone.now, blank=True, null=True)
    cycle_id = models.ForeignKey(Cycle, on_delete=models.CASCADE, db_column='cycle_id', related_name='achievement')

    def __str__(self):
        return f"{self.date}"
