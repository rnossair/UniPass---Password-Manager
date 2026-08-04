import React from "react";
import { Link } from "react-router-dom";
import "./profile.scss";
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "-" }
    }
    componentDidMount() {
        fetch("https://password-manager-server.vercel.app/api/getUser", { method: "GET",credentials: 'include'  })
            .then(res => res.json())
            .then(obj => {
                if (!obj.error) {
                    this.setState({ username: obj.username })
                }
            })
    }
    render() {
        const initial = (this.state.username && this.state.username !== "-")
            ? this.state.username.charAt(0).toUpperCase()
            : "…";
        return (
            <div id="profilePage" className="card">
                <div className="avatar" aria-hidden="true">{initial}</div>
                <span className="eyebrow">Signed in</span>
                <h1>Welcome, {this.state.username}</h1>
                <p>Your vault is unlocked from here. Manage your saved passwords or sign out securely.</p>
                <div className="profile-actions">
                    <Link to="/passlist"><button className="btn-primary">Manage passwords</button></Link>
                    <Link to="/logout"><button className="btn-ghost">Log out</button></Link>
                </div>
            </div>
        )
    }
}
export default Profile;
