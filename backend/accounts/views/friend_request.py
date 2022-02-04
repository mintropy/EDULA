from django.shortcuts import get_object_or_404
from django.test import tag

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from drf_spectacular.utils import (
    extend_schema, OpenApiResponse
)

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from . import swagger_schema
from server import basic_swagger_schema
from .user import decode_JWT
from ..models import User, FriendRequest
from ..serializers.friend_request import(
    FriendRequestSerializer
)
from ..serializers.user import UserBasicSerializer


class FriendRequestViewSet(ViewSet):
    """About friend request
    
    """
    model = FriendRequest
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=swagger_schema.schema_serializers['FriendRequestViewSet']['request_list'],
                description=swagger_schema.descriptions['FriendRequestViewSet']['list'][200],
            ),
            401: basic_swagger_schema.open_api_response[401],
        },
        description=swagger_schema.descriptions['FriendRequestViewSet']['list']['description'],
        summary=swagger_schema.summaries['FriendRequestViewSet']['list'],
        tags=['친구'],
        examples=[
            basic_swagger_schema.examples[401],
            swagger_schema.examples['FriendRequestViewSet']['request_list'],
        ],
    )
    def list(self, request):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        friend_request_data = {
            'requset_send': FriendRequestSerializer(
                FriendRequest.objects.filter(from_user=user.pk), many=True,
            ).data,
            'requset_receive': FriendRequestSerializer(
                FriendRequest.objects.filter(to_user=user.pk), many=True
            ).data,
        }
        return Response(
            friend_request_data,
            status=status.HTTP_200_OK,
        )
    
    @extend_schema(
        request=swagger_schema.schema_serializers['FriendRequestViewSet']['create']['request'],
        responses={
            200: OpenApiResponse(
                response=swagger_schema.schema_serializers['FriendRequestViewSet']['request_list'],
                description=swagger_schema.descriptions['FriendRequestViewSet']['create'][200],
            ),
            400: basic_swagger_schema.open_api_response[400],
            401: basic_swagger_schema.open_api_response[401],
            404: basic_swagger_schema.open_api_response[404],
        },
        description=swagger_schema.descriptions['FriendRequestViewSet']['create']['description'],
        summary=swagger_schema.summaries['FriendRequestViewSet']['create'],
        tags=['친구'],
        examples=[
            basic_swagger_schema.examples[400],
            basic_swagger_schema.examples[401],
            basic_swagger_schema.examples[404],
            swagger_schema.examples['FriendRequestViewSet']['request_list'],
            swagger_schema.examples['FriendRequestViewSet']['create']['request'],
        ],
    )
    def create(self, request):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        to_user = get_object_or_404(User, pk=request.data.get('to_user'))
        if FriendRequest.objects.filter(
                from_user=user.pk, to_user=to_user.pk, request_status='RQ',
            ).exists():
                return Response(
                    {'error': 'already exist'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        friend_request_data = {
            'from_user': user.pk,
            'to_user': to_user.pk,
            'request_status': 'RQ',
        }
        serializer = FriendRequestSerializer(data=friend_request_data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    'requset_send': FriendRequestSerializer(
                        FriendRequest.objects.filter(from_user=user.pk), many=True,
                    ).data,
                    'requset_receive': FriendRequestSerializer(
                        FriendRequest.objects.filter(to_user=user.pk), many=True
                    ).data,
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
    
    def retrieve(self, request, request_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        friend_request = get_object_or_404(FriendRequest, pk=request_pk)
        serializer = FriendRequestSerializer(friend_request)
        return Response(serializer.data)
    
    def update(self, request, request_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        friend_request = get_object_or_404(FriendRequest, pk=request_pk)
        serializer = FriendRequestSerializer(
            friend_request, 
            data = {'request_status': request.data['request_status']}
        )
        if serializer.is_valid():
            serializer.save()
            state_before = friend_request.request_status
            state_after = serializer.data['request_status']
            from_user = serializer.data['from_user']
            if state_after == 'AC':
                user.friend_list.add(from_user)
                user.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    
    def destroy(self, request, request_pk):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        friend_request = get_object_or_404(FriendRequest, pk=request_pk)
        friend_request.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT
        )    
