import { createContext, useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Context from './Context';
import Donor from "./pages/Donor";
import Checker from "./pages/Checker";
import Enter from "./pages/Enter";
import Admin from "./pages/Admin";
import EmotionEditor from "./pages/EmotionEditor";
import axios from "axios";
import Navbar from "./components/Navbar"
import Statistics from "./pages/Statistics";
import Preview from "./pages/Preview";
import Nonlogin from "./pages/Nonlogin";
import ContactUs from "./pages/Email";
import EmotionControl from "./pages/EmotionControl";
import Thankyou from "./components/Thankyou";
import Emotionlist from "./pages/Emotionlist";
export const Storage = createContext()

function App() {
  const values = Context()
  const [verifyId, setverifyId] = useState("")
  const [recheck,setrecheck] = useState(false)

  const verified = (email) => {
    axios.post('http://localhost:8639/user/checkID', { email: email })
      .then((response) => setverifyId(response.data.userId))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    const email = localStorage.getItem('email')
    verified(email)
  }, [])

  return (
    <Storage.Provider value={values}>
      <Navbar />  
      <Routes>
        <Route path="/" element={<ContactUs />}></Route>
        <Route path="/enter" element={verifyId == localStorage.getItem('id') ? < Enter /> : <Enter />}></Route>
        <Route path="/donor" element={verifyId == localStorage.getItem('id') ?<Donor /> : <Donor />}></Route>
        <Route path="/preview" element={verifyId == localStorage.getItem('id') ?<Preview />: <Preview /> }></Route>
        <Route path="/checker/:index" element={verifyId == localStorage.getItem('id') ?<Checker /> : <Checker />}></Route>
        <Route path="/admin" element={verifyId == localStorage.getItem('id') ?<Admin />: <Admin /> }></Route>
        <Route path="/EmotionControl" element={verifyId == localStorage.getItem('id') ?<EmotionControl /> : <EmotionControl />}></Route>
        <Route path="/EmotionEditor" element={verifyId == localStorage.getItem('id') ?<EmotionEditor /> : <EmotionEditor />}></Route>
        <Route path="/statistics" element={verifyId == localStorage.getItem('id') ?<Statistics /> : <Statistics />}></Route>
        <Route path="/thankyou" element={verifyId == localStorage.getItem('id') ?<Thankyou /> : <Thankyou />}></Route>
        <Route path="/emotionlist" element={verifyId == localStorage.getItem('id') ?<Emotionlist />: <Emotionlist /> }></Route>
      </Routes>
    </Storage.Provider >
  );
}

export default App;
