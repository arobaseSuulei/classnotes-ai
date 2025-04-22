import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import './index.css';
import Welcome from "./Welcome";
import Home from "./Home";
import Project from "./Project";
import Read from "./Read";
import Landingpage from "./Landingpage";
//import {Auth} from "@supabase/auth-ui-react";

import {ThemeSupa} from "@supabase/auth-ui-shared";
import {useEffect, useState} from "react";

import {createClient} from "@supabase/supabase-js";
import Auth from "./Auth";


const supabase = createClient("https://pxyqknxfvimxdcmplbff.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMDM4NjIsImV4cCI6MjA0NDg3OTg2Mn0.cuq3c8ejHCSky7BcV1qlj76_QYWcYXYiAbvDolxN6Uk");


export default function App() {

    useEffect(() => {
        document.title = "ClassNotesAI";
    }, []);
    const [session, setSession] = useState(null)

    useEffect(() => {
        // Vérifie la session au chargement
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        // Écoute les changements de session (login/logout)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <div  className={''}>
            <Router>

                <Routes>
                    <Route path="/" element={<Landingpage/>}/> {/* La Landingpage en premier */}
                    {session ? (
                        <>
                            <Route path="/New" element={<Project/>}/>
                            <Route path="/Read/:id" element={<Read/>}/>
                            <Route  path={"/home"} element={<Home/>}/>
                        </>
                    ) : (
                        <Route
                            path="*"
                            element={
                                <div className="flex justify-center items-center h-screen">
                                    <Auth
                                        supabaseClient={supabase}
                                        appearance={{ theme: ThemeSupa }}
                                        providers={['google']} // ou ['github', 'google'] selon tes besoins
                                    />
                                </div>
                            }
                        />
                    )}
                </Routes>
            </Router>
        </div>
    );
}

//  <Route path="/" element={<Landingpage/>}/>