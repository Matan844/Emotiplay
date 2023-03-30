import { useState } from "react";
import WidgetUpload from "../components/WidgetUpload";

import Lottie from "lottie-react";
import uploadLotty from "../lotty/uploadDoc.json";


export default function Donor() {
  const [acceptterms, setacceptterms] = useState(false);

  return (
    <div className="h-5/6 w-screen p-1  grid place-content-center desktop:grid-cols-[7rem_7rem_7rem_7rem]-grid-rows-[5rem_12rem_12rem] gap-2 tablet:grid-cols-1-grid-rows-1 ">

      <h1 className=" text-5xl col-start-3  place-self-center">
        Upload video:
      </h1>


      <Lottie
        animationData={uploadLotty}
        loop={true}
        className="col-start-1 col-span-2 row-start-1 row-span-3 w-full height-full"
      />

      <div className="col-span-2 col-end-5 row-start-2 row-span-2">

        <div className="text-2xl ">
          <div className="p-1">
            <p className="text-orange-700">
              First step:
            </p>
            <p>
              choose the video file to upload
            </p>
            <p className="text-orange-700">
              Second step:
            </p>
            <p>
              select the emotion you're showing
            </p>
            <p className="text-orange-700">
              Third step:
            </p>
            <p>
              accept the uploading
            </p>
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
  );
}
