import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import DragComponent from "./DragDrop/DragComponent";

const supabase = createClient(
    "https://pxyqknxfvimxdcmplbff.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMDM4NjIsImV4cCI6MjA0NDg3OTg2Mn0.cuq3c8ejHCSky7BcV1qlj76_QYWcYXYiAbvDolxN6Uk"
);

export default function Project() {
    const navigate = useNavigate();
    const [fileUrl, setFileUrl] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function sendData() {
        if (!fileUrl || !name || !description) {
            alert("Veuillez remplir tous les champs et uploader un fichier.");
            return;
        }

        setIsLoading(true);
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            const { data } = await supabase.from("classAI-data").insert([
                {
                    title: name,
                    description: description,
                    user_id: user.id,
                    file: fileUrl,
                },
            ]);
            console.log("Données insérées avec succès:", data);
            navigate("/home");
        } catch (e) {
            console.error("Erreur lors de l'insertion:", e);
            alert("Une erreur est survenue.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="py-6 px-6 flex flex-col gap-8 min-h-screen bg-gray-50">
            {/* Header */}
            <Link to={'/home'}>
                <img className={'w-24 rounded-full'} src={'logo.png'} alt="logo"/>
            </Link>

            {/* Form card */}
            <div className="bg-white rounded-xl shadow-md px-6 py-8 w-full max-w-lg mx-auto flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Créer une note
                </h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Nom de la note</label>
                        <input
                            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Type here..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600 mb-1 block">Description</label>
                        <input
                            className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Type here..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="pt-2">
                        <DragComponent onFileUpload={setFileUrl} />
                    </div>
                </div>

                <button
                    className={`mt-4 w-full bg-green-700 text-white py-2 rounded-lg font-semibold transition hover:bg-gray-900 ${
                        isLoading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                    onClick={sendData}
                    disabled={isLoading}
                >
                    {isLoading ? "Envoi en cours..." : "Envoyer"}
                </button>
            </div>

            {/* Bouton Start en bas */}

        </div>
    );
}
