import {useNavigate} from "react-router-dom";
function AuthPoint(){
    let navigate = useNavigate();
    function checkAuth(prevUrl, nextUrl) {
        fetch("/api/authCheck",{ method: "GET"})
        .then(res => res.json())
        .then(obj => {
            if(obj.result === "Approved"){
                navigate("/gen")
            }
            else{
                navigate("/");
            }
        })
    }
        return(<div className="AuthVerify">
                {checkAuth()}
        </div>);
}
export default AuthPoint;