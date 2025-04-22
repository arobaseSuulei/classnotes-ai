import React,{useState,useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {createClient} from "@supabase/supabase-js";
import NavBottom from "./components/NavBottom";
import Download from "./Download";


const supabase = createClient("https://pxyqknxfvimxdcmplbff.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMDM4NjIsImV4cCI6MjA0NDg3OTg2Mn0.cuq3c8ejHCSky7BcV1qlj76_QYWcYXYiAbvDolxN6Uk");


export default function Read() {





    function Go() {
        navigate("/home");


    }

    const navigate = useNavigate();

    const {id} = useParams(); // here we define parameters for getting the id allowed by react router dom
    console.log(id);


    const [things,setThings] = useState([]);



    useEffect(() => {
        getThings();
    }, [id]); // ici on passe l'id en paramètre pour pas perdre l'id lors de l'actualisation de la page




    async function getThings() {
        try{
            const { data: { user } } = await supabase.auth.getUser()
            const{data}= await supabase.from("classAI-data").select("*").eq("user_id",user.id).eq("id",id)
            setThings(data);
            console.log("data info:"+ data)
        }catch (e){
            console.log(e);
        }
    }


    // deleting the notes

    async function deleteNotes(){
        try{

            const {item}=await supabase .from("classAI-data").delete().eq("id",id)

        }catch(err){
            console.log(err);
        }
    }


    // supabase realtime here its for the realtime changes

    useEffect(() => {
        getThings();
        supabase.channel('classAI-data').on('postgres_changes',
            {event:"*",schema:"public",table:"classAI-data"},
            (playload)=>{
                getThings();
            }
        ).subscribe()
    }, []);

    return(


        <div className={' flex flex-col gap-4 '}>

            <div
                 className={'flex justify-between items-center  px-2 py-14'}>

                <Link to={'/home'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                </Link>


                <div className={'flex flex-col items-center justify-center gap-2'}>
                    <h1 className={'font-dela'}>{things[0]?.title}</h1>

                </div>

                <button onClick={async ()=>{
                    await deleteNotes();
                    await Go();
                }} className="rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>

                </button>
            </div>


            <div className={'py-6 sm:px-6'}>
                <p className={'text-black p-4 max-w-3xl mx-auto leading-relaxed'}>
                    {things[0]?.summary
                        ? things[0].summary
                        : <button type="button" className=" flex items-center gap-2 justify-center" disabled>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="mr-3 size-5 animate-spin ...">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"/>
                                </svg>


                            Transcription on working...
                        </button>

                    }
                </p>
            </div>


            <div className={' fixed  bottom-0 left-2 right-2   my-4 '}>
                <div className={"sm:mx-96"}>

                    <div>
                        <Download title={things[0]?.title} content={things[0]?.summary}/>
                    </div>

                </div>
            </div>

        </div>
    );
}
