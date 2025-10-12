import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>Shuhei Takahashi</h1>
        <p>Software Engineer</p>
      </header>
      
      <main>
        <section className="about">
          <h2>About Me</h2>
          <p>
            情報技術に関心があるソフトウェアエンジニアです。
            React、TypeScript、Python等の技術を使って開発を行っています。
          </p>
        </section>
        
        <section className="skills">
          <h2>Skills</h2>
          <ul>
            <li>Ruby</li>
            <li>TypeScript</li>
            <li>Go</li>
            <li>Java</li>
            <li>Python</li>
            <li>Google Cloud</li>
            <li>LINE Messaging API</li>
            <li>Google Ads API</li>
          </ul>
        </section>
        
        <section className="apps">
          <h2>Apps</h2>
          <ul>
            <li>
              <a href="#/apps/demo-app">Demo App</a>
              <span className="app-description">デモのアプリ</span>
            </li>
            <li>
              <a href="#/apps/piano-practice">Piano Practice App</a>
              <span className="app-description">ピアノ練習支援アプリ</span>
            </li>
          </ul>
        </section>
        
        <section className="contact">
          <h2>Contact</h2>
          <p>GitHub: <a href="https://github.com/TakahashiShuuhei" target="_blank" rel="noopener noreferrer">TakahashiShuuhei</a></p>
          <p>X: <a href="https://x.com/t_shuuhei" target="_blank" rel="noopener noreferrer">@t_shuuhei</a></p>
          <p>Blog: <a href="https://uhiaha888.hatenablog.com/" target="_blank" rel="noopener noreferrer">uhiaha888.hatenablog.com</a></p>
          <p>Email: <a href="mailto:uhiaha888@gmail.com">uhiaha888@gmail.com</a></p>
        </section>
      </main>
    </>
  )
}

export default App