import { useState } from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
	font-size: 2em;
	text-align: center;
	margin: 1em 1em;
	color: ${props => props.theme.fontColor};
`;

const StyledIntro = styled.div`
	margin: 0px;
	padding: 0px;
	background-color: #333;
	background-image: url('https://37.media.tumblr.com/8b4969985e84b2aa1ac8d3449475f1af/tumblr_n3iftvUesn1snvqtdo1_1280.jpg');
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
