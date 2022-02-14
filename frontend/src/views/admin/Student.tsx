import { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetStudents } from '../../api/school';
import {
	apiCreateUsers,
	apiDeleteUser,
	apiDeleteUsers,
} from '../../api/schoolAdmin';
import UserForm from '../../components/admin/UserForm';
import Table from '../../components/table/Table';
import Tbody from '../../components/table/Tbody';
import Tel from '../../components/table/Tel';
import UserContext from '../../context/user';
import routes from '../../routes';

const Container = styled.div``;

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
	username?: string;
	firstName?: string;
	status?: string;
	email?: string;
	phone?: string;
}

interface Student {
	classroom?: Classroom;
	guardianPhone?: string;
	school?: School;
	user: User;
}

function StudentManager() {
	const { schoolId } = useContext(UserContext);
	const [students, setStudents] = useState([] as Student[]);
	const [editTarget, setEditTarget] = useState({} as Student);
	const [editMode, setEditMode] = useState(false);

	const getStudents = () => {
		apiGetStudents(schoolId).then(res => {
			setStudents(res.data);
		});
	};

	const deleteStudent = async (studentId: string) => {
		await apiDeleteUser(studentId);
		getStudents();
	};

	const deleteStudents = async () => {
		const year = document.getElementById('deleteYear') as HTMLInputElement;
		await apiDeleteUsers(year.value);
		getStudents();
	};

	const createStudents = async () => {
		const year = document.getElementById('createYear') as HTMLInputElement;
		const count = document.getElementById('count') as HTMLInputElement;
		const studentCreationCountList = {} as any;
		studentCreationCountList[year.value] = parseInt(count.value, 10);

		await apiCreateUsers({
			studentCreationCountList,
			teacherCreationCount: 0,
		});
		getStudents();
	};

	useEffect(() => {
		if (schoolId) {
			getStudents();
		}
	}, [schoolId]);

	useEffect(() => {
		setEditMode(false);
		setEditTarget({} as Student);
	}, [students]);

	return (
		<Container>
			<input type='text' id='createYear' placeholder='입학연도' />
			<input type='text' id='count' placeholder='학생 수' />
			<button type='button' onClick={() => createStudents()}>
				create
			</button>
			<input type='text' id='deleteYear' placeholder='입학연도' />
			<button type='button' onClick={() => deleteStudents()}>
				delete
			</button>
			<Table>
				<Tbody>
					<Tel value='학년' />
					<Tel value='반' />
					<Tel value='아이디' />
					<Tel value='이름' />
					<Tel value='이메일' />
					<Tel value='전화번호' />
					<Tel value='비상연락처' />
				</Tbody>
				{students.map(e => (
					<Fragment key={e.user.id}>
						<Tbody>
							<Tel value={`${e?.classroom?.classGrade || '-'}`} />
							<Tel value={`${e?.classroom?.classNum || '-'}`} />
							<Tel value={e.user?.username || '-'} />
							<SLink to={`${routes.profile}/${e.user.id}`}>
								<Tel value={e.user?.firstName || '-'} />
							</SLink>
							<Tel value={e.user?.email || '-'} />
							<Tel value={e.user?.phone || '-'} />
							<Tel value={e?.guardianPhone || '-'} />
							<button
								type='button'
								onClick={() => {
									setEditTarget(e);
									setEditMode(true);
								}}
							>
								modify
							</button>
							<button
								type='button'
								onClick={() => deleteStudent(e.user.id.toString())}
							>
								x
							</button>
						</Tbody>
						{editTarget === e && editMode && (
							<UserForm targetUser={e} getUsers={getStudents} />
						)}
					</Fragment>
				))}
			</Table>
		</Container>
	);
}

export default StudentManager;
