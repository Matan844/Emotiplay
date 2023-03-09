import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Storage } from '../App'
import { NavLink, useNavigate } from "react-router-dom"



export default function Preview() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { emotionList, } = useContext(Storage)
  const videoLink = localStorage.getItem('videoPreview')

  const back = () => {
    navigate("/donor");
    localStorage.removeItem("videoPreview");
  };

  function onSubmit(data) {
    const { title, id } = JSON.parse(data.emotion);
    axios.post('http://localhost:8639/video/addVideo',
      { cloudinaryLink: videoLink, emotionId: id, emotion: title })
      .then((result) => {
        console.log("adding to mongo successed:", result);
        if (result.status === 200) {
          localStorage.removeItem('videoPreview');
          navigate('/enter');
        }
      })
      .catch((error) => {
        console.log("can't add video:", error);
        alert(error.response.data.message)
      })
  }

  return (
    <div className="w-screen h-screen flex justify-center flex-row items-center bg-indigo-50">

      {videoLink && (
        <div className="w-3/5 -ml-32">
          <video src={videoLink} controls
            width="100%" height="auto" className="p-3" />
        </div>
      )}

      <div className="flex flex-col max-w-xs font-sans ml-11 ">
        <p className="text-3xl">
          {" "}
          your video is ready now select an emotion and then finish uploading by click on save
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <select {...register("emotion", { required: true })} defaultValue="default"
            className="block appearance-none mt-9 w-4/5 bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">

            <option value="default" disabled>
              -- select an emotion --
            </option>

            {emotionList?.map((item, index) => (
              <option key={index}
                value={
                  JSON.stringify({
                    title: item.title,
                    id: item._id
                  })}>
                {item.title}
              </option>
            ))}
          </select>

          <div className=' mt-5 w-100 d-flex align-items-center'>
            <div className='w-75 d-flex justify-content-between align-items-center '>

              <button onClick={() => back()}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded' >
                Back
              </button>

              <button type='submit'
                className='bg-blue-500 ml-9 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded' >
                Save
              </button>

            </div>
          </div>

        </form>
      </div>
    </div>
  )
}
