import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Intro from '../components/class/Intro';
import { apiGetLectureDetail } from '../api/lecture';
import { apiGetHomeworks } from '../api/homework';
import ArticleBoard from '../components/class/ArticleBoard';
import HomeworkBoard from '../components/class/HomeworkBoard';

const StyledContainer = styled.section`
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-gap: 20px;
`;

interface LectureDataType {
	id: number;
	name: string;
	timeList: {
		count: number;
		lectures: [
			{
				day: string;
				st: string;
				end: string;
			}
		];
	};
	school: number;
	teacher: number;
	studentList: [number];
}

const StyledIntro = styled(Intro)``;

function Class() {
	const [lectureData, setLectureData] = useState({} as LectureDataType);
	const [homeworkData, setHomeworkData] = useState(null);
	const { lectureId } = useParams();

	useEffect(() => {
		if (lectureId) {
			apiGetLectureDetail(lectureId).then(res => {
				setLectureData(res.data);
			});
		}
	}, []);

	useEffect(() => {
		if (lectureId) {
			apiGetHomeworks(lectureId).then(res => {
				setHomeworkData(res.data.homework);
			});
		}
	}, []);

	if (lectureData) {
		return (
			<>
				<StyledIntro id={lectureData.id} name={lectureData.name} />
				<StyledContainer>
					{homeworkData && <HomeworkBoard homeworks={homeworkData} />}
					<ArticleBoard />
				</StyledContainer>
			</>
		);
	}
	return <h1>로딩 중</h1>;
}

export default Class;
