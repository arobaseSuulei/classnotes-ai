# Utilise l'image officielle de Python comme base
FROM python:3.11-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier des dépendances dans le conteneur
COPY requirements.txt /app/

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste de l'application dans le conteneur
COPY . /app/

# Exposer le port que Flask va utiliser
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["python3", "app.py"]
