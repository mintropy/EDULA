from django.shortcuts import get_object_or_404

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from drf_spectacular.utils import extend_schema, OpenApiResponse

from rest_framework import status
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from accounts.views.user import decode_JWT
from server import basic_swagger_schema
from . import swagger_schema
from ..models import Article
from ..serializers import ArticleSerializer, ArticleDetailSerializer


class ArticlePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ArticleViewSet(ViewSet):
    """About Homework
    
    """
    model = Article
    queryset = Article.objects.all()
    serializer_classes = {
        'list': ArticleSerializer,
        'detail': ArticleSerializer,
        'retrieve': ArticleDetailSerializer,
        'update': ArticleSerializer,
        'destroy': ArticleSerializer,
    }
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    pagination_class = ArticlePagination
    
    def get_serializer_class(self):
        try:
            return self.serializer_classes[self.action]
        except:
            return ArticleSerializer
    
    @extend_schema(
        tags=['게시판',]
    )
    def list(self, request, lecture_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        articles = Article.objects.filter(lecture=lecture_pk).order_by('-pk')
        paginator = ArticlePagination()
        serializer = ArticleSerializer(
            paginator.paginate_queryset(articles, request), 
            many=True,
        )
        augmented_serializer = {
            'totla_count': articles.count(),
            'page_count': len(serializer.data),
            'result': list(serializer.data),
        }
        return Response(augmented_serializer)
    
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
        serializer = ArticleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
    
    @extend_schema(
        tags=['게시판',]
    )
    def retrieve(self, request, lecture_pk, article_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        article = get_object_or_404(
            Article.objects.filter(lecture=lecture_pk), 
            id=article_pk,
        )
        serialier = ArticleDetailSerializer(article)
        return Response(
            serialier.data,
        )
    
    @extend_schema(
        tags=['게시판',]
    )
    def update(self, request, lecture_pk, article_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        article = get_object_or_404(
            Article.objects.filter(lecture=lecture_pk), 
            id=article_pk,
        )
        if article.writer.pk != user.pk:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        notice = request.data.get('notice', article.notice)
        if notice:
            if user.status == 'ST':
                notice = False
        data = {
            'title': request.data.get('title', article.title),
            'content': request.data.get('content', article.content),
            'notice': notice,
            'writer': user.pk,
            'lecture': lecture_pk,
        }
        serializer = ArticleSerializer(
            instance=article,
            data=data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
    
    @extend_schema(
        tags=['게시판',]
    )
    def destroy(self, request, lecture_pk, article_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        article = get_object_or_404(
            Article.objects.filter(lecture=lecture_pk), 
            id=article_pk,
        )
        article.delete()
        return Response(
            status=status.HTTP_200_OK,
        )
