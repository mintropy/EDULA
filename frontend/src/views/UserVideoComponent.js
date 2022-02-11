import OpenViduVideoComponent from './OvVideo';
// import './UserVideo.css';

function UserVideoComponent({ streamManager }) {
	const getNicknameTag = () =>
		JSON.parse(streamManager.stream.connection.data).clientData;

	return (
		<div>
			{streamManager !== undefined ? (
				<div className='streamcomponent'>
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
