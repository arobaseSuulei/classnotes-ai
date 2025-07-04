from flask import Flask, request, jsonify
from summarize import main as summarize_main
from transcript import main as transcript_main
from openai import OpenAI

app = Flask(__name__)


url = "https://pxyqknxfvimxdcmplbff.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTMwMzg2MiwiZXhwIjoyMDQ0ODc5ODYyfQ.01dUZFDUgwG4NHijeblvIPIB-fBWZ5i_ch_BR2Kdl1w"
deepgram_api_key = "f68dadf1fecb5a4a6f77e053ead1425995776351"

@app.route('/')
def index():
    try:
        transcript_main()
        summarize_main()
        return "Transcription et résumé terminés avec succès ✅"
    except Exception as e:
        return f"Erreur pendant l'exécution : {e}"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    if not user_message:
        return jsonify({'error': 'Message manquant'}), 400
    try:
        client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key="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",
        )
        completion = client.chat.completions.create(
            extra_headers={
                # "HTTP-Referer": "<YOUR_SITE_URL>",
                # "X-Title": "<YOUR_SITE_NAME>",
            },
            extra_body={},
            model="openrouter/cypher-alpha:free",
            messages=[
                {"role": "user", "content": user_message}
            ]
        )
        ai_response = completion.choices[0].message.content
        return jsonify({'response': ai_response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, use_reloader=False)
