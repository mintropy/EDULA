# Generated by Django 4.0.1 on 2022-02-04 03:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_friendrequest_request_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='friend_list',
            field=models.ManyToManyField(blank=True, related_name='friend_list', to=settings.AUTH_USER_MODEL),
        ),
    ]