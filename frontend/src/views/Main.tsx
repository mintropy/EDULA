import { useNavigate } from 'react-router-dom';
import StyledTitle from '../components/class/StyledTitle';
import ScheduleContainer from '../components/schedule/ScheduleContainer';
import routes from '../routes';

function Home() {
	const navigate = useNavigate();

	return (
		<>
			<StyledTitle>꿈, 사랑, 감사</StyledTitle>
			<ScheduleContainer />
			<button type='button' onClick={() => navigate(routes.conference)}>
				수업 입장
			</button>
		</>
	);
}

export default Home;
