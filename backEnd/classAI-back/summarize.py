from transformers import pipeline
from supabase import create_client, Client

# Connexion Supabase
url = "https://pxyqknxfvimxdcmplbff.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTMwMzg2MiwiZXhwIjoyMDQ0ODc5ODYyfQ.01dUZFDUgwG4NHijeblvIPIB-fBWZ5i_ch_BR2Kdl1w"
supabase: Client = create_client(url, key)

# Connexion au modèle de résumé
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def main():
    try:
        # Récupérer seulement les enregistrements sans résumé
        response = (
            supabase.table("classAI-data")
            .select("id, transcript, summary")  # Récupérer aussi la colonne 'summary'
            .is_("summary", None)  # Filtrer les enregistrements sans résumé
            .execute()
        )

        data = response.data

        for item in data:
            transcript = item['transcript']
            audio_id = item['id']
            
            if transcript:  # Vérifie qu'il y a un transcript avant de résumer
                print(f"\nRésumé de : {audio_id}")

                # Résumer le texte
                output = summarizer(transcript, max_length=130, min_length=30, do_sample=False)
                summary_text = output[0]['summary_text']
                print(f"Résumé : {summary_text}")

                # Mise à jour dans Supabase
                supabase.table("classAI-data").update({"summary": summary_text}).eq("id", audio_id).execute()
                print(f"Résumé enregistré pour l'audio ID {audio_id}")
            else:
                print(f"Aucun transcript pour l'audio ID {audio_id}, skipping.")

    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    main()