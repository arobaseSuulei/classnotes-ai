import React, { useState } from "react";
import {Link} from "react-router-dom";
import ChatAI from "./ChatAI";

export default function NavBottom() {
    const [showChat, setShowChat] = useState(false);
    return (
        <>
            <div className="flex gap-12 items-center">
                <div style={{backgroundColor: '#1E1E1E'}}
                    className={' flex text-white items-center justify-center rounded-lg py-3 px-8 gap-2 border-[0.2px] border-gray-300 '}>
                    <span className={'rounded-full p-1.5  bg-red-600'}></span>
                    <Link to="/New" className={'font-dela'}>New project</Link>
                </div>
                <div className="flex items-center justify-center rounded-lg py-3 px-8 gap-2 border-[0.2px] border-gray-300  bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 cursor-pointer"
                    onClick={() => setShowChat(true)}>
                    <img className="w-6" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Google-gemini-icon.svg/1024px-Google-gemini-icon.svg.png"/>
                    <p className="text-white font-semibold">Ask AI</p>
                </div>
            </div>
            {showChat && <ChatAI onClose={() => setShowChat(false)} />}
        </>
    );
}