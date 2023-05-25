import { Component } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
class Home extends Component {

  render() {
    return (
      <div className="Home">

        <div id="title">
          <div className="diag"></div>
          <h1>Manage your passwords freely</h1>
          <h2>Military grade password protection, for free.</h2>
          <Link to="/login"><button>Join Now</button></Link>
        </div>
        <p>UniPass is a free-to-use and secure password manager for all your daily needs.</p>
        <ul>
          <li>Our service is online, no need to download any software to use our password manager.</li>
          <li>Your passwords are encrypted with military-grade AES 256-bit encryption with PBKDF2 key derivation, ensuring your password is unaccessible without your master password.</li>
          <li>Save your own passwords, or let us generate you a secure one.</li>
        </ul>
      </div>
    );
  }
}
export default Home;