import { useEffect } from 'react'
import type { Topic, TopicId } from '../App'

interface MobileDrawerProps {
  topics: Topic[]
  activeTopic: TopicId
  open: boolean
  onSelect: (id: TopicId) => void
  onClose: () => void
}

const TAG_STYLES: Record<string, { background: string; color: string }> = {
  interview: { background: 'rgba(251,191,36,0.15)', color: '#F0B429' },
  concept:   { background: 'rgba(192,132,252,0.12)', color: '#c084fc' },
  practical: { background: 'rgba(74,222,128,0.12)', color: '#4ade80' },
}

export default function MobileDrawer({ topics, activeTopic, open, onSelect, onClose }: MobileDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const [overview, ...noteTopics] = topics

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${open ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`drawer ${open ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="drawer-handle-row">
          <div className="drawer-handle" />
        </div>

        <div className="drawer-header">
          <span className="drawer-title">⚡ Topics</span>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="drawer-scroll">
          {/* Navigation label */}
          <div className="sidebar-section-label" style={{ marginTop: '4px' }}>Navigation</div>

          {/* Roadmap overview */}
          <div style={{ padding: '4px 8px 0' }}>
            <button
              className={`nav-item nav-overview ${activeTopic === overview.id ? 'active' : ''}`}
              onClick={() => onSelect(overview.id)}
              style={{ margin: 0, width: '100%' }}
            >
              <span className="nav-icon">🗺️</span>
              <span className="nav-label">{overview.label}</span>
            </button>
          </div>

          {/* Topic notes */}
          <div className="sidebar-section-label" style={{ marginTop: '12px' }}>
            Topic Notes
            <span className="topic-count">{noteTopics.length} topics</span>
          </div>

          <div className="nav-list">
            {noteTopics.map((topic, i) => {
              const isActive = activeTopic === topic.id
              return (
                <button
                  key={topic.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => onSelect(topic.id)}
                >
                  <div className="nav-item-inner">
                    <div className="nav-item-left">
                      <span className="nav-number" style={{ color: topic.phaseColor }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="nav-text">
                        <span className="nav-label">{topic.label}</span>
                        <span className="nav-desc">{topic.description}</span>
                      </div>
                    </div>
                    <div className="nav-tags">
                      {topic.tags.map(tag => (
                        <span key={tag} className="nav-tag" style={TAG_STYLES[tag]}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {isActive && (
                    <div className="active-bar" style={{ background: topic.phaseColor }} />
                  )}
                </button>
              )
            })}
          </div>

          {/* Footer */}
          <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '12px' }}>
            <div className="footer-legend">
              <span className="legend-dot" style={{ background: '#F0B429' }} />
              <span>Phase 1 — JS Foundations</span>
            </div>
            <div className="footer-text">More topics coming soon</div>
          </div>
        </div>
      </div>
    </>
  )
}
