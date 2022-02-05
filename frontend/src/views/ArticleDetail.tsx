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
	writerName: string;
	writerPk: number;
}

function ArticleDetail() {
	const { lectureId, articleId } = useParams();
	const navigate = useNavigate();

	const [homeworkData, setHomeworkData] = useState({} as HomeworkDataType);

	if (articleId && lectureId) {
		useEffect(() => {
			apiGetHomeworkDetail(parseInt(lectureId, 10), parseInt(articleId, 10)).then(
				res => {
					setHomeworkData(res.data);
				}
			);
		}, [articleId]);
	}

	// 글쓴이 본인인지 확인해서 삭제, 수정 버튼 보이도록

	return (
		<div>
			<StyledTitle>{homeworkData.title}</StyledTitle>
			<StyledContent>
				{homeworkData.writerName} / {homeworkData.deadline}
			</StyledContent>
			<StyledContent>{homeworkData.content}</StyledContent>
			<Link to={`/${lectureId}/articleUpdate/${articleId}`}>
				<StyledButton>수정</StyledButton>
			</Link>
			<input
				type='button'
				value='삭제'
				onClick={e => {
					e.preventDefault();
					if (articleId && lectureId) {
						try {
							apiDeleteHomework(parseInt(lectureId, 10), parseInt(articleId, 10))
								.then(res => {})
								.catch(err => {
									// console.log(err);
								});

							// 해당 클래스 숫자!!
							navigate(`/lecture/${lectureId}`);
						} catch (error) {
							// console.log(error);
						}
					}
				}}
			/>
		</div>
	);
}

export default ArticleDetail;
