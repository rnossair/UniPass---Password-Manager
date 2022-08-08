import {useNavigate} from "react-router-dom";
function AuthPoint({prevUrl, nextUrl, failRedirect}){
    let navigate = useNavigate();
    function checkAuth(prevUrl, nextUrl, failRedirect) {
        fetch("/api/authCheck",{ method: "GET"})
        .then(res => res.json())
        .then(obj => {
            let failUrl = prevUrl || "/"
            let successUrl = nextUrl || "/profile"
            console.log(successUrl);
            console.log(obj.result);
            
            if(obj.result === "Approved"){
                navigate(successUrl);
            }
            if(failRedirect){
                navigate(failUrl);
            }
            if(!prevUrl && !nextUrl){
                navigate(failUrl);
            }
            else{
                return
            }
        })
    }
        return(<div className="AuthVerify">
                {checkAuth(prevUrl, nextUrl, failRedirect)}
        </div>);
}
export default AuthPoint;