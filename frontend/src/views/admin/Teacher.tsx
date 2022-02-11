import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetTeachers } from '../../api/school';
import Table from '../../components/table/Table';
import Tbody from '../../components/table/Tbody';
import Tel from '../../components/table/Tel';
import UserContext from '../../context/user';
import routes from '../../routes';

const SLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

interface Classroom {
	id: number;
	classGrade: number;
	classNum: number;
	school: number;
}

interface School {
	id: number;
	name: string;
	abbreviation: string;
}

interface User {
	id: number;
	username: string;
	firstName: string;
	status: string;
	email: string;
	phone: string;
}

interface Teacher {
	classroom: Classroom;
	school: School;
	user: User;
}

function TeacherManager() {
	const { schoolId } = useContext(UserContext);
	const [teachers, setTeachers] = useState([] as Teacher[]);

	useEffect(() => {
		if (schoolId) {
			apiGetTeachers(schoolId).then(res => {
				setTeachers(res.data);
			});
		}
	}, [schoolId]);
	return (
		<Table>
			<Tbody>
				<Tel value='학년' />
				<Tel value='반' />
				<Tel value='이름' />
				<Tel value='이메일' />
				<Tel value='전화번호' />
			</Tbody>
			{teachers.map(e => (
				<Tbody key={e.user.id}>
					<Tel value={`${e.classroom.classGrade}`} />
					<Tel value={`${e.classroom.classNum}`} />
					<SLink to={`${routes.profile}/${e.user.id}`}>
						<Tel value={e.user.firstName} />
					</SLink>
					<Tel value={e.user.email} />
					<Tel value={e.user.phone} />
				</Tbody>
			))}
		</Table>
	);
}

export default TeacherManager;
