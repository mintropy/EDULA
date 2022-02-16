import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	apiGetStudentLectureList,
	apiGetTeacherLectureList,
} from '../api/user';
import StyledTitle from '../components/class/StyledTitle';
import ScheduleContainer from '../components/schedule/ScheduleContainer';
import UserContext from '../context/user';
import routes from '../routes';

function Home() {
	const navigate = useNavigate();
	const { currentLecture, changeCurrentLecture, userStat, userId } =
		useContext(UserContext);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [lectures, setLectures] = useState();

	const getLectures = async () => {
		switch (userStat) {
			case 'ST':
				await apiGetStudentLectureList(userId).then(res => console.log(res));
				break;
			case 'TE':
				await apiGetTeacherLectureList(userId).then(res => console.log(res));
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		getLectures();
	}, []);

	useEffect(() => {
		console.log(lectures);
	}, [lectures]);

	console.log(currentDate.getHours(), currentDate.getMinutes());

	return (
		<>
			<StyledTitle>꿈, 사랑, 감사</StyledTitle>
			<ScheduleContainer />
			<button type='button' onClick={() => navigate(routes.conference)}>
				{currentLecture} 수업 입장
			</button>
		</>
	);
}

export default Home;
