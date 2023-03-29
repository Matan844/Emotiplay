import { useState } from "react";
import WidgetUpload from "../components/WidgetUpload";

import Lottie from "lottie-react";
import uploadLotty from "../lotty/uploadDoc.json";


export default function Donor() {
  const [acceptterms, setacceptterms] = useState(false);



  return (
    <div className="h-screen w-screen flex flex-col">

      <div className="h-1/4 flex items-end justify-center ">
        <h1 className=" text-5xl ">
          Upload video:
        </h1>
      </div>

      <div className="w-screen h-fit flex flex-row justify-evenly items-center">
        <Lottie
          animationData={uploadLotty}
          loop={true}
          className="w-2/5 "
        />

        <div className=" h-2/4 flex flex-col justify-center mt-20 ">

          <div className="text-2xl ">
            <div className="p-1">
              <p className="text-orange-800">First step:  </p>
              <p>choose the video file to upload</p>
              <p className="text-orange-800">Second step:  </p>
              <p>select the emotion you're showing </p>
              <p className="text-orange-800">Third step:  </p>
              <p>accept the uploading </p>
            </div>


            <div className="p-1 pt-2">
              <p>
                By uploading video you are
              </p>
              <a href="http://" target="_blank" rel="noopener noreferrer"
                className="text-blue-700">
                accepting the terms:
              </a>
              <input type="checkbox" onClick={() => setacceptterms(!acceptterms)}
                className="p-1 ml-1 mt-2 mb-4" />
            </div>
          </div>

          <div className="">
            <WidgetUpload accept={acceptterms} />
          </div>
        </div>
      </div>

    </div>
  );
}
