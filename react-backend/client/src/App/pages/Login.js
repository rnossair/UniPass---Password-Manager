import React from "react";
import AuthPoint from "./AuthPoint";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loggedon: false,
            loginfail: false
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
        fetch("/api/login", {
            method: "POST", headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ username: this.state.username, password: this.state.password })
        })
            .then(res => res.text())
            .then(obj => {
                console.log(obj)
                if (obj === "Approved") { this.setState({ loggedon: true }) }
                else {
                    this.setState({ loginfail: true });
                }
            })

    }
    loginErr() {
        if (this.state.loginfail) {
            return (<div id="loginfail"><p>Error: Username or password is incorrect</p></div>)
        }
    }
    render() {
        return (
            <div className="Login">
                <p>Login</p>
                {this.loginErr()}
                <input type="password" placeholder="Username" id="userInput" onChange={this.handleInput} required />
                <input type="password" placeholder="Password" id="passInput" onChange={this.handleInput} required />
                <button onClick={this.login}>Login</button>
                <AuthPoint successRedirect={"/profile"} failRedirect={false} />

            </div>
        )
    }
}
export default Login;
