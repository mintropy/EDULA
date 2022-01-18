import styled from 'styled-components';
import AlarmItem from '../components/alarm/AlarmItem';

const StyledTitle = styled.h1`
	font-size: 2em;
	text-align: center;
	margin: 1em 1em;
`;

function Alarm() {
	return (
		<>
			<StyledTitle>새 소식</StyledTitle>
			<AlarmItem />
		</>
	);
}

export default Alarm;
