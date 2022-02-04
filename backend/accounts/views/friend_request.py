from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from drf_spectacular.utils import (
    extend_schema, OpenApiResponse
)

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from .user import decode_JWT
from ..models import FriendRequest
from ..serializers.friend_request import(
    FriendRequestSerializer
)


class FriendRequestViewSet(ViewSet):
    """
    
    """
    model = FriendRequest
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    
    def list(self, request):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = {
            'requset_send': FriendRequestSerializer(
                FriendRequest.objects.filter(from_user=user.pk), many=True,
            ).data,
            'requset_receive': FriendRequestSerializer(
                FriendRequest.objects.filter(to_user=user.pk), many=True
            ).data,
        }
        return Response(
            data
        )
    
    def create(self, request):
        user = decode_JWT(request)
        if user == None:
            return Response(
                {'error': 'Unauthorized'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        data = {
            'from_user': user.pk,
            'to_user': request.data['to_user'],
            'request_status': 'RQ',
        }
        serializer = FriendRequestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return serializer.errors
    
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
