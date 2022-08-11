import {useNavigate} from "react-router-dom";
function AuthPoint({successRedirect, failRedirect}){
    let navigate = useNavigate();
    function checkAuth(succesRedirect, failRedirect) {
        fetch("/api/authCheck",{ method: "GET"})
        .then(res => res.json())
        .then(obj => {

            
            if(obj.result === "Approved"){
                if(succesRedirect){
                    navigate(succesRedirect);
                }
                return;
            }
            else{
                if(!failRedirect){
                    return;
                }
                navigate('/login');
            }

        })
    }
        return(<div className="AuthVerify">
                {checkAuth(successRedirect, failRedirect)}
        </div>);
}
export default AuthPoint;