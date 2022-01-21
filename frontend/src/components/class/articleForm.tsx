import styled from 'styled-components';
import StyledButton from './styledButton';
import FormBox from '../auth/FormBox';

function Form() {
	return (
		<form>
			<input name='title' />
			<StyledButton>제출</StyledButton>
		</form>
	);
}

export default Form;
