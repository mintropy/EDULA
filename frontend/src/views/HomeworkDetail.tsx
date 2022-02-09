import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import StyledTitle from '../components/class/StyledTitle';
import StyledContent from '../components/class/StyledContent';
import StyledButton from '../components/class/StyledButton';
import { apiDeleteHomework, apiGetHomeworkDetail } from '../api/homework';

interface HomeworkDataType {
	content: string;
	createdAt: string;
	deadline: string;
	id: number;
	lecture: number;
	title: string;
	writer: number;
}

function HomeworkDetail() {
	const { lectureId, homeworkId } = useParams();
	const navigate = useNavigate();

	const [homeworkData, setHomeworkData] = useState({} as HomeworkDataType);

	if (homeworkId && lectureId) {
		useEffect(() => {
			apiGetHomeworkDetail(lectureId, homeworkId).then(res => {
				setHomeworkData(res.data);
			});
		}, []);
	}

	// 글쓴이 본인인지 확인해서 삭제, 수정 버튼 보이도록. 삭제 함수 따로 위로 빼기

	return (
		<div>
			<StyledTitle>{homeworkData.title}</StyledTitle>
			<StyledContent>마감 기한: {homeworkData.deadline}</StyledContent>
			<StyledContent>{homeworkData.content}</StyledContent>
			<Link to={`/${lectureId}/homeworkUpdate/${homeworkId}`}>
				<StyledButton>수정</StyledButton>
			</Link>
			<input
				type='button'
				value='삭제'
				onClick={e => {
					e.preventDefault();
					if (lectureId && homeworkId) {
						try {
							apiDeleteHomework(lectureId, homeworkId)
								.then(() => {})
								.catch(() => {});

							navigate(`/lecture/${lectureId}`);
						} catch (error) {
							// console.log(error);
						}
					}
				}}
			/>
			<Link to={`/${lectureId}/homework/${homeworkId}/submit`}>
				<StyledButton>과제 제출</StyledButton>
			</Link>
		</div>
	);
}

export default HomeworkDetail;
