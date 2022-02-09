import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledItem = styled.div`
	background-color: ${props => props.theme.pointColor};
	margin: 0.5rem;
	padding: 0.3rem;
	text-align: center;
	color: ${props => props.theme.fontColor};
`;

interface ScheduleItemProps {
	scheduleId: number;
	name: string;
	startAt: string;
	endAt: string;
}

const StyledLink = styled(Link)`
	text-decoration: none;
`;

function ScheduleItem({ scheduleId, name, startAt, endAt }: ScheduleItemProps) {
	if (name) {
		return (
			<StyledLink to={`/lecture/${scheduleId}/`}>
				<StyledItem>
					{startAt.slice(0, 2)}:{startAt.slice(2, 4)} ~ {endAt.slice(0, 2)}:
					{endAt.slice(2, 4)}/ {name}
				</StyledItem>
			</StyledLink>
		);
	}
	return <h1>수업 없다 !</h1>;
}

export default ScheduleItem;
