import { Link } from 'react-router-dom'
import '../App.css'

function PianoPracticeApp() {
  return (
    <>
      <div id="root">
        <header>
          <h1>Piano Practice App</h1>
          <p>ピアノ練習支援アプリケーション</p>
        </header>
        
        <main>
          <section>
            <h2>Description</h2>
            <p>
              ピアノの練習を効率的に行うためのWebアプリケーションです。
              音ゲーのようなUIでMIDIで接続したキーボードを利用した練習が可能です。
            </p>
            
            <div style={{ marginTop: '2rem' }}>
              <p>
                <strong>Tech Stack:</strong> TypeScript, Web Audio API
              </p>
              <p>
                <strong>Features:</strong> MIDIキーボード接続, 独自形式の楽譜データ読み込み
              </p>
              <p>
                <strong>Status:</strong> Active Development
              </p>
            </div>
          </section>
          
          <section>
            <h2>Links</h2>
            <p>
              <a href="https://takahashishuuhei.github.io/apps/piano-practice/" target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </p>
            <p>
              <a href="https://github.com/TakahashiShuuhei/piano-trainer" target="_blank" rel="noopener noreferrer">
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

export default PianoPracticeApp