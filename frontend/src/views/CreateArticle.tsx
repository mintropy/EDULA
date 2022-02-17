import styled from 'styled-components';
import ArticleForm from '../components/class/ArticleForm';
import StyledTitle from '../components/class/StyledTitle';

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: 20px;
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
