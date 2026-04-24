import { useState, useCallback } from 'react'
import { cesarEncrypt, cesarDecrypt, vigenereEncrypt, vigenereDecrypt } from './ciphers'
import './App.css'

type CipherMode = 'cesar' | 'vigenere'
type Direction = 'encrypt' | 'decrypt'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button className="copy-btn" onClick={handleCopy} disabled={!text}>
      {copied ? '✓ Copiado' : 'Copiar'}
    </button>
  )
}

export default function App() {
  const [mode, setMode] = useState<CipherMode>('cesar')
  const [direction, setDirection] = useState<Direction>('encrypt')
  const [inputText, setInputText] = useState('')
  const [shift, setShift] = useState(3)
  const [key, setKey] = useState('')

  const output = useCallback(() => {
    if (!inputText) return ''
    if (mode === 'cesar') {
      return direction === 'encrypt'
        ? cesarEncrypt(inputText, shift)
        : cesarDecrypt(inputText, shift)
    } else {
      return direction === 'encrypt'
        ? vigenereEncrypt(inputText, key)
        : vigenereDecrypt(inputText, key)
    }
  }, [inputText, mode, direction, shift, key])

  const result = output()

  return (
    <div className="app">
      {/* Background grid */}
      <div className="bg-grid" aria-hidden="true" />

      {/* Header */}
      <header className="header">
        <div className="header-tag">CIFRADO CLÁSICO</div>
        <h1 className="title">
          CIPHER<span className="title-accent">LAB</span>
        </h1>
        <p className="subtitle">César &amp; Vigenère — Conversión de texto</p>
      </header>

      {/* Main panel */}
      <main className="panel">

        {/* Cipher selector */}
        <div className="selector-row">
          <div className="selector-group">
            <button
              className={`selector-btn ${mode === 'cesar' ? 'active' : ''}`}
              onClick={() => setMode('cesar')}
            >
              <span className="btn-icon">Ⅰ</span>
              César
            </button>
            <button
              className={`selector-btn ${mode === 'vigenere' ? 'active' : ''}`}
              onClick={() => setMode('vigenere')}
            >
              <span className="btn-icon">Ⅱ</span>
              Vigenère
            </button>
          </div>

          <div className="direction-toggle">
            <button
              className={`dir-btn ${direction === 'encrypt' ? 'active' : ''}`}
              onClick={() => setDirection('encrypt')}
            >
              ↑ Cifrar
            </button>
            <button
              className={`dir-btn ${direction === 'decrypt' ? 'active' : ''}`}
              onClick={() => setDirection('decrypt')}
            >
              ↓ Descifrar
            </button>
          </div>
        </div>

        {/* Algorithm description */}
        <div className="algo-info">
          {mode === 'cesar' ? (
            <p>
              <strong>Cifrado César:</strong> desplaza cada letra del alfabeto en{' '}
              <em>n</em> posiciones. Implementado como puerto directo del código C++.
            </p>
          ) : (
            <p>
              <strong>Cifrado Vigenère:</strong> usa una clave de texto para aplicar
              múltiples desplazamientos según cada carácter de la clave.
            </p>
          )}
        </div>

        {/* Params */}
        <div className="params-row">
          {mode === 'cesar' ? (
            <label className="param-label">
              <span>Desplazamiento (shift)</span>
              <div className="shift-control">
                <button
                  className="shift-btn"
                  onClick={() => setShift(s => s - 1)}
                >−</button>
                <input
                  type="number"
                  className="shift-input"
                  value={shift}
                  onChange={e => setShift(parseInt(e.target.value) || 0)}
                />
                <button
                  className="shift-btn"
                  onClick={() => setShift(s => s + 1)}
                >+</button>
              </div>
            </label>
          ) : (
            <label className="param-label">
              <span>Clave (key)</span>
              <input
                type="text"
                className="key-input"
                placeholder="Ej: SECRET"
                value={key}
                onChange={e => setKey(e.target.value)}
                spellCheck={false}
              />
            </label>
          )}
        </div>

        {/* IO columns */}
        <div className="io-columns">
          <div className="io-box">
            <div className="io-header">
              <span className="io-label">ENTRADA</span>
              <button
                className="clear-btn"
                onClick={() => setInputText('')}
                disabled={!inputText}
              >
                Limpiar
              </button>
            </div>
            <textarea
              className="io-textarea"
              placeholder="Escribe o pega tu texto aquí..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              spellCheck={false}
            />
            <div className="io-footer">
              <span className="char-count">{inputText.length} caracteres</span>
            </div>
          </div>

          <div className="arrow-col" aria-hidden="true">
            <div className="arrow-label">
              {direction === 'encrypt' ? 'CIFRADO' : 'DESCIFRADO'}
            </div>
            <div className="arrow">→</div>
            <div className="cipher-badge">
              {mode === 'cesar' ? `+${shift}` : key || '???'}
            </div>
          </div>

          <div className="io-box output">
            <div className="io-header">
              <span className="io-label">SALIDA</span>
              <CopyButton text={result} />
            </div>
            <div className="io-result">
              {result || <span className="placeholder">El resultado aparecerá aquí...</span>}
            </div>
            <div className="io-footer">
              <span className="char-count">{result.length} caracteres</span>
            </div>
          </div>
        </div>

        {/* Alphabet visualization for César */}
        {mode === 'cesar' && (
          <div className="alphabet-vis">
            <div className="alph-row">
              {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((ch, i) => (
                <div key={ch} className="alph-cell original">
                  <div className="alph-orig">{ch}</div>
                  <div className="alph-shifted">
                    {String.fromCharCode(((i + shift % 26 + 26) % 26) + 65)}
                  </div>
                </div>
              ))}
            </div>
            <div className="alph-legend">
              <span className="leg-orig">● Original</span>
              <span className="leg-shifted">● Desplazado</span>
            </div>
          </div>
        )}

        {/* Vigenere key table preview */}
        {mode === 'vigenere' && key && (
          <div className="key-vis">
            <div className="key-vis-label">Mapeo de clave</div>
            <div className="key-chars">
              {key.replace(/[^a-zA-Z]/g, '').toUpperCase().split('').map((ch, i) => (
                <div key={i} className="key-char-cell">
                  <div className="kc-letter">{ch}</div>
                  <div className="kc-shift">+{ch.charCodeAt(0) - 65}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <span>Algoritmos portados desde C++ · TypeScript + React · Deploy via Netlify</span>
      </footer>
    </div>
  )
}
