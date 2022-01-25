import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { FaUserTag } from 'react-icons/fa';
import { VscMail } from 'react-icons/vsc';
import { ImEnter } from 'react-icons/im';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import EmptyMsg from '../components/auth/EmptyMsg';
import ErrorMsg from '../components/auth/ErrorMsg';
import FormBox from '../components/auth/FormBox';
import FormBtn from '../components/auth/FormBtn';
import FormInput from '../components/auth/FormInput';
import LinkBox from '../components/auth/LinkBox';
import PageTitle from '../components/PageTitle';
import routes from '../routes';

const HeaderContainer = styled.div`
	width: 100%;
	padding: 30px 0px;
	display: flex;
	justify-content: center;
	align-items: center;

	h1 {
		font-size: 2rem;
		font-weight: 700;
	}
`;

type FindidInput = {
	name: string;
	email: string;
};

function Findid() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		// getValues,
	} = useForm<FindidInput>({ mode: 'all' });

	const onValidSubmit: SubmitHandler<FindidInput> = async () => {
		// const { name, email } = getValues();
		// find id logic
	};

	const onInValidSubmit: SubmitErrorHandler<FindidInput> = () => {
		// error handling
	};

	const nameError = errors.name?.message ? (
		<ErrorMsg message={errors.name?.message} />
	) : (
		<EmptyMsg />
	);

	const emailError = errors.email?.message ? (
		<ErrorMsg message={errors.email?.message} />
	) : (
		<EmptyMsg />
	);
	return (
		<AuthLayout>
			<PageTitle title='Find Id' />
			<HeaderContainer>
				<h1>아이디 찾기</h1>
			</HeaderContainer>
			<FormBox>
				<form onSubmit={handleSubmit(onValidSubmit, onInValidSubmit)}>
					<FormInput htmlFor='name'>
						<span>
							<FaUserTag />
						</span>
						<input
							{...register('name', {
								required: '이름을 입력하세요',
							})}
							type='text'
							placeholder='Name'
						/>
					</FormInput>
					{nameError}
					<FormInput htmlFor='email'>
						<span>
							<VscMail />
						</span>
						<input
							{...register('email', {
								required: '이메일을 입력하세요',
								pattern: {
									value: /^\S+@\S+.\S+$/,
									message: '잘못된 이메일 형식입니다.',
								},
							})}
							type='email'
							placeholder='Email'
						/>
					</FormInput>
					{emailError}
					<FormBtn value='아이디 찾기' disabled={!isValid} />
				</form>
			</FormBox>
			<LinkBox>
				<ImEnter />
				<Link to={routes.login}>로그인</Link>
				<span>|</span>
				<Link to={routes.findpw}>비밀번호 찾기</Link>
			</LinkBox>
		</AuthLayout>
	);
}

export default Findid;
