import ScrollRevealItem from "./components/ScrollRevealItem";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function Welcome() {

const [bottomSheet, setBottomSheet] = useState(false)

    function handleBottomSheet() {
    setBottomSheet(!bottomSheet)
        console.log(bottomSheet)
    }


    return(
        <div className={'flex flex-col justify-between min-h-screen'}>



            <div className={'flex items-center justify-center flex-1'}>
                <ScrollRevealItem delay={0.4}>
                    <h1 className={'flex items-center justify-center font-dela text-3xl'}>ClassNotesAI</h1>

                </ScrollRevealItem>
            </div>

            <button onClick={handleBottomSheet} style={{backgroundColor: '#1E1E1E'}}
                    className={'sm:mx-80 text-white p-4 m-4 rounded-lg font-poppins'}>
                <Link to={"/home"}>Take a quick tour</Link>
            </button>
        </div>
    );
}