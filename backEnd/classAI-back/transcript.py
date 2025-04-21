import os
from supabase import create_client, Client
from deepgram import DeepgramClient, PrerecordedOptions

# Connexion Supabase
url = "https://pxyqknxfvimxdcmplbff.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTMwMzg2MiwiZXhwIjoyMDQ0ODc5ODYyfQ.01dUZFDUgwG4NHijeblvIPIB-fBWZ5i_ch_BR2Kdl1w"
supabase: Client = create_client(url, key)

# Connexion Deepgram
deepgram: DeepgramClient = DeepgramClient(api_key="f68dadf1fecb5a4a6f77e053ead1425995776351")

def main():
    try:
        # Récupérer seulement les fichiers qui n'ont pas encore de transcription
        response = (
            supabase.table("classAI-data")
            .select("id, file, transcript")  # Récupérer la colonne id file et transcript
            .is_("transcript", None)  # Filtrer pour les enregistrements sans transcription
            .execute()
        )

        data = response.data

        # Options pour la transcription
        options = PrerecordedOptions(
            model="nova-3",
            smart_format=True,
        )

        for item in data:
            AUDIO_URL = item['file']
            audio_id = item['id']
            print(f"\nTranscription de : {AUDIO_URL}")

            # Emballer l'URL dans un dict { "url": ... }
            source = { "url": AUDIO_URL }

            # Transcription
            response = deepgram.listen.rest.v("1").transcribe_url(source, options)
            transcript = response['results']['channels'][0]['alternatives'][0]['transcript']
            print(f"Transcription : {transcript}")

            # Mise à jour dans Supabase
            supabase.table("classAI-data").update({"transcript": transcript}).eq("id", audio_id).execute()
            print(f"Transcription enregistrée pour l'audio ID {audio_id}")

    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    main()