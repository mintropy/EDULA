import styled from 'styled-components';
import SettingTheme from '../components/setting/SettingTheme';

function Setting() {
	const StyledTitle = styled.h1`
		font-size: 2em;
		text-align: center;
		margin: 1em 0;
	`;

	return (
		<>
			<StyledTitle>설정</StyledTitle>
			<SettingTheme />
		</>
	);
}

export default Setting;
