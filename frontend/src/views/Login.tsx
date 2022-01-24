import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEarlybirds } from 'react-icons/fa';
import styled from 'styled-components';
import { BiKey, BiLock, BiUser } from 'react-icons/bi';
import AuthLayout from '../components/auth/AuthLayout';
import ErrorMsg from '../components/auth/ErrorMsg';
import FormBox from '../components/auth/FormBox';
import FormBtn from '../components/auth/FormBtn';
import EmptyMsg from '../components/auth/EmptyMsg';
import routes from '../routes';
import { apiLogin } from '../api/user';
import PageTitle from '../components/PageTitle';
import FormInput from '../components/auth/FormInput';
import LinkBox from '../components/auth/LinkBox';

const HeaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100px;
	width: 100%;
	font-size: 4rem;
	margin-bottom: 15px;
	background-color: inherit;

	svg {
		margin-right: 10px;
	}
`;

type LoginInput = {
	id: string;
	password: string;
};

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
	} = useForm<LoginInput>({
		mode: 'all',
	});
	const navigate = useNavigate();

	const onValidSubmit: SubmitHandler<LoginInput> = async () => {
		// login logic
		const { id, password } = getValues();
		try {
			await apiLogin(id, password).then(res => res);

			navigate(routes.main);
		} catch (error) {
			// console.log(error);
		}
	};

	const onInValidSubmit: SubmitErrorHandler<LoginInput> = () => {
		// error handling
	};

	const idError = errors.id?.message ? (
		<ErrorMsg message={errors.id?.message} />
	) : (
		<EmptyMsg />
	);
	const pwError = errors.password?.message ? (
		<ErrorMsg message={errors.password?.message} />
	) : (
		<EmptyMsg />
	);

	return (
		<AuthLayout>
			<PageTitle title='login' />
			<HeaderContainer>
				<FaEarlybirds />
				<span>Edula</span>
			</HeaderContainer>
			<FormBox>
				<form onSubmit={handleSubmit(onValidSubmit, onInValidSubmit)}>
					<FormInput htmlFor='id'>
						<span>
							<BiUser />
						</span>
						<input
							{...register('id', {
								required: '아이디를 입력하세요.',
								minLength: {
									value: 8,
									message: '아이디는 8자 이상, 16자 이하입니다.',
								},
								maxLength: {
									value: 16,
									message: '아이디는 8자 이상, 16자 이하입니다.',
								},
								pattern: {
									value: /^\D{2}\d{6,}$/,
									message: '잘못된 아이디 형식입니다.',
								},
							})}
							type='text'
							placeholder='ID'
						/>
					</FormInput>
					{idError}
					<FormInput htmlFor='password'>
						<div>
							<BiKey />
						</div>
						<input
							{...register('password', {
								required: '비밀번호를 입력하세요.',
								minLength: {
									value: 8,
									message: '비밀번호는 8자 이상, 16자 이하입니다.',
								},
								maxLength: {
									value: 16,
									message: '비밀번호는 8자 이상, 16자 이하입니다.',
								},
							})}
							type='password'
							placeholder='Password'
						/>
					</FormInput>
					{pwError}
					<FormBtn value='로그인' disabled={!isValid} />
				</form>
			</FormBox>
			<LinkBox>
				<BiLock />
				<Link to={routes.findid}>아이디</Link>
				<span>|</span>
				<Link to={routes.findpw}>비밀번호 찾기</Link>
			</LinkBox>
		</AuthLayout>
	);
}

export default Login;
