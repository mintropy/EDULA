import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
// import './UserVideo.css';

export default class UserVideoComponent extends Component {
	getNicknameTag() {
		// Gets the nickName of the user
		const { streamManager } = this.props;
		return JSON.parse(streamManager.stream.connection.data).clientData;
	}

	render() {
		const { streamManager } = this.props;
		return (
			<div>
				{streamManager !== undefined ? (
					<div className='streamcomponent'>
						<OpenViduVideoComponent streamManager={streamManager} />
						<div>
							<p>{this.getNicknameTag()}</p>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}
