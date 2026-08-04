import { Component } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="Home container">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Zero-knowledge vault</span>
            <h1>Manage your passwords freely.</h1>
            <p className="lede">
              A free, browser-based password manager secured with AES-256 and
              PBKDF2. Your master password never leaves your device — so only
              you can open the vault.
            </p>
            <div className="hero-cta">
              <Link to="/login"><button className="btn-primary">Open your vault</button></Link>
              <Link to="/gen"><button className="btn-ghost">Generate a password</button></Link>
            </div>
          </div>

          {/* Signature: a live-looking secret with a strength spectrum */}
          <aside className="vault-demo card" aria-hidden="true">
            <div className="vault-demo-head">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="vault-demo-title">github.com</span>
            </div>
            <div className="secret demo-secret">••••••••••••••••</div>
            <div className="strength">
              <span className="strength-label">Strength</span>
              <span className="strength-value">Excellent</span>
            </div>
            <div className="strength-bar">
              <span style={{ width: "92%" }} />
            </div>
          </aside>
        </section>

        <section className="features">
          <article className="card feature">
            <span className="feature-num">01</span>
            <h3>Nothing to install</h3>
            <p>Runs entirely online. Open a browser, sign in, and your vault is there.</p>
          </article>
          <article className="card feature">
            <span className="feature-num">02</span>
            <h3>Military-grade encryption</h3>
            <p>AES 256-bit with PBKDF2 key derivation. Without your master password, your data is unreadable.</p>
          </article>
          <article className="card feature">
            <span className="feature-num">03</span>
            <h3>Save or generate</h3>
            <p>Store your own credentials, or let UniPass generate a strong one in a click.</p>
          </article>
        </section>
      </div>
    );
  }
}
export default Home;
