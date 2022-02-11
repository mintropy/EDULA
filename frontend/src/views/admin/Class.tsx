import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetClassrooms, apiPostClassroom } from '../../api/classroom';
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
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		setError,
		clearErrors,
	} = useForm<ClassroomInput>({
		mode: 'onChange',
	});

	const getClassrooms = () => {
		apiGetClassrooms(schoolId).then(res => {
			setClassrooms(res.data);
		});
	};

	useEffect(() => {
		if (schoolId) {
			getClassrooms();
		}
	}, [schoolId]);

	const onValidSubmit: SubmitHandler<ClassroomInput> = async () => {
		const classroom = getValues();
		try {
			await apiPostClassroom(schoolId, classroom);
			getClassrooms();
		} catch (e) {
			// const error = e as AxiosError;
			// console.log(error.response);
		}
	};

	return (
		<Container>
			<FormBox>
				<form onSubmit={handleSubmit(onValidSubmit)}>
					<FormInput htmlFor='classGrade'>
						<input
							{...register('classGrade')}
							min='1'
							max='6'
							type='number'
							placeholder='학년'
						/>
					</FormInput>
					<FormInput htmlFor='classNum'>
						<input
							{...register('classNum')}
							min='1'
							max='99'
							type='number'
							placeholder='반'
						/>
					</FormInput>
					<FormBtn value='생성' disabled={!isValid} />
				</form>
			</FormBox>
			<Table>
				<Tbody>
					<Tel value='학년' />
					<Tel value='반' />
				</Tbody>
				{classrooms.map(e => (
					<SLink key={e.id} to={`${routes.classroom}/${e.id}`}>
						<Tbody>
							<Tel value={e.classGrade} />
							<Tel value={e.classNum} />
						</Tbody>
					</SLink>
				))}
			</Table>
		</Container>
	);
}

export default ClassManager;
