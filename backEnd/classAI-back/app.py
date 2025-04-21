from flask import Flask
from summarize import main as summarize_main
from transcript import main as transcript_main

app = Flask(__name__)


url = "https://pxyqknxfvimxdcmplbff.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTMwMzg2MiwiZXhwIjoyMDQ0ODc5ODYyfQ.01dUZFDUgwG4NHijeblvIPIB-fBWZ5i_ch_BR2Kdl1w"
deepgram_api_key = "f68dadf1fecb5a4a6f77e053ead1425995776351"

@app.route('/')
def index():
    try:
        transcript_main()
        summarize_main()
        return "Transcription et résumé terminés avec succès ✅ !!"
    except Exception as e:
        return f"Erreur pendant l'exécution : {e}"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True,use_reloader=True)
