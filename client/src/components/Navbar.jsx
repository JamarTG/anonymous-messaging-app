import { useContext } from "react";
import userContext from "../../contexts/userContext";
import { TiMessages } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const { user } = useContext(userContext);
    const navigate = useNavigate();

    function navigateToLogoutHandler() {
        e.preventDefault()
        navigate(routes.logoutRoute);
    }

    const routes = {
        homeRoute : "/",
        logoutRoute : "/logout" 
    }

    return (
        <nav className="bg-green-400 px-2 md:px-20 shadow-lg  w-full z-10 gap-20 h-16 flex items-center">
            <div className="text-2xl md:text-3xl  text-white font-bold font-mono  text-center flex justify-between items-center w-full">
                <div className="flex gap-2">
                    <TiMessages />
                    <Link to={routes.homeRoute}>
                        Anonymous 
                        <span 
                            className="text-purple-700 underline">Link</span>
                    </Link>
                </div>
                <div>
                    {user &&
                        <Link 
                            onClick={navigateToLogoutHandler} 
                            to={routes.logoutRoute} 
                            className="text-white text-xl border border-1 hover:bg-green-500 py-2 px-4 rounded-lg"
                        >
                            Logout
                        </Link>
                    }
                </div>
            </div>
        </nav>
    );
}