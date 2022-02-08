import json

from django.urls import reverse
from rest_framework.views import status

from ..test_setup import TestSetUp


class TestLectureStudent(TestSetUp):
    """
    Test lecture
    """
    def setUp(self) -> None:
        res = self.client.post(
            self.jwt_url,
            self.student_info_json,
            content_type=self.content_type,
        )
        self.student_token = res.data.get('access')
        return super().setUp()

    def test_lecture_list(self):
        """
        JWT를 사용하지 않고 lecture list 조회 >> 401
        JWT를 사용하여 조회 >> 200
        """
        # 401
        url = reverse('lecture_list')
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
        # 200
        self.client.credentials(
            HTTP_AUTHORIZATION=f'JWT {self.student_token}'
        )
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_lecture_create(self):
        """
        JWT 인증 후 진행
        학교 관리자만 가능하므로 >> 401
        """
        url = reverse('lecture_list')
        self.client.credentials(
            HTTP_AUTHORIZATION=f'JWT {self.student_token}'
        )
        res = self.client.post(url)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_lecture_detail(self):
        """
        JWT 인증 후 진행
        자신이 속한 수업 >> 200
        """
        url = reverse('lecture_detail', kwargs={'lecture_pk': self.lecture.pk})
        self.client.credentials(
            HTTP_AUTHORIZATION=f'JWT {self.student_token}'
        )
        res = self.client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
