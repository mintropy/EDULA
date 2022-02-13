from drf_spectacular.utils import OpenApiExample


descriptions = {
    'NotificationViewSet': {
        'list': {
            'description':
    '''
    알림 목록을 확인합니다
알림의 종류는 크게 5가지로 분류되고, 각각은 다음과 같은 방식으로 기록됩니다\n
알림은 notificationType(알림 종류), content, fromUser로 나뉘지만,\n
알림의 종류에따라 일부 항목들은 기록되지 않을 수도 있습니다
1. FR(Friend) : 친구 신청의 수락, 거절에 따른 알림입니다
    - fromUser에 친구 신청을 보낸 유저를 나타냅니다
    - content에 받은 친구 요청이면 null, 보낸 친구 요청 수락, 거절은 AC, RF입니다
2. HC(Homework Create) : 숙제 생성
    - 숙제가 생성되면, 해당 교실 모든 학생에게 알림을 생성합니다
    - content에 숙제 제목이 저장됩니다
    - fromUser에 숙제 작성자(교사)가 저장됩니다
    - 수업 정보가 lecture에 저장됩니다
3. HU(Homework Update) : 숙제 수정
    - 2.와 생성, 수정 차이만 있습니다
4. HS(Homework Submission) : 숙제 제출
    - 학생이 숙제를 제출하면, 담당 교사에게 알림이 생성됩니다
    - content에 숙제의 제목이 저장됩니다
    - fromUser에 숙제 작성자(학생)이 저장됩니다
    - 수업 정보가 lecture에 저장됩니다
    ''',
        },
        'partial_update': {
            'description':
    '''
    ''',
        },
        'destroy': {
            'description':
    '''
    ''',
        },
        'count': {
            'description':
    '''
    ''',
        },
    },
}

summaries = {
    'NotificationViewSet': {
        'list': '알림 전체 확인',
        'partial_update': '알림 수정(읽음)',
        'destroy': '알림 삭제',
        'count': '알림 개수',
    },
}

examples = {
    'NotificationViewSet': {
        'notification_list': [
            
        ]
    }
}
