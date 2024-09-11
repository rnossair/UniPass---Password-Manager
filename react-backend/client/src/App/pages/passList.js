import React from "react";
import $ from "jquery";
import AuthPoint from "./AuthPoint";
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
        let passArr = this.state.passwords.map((e) => { return (<li key={e.name}><p>{e.name}</p><button onClick={this.copyToClipBoard} id={e.name + "-" + e.password}>{e.password}</button></li>) });
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
            return (<div id="mpassError">
                <p>Error: MasterPassword incorrect</p>
            </div>)
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
                return (<div id="passListContainer">
                    <h1>Pass List:</h1>
                    <div id="passList">
                        {this.getPasswords()}
                        <ul className="passContainer">
                            {this.passRender()}
                        </ul>
                    </div>
                    <div id="registerPass">
                        <h4>Add new password:</h4>
                        <div className="inputContainer">
                            <input type="text" placeholder="Website/Service" onChange={this.handleNameInput}></input>
                            <input type="text" placeholder="Password" onChange={this.handlePassInput} id="passInput"></input>
                            <button onClick={this.generatePassword}>Generate Secure Password</button>
                            <button onClick={this.submitPassword}>Submit</button>
                        </div>
                    </div>
                </div>
                )
            }
            else {
                if(!this.state.loaded){
                    return(<h3>Loading...</h3>)
                }
                if (this.state.mpSet) {
                    return (

                        <div id="masterPassSubmit">
                            <h3>Enter your master password:</h3>
                            {this.mpError()}
                            <input placeholder="Enter Master Password: " type="password"onChange={this.handleMasterPassInput}></input>
                            <button onClick={this.submitMasterPass}>Submit</button>
                        </div>

                    )
                }
                else {
                    return (
                        <div id="masterPassRegister">
                            <h3>Register a new master password:</h3>
                            <input placeholder="Master Password: " type="password" onChange={this.handleMasterPassInput}></input>
                            <button onClick={this.registerMasterPass}>Submit</button>
                        </div>
                    )
                }
            }


        }
        else {
            return (<h3>Loading...<AuthPoint failRedirect={true} /></h3>)
        }

    }
}
export default passList;
