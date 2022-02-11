import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StyledContainer from '../schedule/StyledContainer';
import StyledTitle from './StyledTitle';

interface Props {
	students: {
		user: {
			firstName: string;
			id: number;
			status: string;
			username: string;
		};
	}[];
}

const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: 1em;
	color: ${props => props.theme.fontColor};
`;

function StudentList({ students }: Props) {
	return (
		<StyledContainer>
			<StyledTitle>학생 목록</StyledTitle>
			{students &&
				students.map(
					student =>
						student.user?.status === 'ST' && (
							<StyledLink to={`/profile/${student.user?.id}`}>
								<h1>{student?.user?.username}</h1>
							</StyledLink>
						)
				)}
		</StyledContainer>
	);
}

export default StudentList;
