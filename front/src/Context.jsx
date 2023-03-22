import axios from "axios";
import { useEffect, useState } from "react";
import { CloudConfig, Cloudinary } from "@cloudinary/url-gen";
import { useLocation, useParams } from "react-router-dom";


export default function Context() {
    const [cloudinaryLink, setCloudinaryLink] = useState();
    const [randomOptions, setRandomOptions] = useState([]);
    const [videoPreview, setVideoPreview] = useState();
    const [emotionList, setEmotionList] = useState([]);
    const [allEmotions, setAllEmotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [videoSrc, setVideoSrc] = useState([]);
    const [emotion, setEmotion] = useState();
    const [correct, setCorrect] = useState();
    const [wrong, setWrong] = useState();
    const [FilterdVideos , setFilterdVideos] = useState()
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const filterd = JSON.parse(localStorage.getItem('filtered'))
            console.log(filterd);
            try {
                let correct = 0;
                let id;
                try {
                    const { data: videos } = await axios.get('http://localhost:8639/video/allVideos')
                   if (filterd) {
                       setVideoSrc(filterd)
                       console.log('ididit');
                    }
                    else{
                       setVideoSrc(videos)
                   }
                    if (pathname.split('/')[2] >= 0) {
                        const correctAnswer = videos[pathname.split('/')[2]].feeling.emotion
                        id = videos[pathname.split('/')[2]].feeling.spectrum
                        correct = correctAnswer
                        localStorage.setItem("correctAnswer", correctAnswer);
                    }
                } catch (err) {
                    console.log("failed to fetch videos : ", err.message)
                }

                try {
                    const { data: emotions } = await axios.get('http://localhost:8639/emotion/allEmotions')
                    setEmotionList(emotions);
                    const spectrum = emotions.filter((emotion) => emotion._id === id)
                    let arrayForWrong = []
                    spectrum.forEach((emotion) => emotion.stock.forEach((feeling) => arrayForWrong.push(feeling.title)))
                    arrayForWrong.filter((feeling) => feeling !== correct)
                    const randomIndexWrAns = Math.floor(Math.random() * arrayForWrong.length)
                    const wrongAnswer = arrayForWrong[randomIndexWrAns]
                    localStorage.setItem("wrongAnswer", wrongAnswer);

                    const randomEmotions = emotions.filter((emotion) => emotion._id !== id)
                    let arr = []
                    randomEmotions.forEach(element => {
                        (element.stock.forEach(stock => arr.push(stock.title)))
                    });
                    const randomIndexRandAns = Math.floor(Math.random() * arr.length)
                    const firstRandom = arr[randomIndexRandAns]
                    const arr2 = arr.filter(item => item != firstRandom)
                    const secondRandom = arr2[randomIndexRandAns]

                    localStorage.setItem("firstRandom", firstRandom);
                    localStorage.setItem("secondRandom", secondRandom);
                    setLoading(false)

                } catch (err) {
                    console.log("failed to fetch emotions : ", err.message)
                }
            } catch (err) {
                console.log("fetch data error : ", err.message)
            }
        }
        fetchData()
    }, [])

    const random = (array) => {
        const index = Math.floor(Math.random() * array.length)
        const random = array[index]
        return random
    }
    const [log, setlog] = useState(false);
    const [pass, setpass] = useState(false);

    return {
        cloudinaryLink, setCloudinaryLink,
        emotion, setEmotion,
        videoSrc, setVideoSrc,
        emotionList, setEmotionList,
        videoPreview, setVideoPreview,
        randomOptions, setRandomOptions,
        correct, setCorrect,
        wrong, setWrong,
        allEmotions, setAllEmotions,
        log, setlog,
        pass, setpass,
        FilterdVideos , setFilterdVideos
    }
}