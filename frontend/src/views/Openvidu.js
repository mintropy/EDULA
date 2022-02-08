/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import { Component } from 'react';
import UserVideoComponent from './UserVideoComponent';

const OPENVIDU_SERVER_URL = `https://${window.location.hostname}:${process.env.REACT_APP_OPENVIDU_PORT}`;
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mySessionId: 'SessionA',
			myUserName: `Participant${Math.floor(Math.random() * 100)}`,
			session: undefined,
			mainStreamManager: undefined,
			publisher: undefined,
			subscribers: [],
		};

		this.joinSession = this.joinSession.bind(this);
		this.leaveSession = this.leaveSession.bind(this);
		this.switchCamera = this.switchCamera.bind(this);
		this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
		this.handleChangeUserName = this.handleChangeUserName.bind(this);
		this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
		this.onbeforeunload = this.onbeforeunload.bind(this);
		this.createSession = this.createSession.bind(this);
		this.createToken = this.createToken.bind(this);
	}

	componentDidMount() {
		window.addEventListener('beforeunload', this.onbeforeunload);
	}

	componentWillUnmount() {
		window.removeEventListener('beforeunload', this.onbeforeunload);
	}

	handleChangeSessionId(e) {
		this.setState({
			mySessionId: e.target.value,
		});
	}

	handleChangeUserName(e) {
		this.setState({
			myUserName: e.target.value,
		});
	}

	handleMainVideoStream(stream) {
		const { mainStreamManager } = this.state;
		if (mainStreamManager !== stream) {
			this.setState({
				mainStreamManager: stream,
			});
		}
	}

	onbeforeunload() {
		this.leaveSession();
	}

	/**
	 * --------------------------
	 * SERVER-SIDE RESPONSIBILITY
	 * --------------------------
	 * These methods retrieve the mandatory user token from OpenVidu Server.
	 * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
	 * the API REST, openvidu-java-client or openvidu-node-client):
	 *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
	 *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
	 *   3) The Connection.token must be consumed in Session.connect() method
	 */

	getToken() {
		const { mySessionId } = this.state;
		return this.createSession(mySessionId).then(sessionId =>
			this.createToken(sessionId)
		);
	}

	joinSession() {
		// --- 1) Get an OpenVidu object ---

		this.OV = new OpenVidu();

		// --- 2) Init a session ---

		this.setState(
			{
				session: this.OV.initSession(),
			},
			() => {
				const { session } = this.state;

				// --- 3) Specify the actions when events take place in the session ---

				// On every new Stream received...
				session.on('streamCreated', event => {
					// Subscribe to the Stream to receive it. Second parameter is undefined
					// so OpenVidu doesn't create an HTML video by its own
					const subscriber = session.subscribe(event.stream, undefined);
					const { subscribers } = this.state;
					subscribers.push(subscriber);

					// Update the state with the new subscribers
					this.setState({
						subscribers,
					});
				});

				// On every Stream destroyed...
				session.on('streamDestroyed', event => {
					// Remove the stream from 'subscribers' array
					this.deleteSubscriber(event.stream.streamManager);
				});

				// On every asynchronous exception...
				session.on('exception', exception => {
					console.warn(exception);
				});

				// --- 4) Connect to the session with a valid user token ---

				// 'getToken' method is simulating what your server-side should do.
				// 'token' parameter should be retrieved and returned by your own backend
				this.getToken().then(token => {
					// First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
					// 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
					const { myUserName } = this.state;
					session
						.connect(token, { clientData: myUserName })
						.then(async () => {
							const devices = await this.OV.getDevices();
							const videoDevices = devices.filter(
								device => device.kind === 'videoinput'
							);

							// --- 5) Get your own camera stream ---

							// Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
							// element: we will manage it on our own) and with the desired properties
							let publisher = this.OV.initPublisher(undefined, {
								audioSource: undefined, // The source of audio. If undefined default microphone
								videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
								publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
								publishVideo: true, // Whether you want to start publishing with your video enabled or not
								resolution: '640x480', // The resolution of your video
								frameRate: 30, // The frame rate of your video
								insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
								mirror: false, // Whether to mirror your local video or not
							});

							// --- 6) Publish your stream ---

							session.publish(publisher);

							// Set the main video in the page to display our webcam and store our Publisher
							this.setState({
								currentVideoDevice: videoDevices[0],
								mainStreamManager: publisher,
								publisher,
							});
						})
						.catch(error => {
							console.log(
								'There was an error connecting to the session:',
								error.code,
								error.message
							);
						});
				});
			}
		);
	}

	leaveSession() {
		// --- 7) Leave the session by calling 'disconnect' method over the Session object ---

		const { session } = this.state;

		if (session) {
			session.disconnect();
		}

		// Empty all properties...
		this.OV = null;
		this.setState({
			session: undefined,
			subscribers: [],
			mySessionId: 'SessionA',
			myUserName: `Participant${Math.floor(Math.random() * 100)}`,
			mainStreamManager: undefined,
			publisher: undefined,
		});
	}

	async switchCamera() {
		try {
			const devices = await this.OV.getDevices();
			const videoDevices = devices.filter(device => device.kind === 'videoinput');

			if (videoDevices && videoDevices.length > 1) {
				const { currentVideoDevice } = this.state;
				const newVideoDevice = videoDevices.filter(
					device => device.deviceId !== currentVideoDevice.deviceId
				);

				if (newVideoDevice.length > 0) {
					// Creating a new publisher with specific videoSource
					// In mobile devices the default and first camera is the front one
					const newPublisher = this.OV.initPublisher(undefined, {
						videoSource: newVideoDevice[0].deviceId,
						publishAudio: true,
						publishVideo: true,
						mirror: true,
					});

					// newPublisher.once("accessAllowed", () => {
					const { session, mainStreamManager } = this.state;
					await session.unpublish(mainStreamManager);

					await session.publish(newPublisher);
					this.setState({
						currentVideoDevice: newVideoDevice,
						mainStreamManager: newPublisher,
						publisher: newPublisher,
					});
				}
			}
		} catch (e) {
			console.error(e);
		}
	}

	deleteSubscriber(streamManager) {
		const { subscribers } = this.state;
		const index = subscribers.indexOf(streamManager, 0);
		if (index > -1) {
			subscribers.splice(index, 1);
			this.setState({
				subscribers,
			});
		}
	}

	createSession(sessionId) {
		return new Promise((resolve, reject) => {
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
							window.location.assign(
								`${OPENVIDU_SERVER_URL}/openvidu/accept-certificate`
							);
						}
					}
				});
		});
	}

	createToken(sessionId) {
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
	}

	render() {
		const {
			mySessionId,
			myUserName,
			session,
			mainStreamManager,
			publisher,
			subscribers,
		} = this.state;

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
							<form className='form-group' onSubmit={this.joinSession}>
								<p>
									<label htmlFor='userName'>
										Participant:
										<input
											className='form-control'
											type='text'
											id='userName'
											value={myUserName}
											onChange={this.handleChangeUserName}
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
											onChange={this.handleChangeSessionId}
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
								onClick={this.leaveSession}
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
									onClick={this.switchCamera}
									value='Switch Camera'
								/>
							</div>
						) : null}
						<div id='video-container' className='col-md-6'>
							{publisher !== undefined ? (
								<button
									className='stream-container col-md-6 col-xs-6'
									onClick={() => this.handleMainVideoStream(publisher)}
									type='button'
								>
									<UserVideoComponent streamManager={publisher} />
								</button>
							) : null}
							{subscribers.map(sub => (
								<button
									key={sub}
									className='stream-container col-md-6 col-xs-6'
									onClick={() => this.handleMainVideoStream(sub)}
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
}

export default App;
