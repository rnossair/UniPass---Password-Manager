import {useNavigate} from "react-router-dom";
function AuthPoint({successRedirect, failRedirect}){
    let navigate = useNavigate();
    function checkAuth(succesRedirect, failRedirect) {
        fetch("https://password-manager-server.vercel.app/api/authCheck",{ method: "GET"})
        .then(res => res.json())
        .then(obj => {

            
            if(obj.result === "Approved"){
                if(successRedirect){
                    navigate(succesRedirect);
                }
                return;
            }
            else{
                if(!failRedirect){
                    return;
                }
                navigate('/register');
            }

        })
    }
        return(<div className="AuthVerify">
                {checkAuth(successRedirect, failRedirect)}
        </div>);
}
export default AuthPoint;