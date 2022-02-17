import styled from 'styled-components';
import HomeworkForm from '../components/class/HomeworkForm';
import StyledTitle from '../components/class/StyledTitle';

const StyledUpContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 20px;
`;

const StyledContainer = styled.div`
	margin: 1rem 10rem;
	color: ${props => props.theme.fontColor};
`;

function CreateHomework() {
	return (
		<StyledUpContainer>
			<StyledContainer>
				<StyledTitle>과제 만들기 📑</StyledTitle>
				<HomeworkForm
					type='new'
					originTitle=''
					originContent=''
					originDeadline=''
				/>
			</StyledContainer>
		</StyledUpContainer>
	);
}

export default CreateHomework;
