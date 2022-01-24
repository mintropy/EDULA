import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormBtn from '../auth/FormBtn';
import FormInput from '../auth/FormInput';
import routes from '../../routes';

type ArticleInput = {
	title: string;
	content: string;
};

function Form() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
	} = useForm<ArticleInput>({
		mode: 'all',
	});

	const navigate = useNavigate();

	const onValidSubmit: SubmitHandler<ArticleInput> = async () => {
		// 글쓰기 로직
		const { title, content } = getValues();
		try {
			// console.log(title, content)
			navigate(routes.main);
		} catch (error) {
			// console.log(error);
		}
	};

	const onInValidSubmit: SubmitErrorHandler<ArticleInput> = () => {
		// error handling
	};

	return (
		<form onSubmit={handleSubmit(onValidSubmit, onInValidSubmit)}>
			<FormInput htmlFor='title'>
				<div>제목</div>
				<input
					{...register('title', {
						required: '제목을 입력하세요',
						minLength: {
							value: 1,
							message: '제목은 한 글자 이상 입력해주세요.',
						},
						maxLength: {
							value: 100,
							message: '제목은 백 글자 이하로 입력해주세요.',
						},
					})}
					type='text'
					placeholder='Title'
				/>
			</FormInput>

			<FormInput htmlFor='content'>
				<div>내용</div>
				<input
					{...register('content', {
						required: '내용을 입력하세요.',
						minLength: {
							value: 1,
							message: '내용은 1글자 이상 1000글자 이하입니다.',
						},
						maxLength: {
							value: 500,
							message: '내용은 1글자 이상 500글자 이하입니다.',
						},
					})}
					type='text'
					placeholder='Content'
				/>
			</FormInput>
			<FormBtn value='글쓰기' disabled={!isValid} />
		</form>
	);
}

export default Form;
