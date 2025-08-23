import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>Takahashi Shuuhei</h1>
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
            <li>JavaScript / TypeScript</li>
            <li>React</li>
            <li>Node.js</li>
            <li>Python</li>
            <li>Git</li>
          </ul>
        </section>
        
        <section className="contact">
          <h2>Contact</h2>
          <p>GitHub: <a href="https://github.com/TakahashiShuuhei" target="_blank" rel="noopener noreferrer">TakahashiShuuhei</a></p>
        </section>
      </main>
    </>
  )
}

export default App