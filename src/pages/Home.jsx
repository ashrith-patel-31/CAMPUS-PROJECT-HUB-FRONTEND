import { Link } from "react-router-dom";

const features = [
  { icon: "⌕", title: "Discover Projects", text: "Explore student projects that match your interests and ambitions.", tone: "blue" },
  { icon: "♧", title: "Find Teammates", text: "Connect with students who bring the skills your team needs.", tone: "green" },
  { icon: "</>", title: "Showcase Your Skills", text: "Build your profile and let your technical strengths stand out.", tone: "purple" },
  { icon: "↗", title: "Build Together", text: "Turn a good idea into a real project with your campus community.", tone: "orange" },
];

function Home() {
  return (
    <main className="landing-page">
      <section className="landing-hero content-width">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> STUDENT PROJECT COLLABORATION PLATFORM</div>
          <h1>Find Your Team.<br /><span>Build Something</span><br /><span className="hero-blue">Great.</span></h1>
          <p className="hero-description">Discover exciting projects, connect with talented students, and turn your ideas into something real — together.</p>
          <div className="hero-actions">
            <Link className="cta-primary" to="/register">Get Started Free <span>→</span></Link>
            <Link className="cta-secondary" to="/projects"><span className="play-icon">▶</span> Explore Projects</Link>
          </div>
          <div className="trust-line"><span>✓ Easy to use</span><span>✓ Skill-based matching</span><span>✓ Built for students</span></div>
        </div>
        <div className="hero-visual" aria-label="Illustration of a project collaboration dashboard">
          <div className="visual-glow" />
          <div className="floating-chip chip-top"><span className="chip-icon purple">✦</span><span><b>Find your people</b><small>Skills that fit your idea</small></span></div>
          <div className="mock-dashboard">
            <div className="mock-topbar"><div className="window-dots"><i /><i /><i /></div><span>Project workspace</span><span className="topbar-avatar">S</span></div>
            <div className="mock-body">
              <div className="mock-greeting"><small>YOUR CAMPUS, YOUR COMMUNITY</small><h3>Great ideas start<br />with great teams.</h3><p>Find a project. Share your skills. Make it happen.</p></div>
              <div className="mock-stat-row"><div className="mock-stat stat-blue"><span>Projects</span><b>Explore</b><small>Fresh ideas</small></div><div className="mock-stat stat-violet"><span>Skills</span><b>Connect</b><small>Grow together</small></div></div>
              <div className="mock-project-label"><b>Trending projects</b><span>View all ↗</span></div>
              <div className="mock-project"><div className="project-symbol symbol-purple">⌘</div><div className="mock-project-info"><b>Smart Campus</b><small>React · IoT · Design</small></div><span className="project-arrow">↗</span></div>
              <div className="mock-project"><div className="project-symbol symbol-orange">✧</div><div className="mock-project-info"><b>Student Skill Exchange</b><small>Java · UI/UX · APIs</small></div><span className="project-arrow">↗</span></div>
            </div>
          </div>
          <div className="floating-chip chip-bottom"><span className="avatar-stack"><i>A</i><i>R</i><i>K</i></span><span><b>Better together</b><small>Build with your campus</small></span><span className="online-dot" /></div>
          <div className="decor decor-one">✳</div><div className="decor decor-two">✦</div>
        </div>
      </section>

      <section className="landing-stats content-width">
        <div><strong>01</strong><span>Place to discover projects</span></div>
        <div><strong>02</strong><span>Showcase your skills</span></div>
        <div><strong>03</strong><span>Find the right teammates</span></div>
        <div><strong>04</strong><span>Build something meaningful</span></div>
      </section>

      <section id="features" className="landing-features content-width">
        <div className="section-heading"><span className="section-kicker">MADE FOR YOUR NEXT BIG IDEA</span><h2>Everything you need to<br /><span>build better projects.</span></h2><p>From your first idea to your final team, Campus Project Hub helps you make the right connections.</p></div>
        <div className="landing-feature-grid">{features.map((feature) => <article className="landing-feature-card" key={feature.title}><div className={`landing-feature-icon ${feature.tone}`}>{feature.icon}</div><h3>{feature.title}</h3><p>{feature.text}</p><Link to={feature.title === "Discover Projects" ? "/projects" : "/register"}>Learn more <span>→</span></Link></article>)}</div>
      </section>

      <section className="landing-bottom content-width"><div><span className="section-kicker">YOUR NEXT PROJECT STARTS HERE</span><h2>Have an idea?<br /><span>Find your people.</span></h2><p>Join the campus community and start building with students who share your ambition.</p></div><Link className="cta-primary" to="/register">Join Campus Project Hub <span>→</span></Link></section>
      <footer className="landing-footer content-width"><div className="footer-brand"><span className="brand-mark">✳</span> Campus Project Hub</div><span>Find Skills. Build Projects. Find Teammates.</span><Link to="/login">Already a member? Sign in</Link></footer>
    </main>
  );
}

export default Home;
