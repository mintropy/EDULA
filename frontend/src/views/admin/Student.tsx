import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetStudents } from '../../api/school';
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

interface Student {
	classroom: Classroom;
	guardianPhone: string;
	school: School;
	user: User;
}

function StudentManager() {
	const { schoolId } = useContext(UserContext);
	const [students, setStudents] = useState([] as Student[]);

	useEffect(() => {
		if (schoolId) {
			apiGetStudents(schoolId).then(res => {
				setStudents(res.data);
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
				<Tel value='비상연락처' />
			</Tbody>
			{students.map(e => (
				<Tbody key={e.user.id}>
					<Tel value={`${e.classroom.classGrade}`} />
					<Tel value={`${e.classroom.classNum}`} />
					<SLink to={`${routes.profile}/${e.user.id}`}>
						<Tel value={e.user.firstName} />
					</SLink>
					<Tel value={e.user.email} />
					<Tel value={e.user.phone} />
					<Tel value={e.guardianPhone} />
				</Tbody>
			))}
		</Table>
	);
}

export default StudentManager;
