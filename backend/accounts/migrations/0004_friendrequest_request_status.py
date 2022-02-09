# Generated by Django 4.0.1 on 2022-02-03 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_user_friend_list_friendrequest'),
    ]

    operations = [
        migrations.AddField(
            model_name='friendrequest',
            name='request_status',
            field=models.CharField(choices=[('RQ', 'Request'), ('RF', 'Refusal'), ('AC', 'Accept')], default='', max_length=2),
            preserve_default=False,
        ),
    ]