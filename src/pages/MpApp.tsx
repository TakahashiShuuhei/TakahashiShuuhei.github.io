import { Link } from 'react-router-dom'
import '../App.css'

function MpApp() {
  return (
    <>
      <div id="root">
        <header>
          <h1>mp</h1>
          <p>語学学習・音楽練習向け動画再生Androidアプリ</p>
        </header>

        <main>
          <section>
            <h2>Description</h2>
            <p>
              語学学習のリスニング練習や、演奏・耳コピなどの音楽練習のための
              動画再生用Androidアプリです。ABリピートや速度調整など、
              練習に特化した再生機能を備えています。
            </p>

            <div style={{ marginTop: '2rem' }}>
              <p>
                <strong>Tech Stack:</strong> Kotlin
              </p>
              <p>
                <strong>Features:</strong> ABリピート機能, 速度調整（ピッチ変更なし、0.4〜2倍速）,
                バックグラウンド再生
              </p>
              <p>
                <strong>Status:</strong> Active Development
              </p>
            </div>
          </section>

          <section>
            <h2>Links</h2>
            <p>
              <a href="https://github.com/TakahashiShuuhei/mp" target="_blank" rel="noopener noreferrer">
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

export default MpApp
