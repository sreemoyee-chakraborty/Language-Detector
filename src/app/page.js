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
          'Detected language is not supported.'
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Language Detector</h1>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your content here..."
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={detectLanguage}
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Detect Language
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-lg text-center">
            <strong>Error:</strong> {error}
          </div>
        )}

        {detectedLanguage && !error && (
          <div className="mt-4 p-3 bg-green-100 text-green-600 rounded-lg text-center">
            <strong>Detected Language:</strong> {detectedLanguage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;



