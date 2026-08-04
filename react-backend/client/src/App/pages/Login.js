import React from "react";
import { Link } from "react-router-dom";
import AuthPoint from "./AuthPoint";
import "./auth.scss";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loggedon: false,
            loginfail: false,
            authCheck: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.login = this.login.bind(this);
        this.loginErr = this.loginErr.bind(this);
    }
    handleInput(e) {
        let elmId = e.currentTarget.id;
        if (elmId === "userInput") {
            this.setState({ username: e.currentTarget.value })
        }
        if (elmId === "passInput") {
            this.setState({ password: e.currentTarget.value })
        }
    }
    login() {
        fetch("https://password-manager-server.vercel.app/api/login", {
            method: "POST",credentials: 'include' , headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ username: this.state.username, password: this.state.password })
        })
            .then(res => res.text())
            .then(obj => {
                console.log(obj)
                if (obj === "Approved") { this.setState({ loggedon: true, authCheck: true }) }
                else {
                    this.setState({ loginfail: true, authCheck: true });
                }
            })

    }
    loginErr() {
        if (this.state.loginfail) {
            return (<div className="notice notice-error">Username or password is incorrect.</div>)
        }
    }
    componentDidMount() {
        fetch("https://password-manager-server.vercel.app/api/authCheck", { method: "GET",credentials: 'include' })
            .then(res => res.json())
            .then(obj => {
                if (obj.result === "Approved") {
                    this.setState({ loggedon: true, authCheck: true })
                }
                else {
                    this.setState({ authCheck: true })
                }
            })
    }
    render() {
        if (this.state.loggedon) {
            return (
                <div className="auth-status">
                    <h3>You're in — opening your vault…</h3>
                    <AuthPoint successRedirect={"/profile"} failRedirect={false} />
                </div>
            )
        }
        if (this.state.authCheck) {
            return (
                <div className="auth card">
                    <span className="eyebrow">Welcome back</span>
                    <h2>Open your vault</h2>
                    {this.loginErr()}
                    <label className="field">
                        <span>Username</span>
                        <input type="text" placeholder="yourname" id="userInput" autoComplete="username" onChange={this.handleInput} required />
                    </label>
                    <label className="field">
                        <span>Password</span>
                        <input type="password" placeholder="Your password" id="passInput" autoComplete="current-password" onChange={this.handleInput} required />
                    </label>
                    <button className="btn-primary btn-block" onClick={this.login}>Log in</button>
                    <p className="auth-alt">New here? <Link to="/register">Create an account</Link></p>
                </div>
            )
        }
        else {
            return (<div className="auth-status"><h3>Loading…</h3></div>)
        }
    }
}
export default Login;
