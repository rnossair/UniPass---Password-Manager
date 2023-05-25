import { useNavigate } from "react-router-dom";
function Logoff() {
    let navigate = useNavigate();
    function checkLogOut() {
        fetch("/api/logout", { method: "GET" })
            .then(res => res.json())
            .then(obj => {
                if (obj.result === "Logged out") {
                    navigate("/");
                }
            })
    }
    return (<div className="LogOut">
        <p>Logging out...</p>
        {checkLogOut()}
    </div>);
}
export default Logoff;