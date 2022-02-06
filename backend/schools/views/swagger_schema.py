from drf_spectacular.utils import OpenApiExample


descriptions = {
    'HomeworkViewSet': {
        'list': {
            'description':
    '''
    lecture_pk에 해당하는 모든 숙제를 조회합니다
    ''',
            200:
    '''
    해당 수업의 숙제 정보 조회를 성공했습니다
    ''',
        },
        'create': {
            'description':
    '''
    lecture_pk의 숙제를 생성합니다
입력으로 받는 deadline은 YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z] 포멧으로 작성되야 합니다\n
(ex. 2020-02-01T00:00, 2020-02-01T23:59:59)
    ''',
            201:
    '''
    해당 수업의 숙제를 생성했습니다
    '''
        },
        'retrieve': {
            'description':
    '''
    lecture_pk의 특정 숙제 상세정보를 확인합니다
    ''',
            200:
    '''
    수업 상세정보를 성공적으로 조회했습니다
    ''',
        },
        'update': {
            'description':
    '''
    lecture_pk의 특정 숙제 정보를 수정합니다
    ''',
            201:
    '''
    수업 정보 수정이 완료되었습니다
    ''',
        },
        'destroy': {
            'description':
    '''
    lecture_pk의 특정 숙제를 삭제합니다
    ''',
            200:
    '''
    성공적으로 삭제되었습니다
    ''',
        },
    },
    'HomeworkSubmissionViewSet': {
        'list': {
            'description':
    '''
    homework_pk의 모든 숙제를 확인합니다
homework_pk와 lecture_pk를 모두 확인한 후 요청이 정당한 경우 모든 숙제를 반환합니다\n
다음의 경우 401을 반환합니다
- 토큰이 존재하지 않거나 만료 된 경우
- 허가되지 않은 사용자인 경우
다음의 경우 404를 반환합니다
- homework_pk가 존재하지 않는 경우
- homework_pk가 lecture_pk의 수업이 아닌경우
    ''',
        },
        'create': {
            'description':
    '''
    숙제를 제출(생성)합니다
추가 파일이 있으면 file이름으로 전송합니다
다음의 경우 401을 반환합니다
- 토큰이 존재하지 않거나 만료 된 경우
- 허가되지 않은 사용자인 경우
다음의 경우 404를 반환합니다
- homework_pk가 존재하지 않는 경우
- homework_pk가 lecture_pk의 수업이 아닌경우
    ''',
        },
    },
    'ClassroomView': {
        'get': {
            'description': 
    '''
    Get total classroom information
Use school_pk, return total homework information
    ''',
            200: 
    '''
    Successfully get total classroom list
successfully get total classroom information from school_pk
    ''',
        },
        'post': {
            'description': 
    '''
    Post classroom information
Input classroom information
    ''',
            201: 
    '''
    Successfully post classroom
successfully input classroom
    ''',
        },
    },
    'LectureView': {
        'get': {
            'description': 
    '''
    Get total lecture of school information
Use lecture_pk, return total lecture information
    ''',
            200: 
    '''
    Successfully get total lecture list
successfully get total lecture information from lecture_pk
    ''',
        },
        'post': {
            'description': 
    '''
    Post lecture information
Input lecture information
    ''',
            201: 
    '''
    Successfully post lecture
successfully input lecture
    ''',
        },
    },
    'LectureDetailView': {
        'get': {
            'description': 
    '''
    Get lecture information
Use lecture_pk and school_pk, return lecture information
    ''',
            200: 
    '''
    Successfully get lecture information
successfully get lecture information from lecture_pk and school_pk
    ''',
        },
        'put': {
            'description': 
    '''
    Change lecture information
lecture information changed
    ''',
            201: 
    '''
    Successfully Put lecture
successfully change lecture
    ''',
        },
        'delete': {
            'description': 
    '''
    Delete lecture information
lecture information deleted
    ''',
            204: 
    '''
    Successfully Delete lecture
successfully deleted lecture
    ''',
        },
    },
    'StudentView': {
        'get': {
            'description': 
    '''
    Get total student of school information
Use school_pk, return total student of school infromation
    ''',
            200: 
    '''
    Successfully get total student list
successfully get total student information from school_pk
    ''',
        },
    },
    'ClassroomStudentView': {
        'get': {
            'description': 
    '''
    Get total student of classroom information
Use school_pk and classroom_pk, return total student of classroom infromation
    ''',
            200: 
    '''
    Successfully get total student list
successfully get total student information from school_pk and classroom_pk
    ''',
        },
    },
    'TeacherView': {
        'get': {
            'description': 
    '''
    Get total teacher of school information
Use school_pk, return total teacher of school infromation
    ''',
            200: 
    '''
    Successfully get total teacher list
successfully get total teacher information from school_pk
    ''',
        },
    },
}

