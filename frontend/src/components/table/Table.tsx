import { ReactNode } from 'react';
import styled from 'styled-components';

const STable = styled.div`
	width: 100%;
	margin: 50px;
	box-sizing: border-box;
`;

type PropType = {
	children: ReactNode;
};

function Table({ children }: PropType) {
	return <STable>{children}</STable>;
}

export default Table;
