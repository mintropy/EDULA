from django.shortcuts import get_object_or_404

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from drf_spectacular.utils import extend_schema, OpenApiResponse

from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

from accounts.views.user import decode_JWT
from server import basic_swagger_schema
from . import swagger_schema
from ..models import Article
from ..serializers import ArticleSerializer, ArticleDetailSerializer


class ArticleViewSet(ViewSet):
    """About Homework
    
    """
    model = Article
    queryset = Article.objects.all()
    serializer_classes = {
        'list': ArticleSerializer,
        'detail': ArticleDetailSerializer,
        'retrieve': ArticleDetailSerializer,
        'update': ArticleDetailSerializer,
        'destroy': ArticleDetailSerializer,
    }
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    def get_serializer_class(self):
        try:
            return self.serializer_classes[self.action]
        except:
            return ArticleSerializer
    
    @extend_schema(
        tags=['게시판',]
    )
    def list(self, request, lecture_pk):
        pass
    
    @extend_schema(
        tags=['게시판',]
    )
    def create(self, request, lecture_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        notice = request.data.get('notice', None)
        if notice:
            if user.status == 'ST':
                notice = False
        data = {
            'title': request.data.get('title', None),
            'content': request.data.get('content', None),
            'notice': notice,
            'writer': user.pk,
            'lecture': lecture_pk,
        }
    
    @extend_schema(
        tags=['게시판',]
    )
    def retrieve(self, request, lecture_pk):
        pass
    
    @extend_schema(
        tags=['게시판',]
    )
    def update(self, request, lecture_pk):
        pass
    
    @extend_schema(
        tags=['게시판',]
    )
    def destroy(self, request, lecture_pk):
        pass
