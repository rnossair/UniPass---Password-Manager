import React from "react";
import $ from "jquery";
import AuthPoint from "./AuthPoint";
class passList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            passwords: [],
            nameInput: "",
            passInput: "",
            masterPassword: "",
            mpSet: false,
            masterPassInput : "",
            securePass: "",
            gotPass: false
        }
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handlePassInput = this.handlePassInput.bind(this);
        this.handleMasterPassInput = this.handleMasterPassInput.bind(this);
        this.submitMasterPass = this.submitMasterPass.bind(this);
        this.generatePassword = this.generatePassword.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.getPasswords = this.getPasswords.bind(this);
        this.passRender = this.passRender.bind(this);
        this.copyToClipBoard = this.copyToClipBoard.bind(this);
        this.checkLogState = this.checkLogState.bind(this);
        this.registerMasterPass = this.registerMasterPass.bind(this);
    }
    handleNameInput(e){
        this.setState({nameInput: e.target.value})
    }
    handlePassInput(e, id){
        if(e){
            this.setState({passInput: e.target.value})
        }
        else{
            this.setState({passInput: document.getElementById(id).value})
        }      
    }
    handleMasterPassInput(e){
        this.setState({masterPassInput: e.target.value})
    }
    generatePassword(){
        fetch("/api/pass", { method: "POST", headers: {
            'Content-Type': 'application/json',
            }, body: JSON.stringify({count: 1, passLength: 18}) })
          .then(res => res.json())
          .then(obj => {
            $("#passInput").val(obj.passwords[0]);
            this.handlePassInput(false, "passInput");
          });
    }
    submitMasterPass(){
        let mp = this.state.masterPassInput;
        fetch("/api/mpverify", {method: "POST", headers: {"Content-Type": 'application/json'
    }, body: JSON.stringify({mp: mp})})
            .then(res => res.json())
            .then(obj => {
                console.log(obj.result);
                if(obj.result === "Success"){
                    this.setState({masterPassword: mp})
                }
            })
    }
    registerMasterPass(){
        let mp = this.state.masterPassInput;
        fetch("/api/mpsubmit", {method: "POST", headers: {"Content-Type": 'application/json'
    }, body: JSON.stringify({mp: mp})})
            .then(res => res.json())
            .then(obj => {
                console.log(obj.result);
                if(obj.result === "Success"){
                    this.setState({masterPassword: mp})
                }
            })
    }
    submitPassword(){
         let pass = this.state.passInput;
         let name = this.state.nameInput;
         if(!pass ||!name){
            console.log("missing pass/name");
         }
         else{
            fetch("/api/submitPass",{ method: "POST", headers: {
                'Content-Type': 'application/json',
                }, body: JSON.stringify({masterPass: this.state.masterPassword, pass: pass, name: name}) })
                .then(() => this.setState({gotPass: false}))
         }
    }
    getPasswords(){
        if(!this.state.gotPass){
            fetch("/api/getPass", { method: "POST", headers: {
                'Content-Type': 'application/json',
                }, body: JSON.stringify({masterPass: this.state.masterPassword}) })
                .then(res => res.json())
                .then(res => {
                    this.setState({gotPass: true, passwords: res})
                    
                });
        }
        
    }
   passRender(){
        let passArr = this.state.passwords.map((e) => {return(<li key={e.name}><p>{e.name}</p><button onClick={this.copyToClipBoard} id={e.name + "-" + e.password}>{e.password}</button></li>)});
        return passArr;
    }
    copyToClipBoard(e) {

        var copyText = document.getElementById(e.currentTarget.id);
        navigator.clipboard.writeText(copyText.textContent);
      }
     checkLogState(){
       return(<AuthPoint failRedirect={true}/>); 

    }
    componentDidMount(){
        if(!this.state.mpSet){
            fetch("/api/mpGet")
            .then(res => res.json())
            .then(obj => {
                console.log(obj.result)
                if(obj.result === "Mp set"){
                    this.setState({mpSet: true});
                }
                else{
                    this.setState({mpSet: false});
                }
            })
        }
        
    }
    render(){
        
        if(this.state.masterPassword !== ""){
                    return(<div id="passListContainer">
                        {this.checkLogState()}
                            <h1>Pass List:</h1>
                        <div id="passList">
                            {this.getPasswords()}
                            <ul className="passContainer">
                                {this.passRender()}
                            </ul>
                        </div>
                        <div id="registerPass">
                             <h4>Add new password:</h4>
                             <div className="inputContainer">
                                  <input type="text" placeholder="Website/Service" onChange={this.handleNameInput}></input>
                                  <input type="text" placeholder="Password" onChange={this.handlePassInput} id="passInput"></input>
                                  <button onClick={this.generatePassword}>Generate Secure Password</button>
                                  <button onClick={this.submitPassword}>Submit</button>
                        </div>
                     </div>
                            </div>
                    )
                }
                else{
                    if(this.state.mpSet){
                        return(

                            <div id="masterPassSubmit">
                                {this.checkLogState()}
                                <input placeholder="Enter Master Password: " type="text" onChange={this.handleMasterPassInput}></input>
                                <button onClick={this.submitMasterPass}>Submit</button>
                            </div>
    
                        )
                    }
                    else{
                        return(
                            <div id="masterPassRegister">
                                {this.checkLogState()}
                                <h3>Register a new master password:</h3>
                                <input placeholder="Master Password: " type="text" onChange={this.handleMasterPassInput}></input>
                                <button onClick={this.registerMasterPass}>Submit</button>
                            </div>
                        )
                    }
                    
                }
        
    }
}
export default passList;