import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from '../../routes';

const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: 1.5em;
	color: ${props => props.theme.fontColor};
`;

const StyledList = styled.li`
	margin: 1em;
`;

const StyledContainer = styled.div`
	padding: 2em;
	width: 10em;
	height: 100%;
	background-color: ${props => props.theme.subBgColor};
`;

const StyledTitle = styled.h1`
	font-size: 2em;
	text-align: center;
`;
function SideBar() {
	return (
		<StyledContainer>
			<StyledTitle>Side Navigation</StyledTitle>
			<ul>
				<StyledList>
					<StyledLink to={routes.schedule}>시간표</StyledLink>
				</StyledList>
				<StyledList>
					<StyledLink to={routes.class}>과제 모음</StyledLink>
				</StyledList>
			</ul>
		</StyledContainer>
	);
}

export default SideBar;
