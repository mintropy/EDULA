import styled from 'styled-components';

const StyledItem = styled.div`
	background-color: pink;
	margin: 0.5rem;
	padding: 0.3rem;
	text-align: center;
	color: ${props => props.theme.fontColor};
`;

interface ScheduleItemProps {
	name: string;
	startAt: string;
	endAt: string;
}

function ScheduleItem({ name, startAt, endAt }: ScheduleItemProps) {
	return (
		<StyledItem>
			{startAt} ~ {endAt} {name}
		</StyledItem>
	);
}

export default ScheduleItem;
