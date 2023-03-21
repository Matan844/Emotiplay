import { React, useContext, useEffect, useState } from "react";
import { Storage } from "../App";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function Questioning(props) {
  const { videoSrc, randomOptions, emotionList, answers, loading } = useContext(Storage);
  const counter = props.counter
  const [next1,setnext1] =useState(false)
  const [next2,setnext2] =useState(false)
  const [next3,setnext3] =useState(false)
  const qualitySave = (level) => {
    localStorage.setItem("quality", level)
    localStorage.setItem("index", counter)
  }
  const setNextPage = props.setNextPage
  function validSave(picked) {
    localStorage.setItem("option", picked)
    localStorage.setItem("index", counter)

  }

  const [clickedL, setCclickedL] = useState(false);
  const [clickedR, setCclickedR] = useState(false);
  const [clicked, setClicked] = useState([false, false, false, false, false, false]);
  const [clicked2, setClicked2] = useState([false, false, false, false, false]);
useEffect(()=>{
if ( next1 == true && next2 == true && next3 == true ) {
  setNextPage(true)
}
if ( next1 == false || next2 == false || next3 == false ) {
  setNextPage(false)
}
},[next1,next2,next3])
  useEffect(()=>{
  if (clickedL == true || clickedR == true) {
    setnext1(true)
  }
  if (clickedL == false && clickedR == false) {
    setnext1(false)
  }
  console.log(next1);

},[clickedL,clickedR])
useEffect(()=>{
if (clicked[0] == true||clicked[1] == true||clicked[2] == true||clicked[3] == true||clicked[4] == true||clicked[5] == true) {
  setnext2(true)
}
if (clicked[0] == false && clicked[1] == false && clicked[2] == false && clicked[3] == false && clicked[4] == false && clicked[5] == false) {
  setnext2(false)
}
},[clicked])
useEffect(()=>{
if (clicked2[0] == true||clicked2[1] == true||clicked2[2] == true||clicked2[3] == true||clicked2[4] == true||clicked2[5] == true) {
  setnext3(true)
}
if (clicked2[0] == false && clicked2[1] == false && clicked2[2] == false && clicked2[3] == false && clicked2[4] == false && clicked2[5] == false) {
  setnext3(false)
}
},[clicked2])
  const buttonL = clickedL
    ? "bg-orange-600 hover:bg-orange-400 text-orange-800 font-bold py-2 px-4 rounded-l text-lg"
    : "bg-orange-300 hover:bg-orange-400 text-orange-800 font-bold py-2 px-4 rounded-l text-lg";
  const buttonR = clickedR
    ? "bg-blue-600 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4 rounded-r text-lg"
    : "bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4 rounded-r text-lg";

  function handleClick(number) {
    const updatedClicked = [...clicked];
    for (let i = 0; i < updatedClicked.length; i++) {
      updatedClicked[i] = false;
    }
    updatedClicked[number] = !updatedClicked[number];
    setClicked(updatedClicked);
  }
  function handleClick2(params) {
    const updatedClicked = [...clicked2];
    for (let i = 0; i < updatedClicked.length; i++) {
      updatedClicked[i] = false;
    }
    updatedClicked[params] = !updatedClicked[params];
    setClicked2(updatedClicked);
  }
  function buttonclicked(param) {
    if (param == "L") {
      if (clickedL == false) {
        if (clickedR == true) {
          setCclickedR(false);
        }
        setCclickedL(true);
      }
      if (clickedL == true) {
        setCclickedL(false);
      }
    }
    if (param == "R") {
      if (clickedR == false) {
        if (clickedL == true) {
          setCclickedL(false);
        }
        setCclickedR(true);
      }
      if (clickedR == true) {
        setCclickedR(false);
      }
    }
  }
  const myOrder = props.myOrder


  const answeroption = ['correct', "random", "random", "wrong"]
  const localstorageoption = ["correctAnswer", "firstRandom", "secondRandom", "wrongAnswer"]

  return (
    <div className="">
      {/* {loading ? "hi" : "ho"} */}

      <div className="flex flex-col items-center p-1 pt-1 text-2xl ">
        <header className="text-center fs-2 p-2">
          Is it an appropriate video?
        </header>

        <div className="inline-flex p-2">
          <button className={buttonL}
            onClick={() => {
              localStorage.setItem("inappropriate", 1);
              buttonclicked("L");
            }}>
            NO
          </button>

          <br />

          <button className={buttonR}
            onClick={() => {
              localStorage.removeItem("inappropriate");
              buttonclicked("R");
            }}>
            YES
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center px-2 ">
        <div className="text-center p-1 ">
          <header className="text-center fs-2 text-2xl p-1">
            Rate the video quality
          </header>
          <header className="text-center fs-2 text-2xl p-1">
            Regardless of content
          </header>
        </div>

        <div className="p-2">
          {/* {[1, 2, 3, 4, 5].map((number) => (
            <button onClick={() => { qualitySave(number); handleClick(number) }} key={number}
              className={clicked[number]
                ? "bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                : "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"}>
              {number}
            </button>
          ))} */}
          <button onClick={() => { qualitySave(1); handleClick(1) }} key={1}
            className={clicked[1]
              ? "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded m-2 text-xl p-2"
              : "bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded m-2 text-xl p-2"}>
            1
          </button>
          <button onClick={() => { qualitySave(2); handleClick(2) }} key={2}
            className={clicked[2]
              ? "bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2 text-xl p-2"
              : "bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2 text-xl p-2"}>
            2
          </button>
          <button onClick={() => { qualitySave(3); handleClick(3) }} key={3}
            className={clicked[3]
              ? "bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-2 text-xl p-2"
              : "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded m-2 text-xl p-2"}>
            3
          </button>
          <button onClick={() => { qualitySave(4); handleClick(4) }} key={4}
            className={clicked[4]
              ? "bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 text-xl p-2"
              : "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 text-xl p-2"}>
            4
          </button>
          <button onClick={() => { qualitySave(5); handleClick(5) }} key={5}
            className={clicked[5]
              ? "bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded m-2 text-xl p-2"
              : "bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded m-2 text-xl p-2"}>
            5
          </button>
        </div>
      </div>

      <div className="p-1">
        <header className="text-center fs-2 text-xl p-2">
          How does the person feel?
        </header>

        <div className="emotion px-2 flex flex-row justify-center">
          {myOrder.map((index, none) => (<button onClick={() => { validSave(answeroption[index]); handleClick2(index) }}
            key={none}
            className={clicked2[index]
              ? "bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 text-base p-2"
              : "bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-2 text-base p-2"}>
            {localStorage.getItem(localstorageoption[index])}
          </button>))}
        </div>
      </div>

    </div>
  );
}
