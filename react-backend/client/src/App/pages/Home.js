import { Component } from "react";
import {Link} from "react-router-dom";
class Home extends Component{

    render(){
        return(
            <div className="App">
            <h1>Welcome</h1>
            <Link to={'./gen'}>
              <button variant="raised">
                  Generator
                </button>   
                </Link>
                <Link to={'./login'}>
              <button variant="raised">
                  Login
                </button>   
                </Link>
                <Link to={'./register'}>
              <button variant="raised">
                  Register
                </button>   
                </Link>
            </div>
        );
    }
}
export default Home;