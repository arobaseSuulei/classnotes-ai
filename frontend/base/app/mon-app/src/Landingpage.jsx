import React from 'react';
import ScrollRevealItem from "./components/ScrollRevealItem";
import {Link} from "react-router-dom";

export default function Landingpage(){



    return (
        <div className={'bg-[#F2EFE4]'}>
            {/*navbar*/}

            <ScrollRevealItem delay={0.6}>
                <div className={'flex justify-between items-center'}>
                    <a>
                        <img className={'w-24 rounded-full'} src={'logo.png'} alt="logo"/>

                    </a>

                    <Link to={'/home'}><a
                        className={'p-2 rounded-full bg-green-700 text-white font-quicksand font-semibold'}> Connexion</a></Link>

                </div>
            </ScrollRevealItem>


            {/* content */}

            <ScrollRevealItem delay={0.7}>
                <div className={'flex flex-col gap-12 items-center justify-center mt-36'}>
                    <p className={'sm:text-4xl text-3xl text-center font-semibold text-green-700'}>Turn lectures into
                        clarity w/ ClassNotes Ai</p>

                    <nav className={'flex flex-col items-center justify-center'}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor"
                             className="size-6 animate-bounce text-green-700">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"/>
                        </svg>
                        <Link to={'/home'}>
                            <button className={'rounded-full p-2 bg-green-700 text-white'}>start here</button>
                        </Link>
                    </nav>

                </div>
            </ScrollRevealItem>


        </div>


    );
}