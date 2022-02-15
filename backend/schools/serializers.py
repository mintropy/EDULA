"""Serializers for schools app
"""
from rest_framework import serializers

from accounts.models import Student, Teacher, User
from accounts.serializers.user import UserBasicSerializer
from . models import (
    School, Lecture, Classroom,
    Homework, HomeworkSubmission, HomeworkSubmissionFiles,
    Article
)

class StudentBasciSerializer(serializers.ModelSerializer):
    """Student Basic Srializer
    """
    user = UserBasicSerializer()

    class Meta:
        model = Student
        fields = ('user',)


class TeacherBasicSerialzier(serializers.ModelSerializer):
    """Teacher Basic Serializer
    """
    user = UserBasicSerializer()

    class Meta:
        model = Teacher
        fields = ('user',)


class SchoolSerializer(serializers.ModelSerializer):
    """School Serializer
    """

    class Meta:
        model = School
        fields = '__all__'


class LectureSerializer(serializers.ModelSerializer):
    """Lecture Serializer
    """

    class Meta:
        model = Lecture
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['teacher'] = UserBasicSerializer(
            User.objects.get(pk=data['teacher'])).data
        return data


class LectrueDetailSerializer(serializers.ModelSerializer):
    """Lecture Detail Serializer
    """
    student_list = StudentBasciSerializer(many=True)
    teacher = TeacherBasicSerialzier()

    class Meta:
        model = Lecture
        fields = '__all__'


class ClassroomSerializer(serializers.ModelSerializer):
    """Classroom Serializer
    """

    class Meta:
        model = Classroom
        fields = '__all__'


class ClassroomDetailSerializer(serializers.ModelSerializer):
    """ClassroomDetail Serializer
    """
    school = SchoolSerializer(read_only=True)
    student_list = StudentBasciSerializer(many=True, read_only=True)
    teacher = TeacherBasicSerialzier(read_only=True)

    class Meta:
        model = Classroom
        fields = '__all__'


class HomeworkSerializer(serializers.ModelSerializer):
    """Homework Serializer
    """

    class Meta:
        model = Homework
        fields = '__all__'


class HomeworkSubmissionSerialzier(serializers.ModelSerializer):
    """Homework Submission Serializer
    """

    def __init__(self, *args, **kwargs):
        file_fields = kwargs.pop('file_fields', None)
        super().__init__(*args, **kwargs)
        if file_fields:
            field_update_dict = {
                field: serializers.FileField(required=False, write_only=True)
                for field in file_fields
            }
            self.fields.update(**field_update_dict)

    class HomeworkSubmissionFilesSerializer(serializers.ModelSerializer):
        """Homework Submission Files Serializer for HomeworkSubmissionSerializer
        """
        class Meta:
            model = HomeworkSubmissionFiles
            fields = '__all__'

    homework_submission_files = HomeworkSubmissionFilesSerializer(many=True)

    class Meta:
        model = HomeworkSubmission
        fields = '__all__'

    def update(self, instance, validated_data):
        homework_submission_files_data = validated_data.pop('homework_submission_files', None)
        homework_submission_files = []
        for homework_submission_file_data in homework_submission_files_data:
            homework_submission_file, _ = HomeworkSubmissionFiles.objects.get_or_create(
                **homework_submission_file_data
            )
            homework_submission_files.append(homework_submission_file)
        instance.homework_submission_files.set(homework_submission_files)
        return super().update(instance, validated_data)


class HomeworkDetailSerializer(serializers.ModelSerializer):
    """Homework Detail Serializer
    """
    submission = HomeworkSubmissionSerialzier(many=True)

    class Meta:
        model = Homework
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    """Article Serializer
    """

    class Meta:
        model = Article
        fields = '__all__'


class ArticleDetailSerializer(serializers.ModelSerializer):
    """Article Detail Serializer
    """
    writer = UserBasicSerializer()

    class Meta:
        model = Article
        fields = '__all__'
