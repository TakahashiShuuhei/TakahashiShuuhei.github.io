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
            <h2>AI Assistant</h2>
            <p>
              管理画面にAIアシスタント（Vertex AI Gemini搭載）を搭載しており、
              「動物クイズの診断フローを作って」のように自然言語で依頼するだけで、
              質問・選択肢・スコア判定ルールを備えた診断フローを自動生成できます。
              生成後はフローエディタでノードを見ながら細部を調整可能です。
            </p>
            <ul className="screenshot-gallery">
              <li>
                <figure>
                  <img
                    src="/images/rails-proj/ai-assistant-1.png"
                    alt="AIアシスタントに診断フローの作成を依頼するチャット画面"
                    loading="lazy"
                  />
                  <figcaption>自然言語で診断フローの仕様を依頼</figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <img
                    src="/images/rails-proj/ai-assistant-2.png"
                    alt="AIが診断フローを生成し完了報告するチャット画面"
                    loading="lazy"
                  />
                  <figcaption>フローを自動生成し内容を報告</figcaption>
                </figure>
              </li>
            </ul>
          </section>

          <section>
            <h2>Diagnosis Flow Editor</h2>
            <p>
              生成された診断フローはノードベースのビジュアルエディタで確認・編集できます。
              質問ノードとスコア判定ノードを組み合わせて、決定木方式・スコア集計方式いずれの
              診断ロジックにも対応します。
            </p>
            <ul className="screenshot-gallery">
              <li>
                <figure>
                  <img
                    src="/images/rails-proj/diagnosis-flow-editor.png"
                    alt="診断フローのノードをつなげたビジュアルエディタ画面"
                    loading="lazy"
                  />
                  <figcaption>質問・スコア判定ノードのフロー編集画面</figcaption>
                </figure>
              </li>
            </ul>
          </section>

          <section>
            <h2>配信・分析機能</h2>
            <p>
              リッチメニューのタブ切り替えやオーディエンス単位での適用、
              発言・友だち追加などをトリガーにした自動応答（LINE Event Triggers）、
              サイト訪問やページ遷移を記録するBehavior Eventsなど、
              配信からトラッキングまでを一つの管理画面で運用できます。
            </p>
            <ul className="screenshot-gallery">
              <li>
                <figure>
                  <img
                    src="/images/rails-proj/rich-menu-editor.png"
                    alt="リッチメニューをタブ切り替え形式で編集する画面"
                    loading="lazy"
                  />
                  <figcaption>タブ切り替え対応のリッチメニューエディタ</figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <img
                    src="/images/rails-proj/event-triggers.png"
                    alt="発言や友だち追加などをトリガーにした自動応答の一覧画面"
                    loading="lazy"
                  />
                  <figcaption>発言・友だち追加などに応じた自動応答設定</figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <img
                    src="/images/rails-proj/behavior-events.png"
                    alt="サイト訪問などのユーザー行動を一覧表示する画面"
                    loading="lazy"
                  />
                  <figcaption>ユーザーごとのサイト訪問・行動ログ</figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <img
                    src="/images/rails-proj/line-chat.png"
                    alt="LINEトーク画面で診断やリッチメニューを操作している様子"
                    loading="lazy"
                  />
                  <figcaption>エンドユーザー側のLINEトーク画面</figcaption>
                </figure>
              </li>
            </ul>
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
