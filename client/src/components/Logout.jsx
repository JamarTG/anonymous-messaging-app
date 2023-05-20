import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../contexts/userContext";
import routes from "../utilities/routes";

export default function Logout() {
    const navigate = useNavigate();
    const { setUser } = useContext(userContext);

    useEffect(function () {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
    }, []);

    return <></>;
}