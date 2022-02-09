import { useContext } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import StyledTitle from './StyledTitle';
import StyledButton from './StyledButton';
import UserContext from '../../context/user';

const StyledListItem = styled.li`
	font-size: 1em;
	text-align: center;
	margin: 1em;
	background: ${props => props.theme.subBgColor};
	color: ${props => props.theme.fontColor};
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
		deadline: string;
		id: number;
		lecture: number;
		title: string;
		writer: number;
	}[];
}
function HomeworkBoard({ homeworks }: BoardProps) {
	const { userStat } = useContext(UserContext);
	const { lectureId } = useParams();

	return (
		<div>
			<StyledTitle>과제</StyledTitle>
			<ul>
				{homeworks &&
					homeworks?.map(homework => (
						<StyledLink
							to={`/${lectureId}/homework/${homework.id}`}
							key={homework.id}
						>
							<StyledListItem>
								<h1>{homework.title}</h1>
								<p>{homework.deadline}</p>
							</StyledListItem>
						</StyledLink>
					))}
			</ul>
			{homeworks.length === 0 && (
				<div>
					<img src='../../../images/happy.gif' width='200' alt='과제 없음' />
				</div>
			)}
			{userStat === 'TE' && (
				<Link to={`/${lectureId}/homeworkCreate`}>
					<StyledButton>과제 등록</StyledButton>
				</Link>
			)}
		</div>
	);
}

export default HomeworkBoard;
