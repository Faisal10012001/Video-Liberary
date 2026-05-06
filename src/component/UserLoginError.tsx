import { Link } from "react-router-dom";

export function UserLoginError() {  
    return (
        <div className="text-danger">
            <h2>User doesn't Exist</h2>
            <Link to={'/user-login'}></Link>
        </div>
    )
}