import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from '../../routes';

const StyledItem = styled.div`
	background-color: pink;
	margin: 0.5rem;
	padding: 0.3rem;
	text-align: center;
	color: ${props => props.theme.fontColor};
`;

const StyledLink = styled(Link)`
	text-decoration: none;
`;

interface ScheduleItemProps {
	name: string;
	startAt: string;
	endAt: string;
}

function ScheduleItem({ name, startAt, endAt }: ScheduleItemProps) {
	return (
		<StyledItem>
			<StyledLink to={routes.class}>
				{startAt} ~ {endAt} {name}
			</StyledLink>
		</StyledItem>
	);
}

export default ScheduleItem;
