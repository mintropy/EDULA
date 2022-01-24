import styled from 'styled-components';
import Board from '../components/class/Board';
import TopNavBar from '../components/navbar/TopNavBar';
import HomeworkViewer from '../components/class/HomeworkViewer';
import Intro from '../components/class/Intro';

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
			<StyledIntro />
			<StyledContainer>
				<StyledHomeworkViewer />
				<StyledBoard />
			</StyledContainer>
		</>
	);
}

export default Class;
