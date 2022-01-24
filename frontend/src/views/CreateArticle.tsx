import styled from 'styled-components';
import Form from '../components/class/ArticleForm';
import TopNavBar from '../components/navbar/TopNavBar';
import StyledTitle from '../components/class/StyledTitle';

const StyledContainer = styled.div`
	margin: 3em;
`;

function CreateArticle() {
	return (
		<div>
			<TopNavBar />
			<StyledTitle>게시물 쓰기</StyledTitle>
			<StyledContainer>
				<Form originTitle='' originContent='' />
			</StyledContainer>
		</div>
	);
}

export default CreateArticle;
