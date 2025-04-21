import NavBottom from "./components/NavBottom";
import {Link} from "react-router-dom";
import "@radix-ui/themes/styles.css";
import Navigation from "./components/Navigation";
import {Theme} from "@radix-ui/themes";
import React from "react";


export default function Home() {
    return(
        <div className={'bg-white py-6 px-6 flex flex-col gap-4'}>


            <div className={'flex justify-between items-center'}>
                <Link to={'/home'}>
                    <img className={'w-24 rounded-full'} src={'logo.png'} alt="logo"/>
                </Link>



            </div>


            <div>
                <Theme>
                <div className={'sm:mx-64'}><Navigation/></div>
                </Theme>
            </div>


            <div className={' fixed  bottom-0 left-2 right-2   my-4 '}>
                <div className={"sm:mx-96"}>
                    <Link to={'/New'}><NavBottom/></Link>
                </div>
            </div>
        </div>
    );
}