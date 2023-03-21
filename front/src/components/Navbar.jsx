import { useState } from "react";
import logo from '../images/logo.png'
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate()
    return (
        
        <div className="flex justify-between items-center shadow-md fixed z-50 top-0 right-0 left-0 bg-white" >
            <a href="http://emotiplay.com/">
                <img src={logo} className="w-64 p-2 z-50" />
            </a>

            <div>
                <button className="p-3 hover:border-x-2"
                    onClick={() => navigate('../enter')}>
                    HOME
                </button>
                <button className="p-3 hover:border-x-2"
                    onClick={() => navigate('../emotionlist')}>
                    DONOR
                </button>
                <button className="p-3 hover:border-x-2"
                    onClick={() => navigate('../checker/0')}>
                    CHECKER
                </button>
                <button className="p-3 hover:border-x-2"
                    onClick={() => window.open('https://www.emotiplay.com', '_blank')}>
                    ABOUT US
                </button>
                <button className="p-3 hover:border-x-2 mr-2"
                    onClick={() => window.open('http://emotiplay.com/contact-us/', '_blank')}>
                    CONTACT US
                </button>
            </div>

        </div>
    )
}