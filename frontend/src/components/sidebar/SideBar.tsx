import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsFillHouseDoorFill, BsTable, BsPeopleFill } from 'react-icons/bs';
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
			<ul>
				<StyledList>
					<StyledLink to={routes.main}>
						<BsFillHouseDoorFill />
					</StyledLink>
				</StyledList>
				<StyledList>
					<StyledLink to={routes.schedule}>
						<BsTable />
					</StyledLink>
				</StyledList>
				<StyledList>
					<StyledLink to={routes.friend}>
						<BsPeopleFill />
					</StyledLink>
				</StyledList>
			</ul>
		</StyledContainer>
	);
}

export default SideBar;
