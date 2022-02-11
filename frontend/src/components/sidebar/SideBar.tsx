import { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsFillHouseDoorFill, BsTable, BsPeopleFill } from 'react-icons/bs';
import routes from '../../routes';
import UserContext from '../../context/user';

const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: 1.5em;
	color: ${props => props.theme.fontColor};
`;

const StyledList = styled.li`
	margin: 1em;
`;

const StyledContainer = styled.div`
	padding: 1em;
	width: 3em;
	height: 100%;
	background-color: ${props => props.theme.subBgColor};
`;

function SideBar() {
	const { userStat } = useContext(UserContext);
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
				{userStat === 'ST' && (
					<StyledList>
						<StyledLink to={routes.friend}>
							<BsPeopleFill />
						</StyledLink>
					</StyledList>
				)}
			</ul>
		</StyledContainer>
	);
}

export default SideBar;
