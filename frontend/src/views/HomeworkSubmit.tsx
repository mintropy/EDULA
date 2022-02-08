import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import HomeworkSubmitForm from '../components/class/HomeworkSubmitForm';
import UserContext from '../context/user';
import { apiGetHomeworkSubmission } from '../api/homework';

const StyledListItem = styled.li`
	font-size: 1em;
	text-align: center;
	margin: 1em;
	background: ${props => props.theme.subBgColor};
	padding: 1em 1em 1em 2em;
	border-left: 4px solid #ddd;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.125);
	border-radius: 10px;
`;

interface submissionHomeworkData {
	id: number;
	title: string;
	content: string;
	createAt: string;
	homework: number;
	writer: number;
}

function HomeworkSubmit() {
	const { userId, userStat } = useContext(UserContext);
	const { lectureId, homeworkId } = useParams();
	const [submissionList, setSubmissionList] = useState(
		[] as submissionHomeworkData[]
	);
	const [isSubmit, setIsSubmit] = useState(false);

	if (lectureId && homeworkId) {
		useEffect(() => {
			if (userStat === 'ST') {
				apiGetHomeworkSubmission(lectureId, homeworkId)
					.then(res => {
						if (res.status === 204) {
							setIsSubmit(false);
						} else {
							setIsSubmit(true);
						}
					})
					.catch(() => {});
			} else {
				apiGetHomeworkSubmission(lectureId, homeworkId)
					.then(res => {
						setSubmissionList(res.data);
					})
					.catch(() => {});
			}
		}, []);
	}

	if (userStat === 'ST') {
		return (
			<>
				<div>과제 제출</div>

				{isSubmit === true ? <h1>과제 제출함!</h1> : <h1>과제 제출 안함!</h1>}
				<HomeworkSubmitForm isSubmit={isSubmit} />
			</>
		);
	}
	return (
		<>
			<div>과제 제출 현황</div>
			<ul>
				{submissionList &&
					submissionList?.map(submission => (
						<StyledListItem>
							{submission.writer}: {submission.title}
						</StyledListItem>
					))}
			</ul>
		</>
	);
}

export default HomeworkSubmit;
