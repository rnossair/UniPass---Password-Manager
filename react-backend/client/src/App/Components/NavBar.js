import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            logged: false,
            path: "/"
        }
        //this.handleLinkClick = this.handleLinkClick.bind(this)
    }
    componentDidMount(){
        let currPath = window.location.pathname;
        if(document.getElementById(currPath)){
            document.getElementById(currPath).classList.add("focusPage");
        } 
        fetch("/api/authCheck")
        .then(res => res.json())
        .then(obj => {
            if(obj.result === "Approved"){
                this.setState({logged: true});
            }
            else{
                this.setState({logged: false});
            }
        });
        return;
    }
    componentDidUpdate(prevProvs, prevState){
        let links = document.getElementsByClassName("Link");
        if(document.getElementById(this.props.path)){
            for(let i = 0; i < links.length; i++){
                links[i].classList.remove("focusPage");
            }
            document.getElementById(this.props.path).classList.add("focusPage");
        } 
    }
    /*handleLinkClick(){
        let currPath = window.location.pathname;
        let links = document.getElementsByClassName("Link");
        for(let i = 0; i < links.length; i++){
            links[i].classList.remove("focusPage");
        }
        document.getElementById(currPath).classList.add("focusPage");
        this.setState({path: currPath});
    }*/
    render(){
        let element; 
            if(this.state.logged){
            element = <Link to="/profile" id="/profile" onClick={this.handleLinkClick} className="Link"><h2>Profile</h2></Link>;
        }
        else{
            element = <Link to="/register" id="/register" onClick={this.handleLinkClick} className="Link"><h2>Sign up</h2></Link>
        }
       
        return(
            <div id="NavBar">
                <h1 style={{"color": "#128C7E", "margin-left": "2vh"}}>UniPass</h1>
                <div id="links">
                    <Link to="/" id="/" onClick={this.handleLinkClick} className="Link"><h2>About</h2></Link>
                    <Link to="/passlist" id="/passlist" onClick={this.handleLinkClick} className="Link"><h2>Home</h2></Link>
                    <Link to="/gen" id="/gen" onClick={this.handleLinkClick} className="Link"><h2>Generator</h2></Link>
                    {element}   
                </div>
            </div>
        )
    }
}
export default NavBar;