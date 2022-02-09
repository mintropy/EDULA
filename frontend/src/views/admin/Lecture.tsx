import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetLectures } from '../../api/lecture';
import Table from '../../components/table/Table';
import Tbody from '../../components/table/Tbody';
import Tel from '../../components/table/Tel';
import routes from '../../routes';

const SLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`;

type TimeList = {
	additionalProp1: string;
	additionalProp2: string;
	additionalProp3: string;
};

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
	timeList: Array<TimeList>;
}

function LectureManager() {
	const [lectures, setLectures] = useState([] as Lecture[]);

	useEffect(() => {
		apiGetLectures().then(res => {
			setLectures(res.data);
		});
	}, []);

	return (
		<Table>
			<Tbody>
				<Tel value='이름' />
				<Tel value='담당 교사' />
				<Tel value='시간' />
			</Tbody>
			{lectures.map(e => (
				<Tbody key={e.id}>
					<SLink to={`/lecture/${e.id}`}>
						<Tel value={e.name} />
					</SLink>
					<SLink to={`${routes.profile}/${e.teacher?.user?.id}`}>
						<Tel value={e.teacher?.user?.firstName} />
					</SLink>
					<Tel value={e.timeList.map(el => el?.additionalProp1).join(' ')} />
				</Tbody>
			))}
		</Table>
	);
}

export default LectureManager;
