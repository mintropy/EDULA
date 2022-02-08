import { useContext, useState, useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import HomeworkSubmitForm from '../components/class/HomeworkSubmitForm';
import UserContext from '../context/user';
import { apiGetHomeworkSubmission } from '../api/homework';

function HomeworkSubmit() {
	const { userId } = useContext(UserContext);
	const { lectureId, homeworkId } = useParams();
	const [isSubmit, setIsSubmit] = useState(false);

	if (lectureId && homeworkId) {
		useEffect(() => {
			apiGetHomeworkSubmission(lectureId, homeworkId)
				.then(res => {
					if (res.status === 204) {
						setIsSubmit(false);
					} else {
						setIsSubmit(true);
					}
				})
				.catch(() => {});
		}, []);
	}

	return (
		<>
			<div>과제 제출</div>
			{isSubmit === true ? <h1>과제 제출함!</h1> : <h1>과제 제출 안함!</h1>}
			<HomeworkSubmitForm isSubmit={isSubmit} />
		</>
	);
}

export default HomeworkSubmit;
