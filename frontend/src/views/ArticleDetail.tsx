import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StyledTitle from '../components/class/StyledTitle';
import StyledContent from '../components/class/StyledContent';
import StyledButton from '../components/class/StyledButton';
import { apiGetArticleDetail, apiDeleteArticle } from '../api/article';

const StyledContainer = styled.div`
	font-size: 1em;
	text-align: center;
	margin: 1em;
	background: ${props => props.theme.subBgColor};
	color: ${props => props.theme.fontColor};
	padding: 1em 1em 1em 2em;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.125);
	border-radius: 10px;
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

function ArticleDetail() {
	const { lectureId, articleId } = useParams();
	const navigate = useNavigate();

	const [articleData, setArticleData] = useState({} as ArticleDataType);

	if (articleId && lectureId) {
		useEffect(() => {
			apiGetArticleDetail(lectureId, articleId).then(res => {
				setArticleData(res.data);
			});
		}, []);
	}

	// 글쓴이 본인인지 확인해서 삭제, 수정 버튼 보이도록

	return (
		<StyledContainer>
			<StyledTitle>{articleData.title}</StyledTitle>
			<StyledContent>
				글쓴 날: {articleData.createdAt?.slice(0, 10)}/ 최종 수정일:{' '}
				{articleData.updatedAt?.slice(0, 10)}
			</StyledContent>
			<StyledContent>글쓴이: {articleData.writer?.username}</StyledContent>

			<StyledContent>{articleData.content}</StyledContent>
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
							apiDeleteArticle(lectureId, articleId)
								.then(res => {})
								.catch(err => {
									// console.log(err);
								});

							navigate(`/lecture/${lectureId}`);
						} catch (error) {
							// console.log(error);
						}
					}
				}}
			/>
		</StyledContainer>
	);
}

export default ArticleDetail;
