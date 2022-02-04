import styled from 'styled-components';
import Form from '../components/class/ArticleForm';
import StyledTitle from '../components/class/StyledTitle';

const StyledContainer = styled.div`
	margin: 3em;
`;

function CreateArticle() {
	return (
		<div>
			<StyledTitle>게시물 쓰기</StyledTitle>
			<StyledContainer>
				<Form type='new' originTitle='' originContent='' originDeadline='' />
			</StyledContainer>
		</div>
	);
}

export default CreateArticle;
