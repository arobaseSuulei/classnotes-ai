// Auth.jsx
import { useState } from 'react'

import {createClient} from "@supabase/supabase-js";
const supabase = createClient("https://pxyqknxfvimxdcmplbff.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMDM4NjIsImV4cCI6MjA0NDg3OTg2Mn0.cuq3c8ejHCSky7BcV1qlj76_QYWcYXYiAbvDolxN6Uk");

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) alert('Erreur login : ' + error.message)
            else alert('Connecté !')
        } else {
            const { error } = await supabase.auth.signUp({ email, password })
            if (error) alert('Erreur sign-up : ' + error.message)
            else alert('Inscription réussie ! Vérifie ta boite mail .')
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto flex flex-col gap-8">
            <h2 className="text-xl font-bold text-center mb-2">{isLogin ? 'Welcome back' : 'Inscription'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input  type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" className="rounded-lg border p-3 w-full" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border p-3 rounded-lg w-full" />
                <button type="submit" style={{backgroundColor:'#1E1E1E'}} className="bg-blue-500 text-white p-2 w-full rounded-lg">
                    {isLogin ? 'Continue' : 'S’inscrire'}
                </button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)} className="mt-4  underline">
                {isLogin ? "Pas de compte ? S’inscrire" : "Déjà un compte ? Se connecter"}
            </button>
        </div>
    )
}
