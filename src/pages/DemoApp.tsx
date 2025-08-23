import { Link } from 'react-router-dom'
import '../App.css'

function DemoApp() {
  return (
    <>
      <div id="root">
        <header>
          <h1>Demo App</h1>
          <p>Sample Application</p>
        </header>
        
        <main>
          <section>
            <h2>Description</h2>
            <p>
              これはサンプルアプリケーションです。
              実際のプロジェクトでは、ここに詳細な説明や技術スタック、
              開発の背景などを記載します。
            </p>
            
            <div style={{ marginTop: '2rem' }}>
              <p>
                <strong>Tech Stack:</strong> React, TypeScript, Vite
              </p>
              <p>
                <strong>Status:</strong> In Development
              </p>
            </div>
          </section>
          
          <section>
            <h2>Links</h2>
            <p>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </p>
            <p>
              <a href="https://github.com/TakahashiShuuhei/demo-app" target="_blank" rel="noopener noreferrer">
                Source Code
              </a>
            </p>
          </section>
          
          <section>
            <Link to="/" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9em' }}>
              ← Back to Home
            </Link>
          </section>
        </main>
      </div>
    </>
  )
}

export default DemoApp