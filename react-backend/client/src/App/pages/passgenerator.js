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
    fetch("/api/pass", {
      method: "POST", headers: {
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
        <div className="passwordGenerator">
          <h1>Secure Password Generator</h1>
          <p>Password List:</p>
          {/*console.log("password state: ", typeof(this.state.passwords))*/}
          <div className='passwordContainer'>{this.state.passwords.map((password, i) => <button key={i} id={"pass-" + i} className="password" onClick={this.copyToClipBoard}>{password}</button>)}</div>
          <div className="submit">
            <p>Number of passwords to generate:</p>
            <input type="number" min="1" max="20" placeholder="5" style={{ "textAlign": "center" }} onChange={this.handleNumberInput}></input>
            <p>Length of passwords:</p>
            <input type="number" min="6" max="20" placeholder="12" style={{ "textAlign": "center" }} onChange={this.handleLengthInput}></input>
            <button onClick={() => this.getPasswords(this.state.numInput, this.state.lengthInput)} className="genButton">Generate New Passwords</button>
          </div>

        </div>
      );
    }
    else {
      return (<h1>Loading...</h1>)
    }
  }

}

export default PassGen;
