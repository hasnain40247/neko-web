import { useState, useEffect } from "react"
import { BsSun, BsMoon } from "react-icons/bs"
import cat from "./assets/landing_cat.gif"
import imgLandingPage from "./assets/landing_page.png"
import imgChat from "./assets/chat.png"
import imgEditTool from "./assets/edittool.png"
import imgModelSelection from "./assets/model-selection.png"
import imgSubagents from "./assets/subagents.png"
import imgHistoryGraph from "./assets/history-graph.png"
import imgCreateAgent from "./assets/create-agent.png"
import imgSkills from "./assets/skills.png"
import imgMcps from "./assets/mcps.png"
import imgThemeSelection from "./assets/theme_selection.png"
import imgBranch from "./assets/branch.png"
import "./App.css"

const FEATURES = [
  {
    image: imgLandingPage,
    title: "minimal by design",
    description: "a clean, distraction-free interface that keeps your focus on the code, not the tooling.",
  },
  {
    image: imgChat,
    title: "just tell it what to do",
    description: "type what you want done. neko figures out which files to touch, what to change, and does it.",
  },
  {
    image: imgEditTool,
    title: "file editing",
    description: "neko reads and edits files in your project directly as it works.",
  },
  {
    image: imgModelSelection,
    title: "pick your model",
    description: "switch between models on the fly. use the best tool for each job.",
  },
  {
    image: imgSubagents,
    title: "subagents",
    description: "spawn subagents to handle specific tasks. delegate work and let neko figure out the details.",
  },
  {
    image: imgHistoryGraph,
    title: "rich conversation history",
    description: "visualize your session as a graph. every prompt, tool call, and response is a node so you can see exactly what happened and when.",
  },
  {
    image: imgBranch,
    title: "deep session inspection",
    description: "drill into any point in your session to see the full tool output, model response, and what neko was working on.",
  },
  {
    image: imgCreateAgent,
    title: "build custom agents",
    description: "define specialized agents tailored to your workflow, from code reviewer to deploy bot.",
  },
  {
    image: imgSkills,
    title: "extend with skills",
    description: "package reusable behaviors as skills and share them across projects or with your team.",
  },
  {
    image: imgMcps,
    title: "MCP server support",
    description: "connect to Model Context Protocol servers to give neko access to external tools and data.",
  },
  {
    image: imgThemeSelection,
    title: "make it yours",
    description: "choose from a range of themes to match your terminal aesthetic.",
  },
]

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

      {/* ── Features ── */}
      <section className="features">
        <h2 className="features-title">what neko can do</h2>
        {FEATURES.map((f, i) => (
          <div key={i} className={`feature-row${i % 2 === 1 ? " feature-row--reverse" : ""}`}>
            <div className="feature-img-wrap">
              <img src={f.image} alt={f.title} className="feature-img" />
            </div>
            <div className="feature-text-wrap">
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </div>
          </div>
        ))}
      </section>

      <footer className="footer">
        <span className="footer-name">neko</span>
        <span className="footer-sep">·</span>
        <a href="https://github.com/hasnain40247/neko-code" target="_blank" rel="noreferrer">
          github
        </a>
      </footer>
    </div>
  )
}
