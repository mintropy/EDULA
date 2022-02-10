import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import StyledTitle from '../class/StyledTitle';
import { apigetSearchFriend } from '../../api/friend';
import StyledDiv from './StyledDiv';
import StyledContainer from './StyledContainer';

interface SearchDataType {
	studentCount: number;
	teacherCount: number;
	students: {
		id: number;
		username: string;
		firstName: string;
	}[];
	teachers: {
		id: number;
		username: string;
		firstName: string;
	}[];
}

function FriendSearch() {
	const [searchResult, setSearchResult] = useState({} as SearchDataType);
	const [keyword, setKeyword] = useState('');

	const inputRef: React.RefObject<HTMLInputElement> = React.createRef();

	const getData = (event: React.FormEvent<EventTarget>) => {
		event.preventDefault();
		if (inputRef.current) {
			setKeyword(inputRef.current.value);
			inputRef.current.value = '';
		}
	};

	const getSearchResult = () => {
		apigetSearchFriend(keyword).then(res => {
			setSearchResult(res.data);
		});
	};

	useEffect(() => {
		if (keyword) {
			getSearchResult();
		}
	}, [keyword]);

	return (
		<div>
			<StyledContainer>
				<StyledTitle>친구 검색</StyledTitle>
				<input type='text' ref={inputRef} placeholder='친구 이름을 써보세요' />
				<button type='button' onClick={getData}>
					검색
				</button>

				{searchResult.students &&
					searchResult.students.map(request => (
						<StyledDiv key={request.id}>
							{request.username} : {request.firstName}
						</StyledDiv>
					))}
			</StyledContainer>
		</div>
	);
}

export default FriendSearch;
