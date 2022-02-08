import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
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

interface BoardProps {
	articles: {
		content: string;
		createdAt: string;
		id: number;
		lecture: number;
		notice: boolean;
		title: string;
		updatedAt: string;
		writer: number;
	}[];
}
function ArticleBoard({ articles }: BoardProps) {
	const { lectureId } = useParams();

	if (articles) {
		return (
			<div>
				<StyledTitle>게시판</StyledTitle>
				<ul>
					{articles &&
						articles.map(article => (
							<StyledLink to={`/${lectureId}/article/${article.id}`} key={article.id}>
								<StyledListItem>
									<h1>{article.title}</h1>
									<p>{article.content}</p>
								</StyledListItem>
							</StyledLink>
						))}
				</ul>
				<Link to={`/${lectureId}/articleCreate`}>
					<StyledButton>글쓰기</StyledButton>
				</Link>
			</div>
		);
	}
	return <h1>로딩 중</h1>;
}

export default ArticleBoard;
