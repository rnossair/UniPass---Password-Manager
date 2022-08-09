import React from "react";

class passList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            passwords: [],
            nameInput: "",
            passInput: ""
        }
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handlePassInput = this.handlePassInput.bind(this);
    }
    handleNameInput(e){
        this.setState({lengthInput: e.target.value})
    }
    handlePassInput(e){
        this.setState({lengthInput: e.target.value})
    }
    generatePassword(){

    }
    render(){
        return(<div className="passListPage">
            <h1>List:</h1>
            <div id="registerPass">
                <h4>Add new password:</h4>
                <div className="inputContainer">
                    <input type="text" placeholder="Website/Service" onChange={this.handleNameInput}></input>
                    <input type="text" placeholder="Password" onChange={this.handleNameInput}></input>
                    <button onClick={this.generatePassword}>Generate Secure Password</button>
                    <button>Submit</button>
                </div>
            </div>
        </div>
        )
    }
}
export default passList;