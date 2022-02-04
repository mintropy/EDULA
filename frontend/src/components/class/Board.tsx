import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import StyledTitle from './StyledTitle';
import StyledButton from './StyledButton';

const StyledListItem = styled.li`
	font-size: 1em;
	text-align: center;
	margin: 1em;
	background: ${props => props.theme.subBgColor};
	padding: 1em 1em 1em 2em;
	border-left: 4px solid #ddd;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.125);
	border-radius: 10px;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: 1em;
`;

interface Props {

	id: number;
	title: string;
	content: string;
	deadline: string;
}
function Board({ id, title, content, deadline }: Props) {
	const [articles] = useState([
		{
			type: 'Q&A',
			title: '다큐멘터리 소감문 과제',
			content: '꼭 들어가야 하는 내용이 무엇인가요?',
			author: '김하루',
			deadline: '2021.1.7',
			link: '',
		},
		{
			type: '자유게시판',
			title: '마야의 도시에 관한 재미있는 기사~~ ^^',
			content:
				'신문에서 재미있는 기사를 봐서 추천해! http://www.handmk.com/news/articleView.html?idxno=12000 ',
			author: '서지산',
			deadline: '2021.1.15',
			link: '',
		},
	]);

	return (
		<div>
			<StyledTitle>게시판</StyledTitle>
			<ul>
				{articles.map(article => (
					<StyledLink to='/' key={article.title}>
						<StyledListItem>
							<p>{article.type}</p>
							<h1>{article.title}</h1>
							<p>{article.author}</p>
						</StyledListItem>
					</StyledLink>
				))}
			</ul>
			<Link to={routes.createarticle}>
				<StyledButton>글쓰기</StyledButton>
			</Link>
		</div>
	);
}

export default Board;
