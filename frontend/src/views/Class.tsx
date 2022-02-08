import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import HomeworkViewer from '../components/class/HomeworkViewer';
import Intro from '../components/class/Intro';
import { apiGetLectureDetail } from '../api/lecture';
import { apiGetHomeworks } from '../api/homework';
import UserContext from '../context/user';
import { apiGetArticles } from '../api/article';
import ArticleBoard from '../components/class/ArticleBoard';

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
const StyledBoard = styled(ArticleBoard)`
	grid-column: 2;
`;
const StyledHomeworkViewer = styled(HomeworkViewer)`
	grid-column: 1;
`;

interface ArticleDataType {
	content: string;
	createdAt: string;
	id: number;
	lecture: number;
	notice: boolean;
	title: string;
	writer: number;
	updatedAt: string;
}

function Class() {
	const [lectureData, setLectureData] = useState({} as LectureDataType);
	const [homeworkData, setHomeworkData] = useState(null);
	const { schoolId } = useContext(UserContext);
	const { lectureId } = useParams();
	const [articleData, setArticleData] = useState([] as ArticleDataType[]);

	useEffect(() => {
		if (lectureId) {
			apiGetLectureDetail(parseInt(schoolId, 10), parseInt(lectureId, 10)).then(
				res => {
					setLectureData(res.data);
				}
			);
		}
	}, []);

	useEffect(() => {
		if (lectureId) {
			apiGetHomeworks(parseInt(lectureId, 10)).then(res => {
				setHomeworkData(res.data);
			});
		}
	}, []);

	useEffect(() => {
		if (lectureId) {
			apiGetArticles(lectureId).then(res => {
				setArticleData(res.data.result);
			});
		}
	}, []);

	if (lectureData) {
		return (
			<>
				<StyledIntro id={lectureData.id} name={lectureData.name} />
				<StyledContainer>
					<StyledHomeworkViewer />
					{articleData && <ArticleBoard articles={articleData} />}
				</StyledContainer>
			</>
		);
	}
	return <h1>로딩 중</h1>;
}

export default Class;
