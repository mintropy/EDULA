import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StyledTitle from '../components/class/StyledTitle';
import StyledContent from '../components/class/StyledContent';
import StyledButton from '../components/class/StyledButton';
import routes from '../routes';
import { apiGetHomeworkDetail } from '../api/homework';

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
	const { articleId } = useParams();

	const [homeworkData, setHomeworkData] = useState({} as HomeworkDataType);

	if (articleId) {
		useEffect(() => {
			apiGetHomeworkDetail(1, parseInt(articleId, 10)).then(res => {
				setHomeworkData(res.data);
			});
		}, [articleId]);
	}

	// 글쓴이 본인인지 확인해서 삭제, 수정 버튼 보이도록

	// 삭제 버튼 onClick 시 삭제 로직
	return (
		<div>
			<StyledTitle>{homeworkData.title}</StyledTitle>
			<StyledContent>
				{homeworkData.writerName} / {homeworkData.deadline}
			</StyledContent>
			<StyledContent>{homeworkData.content}</StyledContent>

			<Link to={`/articleUpdate/${articleId}`}>
				<StyledButton>수정</StyledButton>
			</Link>
			<StyledButton>삭제</StyledButton>
		</div>
	);
}

export default ArticleDetail;
