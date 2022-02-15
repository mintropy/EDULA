import { useContext, useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import {
	apiGetHomeworkSubmissionDetail,
	apiPostHomeworkSubmission,
} from '../../api/homework';
import UserContext from '../../context/user';
import FormBtn from '../auth/FormBtn';
import FormInput from '../auth/FormInput';

interface HomeworkData {
	title: string;
	content: string;
	file: File[];
	homework: string;
	writer: string;
}

interface Props {
	isSubmit: boolean;
}
function HomeworkSubmitForm({ isSubmit }: Props) {
	const { userId } = useContext(UserContext);
	const { lectureId, homeworkId } = useParams();
	const [data, setData] = useState({} as HomeworkData);
	const {
		register,
		handleSubmit,
		formState: { isValid },
		getValues,
	} = useForm<HomeworkData>({
		mode: 'all',
	});
	const navigate = useNavigate();

	const onValidCreate: SubmitHandler<HomeworkData> = async () => {
		const { title, content, file } = getValues();

		if (lectureId && homeworkId) {
			console.log(file);
			const formData = new FormData();

			formData.append('files', file[0]);
			formData.append('enctype', 'multipart/form-data');
			try {
				await apiPostHomeworkSubmission(
					lectureId,
					homeworkId,
					title,
					content,
					// formData,
					file[0],
					userId
				)
					.then(() => {})
					.catch(() => {});
				navigate(`/lecture/${lectureId}`);
			} catch (error) {
				// console.log(error);
			}
			console.log(formData);
		}
	};

	const onInValidSubmit: SubmitErrorHandler<HomeworkData> = () => {
		// error handling
	};

	if (lectureId && homeworkId) {
		useEffect(() => {
			apiGetHomeworkSubmissionDetail(lectureId, homeworkId, userId)
				.then(res => {
					setData(res.data);
				})
				.catch(() => {});
		}, []);
	}
	if (isSubmit) {
		if (data) {
			return (
				<form onSubmit={handleSubmit(onValidCreate, onInValidSubmit)}>
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
							defaultValue={data.title}
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
							defaultValue={data.content}
						/>
					</FormInput>
					<FormInput htmlFor='file'>
						<div>파일</div>
						<input
							{...register('file', {})}
							type='file'
							multiple
							placeholder='file'
						/>
					</FormInput>
					<FormBtn value='과제 제출' disabled={!isValid} />
				</form>
			);
		}
		return <h1>로딩 중!</h1>;
	}
	return (
		<form onSubmit={handleSubmit(onValidCreate, onInValidSubmit)}>
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
			<FormInput htmlFor='file'>
				<div>파일</div>
				<input {...register('file', {})} type='file' multiple placeholder='file' />
			</FormInput>
			<FormBtn value='과제 제출' disabled={!isValid} />
		</form>
	);
}

export default HomeworkSubmitForm;
