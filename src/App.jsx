import { useState, useEffect } from "react"
import { BsSun, BsMoon } from "react-icons/bs"
import cat from "./assets/landing_cat.gif"
import "./App.css"

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }
  return (
    <button className="copy-btn" onClick={copy} aria-label="Copy to clipboard">
      {copied ? "copied" : "copy"}
    </button>
  )
}

function InstallBlock({ label, command }) {
  return (
    <div className="install-block">
      <span className="install-label">{label}</span>
      <div className="install-row">
        <code className="install-cmd">{command}</code>
        <CopyButton text={command} />
      </div>
    </div>
  )
}


function CatImage() {
  const [jumping, setJumping] = useState(false)
  function handleClick() {
    if (jumping) return
    setJumping(true)
    setTimeout(() => setJumping(false), 600)
  }
  return (
    <img
      src={cat}
      alt="neko pixel cat"
      className={`hero-cat${jumping ? " hero-cat--jump" : ""}`}
      onClick={handleClick}
    />
  )
}

export default function App() {
  const [dark, setDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  )

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light")
  }, [dark])

  return (
    <div className="page">
      <button
        className="theme-toggle"
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle theme"
      >
        {dark ? <BsSun size={15} /> : <BsMoon size={14} />}
      </button>

      {/* ── Split hero ── */}
      <section className="hero">
        <div className="hero-left">
          <CatImage />
        </div>

        <div className="hero-right">
          <h1 className="hero-title">neko</h1>
          <p className="hero-tagline">a small, fast coding agent for your terminal.</p>
          <a href="#download" className="hero-cta">get neko</a>
        </div>
      </section>

      {/* ── Download ── */}
      <section className="download" id="download">
        <h2 className="download-title">install</h2>
        <p className="download-sub">works best on macOS and Linux (for now)</p>

        <div className="install-list">
          <InstallBlock label="curl" command="curl -fsSL https://raw.githubusercontent.com/hasnain40247/neko-code/main/install.sh | sh" />
        </div>

      </section>

      <footer className="footer">
        <span className="footer-name">neko</span>
        <span className="footer-sep">·</span>
        <a href="https://github.com/hasnainsikora/gcloud-opencode" target="_blank" rel="noreferrer">
          github
        </a>
      </footer>
    </div>
  )
}
