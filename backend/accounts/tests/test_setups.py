import json

from django.urls import reverse
from rest_framework.test import APITestCase

from ..models import User

# Create your tests here.


class TestSetUp(APITestCase):
    """ Test set up class
    test set up test data for accounts app
    """
    @classmethod
    def setUpTestData(cls):
        cls.jwt_url = reverse('JWT_login')
        cls.content_type = 'application/json'
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

        cls.student_info_json = json.dumps(cls.student_info)
        cls.teacher_info_json = json.dumps(cls.teacher_info)
        cls.school_admin_info_json = json.dumps(cls.school_admin_info)

    # def setUp(self) -> None:
    #     res = self.client.post(
    #         self.jwt_url,
    #         self.student_info_json,
    #         content_type=self.content_type,
    #     )
    #     self.student_token = res.data.get('access')
    #     self.student_refresh_token = res.data.get('refresh')
    #     res = self.client.post(
    #         self.jwt_url,
    #         self.teacher_info_json,
    #         content_type=self.content_type,
    #     )
    #     self.teacher_token = res.data.get('access')
    #     res = self.client.post(
    #         self.jwt_url,
    #         self.school_admin_info_json,
    #         content_type=self.content_type,
    #     )
    #     self.school_admin_token = res.data.get('access')
    #     return super().setUp()

    # def tearDown(self) -> None:
    #     return super().tearDown()
