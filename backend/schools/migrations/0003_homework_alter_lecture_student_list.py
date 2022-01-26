# Generated by Django 4.0.1 on 2022-01-22 02:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_initial'),
        ('schools', '0002_alter_lecture_time_list'),
    ]

    operations = [
        migrations.CreateModel(
            name='Homework',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('deadline', models.DateTimeField()),
                ('writer_pk', models.IntegerField()),
                ('writer_name', models.CharField(max_length=10)),
            ],
        ),
        migrations.AlterField(
            model_name='lecture',
            name='student_list',
            field=models.ManyToManyField(related_name='lecture_list', to='accounts.Student'),
        ),
    ]
