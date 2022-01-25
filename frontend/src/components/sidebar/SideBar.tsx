import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from '../../routes';

const StyledLink = styled(Link)`
	text-decoration: none;
`;

const StyledContainer = styled.div`
	padding: 2em;
	width: 10em;
	height: 100%;
	background-color: ${props => props.theme.pointColor};
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
				<li>
					<StyledLink to={routes.class}>
						수업 상세(가 아니라 시간표여야 함)
					</StyledLink>
				</li>
				<li>
					<StyledLink to={routes.class}>시간표</StyledLink>
				</li>
			</ul>
		</StyledContainer>
	);
}

export default SideBar;
