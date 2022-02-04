import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Board from '../components/class/Board';
import HomeworkViewer from '../components/class/HomeworkViewer';
import Intro from '../components/class/Intro';
import { apiGetLectureDetail } from '../api/lecture';
import { apiGetHomeworks } from '../api/homework';

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

interface HomeworkDataType {
	homeworks: {
		content: string;
		createdAt: string;
		deadline: string;
		id: number;
		lecture: number;
		title: string;
		writerName: string;
		writerPk: number;
	}[];
}

const StyledIntro = styled(Intro)``;
const StyledBoard = styled(Board)`
	grid-column: 2;
`;
const StyledHomeworkViewer = styled(HomeworkViewer)`
	grid-column: 1;
`;

function Class() {
	const [lectureData, setLectureData] = useState({} as LectureDataType);
	const [homeworkData, setHomeworkData] = useState(null);

	useEffect(() => {
		// 학교, 강의 pk로 바꾸기!!
		apiGetLectureDetail(1, 1).then(res => {
			setLectureData(res.data);
		});
	}, []);

	useEffect(() => {
		apiGetHomeworks(1).then(res => {
			setHomeworkData(res.data);
		});
	}, []);

	if (lectureData) {
		return (
			<>
				<StyledIntro id={lectureData.id} name={lectureData.name} />
				<StyledContainer>
					<StyledHomeworkViewer />
					{homeworkData && <StyledBoard articles={homeworkData} />}
				</StyledContainer>
			</>
		);
	}
	return <h1>로딩 중</h1>;
}

export default Class;
