import React from 'react';
import styled from 'styled-components';

function SettingTheme() {
	const StyledContainer = styled.div`
		text-align: center;
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
			<StyledSelect>
				<StyledOption>Select Type</StyledOption>
				<StyledOption value='base'>Base</StyledOption>
				<StyledOption value='dark'>Dark</StyledOption>
				<StyledOption value='colorful'>Colorful</StyledOption>
			</StyledSelect>
		</StyledContainer>
	);
}

export default SettingTheme;
