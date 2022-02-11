import styled from 'styled-components';
import ArticleForm from '../components/class/ArticleForm';
import StyledTitle from '../components/class/StyledTitle';

const StyledContainer = styled.div`
	margin: 3em;
	color: ${props => props.theme.fontColor};
`;

function CreateArticle() {
	return (
		<div>
			<StyledTitle>게시물 쓰기</StyledTitle>
			<StyledContainer>
				<ArticleForm
					type='new'
					originTitle=''
					originContent=''
					originNotice={false}
				/>
			</StyledContainer>
		</div>
	);
}

export default CreateArticle;
