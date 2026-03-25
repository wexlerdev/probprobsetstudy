import { useState, useEffect } from 'react'

const HASH = '3614e3639c0a98b1006a50ffe5744f054cf4499592fe8ef1b339601208e80066'
const SESSION_KEY = 'ps4_auth'

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === HASH) {
      setAuthed(true)
    }
    setChecking(false)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const h = await sha256(input.trim().toLowerCase())
    if (h === HASH) {
      sessionStorage.setItem(SESSION_KEY, HASH)
      setAuthed(true)
    } else {
      setError(true)
      setInput('')
    }
  }

  if (checking) return null
  if (authed) return children

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1612',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Source Serif 4', Georgia, serif",
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#221e1a',
        border: '1px solid #2e2924',
        borderRadius: '10px',
        padding: '40px',
        maxWidth: '360px',
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#8a7e6e',
          letterSpacing: '1.5px',
          marginBottom: '8px',
        }}>PROB AND COMPUTING</div>
        <h1 style={{
          fontSize: '22px',
          fontWeight: 700,
          color: '#f0e6d3',
          marginBottom: '24px',
          lineHeight: 1.3,
        }}>Study Guide</h1>
        <input
          type="password"
          value={input}
          onChange={e => { setInput(e.target.value); setError(false) }}
          placeholder="Password"
          autoFocus
          style={{
            width: '100%',
            padding: '10px 14px',
            background: '#1a1612',
            border: `1px solid ${error ? '#f25c54' : '#3a3530'}`,
            borderRadius: '6px',
            color: '#f0e6d3',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '14px',
            outline: 'none',
            marginBottom: '12px',
          }}
        />
        {error && (
          <div style={{
            color: '#f25c54',
            fontSize: '13px',
            marginBottom: '12px',
          }}>Incorrect password</div>
        )}
        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          background: '#d4a574',
          color: '#1a1612',
          border: 'none',
          borderRadius: '6px',
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
        }}>Enter</button>
      </form>
    </div>
  )
}
