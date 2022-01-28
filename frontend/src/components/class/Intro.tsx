import { useState } from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
	font-size: 2em;
	text-align: center;
	padding: 1em;
	color: ${props => props.theme.fontColor};
`;

const StyledIntro = styled.div`
	margin: 0px;
	padding: 0px;
	background-color: ${props => props.theme.pointColor};
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	width: 100%;
	height: 10em;
`;
function Intro() {
	const [title] = useState('서양사');
	return (
		<>
			<StyledIntro>
				<StyledTitle>{title}</StyledTitle>
			</StyledIntro>
			;
		</>
	);
}

export default Intro;
