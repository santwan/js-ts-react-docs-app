import { useState, useEffect, useRef } from 'react'
import type { Topic } from '../App'

interface ContentPanelProps {
  topic: Topic
  onMenuOpen: () => void
}

export default function ContentPanel({ topic, onMenuOpen }: ContentPanelProps) {
  const [loading, setLoading] = useState(true)
  const prevTopicRef = useRef<string>('')

  useEffect(() => {
    if (prevTopicRef.current !== topic.id) {
      setLoading(true)
      prevTopicRef.current = topic.id
    }
  }, [topic.id])

  return (
    <main className="content-panel">
      {/* Mobile-only top bar */}
      <div className="mobile-topbar">
        <div className="mobile-topbar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-title">JS Notes</span>
        </div>
        <span className="mobile-topic-label">{topic.label}</span>
        <button className="mobile-menu-btn" onClick={onMenuOpen} aria-label="Open topics">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Desktop topbar */}
      <div className="content-topbar">
        <div className="topbar-left">
          <div className="topbar-breadcrumb">
            <span className="breadcrumb-phase" style={{ color: topic.phaseColor }}>
              {topic.phase}
            </span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-topic">{topic.label}</span>
          </div>
          <p className="topbar-desc">{topic.description}</p>
        </div>
        <div className="topbar-actions">
          <a
            href={topic.file}
            target="_blank"
            rel="noreferrer"
            className="action-btn"
            title="Open in new tab"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            <span>Open full page</span>
          </a>
        </div>
      </div>

      {/* Iframe */}
      <div className="iframe-wrap">
        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner" />
            <span className="loading-text">Loading notes…</span>
          </div>
        )}
        <iframe
          key={topic.id}
          src={topic.file}
          className="content-iframe"
          title={topic.label}
          onLoad={() => setLoading(false)}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </main>
  )
}
