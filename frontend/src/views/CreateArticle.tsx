import styled from 'styled-components';
import ArticleForm from '../components/class/ArticleForm';
import StyledTitle from '../components/class/StyledTitle';

const StyledContainer = styled.div`
	margin: 1rem 10rem;
	position: absolute;
	top: 20%;
	left: 40%;
`;

function CreateArticle() {
	return (
		<StyledContainer>
			<StyledTitle>게시물 쓰기</StyledTitle>
			<ArticleForm
				type='new'
				originTitle=''
				originContent=''
				originNotice={false}
			/>
		</StyledContainer>
	);
}

export default CreateArticle;
