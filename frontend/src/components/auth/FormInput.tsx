import styled from 'styled-components';

const FormInput = styled.label`
	display: flex;

	& > * {
		box-sizing: border-box;
		border: 1px solid black;
		padding: 8px;
		font-size: 1rem;
	}

	input {
		width: 100%;
	}
`;

export default FormInput;
