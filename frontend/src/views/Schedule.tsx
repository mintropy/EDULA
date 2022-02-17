import styled from 'styled-components';
import ScheduleAllContainer from '../components/schedule/ScheduleAllContainer';
import ScheduleContainer from '../components/schedule/ScheduleContainer';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: 20px;
`;

function Schedule() {
	return (
		<Container>
			<ScheduleContainer />
			<ScheduleAllContainer />
		</Container>
	);
}

export default Schedule;
