import styled from 'styled-components';
import AlarmItem from '../components/alarm/AlarmItem';
import TopNavBar from '../components/navbar/TopNavBar';

const StyledTitle = styled.h1`
	font-size: 2em;
	text-align: center;
	margin: 1em 1em;
`;

function Alarm() {

	return (
		<>
			<TopNavBar/>
			<StyledTitle>새 소식</StyledTitle>
			<AlarmItem />
		</>
	);
}

export default Alarm;
