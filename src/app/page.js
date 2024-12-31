"use client"
import { useState } from 'react';
import { franc } from 'franc';

// Map of language codes to names
const languageMap = {
  hin: 'Hindi',
  eng: 'English',
  fra: 'French',
  spa: 'Spanish',
  zho: 'Chinese',
  ara: 'Arabic',
  deu: 'German',
  rus: 'Russian',
  jpn: 'Japanese',
  ita: 'Italian',
};

const Home = () => {
  const [inputText, setInputText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [error, setError] = useState(null);

  const detectLanguage = () => {
    try {
      setError(null);

      if (!inputText.trim()) {
        setError('Please enter some text to detect the language.');
        return;
      }

      const langCode = franc(inputText);

      if (langCode === 'und') {
        setError('Unable to detect language. Please try with more text.');
        setDetectedLanguage(null);
        return;
      }

      if (!languageMap[langCode]) {
        setError(
          'Detected language is not supported. Supported languages are: Hindi, English, French, Spanish, Chinese, Arabic, German, Russian, Japanese, and Italian.'
        );
        setDetectedLanguage(null);
        return;
      }

      setDetectedLanguage(languageMap[langCode]);
    } catch (err) {
      setError('An error occurred while detecting the language.');
      setDetectedLanguage(null);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Language Detector</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your content here..."
        rows={5}
        style={{
          marginBottom: '10px',
          display: 'block',
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />
      <button
        onClick={detectLanguage}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#007BFF',
          color: '#fff',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Detect Language
      </button>

      {error && (
        <div style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {detectedLanguage && !error && (
        <div style={{ marginTop: '20px', color: 'green', textAlign: 'center' }}>
          <strong>Detected Language:</strong> {detectedLanguage}
        </div>
      )}
    </div>
  );
};

export default Home;



