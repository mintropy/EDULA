import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEarlybirds } from 'react-icons/fa';
import styled from 'styled-components';
import { BiKey, BiLock, BiUser } from 'react-icons/bi';
import { AxiosError } from 'axios';
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
import UserContext from '../context/user';

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
	result: string;
	id: string;
	password: string;
};

function Login() {
	const { isLoggedIn, login } = useContext(UserContext);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		setError,
		clearErrors,
	} = useForm<LoginInput>({
		mode: 'all',
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate(routes.main);
		}
	}, [isLoggedIn]);

	const onValidSubmit: SubmitHandler<LoginInput> = async () => {
		const { id, password } = getValues();
		try {
			await apiLogin(id, password).then(res => {
				if (res.data?.access && res.data?.refresh) {
					login(res.data.access, res.data.refresh);
				}
			});
			navigate(routes.main);
		} catch (e) {
			const error = e as AxiosError;
			if (error?.response?.status === 401) {
				setError('result', { message: '사용자 정보가 일치하지 않습니다.' });
			}
		}
	};

	const resultError = errors.result?.message ? (
		<ErrorMsg message={errors.result?.message} />
	) : (
		<EmptyMsg />
	);

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
				<form onSubmit={handleSubmit(onValidSubmit)}>
					{resultError}
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
							onChange={() => clearErrors()}
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
							onChange={() => clearErrors()}
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
