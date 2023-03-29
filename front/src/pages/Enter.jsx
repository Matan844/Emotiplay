import { NavLink } from 'react-router-dom';
import Emotion from "../lotty/enter.json"
import Lottie from "lottie-react";
import { useContext, useEffect, useRef, useState } from "react"
import { Storage } from "../App"
import { color } from '@cloudinary/url-gen/qualifiers/background';
import axios from 'axios';


const Enter = () => {
    const { FilterdVideos, setFilterdVideos } = useContext(Storage)
    let videos = [{}]
    useEffect(() => {
        axios.get('http://localhost:8639/video/allVideos')
        .then((res)=> { videos = res.data} )
        .then(()=>{
            console.log(videos);
        const userid = localStorage.getItem('id');
        axios.post('http://localhost:8639/user/getallviedvideos', { userId: userid })
          .then((response) => { 
            const viewdvideo = response.data.message;
            console.log('viewed videos:', viewdvideo);
            console.log('video sources:', videos);
            const filtered = videos.filter(obj => !viewdvideo.includes(obj._id));
            console.log('filtered videos:', filtered);
             localStorage.setItem('filtered',JSON.stringify(filtered));
             setFilterdVideos(FilterdVideos++)
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });})
    },[])



    const { setCloudinaryLink } = useContext(Storage)
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    return (
        <div className=" h-screen grid tablet:grid-cols-1 laptop:grid-cols-1 desktop:grid-cols-3">

            <Lottie className="" animationData={Emotion} loop={true} />

            <div className='grid grid-cols-1 place-content-center'>
                <h3 className='text-3xl pb-4 place-self-center'>
                    Be a Star
                </h3>

                <p className='text-xl place-self-center p-2'>
                    Our stars help us teach children with autism about emotions, by sending images, video and voices depicting diverse ways of emotion expression
                </p>
                <div className='place-self-center'>
                    <button className="bg-blue-600 p-3 hover:bg-blue-700 text-white font-bold px-5 rounded-full w-24">
                        <NavLink to={"/emotionlist"} style={{ textDecoration: 'none' }} onClick={() => widgetRef.current.open()}>
                            STAR
                        </NavLink>
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-1 place-content-center'>
                <h3 className='text-3xl pb-4 place-self-center'>
                    Be an Evaluator
                </h3>

                <p className='text-xl  place-self-center p-2'>
                    Evaluators help us teach children with autism about emotions, by evaluating and validating the media we collect, making sure it is appropriate and clearly expressed before using it in our program
                </p>

                <div className='place-self-center'>
                    <button className="bg-blue-600 p-3 hover:bg-blue-700 text-white font-bold px-5 rounded-full ">
                        <NavLink to={"/checker/0"} className='caret-lime-900' >
                            EVALUATOR
                        </NavLink>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Enter