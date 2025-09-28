from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import sqlite3
import nltk
from nltk.tokenize import sent_tokenize

# -----------------------------
# Ensure NLTK punkt + punkt_tab are available
# -----------------------------
for pkg in ["punkt", "punkt_tab"]:
    try:
        nltk.data.find(f"tokenizers/{pkg}")
    except LookupError:
        nltk.download(pkg)

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# -----------------------------
# Database Setup
# -----------------------------
DB_NAME = "users.db"

def init_db():
    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute(
            """CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )"""
        )
        conn.commit()

init_db()

# -----------------------------
# Summarizer Function
# -----------------------------
def simple_summarizer(text, max_sentences=7):
    """
    Split into sentences and return the first N.
    Fallback: if sentence tokenizer fails, return first 500 chars.
    """
    try:
        sentences = sent_tokenize(text)
        summary = " ".join(sentences[:max_sentences])
        return summary if summary else text[:500]
    except Exception as e:
        print("❌ Summarizer error:", e)
        return text[:500]

# -----------------------------
# File Extraction Helpers
# -----------------------------
def extract_text_from_pdf(filepath):
    from PyPDF2 import PdfReader
    reader = PdfReader(filepath)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text.strip()

def extract_text_from_docx(filepath):
    import docx
    doc = docx.Document(filepath)
    text = "\n".join([p.text for p in doc.paragraphs])
    return text.strip()

# -----------------------------
# Routes
# -----------------------------
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"message": "All fields required"}), 400

    try:
        with sqlite3.connect(DB_NAME) as conn:
            c = conn.cursor()
            c.execute(
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                (username, email, password),
            )
            conn.commit()
        return jsonify({"message": "Signup successful"})
    except sqlite3.IntegrityError:
        return jsonify({"message": "Email already exists"}), 400

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    with sqlite3.connect(DB_NAME) as conn:
        c = conn.cursor()
        c.execute("SELECT username FROM users WHERE email=? AND password=?", (email, password))
        row = c.fetchone()

    if row:
        return jsonify({"message": "Login successful", "username": row[0]})
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        text_input = request.form.get("text_input", "")
        file = request.files.get("file")
        filetype = request.form.get("filetype", "txt").lower()

        text = ""

        if text_input.strip():
            text = text_input
        elif file:
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(filepath)

            if filetype == "pdf":
                text = extract_text_from_pdf(filepath)
            elif filetype == "docx":
                text = extract_text_from_docx(filepath)
            elif filetype == "txt":
                text = file.read().decode("utf-8")

        if not text.strip():
            return jsonify({"error": "No text found in input"}), 400

        summary = simple_summarizer(text, max_sentences=7)
        return jsonify({"summary": summary})

    except Exception as e:
        print("❌ Error in /summarize:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/translate", methods=["POST"])
def translate():
    # Dummy translation
    return jsonify({"translated_text": "⚠️ Translation feature not implemented yet."})

# -----------------------------
# Run the App
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
