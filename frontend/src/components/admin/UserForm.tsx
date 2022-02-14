import { SubmitHandler, useForm } from 'react-hook-form';
import FormBox from '../auth/FormBox';
import FormBtn from '../auth/FormBtn';
import FormInput from '../auth/FormInput';

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

type StudentInput = {
	classGrade: number;
	classNum: number;
	name: string;
	email: string;
	phone: string;
	guardianPhone: string;
};

type PropType = {
	targetUser?: Student;
	getUsers: () => void;
};

function UserForm({ targetUser, getUsers }: PropType) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		setError,
		clearErrors,
	} = useForm<StudentInput>({
		mode: 'onChange',
		defaultValues: {
			classGrade: targetUser?.classroom?.classGrade,
			classNum: targetUser?.classroom?.classNum,
			name: targetUser?.user?.firstName,
			email: targetUser?.user?.email,
			phone: targetUser?.user?.phone,
			guardianPhone: targetUser?.guardianPhone,
		},
	});

	const onValidSubmit: SubmitHandler<StudentInput> = async () => {
		const { classGrade, classNum, name, email, phone, guardianPhone } =
			getValues();
	};

	return (
		<FormBox>
			<form onSubmit={handleSubmit(onValidSubmit)}>
				<FormInput htmlFor='classGrade'>
					<input {...register('classGrade')} placeholder='학년' />
				</FormInput>
				<FormInput htmlFor='classNum'>
					<input {...register('classNum')} placeholder='반' />
				</FormInput>
				<FormInput htmlFor='name'>
					<input {...register('name')} placeholder='이름' />
				</FormInput>
				<FormInput htmlFor='email'>
					<input {...register('email')} placeholder='이메일' />
				</FormInput>
				<FormInput htmlFor='phone'>
					<input {...register('phone')} placeholder='전화번호' />
				</FormInput>
				{targetUser?.user?.status === 'ST' && (
					<FormInput htmlFor='guardianPhone'>
						<input {...register('guardianPhone')} placeholder='보호자 전화번호' />
					</FormInput>
				)}
				<FormBtn value='수정' disabled={!isValid} />
			</form>
		</FormBox>
	);
}

export default UserForm;
