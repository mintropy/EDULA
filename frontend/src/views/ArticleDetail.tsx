import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StyledTitle from '../components/class/StyledTitle';
import TopNavBar from '../components/navbar/TopNavBar';
import StyledContent from '../components/class/StyledContent';
import StyledButton from '../components/class/StyledButton';
import routes from '../routes';

function ArticleDetail() {
	const { articleId } = useParams();

	const [article] = useState({
		type: 'Q&A',
		title: '다큐멘터리 소감문 과제',
		content: '꼭 들어가야 하는 내용이 무엇인가요?',
		author: '김하루',
		deadline: '2021.1.7',
		link: '',
	});
	// articleId를 가지고 article 정보를 받아오는 로직

	return (
		<div>
			<TopNavBar />

			<StyledTitle>{article.title}</StyledTitle>
			<StyledContent>
				{article.author} / {article.deadline}
			</StyledContent>
			<StyledContent>{article.content}</StyledContent>

			<Link to={routes.updatearticle}>
				<StyledButton>수정</StyledButton>
			</Link>
			<StyledButton>삭제</StyledButton>
		</div>
	);
}

export default ArticleDetail;
