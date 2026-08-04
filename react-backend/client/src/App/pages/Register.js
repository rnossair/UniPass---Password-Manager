import React from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./auth.scss";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            registered: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.register = this.register.bind(this);
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
    register() {
        fetch("https://password-manager-server.vercel.app/api/register", {
            method: "POST",credentials: 'include', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ username: this.state.username, password: this.state.password })
        })
            .then(res => res.json())
            .then(obj => {

                if (obj.result === "Successfully registered!") {
                    this.setState({ registered: true })
                }
            })

    }
    redirector() {
        if (this.state.registered) {
            return (<Navigate to="/login" />);
        }
    }
    render() {
        return (
            <div className="auth card">
                <span className="eyebrow">Create your vault</span>
                <h2>Join UniPass</h2>
                <label className="field">
                    <span>Username</span>
                    <input type="text" placeholder="Pick a username" id="userInput" autoComplete="username" onChange={this.handleInput} required />
                </label>
                <label className="field">
                    <span>Password</span>
                    <input type="password" placeholder="Create a password" id="passInput" autoComplete="new-password" onChange={this.handleInput} required />
                </label>
                <button className="btn-primary btn-block" onClick={this.register}>Create account</button>
                <p className="auth-alt">Already a member? <Link to="/login">Log in</Link></p>
                {this.redirector()}
            </div>
        )
    }
}
export default Register;