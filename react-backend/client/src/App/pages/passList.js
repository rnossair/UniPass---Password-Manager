import React from "react";

class passList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            passwords: []
        }
    }
    render(){
        return(<div class="passListPage">
            <h1>List:</h1>
        </div>
        )
    }
}
export default passList;