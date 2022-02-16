import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import ArticleForm from '../components/class/ArticleForm';
import StyledTitle from '../components/class/StyledTitle';
import { apiGetArticleDetail } from '../api/article';

const StyledUpContainer = styled.div`
	position: absolute;
	top: 20%;
	left: 40%;
`;
const StyledContainer = styled.div`
	margin: 3em;
`;

interface ArticleDataType {
	content: string;
	createdAt: string;
	notice: boolean;
	id: number;
	lecture: number;
	title: string;
	writer: {
		id: number;
		username: string;
		firstName: string;
		status: string;
	};
	updatedAt: string;
}

function UpdateArticle() {
	const { lectureId, articleId } = useParams();

	const [homeworkData, setHomeworkData] = useState({} as ArticleDataType);

	if (articleId && lectureId) {
		useEffect(() => {
			apiGetArticleDetail(lectureId, articleId).then(res => {
				setHomeworkData(res.data);
			});
		}, [articleId]);
	}

	return (
		<StyledUpContainer>
			<StyledTitle>게시물 수정</StyledTitle>
			<StyledContainer>
				<ArticleForm
					type='update'
					originTitle={homeworkData.title}
					originContent={homeworkData.content}
					originNotice={homeworkData.notice}
				/>
			</StyledContainer>
		</StyledUpContainer>
	);
}

export default UpdateArticle;
