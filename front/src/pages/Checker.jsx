import { useContext, useEffect, useState } from 'react'
import { Storage } from '../App'
import Questioning from '../components/Questioning';
import VideoPlayer from '../components/VideoPlayer'
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from 'axios';


export default function Checker() {
    const params = useParams();
    const { videoSrc} = useContext(Storage)
    const [counter, setCounter] = useState(Number(params.index))
    const navigate = useNavigate();
    // setTitle(Number(params.index))
    const [myOrder, setMyOrder] = useState([]);
    const [nextPage,setNextPage] = useState(false)
    useEffect(() => {
      const order = [0,1,2,3].sort(() => Math.random() - 0.5);
      setMyOrder(order);
      console.log(order);
    }, []);
    function finishingFunc() {
        handleRating()
        setCounter(counter + 1)
        const order = [0,1,2,3].sort(() => Math.random() - 0.5);
        setMyOrder(order);
        console.log(order);
    }
    
    const handleRating = () => {
        localStorage.getItem("inappropriate") && inappropriate();
        localStorage.getItem("quality") && localStorage.getItem("option") &&
            review({
                scale: parseInt(localStorage.getItem("quality")),
                option: localStorage.getItem("option")
            });
        localStorage.clear()
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
        <div className='w-full h-full flex flex-row justify-center bg--50'>
            <div className='w-1/6 flex justify-center items-center'>
                <button  className=' bg-orange-600 rounded p-3 text-white text-xl'
                    onClick={() => { navigate('/enter'); localStorage.clear() }} >
                    EXIT
                </button>
            </div>

            <div className='w-3/6 p-8 '>
                <VideoPlayer counter={counter} setCounter={setCounter} />
                <Questioning setNextPage={setNextPage}  counter={counter} myOrder={myOrder} setCounter={setCounter} />
            </div>
            {nextPage == true ? (
                 <div className='w-1/6 flex justify-center items-center  '>
                 <a className='object-none  rounded p-3 text-white text-xl bg-blue-600'
                     href={`/checker/${counter}`}
                     onClick={() => finishingFunc()}>
                     NEXT
                 </a>
             </div>
            ): (  
            <div className='w-1/6 flex justify-center items-center  '>
            <a className='object-none  rounded p-3 text-white text-xl bg-blue-300'>
                NEXT
            </a>
             </div>
            )}
           
         

        </div>
    )
}