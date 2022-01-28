import { useContext, useEffect, useState } from 'react';
import { BiPhone } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { VscMail } from 'react-icons/vsc';
import { FaUserEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
	apiGetAdminInfo,
	apiGetStudentInfo,
	apiGetTeacherInfo,
	apiGetUserStatus,
} from '../api/user';
import UserContext from '../context/user';

const UserContainer = styled.div`
	display: flex;
	margin: 50px;
`;

const UserInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const UserProfileContainer = styled.div`
	height: 200px;
	width: 200px;
	background-color: white;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		height: 100%;
		width: 100%;
		border-radius: 50%;
	}
`;

const UserDataContainer = styled.div`
	div {
		margin-top: 15px;
		display: flex;
		align-items: center;
		padding: 5px;
	}

	svg {
		margin: 0 0.5rem;
	}

	.edit {
		background-color: inherit;
		border: 1px solid black;
		border-radius: 3px;
		margin-top: 20px;
		text-align: center;
		width: 100%;
		padding: 3px;

		&:hover {
			cursor: pointer;
			box-shadow: 0px 0px 3px black;
		}

		&:active {
			box-shadow: 0px 0px 5px black;
		}
	}

	.name {
		font-size: 3rem;
		font-weight: 600;
	}
`;

const ScheduleContainer = styled.div`
	margin-left: 50px;
	width: 600px;
	min-height: 300px;
	background-color: white;
	padding: 20px;
	border-radius: 3px;
`;

interface UserDataType {
	user: {
		id: number;
		firstName: string;
		status: string;
		username: string;
		email: string;
		phone: string;
	};
	classroom: {
		id: number;
		classGrade: string;
		classNum: string;
	};
	school: {
		id: number;
		name: string;
	};
	guardianNumber?: string;
}

function Profile() {
	const { userId: loggedInUserId } = useContext(UserContext);
	const { userId } = useParams();
	const [userStat, setUserStat] = useState('');
	const [userData, setUserData] = useState({
		user: {},
		classroom: {},
		school: {},
	} as UserDataType);

	useEffect(() => {
		apiGetUserStatus(userId || '').then(res => {
			setUserStat(res.data.status);
		});
	}, []);

	useEffect(() => {
		switch (userStat) {
			case 'ST':
				apiGetStudentInfo(userId || '').then(res => {
					setUserData(res.data);
				});
				break;
			case 'TE':
				apiGetTeacherInfo(userId || '').then(res => {
					setUserData(res.data);
				});
				break;
			case 'SA':
				apiGetAdminInfo(userId || '').then(res => {
					setUserData(res.data);
				});
				break;
			default:
				break;
		}
	}, [userStat]);

	const editBtn =
		loggedInUserId.toString() === userId ? (
			<button className='edit' type='button'>
				<FaUserEdit />
				정보 수정
			</button>
		) : null;

	return (
		<UserContainer>
			<UserInfoContainer>
				<UserProfileContainer>
					<img
						src='https://phinf.pstatic.net/contact/20201125_191/1606304847351yz0f4_JPEG/KakaoTalk_20201007_183735541.jpg?type=f130_130'
						alt=''
					/>
				</UserProfileContainer>
				<UserDataContainer>
					<div className='name'>{userData?.user?.firstName}</div>
					<div className='class'>
						<FiUser />
						{userData?.school?.name}
						{userData?.classroom &&
							` ${userData?.classroom?.classGrade}학년 ${userData?.classroom?.classNum}반`}
					</div>
					<div className='email'>
						<VscMail />
						{userData?.user?.email}
					</div>
					<div className='phone'>
						<BiPhone />
						{userData?.user?.phone}
					</div>
					{editBtn}
				</UserDataContainer>
			</UserInfoContainer>
			<ScheduleContainer>
				<span>오늘의 일정</span>
			</ScheduleContainer>
		</UserContainer>
	);
}

export default Profile;
