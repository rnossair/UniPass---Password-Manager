import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            menuOpen: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentDidMount() {
        fetch("https://password-manager-server.vercel.app/api/authCheck", {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(obj => {
                this.setState({ logged: obj.result === "Approved" });
            })
            .catch(() => this.setState({ logged: false }));
    }

    toggleMenu() {
        this.setState(s => ({ menuOpen: !s.menuOpen }));
    }

    closeMenu() {
        this.setState({ menuOpen: false });
    }

    render() {
        const linkClass = ({ isActive }) => (isActive ? "navlink active" : "navlink");
        const accountLink = this.state.logged
            ? <NavLink to="/profile" className={linkClass} onClick={this.closeMenu}>Profile</NavLink>
            : <NavLink to="/register" className={linkClass} onClick={this.closeMenu}>Sign up</NavLink>;

        return (
            <header id="NavBar">
                <div className="nav-inner container">
                    <NavLink to="/" end className="brand" onClick={this.closeMenu} aria-label="UniPass home">
                        <span className="brand-mark" aria-hidden="true" />
                        UniPass
                    </NavLink>

                    <button
                        className="nav-toggle"
                        aria-label="Toggle navigation menu"
                        aria-expanded={this.state.menuOpen}
                        onClick={this.toggleMenu}
                    >
                        <span className={this.state.menuOpen ? "burger open" : "burger"} />
                    </button>

                    <nav id="links" className={this.state.menuOpen ? "open" : ""}>
                        <NavLink to="/" end className={linkClass} onClick={this.closeMenu}>About</NavLink>
                        <NavLink to="/passlist" className={linkClass} onClick={this.closeMenu}>Vault</NavLink>
                        <NavLink to="/gen" className={linkClass} onClick={this.closeMenu}>Generator</NavLink>
                        {accountLink}
                    </nav>
                </div>
            </header>
        );
    }
}

export default NavBar;
