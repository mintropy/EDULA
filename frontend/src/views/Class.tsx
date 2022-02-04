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
	const [homeworkData, setHomeworkData] = useState([
		{
			content: '',
			createdAt: '',
			deadline: '',
			id: 2123,
			lecture: 123,
			title: '',
			writerName: '',
			writerPk: 123,
		},
	] as unknown as HomeworkDataType);

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
					<Board
						articles={[
							{
								id: 1,
								title: '설날 연휴 숙제',
								content: '수학익힘책 19-21페이지 풀어보세요~',
								createdAt: '2022-02-02T01:46:59.560806Z',
								deadline: '2022-01-25T05:20:00Z',
								writerPk: 4,
								writerName: '나교사',
								lecture: 1,
							},
							{
								id: 2,
								title: '수행평가',
								content:
									'짝꿍과 함께 피보나치 수열의 예시를 찾아보세요 ^^\r\n피피티 두 장으로 발표할거예요.',
								createdAt: '2022-02-03T02:45:08.580929Z',
								deadline: '2022-02-05T10:00:00Z',
								writerPk: 1,
								writerName: '1',
								lecture: 1,
							},
						]}
					/>
					{/* <StyledBoard /> */}
				</StyledContainer>
			</>
		);
	}
	return <h1>로딩 중</h1>;
}

export default Class;
