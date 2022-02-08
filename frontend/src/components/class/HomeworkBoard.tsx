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
	homeworks: {
		content: string;
		createdAt: string;
		id: number;
		lecture: number;
		title: string;
		writer: number;
	}[];
}
function HomeworkBoard({ homeworks }: BoardProps) {
	const { lectureId } = useParams();

	return (
		<div>
			<StyledTitle>과제</StyledTitle>
			<ul>
				{/* {homeworks &&
					homeworks.map(article => (
						<StyledLink to={`/${lectureId}/article/${article.id}`} key={article.id}>
							<StyledListItem>
								<h1>{article.title}</h1>
								<p>{article.content}</p>
							</StyledListItem>
						</StyledLink>
					))} */}
			</ul>
			<Link to={`/${lectureId}/homeworkCreate`}>
				<StyledButton>글쓰기</StyledButton>
			</Link>
		</div>
	);
}

export default HomeworkBoard;