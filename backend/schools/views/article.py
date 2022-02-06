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
from ..serializers import ArticleSerializer


class ArticleViewSet(ViewSet):
    """About Homework
    
    """
    model = Article
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        tags=['게시판',]
    )
    def list(self):
        pass
    
    @extend_schema(
        tags=['게시판',]
    )
    def create(self):
        pass
    
    @extend_schema(
        tags=['게시판',]
    )
    def retrieve(self):
        pass
    
    @extend_schema(
        tags=['게시판',]
    )
    def update(self):
        pass
    
    @extend_schema(
        tags=['게시판',]
    )
    def destroy(self):
        pass
