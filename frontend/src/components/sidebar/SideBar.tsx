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
	width: 4em;
	background-color: ${props => props.theme.subBgColor};
`;

function SideBar() {
	const { userStat } = useContext(UserContext);

	const contents = (stat: string) => {
		switch (stat) {
			case 'ST':
				return (
					<>
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
					</>
				);
			case 'TE':
				return (
					<>
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
					</>
				);
			case 'SA':
				return (
					<>
						<StyledList>
							<StyledLink to={routes.admin}>
								<BsFillHouseDoorFill />
							</StyledLink>
						</StyledList>
						<StyledList>
							<StyledLink to={routes.studentManager}>
								<BsTable />
							</StyledLink>
						</StyledList>
						<StyledList>
							<StyledLink to={routes.teacherManager}>
								<BsTable />
							</StyledLink>
						</StyledList>
						<StyledList>
							<StyledLink to={routes.classManager}>
								<BsTable />
							</StyledLink>
						</StyledList>
						<StyledList>
							<StyledLink to={routes.lectureManager}>
								<BsTable />
							</StyledLink>
						</StyledList>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<StyledContainer>
			<ul>{contents(userStat || '')}</ul>
		</StyledContainer>
	);
}

export default SideBar;
