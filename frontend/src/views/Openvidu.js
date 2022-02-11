import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import { useState, useEffect, useLayoutEffect } from 'react';
import UserVideoComponent from './UserVideoComponent';

const OPENVIDU_SERVER_URL = `https://${window.location.hostname}:${process.env.REACT_APP_OPENVIDU_PORT}`;
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

function App() {
	const [mySessionId, setMySessionId] = useState('SessionA');
	const [myUserName, setMyUserName] = useState(
		`Participant${Math.floor(Math.random() * 100)}`
	);
	const [session, setSession] = useState(undefined);
	const [mainStreamManager, setMainStreamManager] = useState(undefined);
	const [publisher, setPublisher] = useState(undefined);
	const [subscribers, setSubscribers] = useState([]);
	const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
	const [OV, setOV] = useState(null);

	useEffect(() => {
		window.addEventListener('beforeunload', onbeforeunload);
		return window.removeEventListener('beforeunload', onbeforeunload);
	});

	const handleChangeSessionId = e => {
		setMySessionId(e.target.value);
	};

	const handleChangeUserName = e => {
		setMyUserName(e.target.value);
	};

	const handleMainVideoStream = stream => {
		if (mainStreamManager !== stream) {
			setMainStreamManager(stream);
		}
	};

	const onbeforeunload = () => {
		leaveSession();
	};

	const getToken = () =>
		createSession(mySessionId).then(sessionId => createToken(sessionId));

	const joinSession = () => {
		setOV(new OpenVidu());
	};

	useLayoutEffect(() => {
		if (!OV) {
			return;
		}
		setSession(OV.initSession());
	}, [OV]);

	useEffect(() => {
		if (session) {
			session.on('streamCreated', event => {
				const subscriber = session.subscribe(event.stream, undefined);

				subscribers.push(subscriber);
				setSubscribers(subscribers);
			});

			session.on('streamDestroyed', event => {
				deleteSubscriber(event.stream.streamManager);
			});

			session.on('exception', exception => {
				console.warn(exception);
			});

			getToken()
				.then(token => {
					session.connect(token, { clientData: myUserName }).then(async () => {
						const devices = await OV.getDevices();
						const videoDevices = devices.filter(
							device => device.kind === 'videoinput'
						);

						const newPublisher = OV.initPublisher(undefined, {
							audioSource: undefined, // The source of audio. If undefined default microphone
							videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
							publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
							publishVideo: true, // Whether you want to start publishing with your video enabled or not
							resolution: '640x480', // The resolution of your video
							frameRate: 30, // The frame rate of your video
							insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
							mirror: false, // Whether to mirror your local video or not
						});

						session.publish(newPublisher);

						setCurrentVideoDevice(videoDevices[0]);
						setMainStreamManager(newPublisher);
						setPublisher(newPublisher);
					});
				})
				.catch(error => {
					console.log(
						'There was an error connecting to the session:',
						error.code,
						error.message
					);
				});
		}
	}, [session]);

	const leaveSession = () => {
		console.log(`leaveSession`);
		if (session) {
			session.disconnect();
		}

		// this.OV = null;
		// OV = null;
		setOV(null);
		setSession(undefined);
		setSubscribers([]);
		setMySessionId('SessionA');
		setMyUserName(`Participant${Math.floor(Math.random() * 100)}`);
		setMainStreamManager(undefined);
		setPublisher(undefined);
	};

	const switchCamera = async () => {
		try {
			const devices = await OV.getDevices();
			const videoDevices = devices.filter(device => device.kind === 'videoinput');

			if (videoDevices && videoDevices.length > 1) {
				const newVideoDevice = videoDevices.filter(
					device => device.deviceId !== currentVideoDevice.deviceId
				);

				if (newVideoDevice.length > 0) {
					const newPublisher = OV.initPublisher(undefined, {
						videoSource: newVideoDevice[0].deviceId,
						publishAudio: true,
						publishVideo: true,
						mirror: true,
					});

					await session.unpublish(mainStreamManager);
					await session.publish(newPublisher);
					setCurrentVideoDevice(newVideoDevice);
					setMainStreamManager(newPublisher);
					setPublisher(newPublisher);
				}
			}
		} catch (e) {
			console.error(e);
		}
	};

	const deleteSubscriber = streamManager => {
		const index = subscribers.indexOf(streamManager, 0);
		if (index > -1) {
			subscribers.splice(index, 1);
			setSubscribers(subscribers);
		}
	};

	const createSession = sessionId =>
		new Promise((resolve, reject) => {
			const data = JSON.stringify({ customSessionId: sessionId });
			axios
				.post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
					headers: {
						Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
						'Content-Type': 'application/json',
					},
				})
				.then(response => {
					console.log('CREATE SESION', response);
					resolve(response.data.id);
				})
				.catch(response => {
					const error = { ...response };
					if (error?.response?.status === 409) {
						resolve(sessionId);
					} else {
						console.log(error);
						console.warn(
							`No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}`
						);
						if (
							window.confirm(
								`No connection to OpenVidu Server. This may be a certificate error at "${OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it. ` +
									`If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`
							)
						) {
							window.location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`);
						}
					}
				});
		});

	const createToken = sessionId => {
		const data = {};
		return new Promise((resolve, reject) => {
			axios
				.post(
					`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
					data,
					{
						headers: {
							Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
							'Content-Type': 'application/json',
						},
					}
				)
				.then(response => {
					console.log('TOKEN', response);
					resolve(response.data.token);
				})
				.catch(error => reject(error));
		});
	};

	return (
		<div className='container'>
			{session === undefined ? (
				<div id='join'>
					<div id='img-div'>
						<img
							src='resources/images/openvidu_grey_bg_transp_cropped.png'
							alt='OpenVidu logo'
						/>
					</div>
					<div id='join-dialog' className='jumbotron vertical-center'>
						<h1> Join a video session </h1>
						<form className='form-group' onSubmit={joinSession}>
							<p>
								<label htmlFor='userName'>
									Participant:
									<input
										className='form-control'
										type='text'
										id='userName'
										value={myUserName}
										onChange={handleChangeUserName}
										required
									/>
								</label>
							</p>
							<p>
								<label htmlFor='sessionId'>
									{' '}
									Session:
									<input
										className='form-control'
										type='text'
										id='sessionId'
										value={mySessionId}
										onChange={handleChangeSessionId}
										required
									/>{' '}
								</label>
							</p>
							<p className='text-center'>
								<input
									className='btn btn-lg btn-success'
									name='commit'
									type='submit'
									value='JOIN'
								/>
							</p>
						</form>
					</div>
				</div>
			) : null}

			{session !== undefined ? (
				<div id='session'>
					<div id='session-header'>
						<h1 id='session-title'>{mySessionId}</h1>
						<input
							className='btn btn-large btn-danger'
							type='button'
							id='buttonLeaveSession'
							onClick={leaveSession}
							value='Leave session'
						/>
					</div>

					{mainStreamManager !== undefined ? (
						<div id='main-video' className='col-md-6'>
							<UserVideoComponent streamManager={mainStreamManager} />
							<input
								className='btn btn-large btn-success'
								type='button'
								id='buttonSwitchCamera'
								onClick={switchCamera}
								value='Switch Camera'
							/>
						</div>
					) : null}
					<div id='video-container' className='col-md-6'>
						{publisher !== undefined ? (
							<button
								className='stream-container col-md-6 col-xs-6'
								onClick={() => handleMainVideoStream(publisher)}
								type='button'
							>
								<UserVideoComponent streamManager={publisher} />
							</button>
						) : null}
						{subscribers.map(sub => (
							<button
								key={sub}
								className='stream-container col-md-6 col-xs-6'
								onClick={() => handleMainVideoStream(sub)}
								type='button'
							>
								<UserVideoComponent streamManager={sub} />
							</button>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
}

export default App;
