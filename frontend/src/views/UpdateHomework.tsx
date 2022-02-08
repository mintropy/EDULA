import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import StyledTitle from '../components/class/StyledTitle';
import { apiGetHomeworkDetail } from '../api/homework';
import HomeworkForm from '../components/class/HomeworkForm';

const StyledContainer = styled.div`
	margin: 3em;
`;
interface HomeworkDataType {
	content: string;
	createdAt: string;
	deadline: string;
	id: number;
	lecture: number;
	title: string;
	writerName: string;
	writerPk: number;
}

function UpdateHomework() {
	const { lectureId, homeworkId } = useParams();

	const [homeworkData, setHomeworkData] = useState({} as HomeworkDataType);

	if (homeworkId && lectureId) {
		useEffect(() => {
			apiGetHomeworkDetail(lectureId, homeworkId).then(res => {
				setHomeworkData(res.data);
			});
		}, [homeworkId]);
	}

	return (
		<div>
			<StyledTitle>과제 수정</StyledTitle>
			<StyledContainer>
				<HomeworkForm
					type='update'
					originTitle={homeworkData.title}
					originContent={homeworkData.content}
					originDeadline={homeworkData.deadline?.slice(
						0,
						homeworkData.deadline.length
					)}
				/>
			</StyledContainer>
		</div>
	);
}

export default UpdateHomework;
