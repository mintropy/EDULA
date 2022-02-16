import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import StyledTitle from '../components/class/StyledTitle';
import ScheduleContainer from '../components/schedule/ScheduleContainer';
import routes from '../routes';

const StyledContainer = styled.div`
	position: absolute;
	top: 20%;
	left: 40%;
`;

function Home() {
	const navigate = useNavigate();

	return (
		<StyledContainer>
			<StyledTitle>오늘도 화이팅! </StyledTitle>
			<ScheduleContainer />
			<button type='button' onClick={() => navigate(routes.conference)}>
				수업 입장
			</button>
		</StyledContainer>
	);
}

export default Home;
