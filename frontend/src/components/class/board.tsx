import { useState } from 'react';

function Board() {
	const [게시글] = useState([
		{
			subject: '수학',
			title: '수학 익힘책 19-20 페이지',
			content: '친구들 ^^ 수학 익힘책 풀어오세요~ ',
			author: '나담임',
			deadline: '2021.1.9',
			link: '',
		},
		{
			subject: '과학',
			title: '식초에 달걀 담그기 실험',
			content:
				'과학책 10 페이지 참고해서 식초에 달걀 담그기 실험을 해보세요~ 보호자와 함께 하는 거 알죠??',
			author: '사이언',
			deadline: '2021.1.15',
			link: '',
		},
	]);

	return <div>board</div>;
}

export default Board;
