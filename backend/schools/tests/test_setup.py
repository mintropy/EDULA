import json

from django.urls import reverse
from rest_framework.test import APITestCase

from accounts.models import User, Student, Teacher
from ..models import School, Lecture


class TestSetUp(APITestCase):
    """ Test set up class
    test set up test data for school app
    """
    @classmethod
    def setUpTestData(cls):
        cls.jwt_url = reverse('JWT_login')
        cls.content_type = 'application/json'

        # data
        # user data
        cls.student_info = {
            'username': 'student',
            'email': 'example@string.com',
            'password': 'student',
            'status': 'ST',
        }
        cls.teacher_info = {
            'username': 'teacher',
            'email': 'example@string.com',
            'password': 'teacher',
            'status': 'TE',
        }
        cls.school_admin_info = {
            'username': 'school_admin',
            'email': 'example@string.com',
            'password': 'school_admin',
            'status': 'SA',
        }
        # school
        cls.school_data ={
            'name': 'ssafy',
            'abbreviation': 'ss',
        }
        # json data
        # user infromation json
        cls.student_info_json = json.dumps(cls.student_info)
        cls.teacher_info_json = json.dumps(cls.teacher_info)
        cls.school_admin_info_json = json.dumps(cls.school_admin_info)
        # school object
        cls.school = School.objects.create(
            name=cls.school_data['name'],
            abbreviation=cls.school_data['abbreviation'],
        )
        # user object
        cls.student = User.objects.create_user(
            username=cls.student_info['username'],
            email=cls.student_info['email'],
            password=cls.student_info['password'],
            status=cls.student_info['status'],
        )
        cls.teacher = User.objects.create_user(
            username=cls.teacher_info['username'],
            email=cls.teacher_info['email'],
            password=cls.teacher_info['password'],
            status=cls.teacher_info['status'],
        )
        cls.school_admin = User.objects.create_user(
            username=cls.school_admin_info['username'],
            email=cls.school_admin_info['email'],
            password=cls.school_admin_info['password'],
            status=cls.school_admin_info['status'],
        )
        # student object
        cls.student_student = Student.objects.create(
            user=cls.student,
            school=cls.school,
        )
        # teacher object
        cls.teacher_teacher = Teacher.objects.create(
            user=cls.teacher,
            school=cls.school,
        )

        cls.lecture_data = {
            'name':'math',
            'time_list':{
                'test':'test'
            },
        }
        cls.lecture = Lecture.objects.create(
            name=cls.lecture_data['name'],
            time_list=cls.lecture_data['time_list'],
            teacher=cls.teacher_teacher,
            school=cls.school
        )
        cls.lecture.student_list.set([cls.student_student])
