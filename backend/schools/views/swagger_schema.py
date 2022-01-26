from drf_spectacular.utils import OpenApiExample


descriptions = {
    'HomeworkView': {
        'get': {
            'description': 
    '''
    Get total homework of school information
Use lecture_pk, return total homework information
    ''',
            200: 
    '''
    Successfully get total homework list
successfully get total homework information from lecture_pk
    ''',
        },
        'post': {
            'description': 
    '''
    Post homework information
Input homework information
    ''',
            200: 
    '''
    Successfully post homework
successfully input homework
    ''',
        },
    },
    'HomeworkDetailView': {
        'get': {
            'description': 
    '''
    Get homework information
Use lecture_pk and homework_pk, return homework information
    ''',
            200: 
    '''
    Successfully get homework information
successfully get homework information from lecture_pk and homework_pk
    ''',
        },
        'put': {
            'description': 
    '''
    Change homework information
homework information changed
    ''',
            200: 
    '''
    Successfully Put homework
successfully change homework
    ''',
        },
        'delete': {
            'description': 
    '''
    Delete homework information
homework information deleted
    ''',
            204: 
    '''
    Successfully Delete homework
successfully deleted homework
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
            200: 
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
            200: 
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
            200: 
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
    'HomeworkView': {
        'get' : 'Get detail homework information',
        'post' : 'Post homework of lecture',
    },
    'HomeworkDetailView': {
        'get' : 'Get detail homework information',
        'put' : 'Put homework information',
        'delete' : 'Delete homework' 
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
    'HomeworkView': {
        'get': {
            200: [
            OpenApiExample(
                name='user',
                value={
                    "id": 0,
                    "title": "string",
                    "content": "string",
                    "created_at": "2022-01-24T02:05:04.172Z",
                    "deadline": "2022-01-24T02:05:04.172Z",
                    "writer_pk": 0,
                    "writer_name": "string",
                    "lecture": 0
                },
            ),
            ],
        },
        'post': {
            'input': OpenApiExample(
                name='input example',
                value={
                    "title": "string",
                    "content": "string",
                    "deadline": "2022-01-25T05:49:19.152Z",
                },
                request_only=True,
            ),
            200: [
            OpenApiExample(
                name='user',
                value={
                    "id": 0,
                    "title": "string",
                    "content": "string",
                    "created_at": "2022-01-24T02:05:04.172Z",
                    "deadline": "2022-01-24T02:05:04.172Z",
                    "writer_pk": 0,
                    "writer_name": "string",
                    "lecture": 0
                },
            ),
            ],
        }
    },
    'HomeworkDetailView': {
        'get': {
            200: [
            OpenApiExample(
                name='user',
                value={
                    "id": 0,
                    "title": "string",
                    "content": "string",
                    "created_at": "2022-01-24T02:05:04.172Z",
                    "deadline": "2022-01-24T02:05:04.172Z",
                    "writer_pk": 0,
                    "writer_name": "string",
                    "lecture": 0
                },
            ),
            ],
        },
        'put': {
            'input': OpenApiExample(
                name='input example',
                value={
                    "title": "string",
                    "content": "string",
                    "deadline": "2022-01-25T05:49:19.152Z",
                },
                request_only=True,
            ),
            200: [
            OpenApiExample(
                name='user',
                value={
                    "id": 0,
                    "title": "string",
                    "content": "string",
                    "created_at": "2022-01-24T02:05:04.172Z",
                    "deadline": "2022-01-24T02:05:04.172Z",
                    "writer_pk": 0,
                    "writer_name": "string",
                    "lecture": 0
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
            200: [
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
