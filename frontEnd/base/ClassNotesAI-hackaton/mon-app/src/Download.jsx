import { jsPDF } from "jspdf";
import React from "react";

export default function Download({ title, content }) {
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(title || "Titre de la note", 10, 10);

        doc.setFontSize(12);
        const lines = doc.splitTextToSize(content || "Contenu vide", 180);
        doc.text(lines, 10, 20);

        doc.save(`${title || "note"}.pdf`);
    };

    return (
        <button
            onClick={exportPDF}
            style={{ backgroundColor: '#1E1E1E' }}
            className='flex text-white items-center justify-center rounded-lg py-3 px-8 gap-2 border-[0.2px] border-gray-300 w-full'
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
            </svg>
            <span className='font-dela'>Download</span>
        </button>
    );
}
