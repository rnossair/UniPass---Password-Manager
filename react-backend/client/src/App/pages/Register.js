import React from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
        fetch("/api/register", {
            method: "POST", headers: {
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
            <div className="Register">
                <p>Register</p>
                <input type="text" placeholder="Username" id="userInput" onChange={this.handleInput} required />
                <input type="text" placeholder="Password" id="passInput" onChange={this.handleInput} required />
                <button onClick={this.register}>Register Now!</button>
                <p>Already a member? <Link to="/login">Login</Link></p>
                {this.redirector()}

            </div>
        )
    }
}
export default Register;