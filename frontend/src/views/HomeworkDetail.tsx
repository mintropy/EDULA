import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StyledTitle from '../components/class/StyledTitle';
import StyledContent from '../components/class/StyledContent';
import StyledButton from '../components/class/StyledButton';
import { apiDeleteHomework, apiGetHomeworkDetail } from '../api/homework';
import UserContext from '../context/user';

const StyledContainer = styled.div`
	font-size: 1em;
	text-align: center;
	margin: 1em;
	background: ${props => props.theme.subBgColor};
	color: ${props => props.theme.fontColor};
	padding: 1em 1em 1em 2em;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.125);
	border-radius: 10px;
`;

interface HomeworkDataType {
	content: string;
	createdAt: string;
	deadline: string;
	id: number;
	lecture: number;
	title: string;
	writer: number;
}

function HomeworkDetail() {
	const { userStat } = useContext(UserContext);
	const { lectureId, homeworkId } = useParams();
	const navigate = useNavigate();

	const [homeworkData, setHomeworkData] = useState({} as HomeworkDataType);

	if (homeworkId && lectureId) {
		useEffect(() => {
			apiGetHomeworkDetail(lectureId, homeworkId).then(res => {
				setHomeworkData(res.data);
			});
		}, []);
	}

	// 글쓴이 본인인지 확인해서 삭제, 수정 버튼 보이도록. 삭제 함수 따로 위로 빼기

	return (
		<StyledContainer>
			<StyledTitle>{homeworkData.title}</StyledTitle>
			<StyledContent>마감 기한: {homeworkData.deadline}</StyledContent>
			<StyledContent>{homeworkData.content}</StyledContent>
			{userStat === 'TE' && (
				<div>
					<Link to={`/${lectureId}/homeworkUpdate/${homeworkId}`}>
						<StyledButton>수정</StyledButton>
					</Link>
					<input
						type='button'
						value='삭제'
						onClick={e => {
							e.preventDefault();
							if (lectureId && homeworkId) {
								try {
									apiDeleteHomework(lectureId, homeworkId)
										.then(() => {})
										.catch(() => {});

									navigate(`/lecture/${lectureId}`);
								} catch (error) {
									// console.log(error);
								}
							}
						}}
					/>
				</div>
			)}
			<Link to={`/${lectureId}/homework/${homeworkId}/submit`}>
				<StyledButton>과제 제출</StyledButton>
			</Link>
		</StyledContainer>
	);
}

export default HomeworkDetail;
