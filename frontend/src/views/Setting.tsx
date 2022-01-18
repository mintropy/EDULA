import styled from 'styled-components';

function Setting() {
	const StyledTitle = styled.h1`
		font-size: 2em;
		text-align: center;
		margin: 1em 0;
	`;

	const StyledContainer = styled.div`
		text-align: center;
	`;
	const StyledSelect = styled.select`
		width: 150px;
		height: 35px;
		padding: 5px 30px 5px 10px;
		border-radius: 4px;
		outline: 0 none;
		background: lightcoral;
		color: #fff;
		font-size: 16px;
	`;
	const StyledOption = styled.option`
		background: lightcoral;
		color: #fff;
		padding: 3px 0;

		:hover {
			background: rgb(58, 58, 58);
		}
	`;
	return (
		<>
			<StyledTitle>설정</StyledTitle>
			<StyledContainer>
				<StyledSelect>
					<StyledOption>Select Type</StyledOption>
					<StyledOption value='light'>Light</StyledOption>
					<StyledOption value='dark'>Dark</StyledOption>
					<StyledOption value='colorful'>Colorful</StyledOption>
				</StyledSelect>
			</StyledContainer>
		</>
	);
}

export default Setting;
