# 📚 ClassNotes Ai

**ClassNotes Ai** est une application qui transforme les **cours oraux** en **résumés intelligents**, accessibles en quelques secondes.  
Elle est pensée pour les étudiants, les enseignants, ou toute personne souhaitant **revenir facilement sur un contenu audio dense.**

DEMO: https://youtu.be/kS9JS3TwqLo

---

## 🧠 Contexte

> Prendre des notes à la volée pendant un cours ou une conférence, c’est souvent stressant et imprécis.  
> Avec **ClassNotes Ai**, on automatise la prise de notes grâce à la transcription et au résumé par intelligence artificielle.

Imagine : tu enregistres ton cours, tu l’envoies à l’application, et hop — tu obtiens un résumé clair, structuré, et prêt à être relu.

---

## 🚀 Fonctionnalités

- 🎤 **Transcription automatique** de cours audio (Deepgram)
- 📝 **Résumé intelligent** avec NLP (modèle BART)
- 💾 Sauvegarde et affichage dans une interface simple (React + Supabase)
- 📱 Interface responsive, pensée pour être utilisée sur mobile après un cours

---

## 🛠️ Stack technique

- **Frontend** : React, Tailwind css
- **Backend** : Flask
- **API de transcription** : Deepgram
- **Résumé** : BART
- **Base de données** : Supabase

---

## ⚙️ Installation rapide

Le frontend est déjà déployé sur Vercel — pas besoin de le lancer en local si tu veux simplement tester l’app côté client.
https://pixelblue-hackaton.vercel.app/

### 🔹 Frontend

```bash
cd frontend/base/app/mon-app
npm install
npm start
```

### 🔹 BackEnd --- python 3.10+


### sous macOS/ Linux

```bash
cd backend/model
python3 -m venv venv
source venv/bin/activate

# installer les dépendances via requirements.txt
pip install -r requirements.txt

python3 app.py

```


### sous windows
```bash
cd backend/model
# créer l'environnement virtuel
python -m venv venv
venv\Scripts\activate

# installer les dépendances via requirements.txt
pip install -r requirements.txt

#lancer le serveur
flask-run  #ou python3 app.py

```


## 👥 Contributeurs

- **Diallo Souleymane** - _FrontEnd & ai_ - (https://github.com/arobaseSuulei)
-  **Mohamed Ismail Mekki Berrada** - _backEnd dev_ -https://github.com/MB-ismail)
- **Ouadoud Ayoub** - _backEnd dev_

Merci à toutes les personnes qui contribueront à l’avenir !


🔁 Actualiser le serveur http://127.0.0.1:5000/ à chaque lancement d'un nouveau projet (confère l'app)