summaries = {
    'HomeworkViewSet': {
        'list': '수업의 모든 숙제',
        'create': '수업의 숙제 생성',
        'retrieve': '수업 숙제 상세 정보',
        'update': '수업 숙제 정보 변경',
        'destroy': '수업 숙제 삭제',
    },
    'HomeworkSubmissionViewSet': {
        'list': '숙제의 모든 제출 확인',
        'create': '숙제 제출',
    },
    'ClassroomView': {
        'get' : 'Get classroom information',
        'post' : 'Post classroom',
    },
    'LectureView': {
        'get' : 'Get lecture information',
        'post' : 'Post lecture',
    },
    'LectureDetailView': {
        'get' : 'Get detail lecture information',
        'put' : 'Put lecture information',
        'delete' : 'Delete lecture' 
    },
    'StudentView': {
        'get' : 'Get students of school information',
    },
    'ClassroomStudentView': {
        'get' : 'Get students of classroom information',
    },
    'TeacherView': {
        'get' : 'Get teacher of school information',
    },
}

examples = {
    'HomeworkViewSet': {
        'homework_list':  [
            OpenApiExample(
                name='homework list teacher',
                value=[
                    {
                        'id': 1,
                        'title': '수학 숙제',
                        'content': '수학 익힘책 인수분해 문제 풀기',
                        'createdAt': '2022-02-01T02:00:00.000000',
                        'deadline': '2022-02-08T00:00:00',
                        'writer': {
                            'id': 5,
                            'username': '김싸피',
                        },
                        'lecture': 1,
                        'submission_list': [
                            {
                                'id': 10,
                                'username': '박싸피',
                            },
                            {
                                'id': 15,
                                'username': '황싸피',
                            },
                        ],
                    },
                ],
                status_codes=['200', '201',],
                response_only=True,
            ),
            OpenApiExample(
                name='homework list student',
                value=[
                    {
                        'id': 1,
                        'title': '수학 숙제',
                        'content': '수학 익힘책 인수분해 문제 풀기',
                        'createdAt': '2022-02-01T02:00:00.000000',
                        'deadline': '2022-02-08T00:00:00',
                        'writer': {
                            'id': 5,
                            'username': '김싸피',
                        },
                        'lecture': 1,
                        'submission': True,
                    },
                ],
            ),
        ],
        'homework_detail': [
            OpenApiExample(
                name='homework list',
                value=[
                    {
                        'id': 1,
                        'title': '수학 숙제',
                        'content': '수학 익힘책 인수분해 문제 풀기',
                        'createdAt': '2022-02-01T02:00:00.000000',
                        'deadline': '2022-02-08T00:00:00',
                        'writer': 4,
                        'lecture': 1,
                        'submission': [
                            {
                                'id': 1,
                                'title': '수학 숙제!!',
                                'content': '다 풀었습니다~',
                                'createdAt': '2022-02-01T02:00:00.000000',
                                'file': None,
                                'homework': 1,
                                'writer': 10,
                            },
                        ],
                    },
                ],
                status_codes=['200', '201',],
                response_only=True,
            ),
        ],
        'create': {
            'request': [
                OpenApiExample(
                    name='request',
                    value={
                        'title': '수학 숙제',
                        'content': '수학 익힘책 인수분해 문제 풀기',
                        'deadline': '2022-02-08T00:00:00',
                    },
                    request_only=True,
                ),
            ],
            201: [
                OpenApiExample(
                    name='homework list',
                    value=[
                        {
                            'id': 1,
                            'title': '수학 숙제',
                            'content': '수학 익힘책 인수분해 문제 풀기',
                            'createdAt': '2022-02-01T02:00:00.000000',
                            'deadline': '2022-02-08T00:00:00',
                            'writer': 4,
                            'lecture': 1
                        },
                    ],
                    status_codes=['200', '201',],
                    response_only=True,
                ),
            ]
        },
        'update': {
            'request': [
                OpenApiExample(
                    name='request',
                    value={
                        'title': '수학 숙제',
                        'content': '수학 익힘책 인수분해 문제 풀기',
                        'deadline': '2022-02-08T00:00:00',
                    },
                    request_only=True,
                ),
            ],
            201: [
                OpenApiExample(
                    name='homework list',
                    value=[
                        {
                            'id': 1,
                            'title': '수학 숙제',
                            'content': '수학 익힘책 인수분해 문제 풀기',
                            'createdAt': '2022-02-01T02:00:00.000000',
                            'deadline': '2022-02-08T00:00:00',
                            'writer': 4,
                            'lecture': 1
                        },
                    ],
                    status_codes=['200', '201',],
                    response_only=True,
                ),
            ],
        },
        'destroy': {
            200: [
                OpenApiExample(
                    name='user',
                    value={
                        'OK': 'No Content'
                    },
                    status_codes=['200'],
                    response_only=True
                ),
            ],
        },
    },
    'ClassroomView': {
        'get': {
            200: [
            OpenApiExample(
                name='user',
                value={
                    "class_grade": 6,
                    "class_num": 0
                },
            ),
            ],
        },
        'post': {
            'input': OpenApiExample(
                name='input example',
                value={
                    "class_grade": 6,
                    "class_num": 0
                },
                request_only=True,
            ),
            201: [
            OpenApiExample(
                name='user',
                value={
                    "class_grade": 6,
                    "class_num": 0
                },
            ),
            ],
        }
    },
    'LectureView': {
        'get': {
            200: [
            OpenApiExample(
                name='user',
                value={
                    "id": 0,
                    "name": "string",
                    "time_list": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "school": 0,
                    "teacher": 0,
                    "student_list": [
                        0
                    ]
                }
            ),
            ],
        },
        'post': {
            'input': OpenApiExample(
                name='input example',
                value={
                    "name": "string",
                    "time_list": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "school": 0,
                    "teacher": 0,
                    "student_list": [
                        0
                    ]
                },
                request_only=True,
            ),
            201: [
            OpenApiExample(
                name='user',
                value={
                    "id": 0,
                    "name": "string",
                    "time_list": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "school": 0,
                    "teacher": 0,
                    "student_list": [
                        0
                    ]
                },
            ),
            ],
        }
    },
    'LectureDetailView': {
        'get': {
            200: [
            OpenApiExample(
                name='user',
                value={
                    "id": 0,
                    "name": "string",
                    "time_list": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "school": 0,
                    "teacher": 0,
                    "student_list": [
                        0
                    ]
                },
            ),
            ],
        },
        'put': {
            'input': OpenApiExample(
                name='input example',
                value={
                    "name": "string",
                    "time_list": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "school": 0,
                    "teacher": 0,
                    "student_list": [
                        0
                    ]
                },
                request_only=True,
            ),
            201: [
            OpenApiExample(
                name='user',
                value={
                    "id": 0,
                    "name": "string",
                    "time_list": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "school": 0,
                    "teacher": 0,
                    "student_list": [
                        0
                    ]
                },
            ),
            ],
        },
        'delete': {
            204: [
            OpenApiExample(
                name='user',
                value={
                    'OK': 'No Content'
                },
                status_codes=['204'],
                response_only=True
            ),
            ],
        }
    },
    'StudentView': {
        'get': {
            200: [
            OpenApiExample(
                name='user',
                value=[{
                    "user": {
                        "id": 0,
                        "username": "string",
                        "email": "user@example.com",
                        "phone": "string",
                        "status": "ST"
                    },
                    "classroom": {
                        "id": 0,
                        "class_grade": 6,
                        "class_num": 0
                    },
                    "school": {
                        "id": 0,
                        "name": "string"
                    },
                    "guardian_phone": "string"
                }],
            ),
            ],
        },
    },
    'ClassroomStudentView': {
        'get': {
            200: [
            OpenApiExample(
                name='user',
                value={
                    "user": {
                        "id": 0,
                        "username": "string",
                        "email": "user@example.com",
                        "phone": "string",
                        "status": "ST"
                    },
                    "classroom": {
                        "id": 0,
                        "class_grade": 6,
                        "class_num": 0
                    },
                    "school": {
                        "id": 0,
                        "name": "string"
                    },
                    "guardian_phone": "string"
                },
            ),
            ],
        },
    },
    'TeacherView': {
        'get': {
            200: [
            OpenApiExample(
                name='user',
                value=[{
                    "user": {
                        "id": 0,
                        "username": "string",
                        "email": "user@example.com",
                        "phone": "string",
                        "status": "ST"
                    },
                    "classroom": {
                        "id": 0,
                        "class_grade": 6,
                        "class_num": 0
                    },
                    "school": {
                        "id": 0,
                        "name": "string"
                    }
                }],
            ),
            ],
        },
    },
}
