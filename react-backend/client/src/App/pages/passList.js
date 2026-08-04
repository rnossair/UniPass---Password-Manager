import React from "react";
import $ from "jquery";
import AuthPoint from "./AuthPoint";
import "./passList.scss";
class passList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwords: [],
            nameInput: "",
            passInput: "",
            masterPassword: "",
            mpSet: false,
            masterPassInput: "",
            securePass: "",
            gotPass: false,
            logged: false,
            mpassError: false,
            loaded: false
        }
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handlePassInput = this.handlePassInput.bind(this);
        this.handleMasterPassInput = this.handleMasterPassInput.bind(this);
        this.submitMasterPass = this.submitMasterPass.bind(this);
        this.generatePassword = this.generatePassword.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.getPasswords = this.getPasswords.bind(this);
        this.passRender = this.passRender.bind(this);
        this.copyToClipBoard = this.copyToClipBoard.bind(this);
        this.registerMasterPass = this.registerMasterPass.bind(this);
        this.checkMasterPass = this.checkMasterPass.bind(this);
        this.checkAuth = this.checkAuth.bind(this);
        this.mpError = this.mpError.bind(this);
    }
    handleNameInput(e) {
        this.setState({ nameInput: e.target.value })
    }
    handlePassInput(e, id) {
        if (e) {
            this.setState({ passInput: e.target.value })
        }
        else {
            this.setState({ passInput: document.getElementById(id).value })
        }
    }
    handleMasterPassInput(e) {
        this.setState({ masterPassInput: e.target.value })
    }
    generatePassword() {
        fetch("https://password-manager-server.vercel.app/api/pass", {
            method: "POST",credentials: 'include' , headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ count: 1, passLength: 18 })
        })
            .then(res => res.json())
            .then(obj => {
                $("#passInput").val(obj.passwords[0]);
                this.handlePassInput(false, "passInput");
            });
    }
    submitMasterPass() {
        let mp = this.state.masterPassInput;
        fetch("https://password-manager-server.vercel.app/api/mpverify", {
            method: "POST",credentials: 'include' , headers: {
                "Content-Type": 'application/json'
            }, body: JSON.stringify({ mp: mp })
        })
            .then(res => res.json())
            .then(obj => {
                console.log(obj.result);
                if (obj.result === "Success") {
                    this.setState({ masterPassword: mp })
                }
                if (obj.result === "Failure") {
                    this.setState({ mpassError: true })
                }
            })
    }
    registerMasterPass() {
        let mp = this.state.masterPassInput;
        fetch("https://password-manager-server.vercel.app/api/mpsubmit", {
            method: "POST",credentials: 'include' , headers: {
                "Content-Type": 'application/json'
            }, body: JSON.stringify({ mp: mp })
        })
            .then(res => res.json())
            .then(obj => {
                console.log(obj.result);
                if (obj.result === "Success") {
                    this.setState({ masterPassword: mp, mpSet: true })
                }
            })
    }
    submitPassword() {
        let pass = this.state.passInput;
        let name = this.state.nameInput;
        if (!pass || !name) {
            console.log("missing pass/name");
        }
        else {
            fetch("https://password-manager-server.vercel.app/api/submitPass", {
                method: "POST",credentials: 'include' , headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({ masterPass: this.state.masterPassword, pass: pass, name: name })
            })
                .then(() => this.setState({ gotPass: false }))
        }
    }
    getPasswords() {
        if (!this.state.gotPass) {
            fetch("https://password-manager-server.vercel.app/api/getPass", {
                method: "POST",credentials: 'include' , headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({ masterPass: this.state.masterPassword })
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({ gotPass: true, passwords: res })

                });
        }

    }
    passRender() {
        if (!this.state.passwords || this.state.passwords.length === 0) {
            return (<li className="pass-empty">No passwords saved yet. Add your first one below.</li>);
        }
        let passArr = this.state.passwords.map((e) => {
            return (
                <li key={e.name} className="pass-row">
                    <span className="pass-name">{e.name}</span>
                    <button className="secret" onClick={this.copyToClipBoard} id={e.name + "-" + e.password}>{e.password}</button>
                </li>
            )
        });
        return passArr;
    }
    copyToClipBoard(e) {

        var copyText = document.getElementById(e.currentTarget.id);
        navigator.clipboard.writeText(copyText.textContent);
    }
    checkMasterPass() {
        if (!this.state.mpSet && !this.state.loaded) {
            fetch("https://password-manager-server.vercel.app/api/mpGet",{credentials: 'include'})
                .then(res => res.json())
                .then(obj => {
                    console.log(obj.result)
                    if (obj.result === "Mp set") {
                        this.setState({ mpSet: true , loaded: true});
                    }
                    else {
                        this.setState({ mpSet: false, loaded: true });
                    }
                })
        }

    }
    mpError() {
        if (this.state.mpassError) {
            return (<div className="notice notice-error">Master password incorrect.</div>)
        }
    }
    checkAuth() {
        fetch("https://password-manager-server.vercel.app/api/authCheck",{credentials: 'include'})
            .then(res => res.json())
            .then(obj => {
                if (obj.result === "Approved") {
                    this.setState({ logged: true });
                }
            })
    }
    render() {
        if (!this.state.logged) {
            this.checkAuth();
        }
        if (this.state.logged) {
            this.checkMasterPass();
            if (this.state.masterPassword !== "") {
                return (<div id="passListContainer" className="container">
                    <header className="vault-head">
                        <span className="eyebrow">Unlocked</span>
                        <h1>Your vault</h1>
                        <p>Tap any password to copy it to your clipboard.</p>
                    </header>
                    <div id="passList" className="card">
                        {this.getPasswords()}
                        <ul className="passContainer">
                            {this.passRender()}
                        </ul>
                    </div>
                    <div id="registerPass" className="card">
                        <h4>Add a password</h4>
                        <div className="inputContainer">
                            <input type="text" placeholder="Website or service" onChange={this.handleNameInput}></input>
                            <input type="text" placeholder="Password" onChange={this.handlePassInput} id="passInput"></input>
                            <button className="btn-ghost" onClick={this.generatePassword}>Generate</button>
                            <button className="btn-primary" onClick={this.submitPassword}>Save</button>
                        </div>
                    </div>
                </div>
                )
            }
            else {
                if(!this.state.loaded){
                    return(<div className="vault-status"><h3>Loading…</h3></div>)
                }
                if (this.state.mpSet) {
                    return (
                        <div id="masterPassSubmit" className="mp-card card">
                            <span className="eyebrow">Locked</span>
                            <h3>Enter your master password</h3>
                            <p>This unlocks your vault. It's never sent anywhere in plain text.</p>
                            {this.mpError()}
                            <input placeholder="Master password" type="password" onChange={this.handleMasterPassInput}></input>
                            <button className="btn-primary btn-block" onClick={this.submitMasterPass}>Unlock</button>
                        </div>
                    )
                }
                else {
                    return (
                        <div id="masterPassRegister" className="mp-card card">
                            <span className="eyebrow">One-time setup</span>
                            <h3>Create a master password</h3>
                            <p>You'll use this to unlock your vault. Choose something strong — it can't be recovered.</p>
                            <input placeholder="New master password" type="password" onChange={this.handleMasterPassInput}></input>
                            <button className="btn-primary btn-block" onClick={this.registerMasterPass}>Create</button>
                        </div>
                    )
                }
            }


        }
        else {
            return (<div className="vault-status"><h3>Loading…</h3><AuthPoint failRedirect={true} /></div>)
        }

    }
}
export default passList;
