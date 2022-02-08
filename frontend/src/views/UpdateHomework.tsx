import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import StyledTitle from '../components/class/StyledTitle';
import { apiGetHomeworkDetail } from '../api/homework';

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
	const { lectureId, articleId } = useParams();

	const [homeworkData, setHomeworkData] = useState({} as HomeworkDataType);

	if (articleId && lectureId) {
		useEffect(() => {
			apiGetHomeworkDetail(lectureId, articleId).then(
				res => {
					setHomeworkData(res.data);
				}
			);
		}, [articleId]);
	}

	return (
		<div>
			{/* <StyledTitle>게시물 수정</StyledTitle>
			<StyledContainer>
				<Form
					type='update'
					originTitle={homeworkData.title}
					originContent={homeworkData.content}
					originDeadline={homeworkData.deadline?.slice(
						0,
						homeworkData.deadline.length - 1
					)}
				/>
			</StyledContainer> */}
			수정
		</div>
	);
}

export default UpdateHomework;
