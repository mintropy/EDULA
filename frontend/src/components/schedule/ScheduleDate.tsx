import styled from 'styled-components';

const StyledItem = styled.div`
	font-size: 2em;
	text-align: center;
	color: ${props => props.theme.iconColor};
`;

function ScheduleDate() {
	const today = new Date().toString().split(' ');

	return (
		<div>
			<StyledItem>
				{today[1]}월 {today[2]}일 ({today[0]}) 시간표
			</StyledItem>
		</div>
	);
}

export default ScheduleDate;
