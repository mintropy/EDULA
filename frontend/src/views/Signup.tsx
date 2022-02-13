import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/user';
import routes from '../routes';
import ErrorMsg from '../components/auth/ErrorMsg';
import FormBox from '../components/auth/FormBox';
import FormBtn from '../components/auth/FormBtn';
import FormInput from '../components/auth/FormInput';
import EmptyMsg from '../components/auth/EmptyMsg';
import StyledTitle from '../components/class/StyledTitle';
import StyledContent from '../components/class/StyledContent';

const StyledContainer = styled.div`
	margin: 2em;
`;

type SignupInput = {
	result: string;
	password: string;
	passwordConfirmation: string;
	abbreviation: string;
};
function Signup() {
	const { isLoggedIn } = useContext(UserContext);
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

	// const idError = errors.id?.message ? (
	// 	<ErrorMsg message={errors.id?.message} />
	// ) : (
	// 	<EmptyMsg />
	// );
	const pwError = errors.password?.message ? (
		<ErrorMsg message={errors.password?.message} />
	) : (
		<EmptyMsg />
	);
	const pwConfirmationError = errors.passwordConfirmation?.message ? (
		<ErrorMsg message={errors.passwordConfirmation?.message} />
	) : (
		<EmptyMsg />
	);
	const schoolAbbError = errors.abbreviation?.message ? (
		<ErrorMsg message={errors.abbreviation?.message} />
	) : (
		<EmptyMsg />
	);

	const onValidSubmit: SubmitHandler<SignupInput> = async () => {
		const { password, passwordConfirmation, abbreviation } = getValues();
		try {
			// 학교 관리자 회원 가입 api
		} catch (e) {
			setError('result', { message: '정보를 잘못 입력했어요.' });
		}
	};
	return (
		<StyledContainer>
			<StyledTitle> Edula 학교 관리자 회원가입</StyledTitle>
			<StyledContent>
				Edula 서비스는 학교 관리자만 회원 가입을 하면 됩니다 !
			</StyledContent>
			<StyledContent>
				교사와 학생 계정은 학교 관리자를 통해서 생성합니다.
			</StyledContent>
			<StyledContent>
				테스트 버전으로는 계정 10개를 생성할 수 있습니다. (유료 버전으로 등급에
				따라서 계정 생성 수를 다르게 제공할 예정입니다.)
			</StyledContent>

			<FormBox>
				<form onSubmit={handleSubmit(onValidSubmit)}>
					{resultError}
					<FormInput htmlFor='abbreviation'>
						<span>학교 코드</span>
						<input
							{...register('abbreviation', {
								required: '학교 코드를 입력하세요.',
								minLength: {
									value: 3,
									message:
										'학교 코드는 영어 문자 3글자입니다. 대소문자 모두 가능하고, 대소문자를 구분합니다.',
								},
								maxLength: {
									value: 3,
									message:
										'학교 코드는 영어 문자 3글자입니다. 대소문자 모두 가능하고, 대소문자를 구분합니다.',
								},
								pattern: {
									value: /[a-zA-Z]{3}/,
									message:
										'학교 코드는 영어 문자 3글자입니다. 대소문자 모두 가능하고, 대소문자를 구분합니다.',
								},
							})}
							type='text'
							placeholder='학교 코드(영문자 3글자)를 입력하세요.'
							onInput={clearLoginError}
						/>
					</FormInput>
					{schoolAbbError}
					{/* <FormInput htmlFor='id'>
						<span>아이디</span>
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
									value: /^[a-zA-Z]{3,5}\d{5,}$/,
									message: '잘못된 아이디 형식입니다.',
								},
							})}
							type='text'
							placeholder='아이디를 입력하세요.'
							onInput={clearLoginError}
						/>
					</FormInput>
					{idError} */}
					<FormInput htmlFor='password'>
						<div>비밀번호</div>
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
							placeholder='비밀 번호를 입력하세요. (8~16자)'
							onInput={clearLoginError}
						/>
					</FormInput>
					{pwError}
					<FormInput htmlFor='passwordConfirmation'>
						<div>비밀번호 확인</div>
						<input
							{...register('passwordConfirmation', {
								required: 'passwordConfirmation.',
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
							placeholder='비밀 번호를 다시 한번 입력하세요.'
							onInput={clearLoginError}
						/>
					</FormInput>
					{pwConfirmationError}
					<FormBtn value='회원 가입' disabled={!isValid} />
				</form>
			</FormBox>
		</StyledContainer>
	);
}

export default Signup;
