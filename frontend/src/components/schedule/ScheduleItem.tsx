import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledItem = styled.div`
	background-color: pink;
	margin: 0.5rem;
	padding: 0.3rem;
	text-align: center;
	color: ${props => props.theme.fontColor};
`;

interface ScheduleItemProps {
	id: number;
	name: string;
	startAt: string;
	endAt: string;
}

const StyledLink = styled(Link)`
	text-decoration: none;
`;

function ScheduleItem({ id, name, startAt, endAt }: ScheduleItemProps) {
	if (name) {
		return (
			<StyledLink key={id} to={`/lecture/${id}/`}>
				<StyledItem>
					{startAt} ~ {endAt} {name}
				</StyledItem>
			</StyledLink>
		);
	}
	return <h1>수업 없다 !</h1>;
}

export default ScheduleItem;
