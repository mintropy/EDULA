import styled from 'styled-components';
import HomeworkForm from '../components/class/HomeworkForm';
import StyledTitle from '../components/class/StyledTitle';

const StyledContainer = styled.div`
	margin: 1rem 10rem;
	color: ${props => props.theme.fontColor};
`;

function CreateHomework() {
	return (
		<div>
			<StyledContainer>
				<StyledTitle>과제 만들기 📑</StyledTitle>
				<HomeworkForm
					type='new'
					originTitle=''
					originContent=''
					originDeadline=''
				/>
			</StyledContainer>
		</div>
	);
}

export default CreateHomework;
