#LinguaBreif
An **AI-powered Document Summarizer** with optional translation support.  
Built using **React (frontend)** and **Flask (backend)** with a clean and modern UI.  

---

## 🚀 Features

- 📑 **Summarization** – Upload PDF, DOCX, TXT, or paste text, and get a concise summary.  
- 🌍 **Translation (UI only)** – Translate between languages (backend placeholder for demo).  
- 🔒 **Authentication** – Secure **signup/login** with SQLite database.  
- 🎨 **Modern UI** – Responsive design, gradient backgrounds, and animated interactions.  
- 📱 **Mobile-friendly** – Works seamlessly across devices.  

---

## 📂 Project Structure

my-app/
│
├── frontend/ # React Vite app (UI)
│ ├── src/
│ │ ├── App.jsx
│ │ ├── Dashboard.jsx
│ │ ├── Services.jsx
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ ├── Header.jsx
│ │ └── styles (CSS files)
│ ├── public/
│ │ └── logo.png
│ └── package.json
│
├── backend/ # Flask app (API + Database)
│ ├── app.py # Flask server
│ ├── users.db # SQLite database
│ └── uploads/ # Uploaded files
│
└── README.md

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo
```bash
git clone https://github.com/YOUR-USERNAME/linguabrief.git
cd linguabrief
2️⃣ Backend Setup (Flask)
bash
Copy code
cd backend
python -m venv .venv
.venv\Scripts\activate   # On Windows
source .venv/bin/activate # On Mac/Linux

pip install -r requirements.txt
python app.py
👉 Backend will start at: http://localhost:5000

3️⃣ Frontend Setup (React + Vite)
bash
Copy code
cd frontend
npm install
npm run dev
👉 Frontend will start at: http://localhost:5173

4️⃣ Run Both Together
At project root:

bash
Copy code
npm run start-all
👉 This will run frontend + backend concurrently.

🧪 Demo Credentials
You can create an account via Signup or use an existing test account:

makefile
Copy code
Email: test@linguabrief.com
Password: 12345
📸 Screenshots
🔐 Login

🏠 Dashboard

📑 Summarization

🛠️ Tech Stack
Frontend: React (Vite), React Router, CSS3

Backend: Flask, SQLite3, NLTK

Other: PyPDF2, python-docx

🚀 Future Improvements
Add real-time AI-based summarization with HuggingFace Transformers.

Implement full translation API.

Add user profile & history of summaries.

npm run start-all: Runs both the backend and frontend concurrently.
<img width="960" height="884" alt="image" src="https://github.com/user-attachments/assets/8bcf699b-579d-4cb7-8b7f-ce1228460e65" />
<img width="952" height="872" alt="image" src="https://github.com/user-attachments/assets/e9bc72ae-ae8f-464a-a82a-0f542cab824e" />
<img width="940" height="894" alt="image" src="https://github.com/user-attachments/assets/f14676af-f9df-45fe-9394-115206b18d57" />
<img width="649" height="905" alt="image" src="https://github.com/user-attachments/assets/c7bc1277-8272-4cc6-8b9a-222214f87e76" />



