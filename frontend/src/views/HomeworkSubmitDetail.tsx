import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiGetHomeworkSubmissionDetail } from '../api/homework';
import StyledTitle from '../components/class/StyledTitle';
import StyledContent from '../components/class/StyledContent';
import StyledContainer from '../components/schedule/StyledContainer';
import StyledButton from '../components/class/StyledButton';
import { BASE_URL } from '../api/utils';

interface HomeworkDataType {
	id: number;
	title: string;
	content: string;
	cretedAt: string;

	homeworkSubmissionFiles: {
		files: string;
		homeworkSubmission: number;
		id: number;
	}[];
	writer: number;
}

function HomeworkSubmitDetail() {
	const { lectureId, homeworkId, userId } = useParams();

	const [HomeworkData, setHomeworkData] = useState({} as HomeworkDataType);
	if (userId && lectureId && homeworkId) {
		useEffect(() => {
			apiGetHomeworkSubmissionDetail(lectureId, homeworkId, userId).then(res => {
				setHomeworkData(res.data);
				console.log(res.data);
			});
		}, []);
	}

	return (
		<StyledContainer>
			<StyledTitle>{HomeworkData.title}</StyledTitle>
			<StyledContent>{HomeworkData.writer}번 학생</StyledContent>
			<StyledContent>
				제출 시각: {HomeworkData.cretedAt?.slice(0, 10)}{' '}
				{HomeworkData.cretedAt?.slice(11, 19)}
			</StyledContent>
			<StyledContent>{HomeworkData.content}</StyledContent>
			{HomeworkData.homeworkSubmissionFiles && (
				<a
					href={`${BASE_URL}${HomeworkData.homeworkSubmissionFiles[0]?.files}`}
					download
				>
					<StyledButton>과제 다운로드</StyledButton>
				</a>
			)}

			<Link to={`/${lectureId}/homework/${homeworkId}/submit`}>
				<StyledButton>목록</StyledButton>
			</Link>
		</StyledContainer>
	);
}

export default HomeworkSubmitDetail;
