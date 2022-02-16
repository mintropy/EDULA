import { Fragment, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
	apiDeleteClassroomDetail,
	apiGetClassrooms,
	apiPostClassroom,
} from '../../api/classroom';
import ClassroomForm from '../../components/admin/ClassroomForm';
import FormBox from '../../components/auth/FormBox';
import FormBtn from '../../components/auth/FormBtn';
import FormInput from '../../components/auth/FormInput';
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

type ClassroomInput = {
	classGrade: number;
	classNum: number;
};

function ClassManager() {
	const { schoolId } = useContext(UserContext);
	const [classrooms, setClassrooms] = useState([] as Classroom[]);
	const [editTarget, setEditTarget] = useState({} as Classroom);
	const [editMode, setEditMode] = useState(false);

	const getClassrooms = () => {
		apiGetClassrooms(schoolId).then(res => {
			setClassrooms(res.data);
		});
	};

	const deleteClassroom = async (classroomId: string) => {
		await apiDeleteClassroomDetail(schoolId, classroomId);
		getClassrooms();
	};

	useEffect(() => {
		if (schoolId) {
			getClassrooms();
		}
	}, [schoolId]);

	useEffect(() => {
		setEditMode(false);
		setEditTarget({} as Classroom);
	}, [classrooms]);

	return (
		<Container>
			<button
				type='button'
				onClick={() => {
					setEditMode(true);
					setEditTarget({} as Classroom);
				}}
			>
				수업 생성
			</button>
			{editMode && !editTarget?.id && (
				<ClassroomForm targetClassroom={editTarget} getClassrooms={getClassrooms} />
			)}
			<Table>
				<Tbody>
					<Tel value='학년' />
					<Tel value='반' />
				</Tbody>
				{classrooms.map(e => (
					<Fragment key={e.id}>
						<Tbody>
							<Tel value={e.classGrade} />
							<SLink key={e.id} to={`${routes.classroom}/${e.id}`}>
								<Tel value={e.classNum} />
							</SLink>
							<button
								type='button'
								onClick={() => {
									setEditTarget(e);
									setEditMode(true);
								}}
							>
								modify
							</button>
							<button type='button' onClick={() => deleteClassroom(e.id.toString())}>
								x
							</button>
						</Tbody>
						{editTarget === e && (
							<ClassroomForm targetClassroom={e} getClassrooms={getClassrooms} />
						)}
					</Fragment>
				))}
			</Table>
		</Container>
	);
}

export default ClassManager;
