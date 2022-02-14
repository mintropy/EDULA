from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status

from drf_spectacular.utils import extend_schema

from djangorestframework_camel_case.parser import CamelCaseJSONParser
from djangorestframework_camel_case.render import CamelCaseJSONRenderer

from ..models import School
from . import swagger_schema


class SchoolAbbreviationViewSet(ViewSet):
    """학교 약어 확인
    """
    model = School
    renderer_classes = [CamelCaseJSONRenderer]
    parser_classes = [CamelCaseJSONParser]
    permission_classes = [AllowAny]
    authentication_classes = []

    @extend_schema(
        description=swagger_schema.descriptions['SchoolAbbreviationViewSet']['retrieve']['description'],
        summary=swagger_schema.summaries['SchoolAbbreviationViewSet']['retrieve'],
        tags=['학교'],
    )
    def retrieve(self, request, abbreviation):
        """약어 있는지 확인

        Parameters
        ----------
        abbreviation : str
        """
        if not School.objects.filter(abbreviation=abbreviation).exists():
            return Response(
                status=status.HTTP_200_OK
            )
        return Response(
            status=status.HTTP_400_BAD_REQUEST
        )
