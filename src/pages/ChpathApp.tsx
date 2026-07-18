import { Link } from 'react-router-dom'
import '../App.css'

function ChpathApp() {
  return (
    <>
      <div id="root">
        <header>
          <h1>chpath</h1>
          <p>文字を直線・円弧の描画コマンドに変換するツール</p>
        </header>

        <main>
          <section>
            <h2>Description</h2>
            <p>
              テキスト入力を、ペンプロッタのような卓上ロボットで描ける直線と円弧の組み合わせに変換するツールです。
              常用漢字・ひらがな・カタカナ・英数字・記号(計2,409文字)を、少ない描画コマンドに変換できます。
            </p>

            <div style={{ marginTop: '2rem' }}>
              <p>
                <strong>Tech Stack:</strong> TypeScript, Vite, C++
              </p>
              <p>
                <strong>Features:</strong> 文字変換, 誤差調整によるコマンド数最適化, ストローク順序最適化, 直線・円弧の可視化, コマンド出力
              </p>
              <p>
                <strong>Status:</strong> Active Development
              </p>
            </div>
          </section>

          <section>
            <h2>Links</h2>
            <p>
              <a href="https://takahashishuuhei.github.io/apps/chpath/" target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </p>
            <p>
              <a href="https://github.com/TakahashiShuuhei/chpath" target="_blank" rel="noopener noreferrer">
                GitHub Repository
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

export default ChpathApp
