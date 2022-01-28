import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledTitle = styled.h1`
	font-size: 2em;
	text-align: center;
`;
const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: 1em;
`;
const HomeworkContainer = styled.div`
	font-size: 1em;
	text-align: center;
	margin: 2em;
	background: ${props => props.theme.subBgColor};
	padding: 1em 1em 1em 2em;
	border-left: 4px solid #ddd;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.125);
	border-radius: 10px;
`;
const HomeworkContent = styled.div`
	margin: 1em;
`;

function HomeworkViewer() {
	const [homeworks] = useState([
		{
			subject: '서양사',
			title: '@@ 다큐멘터리',
			content: '친구들 ^^ @@ 다큐멘터리 보고 1페이지 감상문 써오세요 ^^ ',
			author: '나담임',
			deadline: '2021.1.9',
			link: '',
		},
		{
			subject: '서양사',
			title: '세계사 여행 - 일본 에도시대 편 책 읽기',
			content:
				'세계사 여행- 일본 에도 시대 편 책 읽고, 다섯 줄 감상문 써오세요. ^^ 학교 온라인 도서관에 있어요. ',
			author: '사이언',
			deadline: '2021.1.15',
			link: '',
		},
	]);

	return (
		<div>
			<StyledTitle>과제</StyledTitle>
			{homeworks.map(homework => (
				<HomeworkContainer key={homework.title}>
					<StyledLink to='/'>{homework.title}</StyledLink>
					<HomeworkContent>마감일: {homework.deadline}</HomeworkContent>
				</HomeworkContainer>
			))}
		</div>
	);
}

export default HomeworkViewer;
