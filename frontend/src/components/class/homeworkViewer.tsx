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
const HomeworkContainer = styled.p`
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
			subject: '수학',
			title: '수학 익힘책 19-20 페이지',
			content: '친구들 ^^ 수학 익힘책 풀어오세요~ ',
			author: '나담임',
			deadline: '2021.1.9',
			link: '',
		},
		{
			subject: '과학',
			title: '식초에 달걀 담그기 실험',
			content:
				'과학책 10 페이지 참고해서 식초에 달걀 담그기 실험을 해보세요~ 보호자와 함께 하는 거 알죠??',
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
					<HomeworkContent>{homework.subject}</HomeworkContent>
					<HomeworkContent>마감일: {homework.deadline}</HomeworkContent>
				</HomeworkContainer>
			))}
		</div>
	);
}

export default HomeworkViewer;
