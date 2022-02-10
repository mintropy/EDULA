import styled from 'styled-components';
import HomeworkForm from '../components/class/HomeworkForm';
import StyledTitle from '../components/class/StyledTitle';

const StyledContainer = styled.div`
	margin: 3em;
`;

function CreateHomework() {
	return (
		<div>
			<StyledTitle>과제 만들기 📑</StyledTitle>
			<StyledContainer>
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
