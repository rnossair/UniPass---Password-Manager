import React from "react";
import AuthPoint from "./AuthPoint";
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
            return (<div id="loginfail"><p>Error: Username or password is incorrect</p></div>)
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
            return (<div>
                <h3>Logged in, redirecting...</h3>
                <AuthPoint successRedirect={"/profile"} failRedirect={false} />
            </div>
            )
        }
        if (this.state.authCheck) {
            return (
                <div className="Login">
                    <p>Login</p>
                    {this.loginErr()}
                    <input type="password" placeholder="Username" id="userInput" onChange={this.handleInput} required />
                    <input type="password" placeholder="Password" id="passInput" onChange={this.handleInput} required />
                    <button onClick={this.login}>Login</button>

                </div>
            )
        }
        else {
            return (<h3>Loading...</h3>)
        }
    }
}
export default Login;
