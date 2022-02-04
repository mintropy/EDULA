import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import FormBtn from '../auth/FormBtn';
import FormInput from '../auth/FormInput';
import { apiPostHomework, apiUpdateHomework } from '../../api/homework';

type ArticleInput = {
	title: string;
	content: string;
	deadline: string;
};

interface InnerProps {
	type: string;
	originTitle: string;
	originContent: string;
	originDeadline: string;
}

function Form(props: InnerProps) {
	const { articleId } = useParams();
	const { type, originTitle, originContent, originDeadline } = props;
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
	} = useForm<ArticleInput>({
		mode: 'all',
	});

	const navigate = useNavigate();

	const onValidCreate: SubmitHandler<ArticleInput> = async () => {
		const { title, content, deadline } = getValues();

		try {
			await apiPostHomework(1, title, content, deadline)
				.then(() => {})
				.catch(() => {
					// console.log(err);
				});
			// 해당 클래스 숫자!!
			navigate(`/class/1`);
		} catch (error) {
			// console.log(error);
		}
	};

	const onValidUpdate: SubmitHandler<ArticleInput> = async () => {
		const { title, content, deadline } = getValues();

		if (articleId) {
			try {
				await apiUpdateHomework(
					1,
					parseInt(articleId, 10),
					title,
					content,
					deadline
				)
					.then(() => {})
					.catch(() => {
						// console.log(err);
					});
				navigate(`/article/${articleId}`);
			} catch (error) {
				// console.log(error);
			}
		}
	};

	const onInValidSubmit: SubmitErrorHandler<ArticleInput> = () => {
		// error handling
	};

	return (
		<form
			onSubmit={handleSubmit(
				type === 'update' ? onValidUpdate : onValidCreate,
				onInValidSubmit
			)}
		>
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
					defaultValue={originTitle}
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
					defaultValue={originContent}
				/>
			</FormInput>
			<FormInput htmlFor='deadline'>
				<div>마감일</div>
				<input
					{...register('deadline', {
						required: '마감일을 정하세요.',
					})}
					type='datetime-local'
					placeholder='deadline'
					defaultValue={originDeadline}
				/>
			</FormInput>
			{type === 'new' && <FormBtn value='글쓰기' disabled={!isValid} />}
			{type === 'update' && <FormBtn value='수정하기' disabled={!isValid} />}
		</form>
	);
}

export default Form;
