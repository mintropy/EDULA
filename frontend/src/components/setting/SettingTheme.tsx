import React from 'react';
import styled from 'styled-components';

function SettingTheme() {
	const StyledTitle = styled.h3`
		font-size: 1.5em;
		text-align: center;
		margin: 1em 1em;
	`;
	const StyledContainer = styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
	`;
	const StyledSelect = styled.select`
		width: 150px;
		height: 35px;
		padding: 5px 30px 5px 10px;
		border-radius: 4px;
		outline: 0 none;
		background: ${props => props.theme.mainBlue};
		color: ${props => props.theme.bgColor};
		font-size: 16px;
	`;
	const StyledOption = styled.option`
		background: ${props => props.theme.mainBlue};
		color: ${props => props.theme.bgColor};
		padding: 3px 0;

		:hover {
			background: ${props => props.theme.fontColor};
		}
	`;
	return (
		<StyledContainer>
			<StyledTitle>테마 :</StyledTitle>
			<StyledSelect>
				<StyledOption>Select Type</StyledOption>
				<StyledOption value='base'>밝은 테마</StyledOption>
				<StyledOption value='dark'>어두운 테마</StyledOption>
				<StyledOption value='colorful'>알록달록</StyledOption>
			</StyledSelect>
		</StyledContainer>
	);
}

export default SettingTheme;
