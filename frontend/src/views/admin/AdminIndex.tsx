import { Link } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../routes';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const SLink = styled(Link)`
	text-decoration: none;
`;

const Title = styled.div`
	font-size: 2.5em;
`;

const Contents = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const Section = styled.div`
	min-width: 20em;
	height: 20em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function AdminIndex() {
	return (
		<Container>
			<Title>관리자 페이지입니다.</Title>
			<Contents>
				<SLink to={routes.studentManager}>
					<Section>학생</Section>
				</SLink>
				<SLink to={routes.teacherManager}>
					<Section>교사</Section>
				</SLink>
				<SLink to={routes.classManager}>
					<Section>학급</Section>
				</SLink>
				<SLink to={routes.lectureManager}>
					<Section>수업</Section>
				</SLink>
			</Contents>
		</Container>
	);
}

export default AdminIndex;
