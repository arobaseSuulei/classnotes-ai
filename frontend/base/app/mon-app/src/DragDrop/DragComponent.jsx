import { CustomDragDrop } from "./CustomContainer";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://pxyqknxfvimxdcmplbff.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMDM4NjIsImV4cCI6MjA0NDg3OTg2Mn0.cuq3c8ejHCSky7BcV1qlj76_QYWcYXYiAbvDolxN6Uk"
);

export default function DragComponent({ onFileUpload }) {
    const [ownerLicense, setOwnerLicense] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    function uploadFiles(f) {
        setIsUploading(true);
        setOwnerLicense([...ownerLicense, ...f]);

        // On ne prend que le premier fichier (ajustez si besoin de plusieurs fichiers)
        const fileObj = f[0];
        uploadToSupabase(fileObj.rawFile, fileObj.name);
    }

    async function uploadToSupabase(file, filename) {
        try {
            const timestamp = Date.now();
            const uniqueFileName = `${timestamp}_${filename}`;
            const filePath = `classnotes/${uniqueFileName}`;

            // Upload dans Supabase Storage
            const { data, error } = await supabase.storage
                .from("audios")
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) throw error;

            // Récupération de l'URL publique
            const { data: publicUrlData } = supabase.storage
                .from("audios")
                .getPublicUrl(filePath);

            // On envoie l'URL au parent
            onFileUpload(publicUrlData.publicUrl);
        } catch (error) {
            console.error("Erreur upload:", error.message);
            alert("Erreur lors de l'upload du fichier");
        } finally {
            setIsUploading(false);
        }
    }

    function deleteFile(indexImg) {
        const updatedList = ownerLicense.filter((ele, index) => index !== indexImg);
        setOwnerLicense(updatedList);
    }

    return (
        <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5">
            <div className="pb-[8px] border-b border-[#e0e0e0]">
                <h2 className="text-black text-[17px] font-[600]">
                    {isUploading ? "Upload en cours..." : "Drag and Drop Container"}
                </h2>
            </div>
            <CustomDragDrop
                ownerLicense={ownerLicense}
                onUpload={uploadFiles}
                onDelete={deleteFile}
                count={2}
                formats={["wav", "ogg"]}
                disabled={isUploading}
            />
        </div>
    );
}