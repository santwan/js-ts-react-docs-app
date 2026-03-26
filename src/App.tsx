import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ContentPanel from './components/ContentPanel'
import MobileDrawer from './components/MobileDrawer'

export type TopicId = 'roadmap' | 'variables-types' | 'scope' | 'hoisting' | 'functions' | 'thisKeyword'

export interface Topic {
  id: TopicId
  label: string
  file: string
  phase: string
  phaseColor: string
  tags: string[]
  description: string
}

export const TOPICS: Topic[] = [
  {
    id: 'roadmap',
    label: 'JS → React Roadmap',
    file: '/js-ts-react-docs-app/notes/roadmap.html',
    phase: 'Overview',
    phaseColor: '#8B5CF6',
    tags: [],
    description: 'Full learning roadmap from JavaScript to React with TypeScript',
  },
  {
    id: 'variables-types',
    label: 'Variables, Types & Coercion',
    file: '/js-ts-react-docs-app/notes/variables-types.html',
    phase: 'Phase 1',
    phaseColor: '#F0B429',
    tags: ['interview', 'concept'],
    description: 'var/let/const, primitive vs reference types, implicit coercion, == vs ===',
  },
  {
    id: 'scope',
    label: 'Scope & the Scope Chain',
    file: '/js-ts-react-docs-app/notes/scope.html',
    phase: 'Phase 1',
    phaseColor: '#F0B429',
    tags: ['interview', 'concept'],
    description: 'Lexical scope, block scope, function scope',
  },
  {
    id: 'hoisting',
    label: 'Hoisting',
    file: '/js-ts-react-docs-app/notes/hoisting.html',
    phase: 'Phase 1',
    phaseColor: '#F0B429',
    tags: ['interview', 'concept'],
    description: 'var hoisting, function hoisting, TDZ for let/const',
  },
  {
    id: 'functions',
    label: 'Functions — All Forms',
    file: '/js-ts-react-docs-app/notes/functions.html',
    phase: 'Phase 1',
    phaseColor: '#F0B429',
    tags: ['interview', 'practical'],
    description: 'Declarations vs expressions vs arrow functions',
  },

  {
    id: 'thisKeyword',
    label: 'this Keyword',
    file: '/js-ts-react-docs-app/notes/thisKeyword.html',
    phase: 'Phase 1',
    phaseColor: '#F0B429',
    tags: ['interview', 'practical'],
    description: '"this" in regular functions, arrow functions, methods. call, apply, bind to control it explicitly',
  },
]

export default function App() {
  const [activeTopic, setActiveTopic] = useState<TopicId>('roadmap')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const currentTopic = TOPICS.find(t => t.id === activeTopic)!

  const handleSelect = (id: TopicId) => {
    setActiveTopic(id)
    setDrawerOpen(false)
  }

  return (
    <div className="app-shell">
      {/* Desktop sidebar */}
      <Sidebar
        topics={TOPICS}
        activeTopic={activeTopic}
        onSelect={handleSelect}
      />

      {/* Content + mobile topbar */}
      <ContentPanel
        topic={currentTopic}
        onMenuOpen={() => setDrawerOpen(true)}
      />

      {/* Mobile slide-up drawer */}
      <MobileDrawer
        topics={TOPICS}
        activeTopic={activeTopic}
        open={drawerOpen}
        onSelect={handleSelect}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  )
}
