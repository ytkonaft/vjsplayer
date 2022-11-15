import React, {useEffect, useRef} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({options, onReady}) => {
    const videoRef = useRef();
    const playerRef = useRef();

    useEffect(() => {
        playerRef.current = videojs(videoRef.current, options, () => {
            videojs.log('onPlayerReady', videoRef);
            onReady(playerRef.current, videoRef.current);
        });
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose()
            }
        }
    },[])

    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js"></video>
        </div>
    );

}
export default VideoPlayer