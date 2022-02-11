/* eslint-disable jsx-a11y/media-has-caption */
import { createRef, useEffect } from 'react';

function OpenVideoCompnent({ streamManager }) {
	const videoRef = createRef();

	useEffect(() => {
		if (streamManager && !!videoRef) {
			streamManager.addVideoElement(videoRef.current);
		}
	}, [streamManager]);

	return <video autoPlay ref={videoRef} />;
}

export default OpenVideoCompnent;
