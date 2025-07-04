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

                <nav className={'flex gap-2 items-center'}>
                    <a className={'text-xs font-poppins'}>connecté</a>
                    <img className={'rounded-full w-10'} src={'user.png'} alt="user"/>
                </nav>



            </div>


            <div>
                <Theme>
                <div className={'sm:mx-64'}><Navigation/></div>
                </Theme>
            </div>


            <div className={' fixed  bottom-0 left-2 right-2   my-4 '}>
                <div className={"sm:mx-96"}>
                    <NavBottom/>
                </div>
            </div>
        </div>
    );
}