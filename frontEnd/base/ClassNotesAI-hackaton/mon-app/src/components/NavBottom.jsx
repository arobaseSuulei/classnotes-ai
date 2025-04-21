import React from "react";
import {Link} from "react-router-dom";

export default function NavBottom() {
    return (


        <div style={{backgroundColor: '#1E1E1E'}}
             className={' flex text-white items-center justify-center rounded-lg py-3 px-8 gap-2 border-[0.2px] border-gray-300 '}>




            <span className={'rounded-full p-1.5  bg-red-600'}></span>
            <a className={'font-dela'}>New project</a>


        </div>

    );
}