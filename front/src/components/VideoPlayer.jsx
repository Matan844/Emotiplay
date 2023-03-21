import React, { useState, useRef, useContext } from 'react';
import { Storage } from '../App';
import { useParams } from "react-router-dom"

const VideoPlayer = (props) => {
    const params = useParams();
    const { filterdVideo } = useContext(Storage)
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);

    const [counter, setCounter] = useState(Number(params.index));
    const handleProgress = () => {
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        const progress = (currentTime / duration) * 100;
        setProgress(progress);
    };

console.log(filterdVideo);
    return (
        <div className='d-flex justify-content-center flex-column align-items-center pt-1'>
            {
                filterdVideo[counter]?.cloudinaryLink &&
                <video
                    className='d-flex justify-content-center flex-column align-items-center p-1'
                    onTimeUpdate={handleProgress}
                    ref={videoRef}
                    width="95%"
                    height="auto"
                    controls
                    autoPlay
                    muted
                >
                    <source
                        src={filterdVideo[counter]?.cloudinaryLink}
                        type="video/mp4"
                    />
                </video>
            }
            <div className='position-fixed bottom-0 '>

            </div>
        </div>
    )
}

export default VideoPlayer;