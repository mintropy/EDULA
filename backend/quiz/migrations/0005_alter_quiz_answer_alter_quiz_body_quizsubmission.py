# Generated by Django 4.0.1 on 2022-02-15 15:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('quiz', '0004_quiz_writer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='answer',
            field=models.JSONField(),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='body',
            field=models.JSONField(),
        ),
        migrations.CreateModel(
            name='QuizSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.JSONField()),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizsub_list', to='quiz.quiz')),
                ('submitter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizsub_list', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]