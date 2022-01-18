import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillBell } from 'react-icons/ai';
import styled, { css } from 'styled-components';
import theme from '../styles/theme';

interface InnerAlarm {
	alarmCnt: string;
}

const StyledAlarmBtn = styled.span<InnerAlarm>`
	width: 50px;
	height: inherit;
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	${props =>
		props.alarmCnt !== '0' &&
		css`
			color: yellow;
			::after {
				content: '${props.alarmCnt}';
				min-width: 20px;
				height: 20px;
				background-color: ${theme.base.pointColor};
				font-family: monospace;
				font-weight: bolt;
				font-size: 14px;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				position: absolute;
				top: 5px;
				right: 5px;
				transition: 0.3s;
				opacity: 0;
				transform: scale(0.5);
				will-change: opacity, transform;
				opacity: 1;
				transform: scale(1);
			}
		`}
`;

const StyledSpan = styled.span`
	display: flex;
`;

function Alarm() {
	const [alarmCnt, setAlarmCnt] = useState(0);
	function addAlarm() {
		setAlarmCnt(cnt => cnt + 1);
	}

	return (
		<StyledSpan>
			<button onClick={addAlarm} type='button'>
				test
			</button>
			<Link to='/alarm'>
				<StyledAlarmBtn alarmCnt={alarmCnt > 9 ? '9+' : alarmCnt.toString()}>
					<AiFillBell />
				</StyledAlarmBtn>
			</Link>
		</StyledSpan>
	);
}

export default Alarm;
