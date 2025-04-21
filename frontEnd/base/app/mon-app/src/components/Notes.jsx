import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {createClient} from "@supabase/supabase-js";



const supabase = createClient("https://pxyqknxfvimxdcmplbff.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMDM4NjIsImV4cCI6MjA0NDg3OTg2Mn0.cuq3c8ejHCSky7BcV1qlj76_QYWcYXYiAbvDolxN6Uk");

export default function Notes() {

    const [notes, setNotes] = useState([]);


    useEffect(() => {
        getNotes();
    }, []);

    async function getNotes(){
        try {
            const { data: { user } } = await supabase.auth.getUser()
            const {data}=await supabase.from("classAI-data").select("*").eq("user_id",user.id)
            console.log(user.id)
            setNotes(data)
            console.log(data)

        }catch(err){
            console.log(err);
        }
    }


    // audio player
    const AudioPlayer = ({ src }) => {
        return (
            <div className="p-4 w-20 sm:w-80 rounded-xl ">
                <audio controls className="sm:w-full"> {/* Assure que l'audio s'adapte à la largeur du parent */}
                    <source src={src} type="audio/mpeg" />
                    Votre navigateur ne supporte pas l'élément audio.
                </audio>
            </div>
        );
    };



    // supabase realtime here its for the realtime changes

    useEffect(() => {
        getNotes();
        supabase.channel('classAI-data').on('postgres_changes',
            {event:"*",schema:"public",table:"classAI-data"},
            (playload)=>{
                getNotes();
            }
        ).subscribe()
    }, []);


    return (
        // parcours de toutes les notes

        <div className={''}>
            {notes.map((item, index) => (
                <Link to={`/Read/${item?.id}`}>
                <div key={index} className="rounded-lg hover:bg-gray-100  flex flex-col border-b-[0.2px] border-gray-300
                px-6 py-6 gap-2">

                    <h1 className="font-semibold">{item?.title}</h1>
                    <p className="text-sm opacity-60">{item?.description}</p>

                    <div className="flex items-center sm:justify-between">

                        <p style={{backgroundColor: '#1E1E1E'}}
                           className="font-dela text-xs rounded-lg p-2 text-white">
                            Read
                        </p>

                        {/*here for the audio*/}


                        <div className="  ">
                            <AudioPlayer src={item?.file}/>
                        </div>


                    </div>

                </div>
                </Link>
            ))}
        </div>

    );
}