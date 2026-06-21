import { Link } from 'react-router-dom'
import '../App.css'

function CableOccupancyApp() {
  return (
    <>
      <div id="root">
        <header>
          <h1>Cable Occupancy Calculator</h1>
          <p>電線管占有率計算アプリ</p>
        </header>

        <main>
          <section>
            <h2>Description</h2>
            <p>
              電線管の占有率を計算するWebアプリケーションです。
              電線の種類・サイズを選択し、電線管の適切なサイズを判定できます。
            </p>

            <div style={{ marginTop: '2rem' }}>
              <p>
                <strong>Tech Stack:</strong> TypeScript, React
              </p>
              <p>
                <strong>Features:</strong> 電線管サイズ計算, 占有率判定
              </p>
              <p>
                <strong>Status:</strong> Active Development
              </p>
            </div>
          </section>

          <section>
            <h2>Links</h2>
            <p>
              <a href="https://takahashishuuhei.github.io/apps/cable/" target="_blank" rel="noopener noreferrer">
                Live Demo
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

export default CableOccupancyApp
