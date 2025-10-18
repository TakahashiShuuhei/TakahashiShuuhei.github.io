import { Link } from 'react-router-dom'
import '../App.css'

function PianoFigApp() {
  return (
    <>
      <div id="root">
        <header>
          <h1>Piano Figure Generator</h1>
          <p>ピアノ鍵盤SVG生成ツール</p>
        </header>

        <main>
          <section>
            <h2>Description</h2>
            <p>
              URLパラメータで指定した鍵盤をハイライト表示したピアノ鍵盤のSVG画像を生成するWebアプリケーションです。
              音楽ブロガーや教育者がコードやスケールを視覚化するのに便利です。
            </p>

            <div style={{ marginTop: '2rem' }}>
              <p>
                <strong>Tech Stack:</strong> Cloudflare Workers, JavaScript, SVG
              </p>
              <p>
                <strong>Features:</strong> URLベースの鍵盤ハイライト指定, 音符ごとのラベル表示, 複数のカラープリセット, 表示範囲とサイズの調整
              </p>
              <p>
                <strong>Status:</strong> Production
              </p>
            </div>
          </section>

          <section>
            <h2>Links</h2>
            <p>
              <a href="https://piano-fig.uhiaha888.workers.dev/?notes=C4,E4,G4,B4&title=C%20Major%207th" target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </p>
            <p>
              <a href="https://github.com/TakahashiShuuhei/piano-fig" target="_blank" rel="noopener noreferrer">
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

export default PianoFigApp
