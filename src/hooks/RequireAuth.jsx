import { Outlet,Navigate,useLocation } from "react-router-dom"
import useAuth from "./useAuth"

const RequireAuth = () => {
    const {auth} = useAuth();
    const currlocation = useLocation();

    return(
        auth?.email ? <Outlet /> : <Navigate to="/login" state={{from:currlocation }} replace />
    )
}

export default RequireAuth