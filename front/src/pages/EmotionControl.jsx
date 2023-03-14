import AdminNavBar from "../components/AdminNavbar";
import { Storage } from "../App";
import { useContext } from "react";
import axios from "axios";
export default function Statistics() {
  const { emotionList } = useContext(Storage);

  function deleteEmotion(spectrumID, title) {
    axios
      .post(`http://localhost:8639/emotion/deleteEmotion/${spectrumID}`, {
        emotion: title,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  function changeNeed(spectrumID,need,index) {
    axios
      .post(`http://localhost:8639/emotion/changeNeed/${spectrumID}`, {
        need: need,
        index: index
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }


  console.log(emotionList);
  return (
    <div>
      <AdminNavBar />
      <div className="flex justify-center  mt-5">
        {emotionList?.map((item, index) => (
          // console.log("item: ", item, "emotions ", emotionList),
          <div key={index}>
            <h3 className="flex flex-col items-center border-4 w-44 ml-2 text-2xl">
              {emotionList[index]?.spectrum}
            </h3>
            {emotionList[index]?.stock.map(
              (item, i) => (
                console.log("item: ", item),
                (
                  <ul key={i} class="list-disc list-inside">
                    <li class="flex items-center p-2 border-2 w-44 ml-2 mr-2">
                      {item?.need == true ? (
                        <input
                          type="checkbox"
                          class="form-checkbox h-4 w-5 text-blue-500"
                          defaultChecked
                          onClick={() => changeNeed(emotionList[index]._id,false,i)}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          class="form-checkbox h-5 w-5 text-blue-500"
                          onClick={() => changeNeed(emotionList[index]._id,true,i)}
                        />
                      )}
                      <span class="ml-2 text-gray-700">
                        {item.title} <br />
                        {/* <button onClick={()=>updateEmotion(emotionList[index]?._id, "papaya")}>up</button> */}
                        <br />
                        <button
                          onClick={() =>
                            deleteEmotion(emotionList[index]?._id, item.title)
                          }
                        >
                          {" "}
                          del
                        </button>
                      </span>
                    </li>
                  </ul>
                )
              )
            )}
          </div>
        ))}
      </div>
      <button
        className="bg-blue-600 p-2 mt-2 rounded text-lg"
        onClick={() => console.log(emotionList)}
      >
        save
      </button>
      <button className="bg-blue-600 p-2 mt-2 rounded text-lg">
        create new spectrum make it work anna!
      </button>
    </div>
  );
}
