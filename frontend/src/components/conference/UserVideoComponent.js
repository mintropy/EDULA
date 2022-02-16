import styled from 'styled-components';
import OpenViduVideoComponent from './OvVideo';

function UserVideoComponent({ streamManager }) {
	const getNicknameTag = () =>
		JSON.parse(streamManager.stream.connection.data).clientData;

	return (
		<div>
			{streamManager !== undefined ? (
				<div>
					<OpenViduVideoComponent streamManager={streamManager} />
					<div>
						<p>{getNicknameTag()}</p>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default UserVideoComponent;
