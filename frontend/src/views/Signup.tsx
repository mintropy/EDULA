import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/user';
import routes from '../routes';
import AuthLayout from '../components/auth/AuthLayout';
import ErrorMsg from '../components/auth/ErrorMsg';
import FormBox from '../components/auth/FormBox';
import FormBtn from '../components/auth/FormBtn';
import FormInput from '../components/auth/FormInput';
import EmptyMsg from '../components/auth/EmptyMsg';

type SignupInput = {
	result: string;
	id: string;
	password: string;
	abbreviation: string;
};
function Signup() {
	const { isLoggedIn, login } = useContext(UserContext);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		setError,
		clearErrors,
	} = useForm<SignupInput>({
		mode: 'onChange',
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate(routes.main);
		}
	}, [isLoggedIn]);

	const clearLoginError = () => {
		clearErrors('result');
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

	const onValidSubmit: SubmitHandler<SignupInput> = async () => {
		const { id, password } = getValues();
		try {
			// await apiLogin(id, password).then(res => {
			// 	if (res.data?.access && res.data?.refresh) {
			// 		login(res.data.access, res.data.refresh);
			// 	}
			// });
		} catch (e) {
			setError('result', { message: '사용자 정보가 일치하지 않습니다.' });
		}
	};

	return (
		<>
			<h1>학교 관리자 회원가입</h1>
			<FormBox>
				<form onSubmit={handleSubmit(onValidSubmit)}>
					{resultError}
					<FormInput htmlFor='id'>
						<span>ㄹㄹ</span>
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
									value: /^[a-z]{2,5}\d{5,}$/,
									message: '잘못된 아이디 형식입니다.',
								},
							})}
							type='text'
							placeholder='ID'
							onInput={clearLoginError}
						/>
					</FormInput>
					{idError}
					<FormInput htmlFor='password'>
						<div>ㅇㅇㅇ</div>
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
							onInput={clearLoginError}
						/>
					</FormInput>
					{pwError}
					<FormBtn value='로그인' disabled={!isValid} />
				</form>
			</FormBox>
		</>
	);
}

export default Signup;
