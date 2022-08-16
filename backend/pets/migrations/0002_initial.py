# Generated by Django 3.2 on 2022-08-16 04:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pet',
            name='master',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, related_name='master', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='member',
            name='pet_id',
            field=models.ForeignKey(db_column='pet_id', on_delete=django.db.models.deletion.CASCADE, to='pets.pet'),
        ),
        migrations.AddField(
            model_name='member',
            name='user_id',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='event',
            name='pet_id',
            field=models.ForeignKey(db_column='pet_id', on_delete=django.db.models.deletion.CASCADE, to='pets.pet'),
        ),
        migrations.AddField(
            model_name='cycledetail',
            name='cycle_id',
            field=models.ForeignKey(db_column='cycle_id', on_delete=django.db.models.deletion.CASCADE, related_name='detail', to='pets.cycle'),
        ),
        migrations.AddField(
            model_name='cycle',
            name='pet_id',
            field=models.ForeignKey(db_column='pet_id', on_delete=django.db.models.deletion.CASCADE, to='pets.pet'),
        ),
        migrations.AddField(
            model_name='activeimage',
            name='pet_id',
            field=models.ForeignKey(db_column='pet_id', on_delete=django.db.models.deletion.CASCADE, related_name='active_img', to='pets.pet'),
        ),
        migrations.AddField(
            model_name='achievecycle',
            name='detail_id',
            field=models.ForeignKey(db_column='detail_id', on_delete=django.db.models.deletion.CASCADE, related_name='achievement', to='pets.cycledetail'),
        ),
    ]