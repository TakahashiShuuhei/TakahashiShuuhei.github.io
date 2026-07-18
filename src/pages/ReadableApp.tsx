import { Link } from 'react-router-dom'
import '../App.css'

function ReadableApp() {
  return (
    <>
      <div id="root">
        <header>
          <h1>Readable</h1>
          <p>読みにくいログ文字列を整形するVSCode拡張</p>
        </header>

        <main>
          <section>
            <h2>Description</h2>
            <p>
              エスケープされた文字列やエンコードされたログを、選択して右クリックするだけで
              読みやすく変換するVSCode拡張機能です。
              バックスラッシュエスケープ、Base64、URLエンコード、
              JSON/Pythonのdict・listリテラル、Rubyのhashリテラルなどに対応しています。
            </p>

            <div style={{ marginTop: '2rem' }}>
              <p>
                <strong>Tech Stack:</strong> TypeScript, esbuild, Vitest, ESLint
              </p>
              <p>
                <strong>Features:</strong> Readable: Format（JSON/Python/Rubyの整形）,
                Readable: Decode / Convert（エスケープ解除, Base64デコード, URLデコード）
              </p>
              <p>
                <strong>Status:</strong> Active Development
              </p>
            </div>
          </section>

          <section>
            <h2>Links</h2>
            <p>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=ShuheiTakahashi.readable-strings"
                target="_blank"
                rel="noopener noreferrer"
              >
                VS Code Marketplace
              </a>
            </p>
            <p>
              <a href="https://github.com/TakahashiShuuhei/readable" target="_blank" rel="noopener noreferrer">
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

export default ReadableApp
