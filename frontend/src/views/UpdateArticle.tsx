import styled from 'styled-components';
import Form from '../components/class/ArticleForm';
import TopNavBar from '../components/navbar/TopNavBar';
import StyledTitle from '../components/class/StyledTitle';

const StyledContainer = styled.div`
	margin: 3em;
`;

function UpdateArticle() {
	return (
		<div>
			<TopNavBar />
			<StyledTitle>게시물 수정</StyledTitle>
			<StyledContainer>
				<Form
					originTitle='과학 실험'
					originContent='과학 책 32페이지 참고해서, 보호자의 지도 아래 하세요. 인증샷 필수 !! '
				/>
			</StyledContainer>
		</div>
	);
}

export default UpdateArticle;
