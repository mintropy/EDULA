import { BiPhone } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';
import { VscMail } from 'react-icons/vsc';
import { FaUserEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
// import {
// 	apiGetAdminInfo,
// 	apiGetStudentInfo,
// 	apiGetTeacherInfo,
// } from '../api/user';

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
		border: none;
		border-radius: 3px;

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
`;

function Profile() {
	const { userId } = useParams();
	// let userStat = '';

	// switch (userStat) {
	// 	case 'ST':
	// 		apiGetStudentInfo(userId || '').then(res => console.log(res));
	// 		break;
	// 	case 'TE':
	// 		apiGetTeacherInfo(userId || '').then(res => console.log(res));
	// 		break;
	// 	case 'SA':
	// 		apiGetAdminInfo(userId || '').then(res => console.log(res));
	// 		break;
	// 	default:
	// 		console.log('user not found');
	// }

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
					<div className='name'>김싸피 {userId}</div>
					<div className='class'>
						<FiUser />
						3학년 2반 7번
					</div>
					<div className='email'>
						<VscMail />
						999999@gugugugu.gu.gu
					</div>
					<div className='phone'>
						<BiPhone />
						999-9999-9999
					</div>
					<div className='edit'>
						<FaUserEdit />
						정보 수정
					</div>
				</UserDataContainer>
			</UserInfoContainer>
			<ScheduleContainer>Schedule</ScheduleContainer>
		</UserContainer>
	);
}

export default Profile;
