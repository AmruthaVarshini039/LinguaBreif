import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Header from "./Header";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [fileType, setFileType] = useState("PDF");
  const [operation, setOperation] = useState("summarize");
  const [loading, setLoading] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [username, setUsername] = useState("");
  const [srcLang, setSrcLang] = useState("");
  const [tgtLang, setTgtLang] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
    else navigate("/login");
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const handleSubmit = async (opType) => {
    if (!file && !textInput.trim()) {
      alert("Please upload a file or enter text.");
      return;
    }

    if (opType === "translate" && srcLang === tgtLang) {
      alert("Source and target languages cannot be the same.");
      return;
    }

    setLoading(true);
    setResult("");

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("filetype", fileType.toLowerCase());
    formData.append("text_input", textInput);
    if (opType === "translate") {
      formData.append("src_lang", srcLang);
      formData.append("tgt_lang", tgtLang);
    }

    const url =
      opType === "summarize"
        ? "http://localhost:5000/summarize"
        : "http://localhost:5000/translate";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(opType === "summarize" ? data.summary : data.translated_text);
      } else {
        setResult(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const languageOptions = [
    "english",
    "hindi",
    "telugu",
    "tamil",
    "french",
    "german",
    "spanish",
    "chinese",
    "japanese",
    "korean",
    "bengali",
    "marathi",
    "gujarati",
    "malayalam",
    "punjabi",
    "urdu",
  ];

  return (
    <div className="dashboard-container">
      <Header />

      <main className="dashboard-main">
        <div className="welcome-box">
          <h1 className="welcome-title">Welcome, {username} 👋</h1>
          <p className="welcome-subtext">
            Let’s get started with summarizing or translating your content.
          </p>
        </div>

        <div className="upload-box">
          <label htmlFor="file-upload" className="upload-label">
            <div className="upload-circle">+</div>
            <p className="upload-text">Drop your file here</p>
          </label>
          <input id="file-upload" type="file" onChange={handleFileChange} />
          {file && <p className="file-name">📄 {file.name}</p>}
          <div className="link-upload">
            Is your doc online? <a href="#">Link Upload</a>
          </div>
        </div>

        <textarea
          className="text-input"
          placeholder="Or enter/paste text here (max 2000 words)..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          maxLength={20000}
          rows={6}
        ></textarea>

        <div className="options-row">
          <div className="option-group">
            <label htmlFor="fileTypeSelect">File Type:</label>
            <select
              id="fileTypeSelect"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
            >
              <option>PDF</option>
              <option>DOCX</option>
              <option>TXT</option>
              <option>Image</option>
              <option>Audio</option>
            </select>
          </div>

          <div className="option-group">
            <label htmlFor="operationSelect">Operation:</label>
            <select
              id="operationSelect"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            >
              <option value="summarize">Summarize</option>
              <option value="translate">Translate</option>
            </select>
          </div>

          {operation === "translate" && (
            <>
              <div className="option-group">
                <label htmlFor="srcLangSelect">Source Language:</label>
                <select
                  id="srcLangSelect"
                  value={srcLang}
                  onChange={(e) => setSrcLang(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  {languageOptions.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="option-group">
                <label htmlFor="tgtLangSelect">Target Language:</label>
                <select
                  id="tgtLangSelect"
                  value={tgtLang}
                  onChange={(e) => setTgtLang(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  {languageOptions.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <button
          className="submit-button"
          onClick={() => handleSubmit(operation)}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : operation === "summarize"
            ? "Summarize"
            : "Translate"}
        </button>

        {result && (
          <div className="output-box">
            <h3>{operation === "summarize" ? "Summary:" : "Translation:"}</h3>
            <p>{result}</p>
          </div>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 LinguaBrief. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
