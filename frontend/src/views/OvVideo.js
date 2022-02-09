/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
	}

	componentDidMount() {
		const { streamManager } = this.props;
		if (this.props && !!this.videoRef) {
			streamManager.addVideoElement(this.videoRef.current);
		}
	}

	componentDidUpdate(props) {
		const { streamManager } = this.props;
		if (props && !!this.videoRef) {
			streamManager.addVideoElement(this.videoRef.current);
		}
	}

	render() {
		return <video autoPlay ref={this.videoRef} />;
	}
}
