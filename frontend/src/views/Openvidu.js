import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserVideoComponent from './UserVideoComponent';

const OPENVIDU_SERVER_URL = `https://${window.location.hostname}:${process.env.REACT_APP_OPENVIDU_PORT}`;
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

function Openvidu() {
	const [mySessionId, setMySessionId] = useState('SessionA');
	const [myUserName, setMyUserName] = useState(
		`Participant${Math.floor(Math.random() * 100)}`
	);
	const [sessionCamera, setSessionCamera] = useState(undefined);
	const [sessionScreen, setSessionScreen] = useState(undefined);
	const [sessionChat, setSessionChat] = useState(undefined);
	const [mainStreamManager, setMainStreamManager] = useState(undefined);
	const [publisher, setPublisher] = useState(undefined);
	const [publisherScreen, setPublisherScreen] = useState(undefined);
	const [subscribers, setSubscribers] = useState([]);
	const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
	const [OVCamera, setOVCamera] = useState(null);
	const [OVScreen, setOVScreen] = useState(null);
	const [OVChat, setOVChat] = useState(null);
	const [screensharing, setScreensharing] = useState(null);
	const [audioEnabled, setAudioEnabled] = useState(true);
	const [videoEnabled, setVideoEnabled] = useState(true);
	const [myMessage, setMyMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		window.addEventListener('beforeunload', onbeforeunload);
		return () => window.removeEventListener('beforeunload', onbeforeunload);
	});

	const handleChangeSessionId = e => {
		setMySessionId(e.target.value);
	};

	const handleChangeUserName = e => {
		setMyUserName(e.target.value);
	};

	const handleChangeMyMessage = e => {
		setMyMessage(e.target.value);
	};

	const handleMainVideoStream = stream => {
		if (mainStreamManager !== stream) {
			setMainStreamManager(stream);
		}
	};

	const onbeforeunload = () => {
		leaveSession();
	};

	const getToken = async () => {
		const sessionId = await createSession(mySessionId);
		const tokenTmp = await createToken(sessionId);
		return tokenTmp;
	};

	const joinSession = e => {
		e.preventDefault();
		console.log(`mySessionId : ${mySessionId}`);
		console.log(`myUserName : ${myUserName}`);
		const OVCameraTmp = new OpenVidu();
		const OVScreenTmp = new OpenVidu();
		const OVChatTmp = new OpenVidu();
		setOVCamera(OVCameraTmp);
		setOVScreen(OVScreenTmp);
		setOVChat(OVChatTmp);
		setSessionCamera(OVCameraTmp.initSession());
		setSessionScreen(OVScreenTmp.initSession());
		setSessionChat(OVChatTmp.initSession());
	};

	const sendMessage = e => {
		e.preventDefault();
		setMyMessage(preMyMessage => {
			(async () => {
				try {
					await sessionChat.signal({
						data: `${preMyMessage}`, // Any string (optional)
						to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
						// type: 'my-chat', // The type of message (optional)
					});
					console.log('Message successfully sent');
				} catch (error) {
					console.error(error);
				}
			})();
			return '';
		});
	};

	useEffect(async () => {
		if (!sessionCamera) {
			return;
		}

		sessionCamera.on('streamCreated', event => {
			if (event.stream.typeOfVideo === 'CAMERA') {
				const subscriber = sessionCamera.subscribe(event.stream, undefined);
				setSubscribers(prevSubscribers => prevSubscribers.concat([subscriber]));
			}
		});

		sessionCamera.on('streamDestroyed', event => {
			deleteSubscriber(event.stream.streamManager);
		});

		sessionCamera.on('exception', exception => {
			console.warn(exception);
		});

		try {
			const token = await getToken();
			await sessionCamera.connect(token, { clientData: myUserName });
			const devices = await OVCamera.getDevices();
			const videoDevices = devices.filter(device => device.kind === 'videoinput');

			const newPublisher = OVCamera.initPublisher(undefined, {
				audioSource: undefined, // The source of audio. If undefined default microphone
				videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
				publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
				publishVideo: true, // Whether you want to start publishing with your video enabled or not
				resolution: '640x480', // The resolution of your video
				frameRate: 30, // The frame rate of your video
				insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
				mirror: false, // Whether to mirror your local video or not
			});

			sessionCamera.publish(newPublisher);

			setCurrentVideoDevice(videoDevices[0]);
			setMainStreamManager(newPublisher);
			setPublisher(newPublisher);
		} catch (error) {
			console.log(
				'There was an error connecting to the sessionCamera:',
				error.code,
				error.message
			);
		}
	}, [sessionCamera]);

	useEffect(async () => {
		if (!sessionScreen) {
			return;
		}

		sessionScreen.on('streamCreated', event => {
			if (event.stream.typeOfVideo === 'SCREEN') {
				sessionScreen.subscribe(event.stream, 'container-screens');
				// When the HTML video has been appended to DOM...
				// subscriberScreen.on('videoElementCreated', event => {
				// 	// Add a new <p> element for the user's nickname just below its video
				// 	// appendUserData(event.element, subscriberScreen.stream.connection);
				// });
			}
		});

		try {
			const token = await getToken();
			await sessionScreen.connect(token, { clientData: myUserName });
			console.log('Session screen connected');
		} catch (error) {
			console.warn(
				'There was an error connecting to the session for screen share:',
				error.code,
				error.message
			);
		}
	}, [sessionScreen]);

	useEffect(async () => {
		if (!sessionChat) {
			return;
		}

		// Receiver of the message (usually before calling 'session.connect')
		// sessionChat.on('signal:my-chat', event => {
		// 	console.log(event.data); // Message
		// 	console.log(event.from); // Connection object of the sender
		// 	console.log(event.type); // The type of message ("my-chat")
		// });

		// Receiver of all messages (usually before calling 'session.connect')
		sessionChat.on('signal', event => {
			setMessages(preMessages => {
				console.log(event.data); // Message
				console.log(event.from); // Connection object of the sender
				console.log(event.type); // The type of message
				const id = event.from.creationTime;
				const msg = event.data;
				const user = JSON.parse(event.from.data);
				return preMessages.concat([{ id, msg, user: user.clientData }]);
			});
		});

		sessionChat.on('connectionCreated', event => {
			console.log(event.connection);
		});

		try {
			const token = await getToken();
			await sessionChat.connect(token, { clientData: myUserName });
			console.log('Session chat connected');
		} catch (error) {
			console.warn(
				'There was an error connecting to the session for chat:',
				error.code,
				error.message
			);
		}
	}, [sessionChat]);

	const publishScreenShare = () => {
		const newPublisherScreen = OVScreen.initPublisher('container-screens', {
			videoSource: 'screen',
		});

		newPublisherScreen.once('accessAllowed', event => {
			setScreensharing(true);
			newPublisherScreen.stream
				.getMediaStream()
				.getVideoTracks()[0]
				.addEventListener('ended', () => {
					console.log('User pressed the "Stop sharing" button');
					sessionScreen.unpublish(newPublisherScreen);
					setScreensharing(false);
				});
			sessionScreen.publish(newPublisherScreen);
		});

		// publisherScreen.on('videoElementCreated', event => {
		// 	// appendUserData(event.element, sessionScreen.connection);
		// 	// event.element['muted'] = true;
		// });

		newPublisherScreen.once('accessDenied', event => {
			console.error('Screen Share: Access Denied');
		});

		setPublisherScreen(newPublisherScreen);
	};

	const stopScreenShare = () => {
		console.log('User pressed the "Stop sharing" button');
		sessionScreen.unpublish(publisherScreen);
		setScreensharing(false);
	};

	const leaveSession = () => {
		if (sessionCamera) {
			sessionCamera.disconnect();
		}

		if (sessionScreen) {
			sessionScreen.disconnect();
		}

		if (sessionChat) {
			sessionChat.disconnect();
		}

		setOVCamera(null);
		setOVScreen(null);
		setOVChat(null);
		setSessionCamera(undefined);
		setSessionScreen(undefined);
		setSessionChat(undefined);
		setSubscribers([]);
		setMessages([]);
		setMySessionId('SessionA');
		setMyUserName(`Participant${Math.floor(Math.random() * 100)}`);
		setMainStreamManager(undefined);
		setPublisher(undefined);
	};

	const switchCamera = async () => {
		try {
			const devices = await OVCamera.getDevices();
			const videoDevices = devices.filter(device => device.kind === 'videoinput');

			if (videoDevices && videoDevices.length > 1) {
				const newVideoDevice = videoDevices.filter(
					device => device.deviceId !== currentVideoDevice.deviceId
				);

				if (newVideoDevice.length > 0) {
					const newPublisher = OVCamera.initPublisher(undefined, {
						videoSource: newVideoDevice[0].deviceId,
						publishAudio: true,
						publishVideo: true,
						mirror: true,
					});

					await sessionCamera.unpublish(mainStreamManager);
					await sessionCamera.publish(newPublisher);
					setCurrentVideoDevice(newVideoDevice);
					setMainStreamManager(newPublisher);
					setPublisher(newPublisher);
				}
			}
		} catch (e) {
			console.error(e);
		}
	};

	const audioOnOFF = () => {
		setAudioEnabled(preAudioEnabled => {
			publisher.publishAudio(!preAudioEnabled);
			return !preAudioEnabled;
		});
	};

	const videoOnOFF = () => {
		setVideoEnabled(preVideoEnabled => {
			publisher.publishVideo(!preVideoEnabled);
			return !preVideoEnabled;
		});
	};

	const deleteSubscriber = streamManager => {
		setSubscribers(prevSubscribers => {
			const tmpSubscribers = Array.from(prevSubscribers);
			const index = tmpSubscribers.indexOf(streamManager, 0);
			if (index > -1) {
				tmpSubscribers.splice(index, 1);
			}
			return tmpSubscribers;
		});
	};

	const createSession = async sessionId => {
		const data = JSON.stringify({ customSessionId: sessionId });
		try {
			const response = await axios.post(
				`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
				data,
				{
					headers: {
						Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			console.log('CREATE SESSION', response);
			return response.data.id;
		} catch (response) {
			const error = { ...response };
			if (error?.response?.status === 409) {
				return sessionId;
			}
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
				window.location.assign(
					`${OPENVIDU_SERVER_URL}/openvidu/accept-certificate`
				);
			}
			return new Error(error);
		}
	};

	const createToken = async sessionId => {
		const data = {};
		try {
			const response = await axios.post(
				`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
				data,
				{
					headers: {
						Authorization: `Basic ${btoa(`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`)}`,
						'Content-Type': 'application/json',
					},
				}
			);
			console.log('TOKEN', response);
			return response.data.token;
		} catch (e) {
			throw new Error(e);
		}
	};

	return (
		<div className='container'>
			{!sessionCamera && (
				<div id='join'>
					<div id='join-dialog'>
						<h1> Join a video session </h1>
						<form onSubmit={joinSession}>
							<p>
								<label htmlFor='userName'>
									Participant:
									<input
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
										type='text'
										id='sessionId'
										value={mySessionId}
										onChange={handleChangeSessionId}
										required
									/>{' '}
								</label>
							</p>
							<p>
								<input name='commit' type='submit' value='JOIN' />
							</p>
						</form>
					</div>
				</div>
			)}

			{sessionCamera && (
				<div id='session'>
					<div id='session-header'>
						<h1 id='session-title'>{mySessionId}</h1>
						<input
							type='button'
							id='buttonLeaveSession'
							onClick={leaveSession}
							value='Leave session'
						/>
						{!screensharing ? (
							<input
								type='button'
								id='buttonScreenShare'
								onClick={publishScreenShare}
								value='Screen share'
							/>
						) : (
							<input
								type='button'
								id='buttonScreenShare'
								onClick={stopScreenShare}
								value='Stop Screen share'
							/>
						)}
						<input
							type='button'
							id='buttonAudioOnOff'
							onClick={audioOnOFF}
							value={audioEnabled ? 'audio OFF' : 'audio ON'}
						/>
						<input
							type='button'
							id='buttonVideoOnOff'
							onClick={videoOnOFF}
							value={videoEnabled ? 'video OFF' : 'video ON'}
						/>
						<form onSubmit={sendMessage}>
							<p>
								<input
									type='text'
									id='message'
									placeholder='Message'
									value={myMessage}
									onChange={handleChangeMyMessage}
									required
								/>
								<input name='commit' type='submit' value='Send' />
							</p>
						</form>
					</div>

					<div id='session-chat'>
						<ul>
							{messages.map(data => (
								<li key={data.id}>{`${data.user} : ${data.msg}`}</li>
							))}
						</ul>
					</div>

					{mainStreamManager && (
						<div id='main-video'>
							<UserVideoComponent streamManager={mainStreamManager} />
							<input
								type='button'
								id='buttonSwitchCamera'
								onClick={switchCamera}
								value='Switch Camera'
							/>
						</div>
					)}
					<div id='container-screens' />
					<div id='video-container'>
						{publisher && (
							<button onClick={() => handleMainVideoStream(publisher)} type='button'>
								<UserVideoComponent streamManager={publisher} />
							</button>
						)}
						{subscribers.map(sub => (
							<button
								key={sub}
								onClick={() => handleMainVideoStream(sub)}
								type='button'
							>
								<UserVideoComponent streamManager={sub} />
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Openvidu;
