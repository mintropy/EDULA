import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
	apiDeleteLectureDetail,
	apiGetLectures,
	apiPostLecture,
	apiPutLectureDetail,
} from '../../api/lecture';
import { apiGetTeacherInfo } from '../../api/user';
import FormBox from '../../components/auth/FormBox';
import FormBtn from '../../components/auth/FormBtn';
import FormInput from '../../components/auth/FormInput';
import Table from '../../components/table/Table';
import Tbody from '../../components/table/Tbody';
import Tel from '../../components/table/Tel';
import UserContext from '../../context/user';
import routes from '../../routes';

const Container = styled.div``;

const SLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

interface User {
	firstName: string;
	id: number;
	status: string;
	username: string;
}

interface Lecture {
	id: number;
	name: string;
	school: number;
	studentList: Array<number>;
	teacher: { user: User };
	timeList: TimeList;
}

type TimeList = {
	count: number;
	lectures: Array<LectureList>;
};

type LectureList = {
	day: string;
	st: string;
	end: string;
};

type LectureInput = {
	name: string;
	timeList: Array<TimeList>;
	teacher: number;
	studentList: Array<number>;
};

function LectureManager() {
	const { schoolId } = useContext(UserContext);
	const [lectures, setLectures] = useState([] as Array<Lecture>);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		setError,
		clearErrors,
	} = useForm<LectureInput>({
		mode: 'onChange',
	});
	const [timeList, setTimeList] = useState({
		count: 0,
		lectures: [],
	} as TimeList);
	const [studentList, setStudentList] = useState([] as Array<number>);

	const getLectures = () => {
		apiGetLectures().then(res => {
			setLectures(res.data);
		});
	};

	const deleteLecture = async (lectureId: string) => {
		await apiDeleteLectureDetail(lectureId);
		getLectures();
	};

	const updateLecture = async (lectureId: string, lecture: object) => {
		await apiPutLectureDetail(lectureId, lecture);
		getLectures();
	};

	useEffect(() => {
		getLectures();
	}, []);

	const onValidSubmit: SubmitHandler<LectureInput> = async () => {
		const { name, teacher: teacherId } = getValues();
		let teacher = 0;
		try {
			await apiGetTeacherInfo(teacherId.toString()).then(
				res => (teacher = res.data.user)
			);
		} catch (e) {
			//
		}
		const lecture = {
			name,
			teacher,
			school: schoolId,
			timeList,
			studentList,
		};
		try {
			await apiPostLecture(lecture).then(res => console.log(res.data));
			getLectures();
		} catch (e) {
			//
		}
	};

	const addTime = () => {
		const day = (document.getElementById('day') as HTMLInputElement).value;
		const st = (document.getElementById('start') as HTMLInputElement).value;
		const end = (document.getElementById('end') as HTMLInputElement).value;

		const newTime: LectureList = {
			day,
			st,
			end,
		};

		const newTimeList: TimeList = {
			count: timeList.lectures.length + 1,
			lectures: [...timeList.lectures, newTime],
		};

		setTimeList(newTimeList as TimeList);
	};

	const removeTime = (idx: number) => {
		const newTimeList: TimeList = {
			count: timeList.lectures.length - 1,
			lectures: timeList.lectures.filter((_, i) => i !== idx),
		};
		setTimeList(newTimeList);
	};

	const addStudent = () => {
		const newStudent = parseInt(
			(document.getElementById('student') as HTMLInputElement).value,
			10
		);
		if (studentList.indexOf(newStudent) === -1) {
			setStudentList(studentList.concat([newStudent]));
		}
	};

	const removeStudent = (idx: number) => {
		setStudentList(studentList.filter((_, i) => i !== idx));
	};

	useEffect(() => {
		console.log(timeList);
	}, [timeList]);

	useEffect(() => {
		console.log(studentList);
	}, [studentList]);

	return (
		<Container>
			<FormBox>
				<form onSubmit={handleSubmit(onValidSubmit)}>
					<FormInput htmlFor='name'>
						<input {...register('name')} placeholder='수업 이름' />
					</FormInput>
					<FormInput htmlFor='teacher'>
						<input {...register('teacher')} placeholder='교사 pk' />
					</FormInput>
					{timeList.lectures.map((e, idx) => (
						<div key={e.day + e.st + e.end}>
							<span>{e.day}</span>
							<span>{e.st}</span>
							<span>{e.end}</span>
							<button type='button' onClick={() => removeTime(idx)}>
								x
							</button>
						</div>
					))}
					<div>
						시간표
						<input type='text' id='day' placeholder='요일' />
						<input type='text' id='start' placeholder='시작 시간' />
						<input type='text' id='end' placeholder='종료 시간' />
						<button type='button' onClick={() => addTime()}>
							추가
						</button>
					</div>
					{studentList.map((e, idx) => (
						<div id={`${e}`} key={e}>
							<span>{e}</span>
							<button type='button' onClick={() => removeStudent(idx)}>
								x
							</button>
						</div>
					))}
					<div>
						학생
						<input type='text' id='student' placeholder='학생 PK' />
						<button type='button' onClick={() => addStudent()}>
							추가
						</button>
					</div>
					<FormBtn value='생성' disabled={!isValid} />
				</form>
			</FormBox>
			<Table>
				<Tbody>
					<Tel value='이름' />
					<Tel value='담당 교사' />
					<Tel value='시간' />
				</Tbody>
				{lectures.map((e: Lecture) => (
					<Tbody key={e.id}>
						<SLink to={`/lecture/${e.id}`}>
							<Tel value={e.name} />
						</SLink>
						<SLink to={`${routes.profile}/${e.teacher?.user?.id}`}>
							<Tel value={e.teacher?.user?.firstName} />
						</SLink>
						<Tel value={e?.timeList.lectures.map(el => el.day).join(' ')} />
						<button type='button' onClick={() => deleteLecture(e.id.toString())}>
							x
						</button>
					</Tbody>
				))}
			</Table>
		</Container>
	);
}

export default LectureManager;
