import { useContext, useEffect, useState } from 'react'
import { Storage } from '../App'
import Questioning from '../components/Questioning';
import VideoPlayer from '../components/VideoPlayer'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from 'axios';


export default function Checker() {
    const params = useParams();
    const navigate = useNavigate();
    const { videoSrc, myOrder, setMyOrder } = useContext(Storage)
    const [counter, setCounter] = useState(Number(params.index))
    const [nextPage, setNextPage] = useState(false)

    useEffect(() => {
        const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        setMyOrder(order);
    }, []);

    function finishingFunc() {
        const videoId = videoSrc[counter]._id;
        saveWatchedVideo(videoId);
        handleRating()
        setCounter(counter + 1)
        const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        setMyOrder(order);
        console.log(order);
    }
    const saveWatchedVideo = (videoId) => {
        const userId = localStorage.getItem("id");
        axios
            .post("http://localhost:8639/user/watchedVideoSave", { userId: userId, videoId: videoId })
            .then((response) => console.log(response));
    }


    const handleRating = () => {
        localStorage.getItem("inappropriate") && inappropriate();
        localStorage.getItem("quality") && localStorage.getItem("option") &&
            review({
                scale: parseInt(localStorage.getItem("quality")),
                option: localStorage.getItem("option")
            });
        localStorage.removeItem("wrongAnswer");
        localStorage.removeItem("firstRandom");
        localStorage.removeItem("secondRandom");
        localStorage.removeItem("correctAnswer");
    }

    const review = (body) => {
        axios.put(`http://localhost:8639/rate/rateVideo/${videoSrc[counter]?._id}`, body)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }

    const inappropriate = () => {
        axios.post(`http://localhost:8639/rate/rateVideo/${videoSrc[counter]?._id}`)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    }



    return (
        <div className='w-full h-full flex flex-row justify-center bg--50 mt-10'>
            <div className='w-1/6 flex justify-center items-center'>
                <button className=' bg-orange-600 rounded p-3 text-white text-xl'
                    onClick={() => {
                        navigate('/enter'); localStorage.removeItem("wrongAnswer");
                        localStorage.removeItem("firstRandom");
                        localStorage.removeItem("secondRandom");
                        localStorage.removeItem("correctAnswer");
                    }} >
                    EXIT
                </button>
            </div>

            <div className='w-3/6 p-8 '>
                {videoSrc[counter]?.cloudinaryLink ? (
                    <div>  <VideoPlayer counter={counter} setCounter={setCounter} />
                        <Questioning setNextPage={setNextPage} counter={counter} setCounter={setCounter} />
                    </div>) : (
                    <div className='mt-48 text-4xl'>You have rated all the videos at the moment, thank you very much! </div>

                )}
            </div>
            {nextPage == true ? (
                <div className='w-1/6 flex justify-center items-center  '>
                    <a className='object-none  rounded p-3 text-white text-xl bg-blue-600'
                        href={`/checker/${counter}`}
                        onClick={() => finishingFunc()}>
                        NEXT
                    </a>
                </div>
            ) : (
                <div className='w-1/6 flex justify-center items-center  '>
                    <a className='object-none  rounded p-3 text-white text-xl bg-blue-300'>
                        NEXT
                    </a>
                </div>
            )}



        </div>
    )
}