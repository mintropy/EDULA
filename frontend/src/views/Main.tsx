import styled from 'styled-components';
import StyledTitle from '../components/class/StyledTitle';
import ScheduleContainer from '../components/schedule/ScheduleContainer';

const StyledContainer = styled.div`
	position: absolute;
	top: 20%;
	left: 40%;
`;

function Home() {
	return (
		<StyledContainer>
			<StyledTitle>오늘도 화이팅! </StyledTitle>
			<ScheduleContainer />
		</StyledContainer>
	);
}

export default Home;
