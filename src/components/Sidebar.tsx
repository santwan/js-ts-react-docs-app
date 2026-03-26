import type { Topic, TopicId } from '../App'

interface SidebarProps {
  topics: Topic[]
  activeTopic: TopicId
  onSelect: (id: TopicId) => void
}

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  interview: { bg: 'rgba(251,191,36,0.15)', color: '#F0B429' },
  concept:   { bg: 'rgba(192,132,252,0.12)', color: '#c084fc' },
  practical: { bg: 'rgba(74,222,128,0.12)', color: '#4ade80' },
}

export default function Sidebar({ topics, activeTopic, onSelect }: SidebarProps) {
  const [overview, ...noteTopics] = topics

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <span className="brand-icon">⚡</span>
        <div>
          <div className="brand-title">JS Notes</div>
          <div className="brand-sub">Learn · Review · Master</div>
        </div>
      </div>

      {/* Overview link */}
      <div className="sidebar-section-label">Navigation</div>
      <button
        className={`nav-item nav-overview ${activeTopic === overview.id ? 'active' : ''}`}
        onClick={() => onSelect(overview.id)}
      >
        <span className="nav-icon">🗺️</span>
        <span className="nav-label">{overview.label}</span>
      </button>

      {/* Topic Notes */}
      <div className="sidebar-section-label" style={{ marginTop: '1.5rem' }}>
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
                  <span
                    className="nav-number"
                    style={{ color: topic.phaseColor }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="nav-text">
                    <span className="nav-label">{topic.label}</span>
                    <span className="nav-desc">{topic.description}</span>
                  </div>
                </div>
                <div className="nav-tags">
                  {topic.tags.map(tag => (
                    <span
                      key={tag}
                      className="nav-tag"
                      style={TAG_STYLES[tag] ?? { bg: '#222', color: '#888' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {isActive && (
                <div
                  className="active-bar"
                  style={{ background: topic.phaseColor }}
                />
              )}
            </button>
          )
        })}
      </div>

      <div className="sidebar-footer">
        <div className="footer-legend">
          <span className="legend-dot" style={{ background: '#F0B429' }} />
          <span>Phase 1 — JS Foundations</span>
        </div>
        <div className="footer-text">More topics coming soon</div>
      </div>
    </aside>
  )
}
