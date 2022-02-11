import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import HomeworkSubmitForm from '../components/class/HomeworkSubmitForm';
import UserContext from '../context/user';
import { apiGetHomeworkSubmission } from '../api/homework';
import StyledTitle from '../components/class/StyledTitle';
import StyledContainer from '../components/friend/StyledContainer';

const StyledListItem = styled.li`
	font-size: 1em;
	text-align: center;
	margin: 1em;
	background: ${props => props.theme.bgColor};
	padding: 1em 2em 1em 2em;
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

const StyledLink = styled(Link)`
	text-decoration: none;
	font-size: 1em;
	color: ${props => props.theme.fontColor};
`;

function HomeworkSubmit() {
	const { userStat } = useContext(UserContext);
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
				<StyledTitle>과제 제출</StyledTitle>

				{isSubmit === true ? <h1>과제 제출함!</h1> : <h1>과제 제출 안함!</h1>}
				<HomeworkSubmitForm isSubmit={isSubmit} />
			</>
		);
	}
	return (
		<StyledContainer>
			<StyledTitle>과제 제출 현황</StyledTitle>
			<ul>
				{submissionList &&
					submissionList?.map(submission => (
						<StyledLink
							to={`/${lectureId}/homework/${homeworkId}/submit/${submission.id}`}
						>
							<StyledListItem key={submission.id}>
								{submission.writer}번 학생
							</StyledListItem>
						</StyledLink>
					))}
			</ul>
		</StyledContainer>
	);
}

export default HomeworkSubmit;
