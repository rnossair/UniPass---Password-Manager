import React from "react";
import { Link } from "react-router-dom";
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {username: "-"}
    }
    componentDidMount(){
        fetch("/api/getUser",{ method: "GET"})
            .then(res => res.json())
            .then(obj => {
                if(!obj.error){
                    this.setState({username: obj.username})
                }
            })
    }
    render(){
        return(
            <div id="profilePage">
            <h1>Welcome {this.state.username}!</h1>
            <Link to="/logout">
                <button>Logout</button>
            </Link>
            <Link to="/passlist">
                <button>Manage passwords</button>
            </Link>
            </div>
            
        )
    }   
}
export default Profile;
