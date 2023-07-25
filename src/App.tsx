import React, { useState } from 'react';
import SeedPhraseInput from './components/SeedPhraseInput';
import { encrypt, decrypt, passwordToBip } from './utils/crypto'; // Вам нужно будет реализовать passwordToBip
import './App.css';

function App() {
  const [phraseWords, setPhraseWords] = useState<string[]>([]);
  const [keyWords, setKeyWords] = useState<string[]>([]);
  const [result, setResult] = useState<string>('');
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Сообщение будет отображаться в течение 2 секунд
  };
  const handleEncrypt = () => {
    const key = isPassword ? passwordToBip(password) : keyWords.join(' ');
    console.log(key);
    setResult(encrypt(phraseWords.join(' '), key));
  };

  const handleDecrypt = () => {
    const key = isPassword ? passwordToBip(password) : keyWords.join(' ');
    console.log(key);
    setResult(decrypt(phraseWords.join(' '), key));
  };

  const handleSwap = () => {
    setPhraseWords(result.length ? result.split(' ') : []);
    setResult(phraseWords.join(' '));
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">SeedCrypt</h1>
        <h2 className="subtitle">Encrypt/decrypt your seed phrase by BIP39 key!</h2>
        <p className="subtitle small"><b>OpenSource:</b> if you don't trust this app - deploy it by yourself:</p>
        <p className="subtitle"><a href={'#'} onClick={() => window.open('https://github.com/seedcrypt/app')}>github.com/seedcrypt/app</a></p>
        <div className="input-section">
          <h2 className="subtitle">Seed Phrase:</h2>
          <SeedPhraseInput words={phraseWords} onChange={setPhraseWords} />
        </div>
        <div className="input-section">
          <h2 className="subtitle">Key:</h2>
          <div className="tabs">
            <button
              className={`tab ${!isPassword ? 'active' : ''}`}
              onClick={() => setIsPassword(false)}
            >
              Use BIP words
            </button>
            <button
              className={`tab ${isPassword ? 'active' : ''}`}
              onClick={() => setIsPassword(true)}
            >
              Use password
            </button>
          </div>
          {isPassword ? (
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          ) : (
            <SeedPhraseInput words={keyWords} onChange={setKeyWords} />
          )}
        </div>
        <div className="button-section">
          <button className="button" onClick={handleEncrypt}>Encrypt</button>
          <button className="button" onClick={handleDecrypt}>Decrypt</button>
          <button className="button" onClick={handleSwap}>
            🔃
          </button>
        </div>
        <div className="result-section">
          <h2 className="subtitle">Result:</h2>
          <div className="result" onClick={handleCopy}>
            {result.split(' ').map((word, index) => (
              <span key={index} className="result-word">{word}</span>
            ))}
            {isCopied && <span className="copied-message">Copied to clipboard</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
