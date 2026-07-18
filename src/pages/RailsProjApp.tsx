import { Link } from 'react-router-dom'
import '../App.css'

function RailsProjApp() {
  return (
    <>
      <div id="root">
        <header>
          <h1>LINE MA Tool</h1>
          <p>LINE公式アカウント向けマーケティングオートメーションツール</p>
        </header>

        <main>
          <section>
            <h2>Description</h2>
            <p>
              LINE公式アカウント向けのマーケティングオートメーション（MA）ツールです。
              診断チャットボットやリッチメニュー配信、予約配信などの機能を備えており、
              LINEを活用したマーケティング施策を支援します。
            </p>

            <div style={{ marginTop: '2rem' }}>
              <p>
                <strong>Tech Stack:</strong> Ruby, Rails, React, TypeScript, Vite, Tailwind CSS,
                SQLite, RSpec, Terraform, Kamal, Google Cloud
              </p>
              <p>
                <strong>Features:</strong> 診断チャットボット（決定木/スコア集計方式）,
                リッチメニュー配信, 予約配信・イベント配信, オーディエンスセグメント,
                LINEログイン・友だち追加のトラッキング, Webhook受信・署名検証,
                画像アップロード（Active Storage + GCS）, 管理画面AIアシスタント（Vertex AI Gemini）
              </p>
              <p>
                <strong>Status:</strong> Active Development
              </p>
            </div>
          </section>

          <section>
            <h2>Links</h2>
            <p>
              <a href="https://34.71.56.206.sslip.io/" target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </p>
            <p>
              <a href="https://github.com/TakahashiShuuhei/rails-proj" target="_blank" rel="noopener noreferrer">
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

export default RailsProjApp
