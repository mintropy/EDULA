import styled from 'styled-components';
import Board from '../components/class/board';
import TopNavBar from '../components/navbar/TopNavBar';
import HomeworkViewer from '../components/class/homeworkViewer';
import Intro from '../components/class/intro';

const StyledContainer = styled.section`
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-gap: 20px;
`;

const StyledIntro = styled(Intro)``;
const StyledBoard = styled(Board)`
	grid-column: 2;
`;
const StyledHomeworkViewer = styled(HomeworkViewer)`
	grid-column: 1;
`;

function Class() {
	return (
		<>
			<TopNavBar />
			<StyledIntro />
			<StyledContainer>
				<StyledHomeworkViewer />
				<StyledBoard />
			</StyledContainer>
		</>
	);
}

export default Class;
