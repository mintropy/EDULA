import { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetTeachers } from '../../api/school';
import { apiCreateUsers, apiDeleteUser } from '../../api/schoolAdmin';
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

interface Teacher {
	classroom?: Classroom;
	school?: School;
	user: User;
}

function TeacherManager() {
	const { schoolId } = useContext(UserContext);
	const [teachers, setTeachers] = useState([] as Teacher[]);
	const [editTarget, setEditTarget] = useState({} as Teacher);
	const [editMode, setEditMode] = useState(false);

	const getTeachers = () => {
		apiGetTeachers(schoolId).then(res => {
			setTeachers(res.data);
		});
	};

	const deleteTeacher = async (teacherId: string) => {
		await apiDeleteUser(teacherId);
		getTeachers();
	};

	const createTeachers = async () => {
		const count = document.getElementById('count') as HTMLInputElement;

		await apiCreateUsers({
			studentCreationCountList: {},
			teacherCreationCount: parseInt(count.value, 10),
		});
		getTeachers();
	};

	useEffect(() => {
		if (schoolId) {
			getTeachers();
		}
	}, [schoolId]);

	useEffect(() => {
		setEditMode(false);
		setEditTarget({} as Teacher);
	}, [teachers]);

	return (
		<Container>
			<input type='text' id='count' placeholder='교사 수' />
			<button type='button' onClick={() => createTeachers()}>
				create
			</button>
			<Table>
				<Tbody>
					<Tel value='학년' />
					<Tel value='반' />
					<Tel value='아이디' />
					<Tel value='이름' />
					<Tel value='이메일' />
					<Tel value='전화번호' />
				</Tbody>
				{teachers.map(e => (
					<Fragment key={e.user.id}>
						<Tbody>
							<Tel value={e?.classroom?.classGrade || '-'} />
							<Tel value={e?.classroom?.classNum || '-'} />
							<Tel value={e.user?.username || '-'} />
							<SLink to={`${routes.profile}/${e.user.id}`}>
								<Tel value={e.user?.firstName || '-'} />
							</SLink>
							<Tel value={e.user?.email || '-'} />
							<Tel value={e.user?.phone || '-'} />
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
								onClick={() => deleteTeacher(e.user.id.toString())}
							>
								x
							</button>
						</Tbody>
						{editTarget === e && editMode && (
							<UserForm targetUser={e} getUsers={getTeachers} />
						)}
					</Fragment>
				))}
			</Table>
		</Container>
	);
}

export default TeacherManager;
