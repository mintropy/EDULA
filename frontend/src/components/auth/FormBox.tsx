import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 100%;
	}
`;

type PropType = {
	children: ReactNode;
};

function FormBox({ children }: PropType) {
	return <Container>{children}</Container>;
}

export default FormBox;
