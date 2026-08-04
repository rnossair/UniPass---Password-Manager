import React from 'react';
import './passGen.scss';
import { Component } from "react";
class PassGen extends Component {
  constructor(props) {
    super(props);
    this.state = { passwords: [], numInput: "", lengthInput: "", loaded: false };
    this.getPasswords = this.getPasswords.bind(this);
    this.handleNumberInput = this.handleNumberInput.bind(this);
    this.handleLengthInput = this.handleLengthInput.bind(this);
    this.copyToClipBoard = this.copyToClipBoard.bind(this);
  }
  componentDidMount() {
    this.getPasswords(5);
  }
  handleNumberInput(e) {
    this.setState({ numInput: e.target.value })
  }
  handleLengthInput(e) {
    this.setState({ lengthInput: e.target.value })
  }
  getPasswords(count, length) {
    fetch("https://password-manager-server.vercel.app/api/pass", {
      method: "POST",credentials: 'include' , headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ count: count, passLength: length })
    })
      .then(res => res.json())
      .then(obj => {
        this.setState({ passwords: obj.passwords, loaded: true });
      });
  }
  copyToClipBoard(e) {

    var copyText = document.getElementById(e.currentTarget.id);
    navigator.clipboard.writeText(copyText.textContent);
  }
  render() {
    if (!this.state.loaded) {
      this.getPasswords();
    }
    if (this.state.loaded) {
      return (
        <div className="passwordGenerator container">
          <header className="gen-head">
            <span className="eyebrow">Generator</span>
            <h1>Secure password generator</h1>
            <p>Fresh, high-entropy passwords. Tap one to copy it.</p>
          </header>

          <div className="gen-grid">
            <div className="passwordContainer card">
              {this.state.passwords.map((password, i) =>
                <button key={i} id={"pass-" + i} className="secret" onClick={this.copyToClipBoard}>{password}</button>
              )}
            </div>

            <div className="submit card">
              <label className="field">
                <span>How many</span>
                <input type="number" min="1" max="20" placeholder="5" onChange={this.handleNumberInput}></input>
              </label>
              <label className="field">
                <span>Length</span>
                <input type="number" min="6" max="20" placeholder="12" onChange={this.handleLengthInput}></input>
              </label>
              <button onClick={() => this.getPasswords(this.state.numInput, this.state.lengthInput)} className="genButton btn-primary btn-block">Generate</button>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<div className="gen-status"><h1>Loading…</h1></div>)
    }
  }

}

export default PassGen;
