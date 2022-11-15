import React, {useRef, useState} from 'react';
import Videojs from './Player';

const sources = [
    {
        src: 'https://video-previews.elements.envatousercontent.com/files/5a23d9a9-0570-4e7b-ab6e-81cbe7659d25/video_preview_h264.mp4',
        type: 'video/mp4',
    },
    {
        src: 'https://video-previews.elements.envatousercontent.com/e01bf887-a3be-4441-a6a4-ead62fb7f05f/watermarked_preview/watermarked_preview.mp4',
        type: 'video/mp4',
    },
];


const COUNT = 3

const App = () => {
    const [sourceNumber, setSourceNumber] = useState(0)
    const [count, setCount] = useState(COUNT)
    const player = useRef()

    const handleReady = (instance) => {
        player.current = instance;

        player.current.on('ended', () => {
            setCount((prevCount) => {
                const nextCount = prevCount - 1;

                if (nextCount > 0) {
                    player.current.play();
                }
                return nextCount
            })


        })
    }

    const play = () => {
        player.current.play();
    }

    const stop = () => {
        player.current.pause();
        player.current.currentTime(0);
        setCount(COUNT)
    }

    const fullscreen = () => {
        player.current.requestFullscreen();
    }

    const pause = () => {
        player.current.pause();
    }

    const next = () => {
        const nextSource = sourceNumber + 1;
        setSourceNumber(nextSource)
        player.current.src(sources[nextSource])
    }

    return (<div>
        <h5>{count} / {COUNT}</h5>
        <button onClick={play}>play</button>
        <button onClick={pause}>pause</button>
        <button onClick={stop}>stop</button>
        <button onClick={fullscreen}>fullscreen</button>
        <button onClick={next}>next</button>
        <Videojs options={{
            controls: false,
            sources: sources[sourceNumber]
        }} onReady={handleReady}/>
    </div>);
}

export default App;