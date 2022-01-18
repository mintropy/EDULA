import { useState } from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
	font-size: 2em;
	text-align: center;
	margin: 1em 1em;
`;

const StyledContent = styled.p`
	font-size: 1em;
	text-align: center;
	margin: 1em 1em;
`;

function AlarmItem() {
	const [alarms, setAlarms] = useState([
		{
			type: '과제',
			title: '수학 익힘책 19-20 페이지',
			content: '친구들 ^^ 수학 익힘책 풀어오세요~ ',
			author: '나담임',
			link: '',
		},
		{
			type: '쪽지',
			title: '안뇽',
			content:
				'안녕? 잘지내지? 다음 주에 내 생일 파티에 초대할게. 4시에 우리집으로 와',
			author: '나친구',
			link: '',
		},
	]);
	return (
		<div>
			<ul>
				{alarms.map(alarm => (
					<li key={alarm.title}>
						<StyledContent>{alarm.type}</StyledContent>
						<StyledTitle>{alarm.title}</StyledTitle>
						<StyledContent>{alarm.author}</StyledContent>
						<StyledContent>{alarm.content}</StyledContent>
					</li>
				))}
			</ul>
		</div>
	);
}

export default AlarmItem;
