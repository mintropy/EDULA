import { useContext, useEffect, useState } from 'react';
import { apiGetClassrooms } from '../../api/classroom';
import Table from '../../components/table/Table';
import Tbody from '../../components/table/Tbody';
import Tel from '../../components/table/Tel';
import UserContext from '../../context/user';

interface Classroom {
	id: number;
	classGrade: number;
	classNum: number;
	school: number;
}

function ClassManager() {
	const { schoolId } = useContext(UserContext);
	const [classrooms, setClassrooms] = useState([] as Classroom[]);

	useEffect(() => {
		if (schoolId) {
			apiGetClassrooms(schoolId).then(res => {
				setClassrooms(res.data);
			});
		}
	}, [schoolId]);

	return (
		<Table>
			<Tbody>
				<Tel value='학년' />
				<Tel value='반' />
			</Tbody>
			{classrooms.map(e => (
				<Tbody key={e.id}>
					<Tel value={e.classGrade} />
					<Tel value={e.classNum} />
				</Tbody>
			))}
		</Table>
	);
}

export default ClassManager;
