import { useContext } from "react";
import userContext from "../../contexts/userContext";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { user } = useContext(userContext);

    return (
        <nav className="bg-green-400 px-2 md:px-10 shadow-lg fixed top-0 w-full z-10 gap-20 h-16 flex items-center">
            <div className="text-2xl md:text-3xl  text-white font-bold font-mono  text-center flex justify-between items-center w-full">
                <div className="flex gap-2">
                    <TiMessages /> 
                    <Link to={"/"}>
                        Anonymous{" "}
                        <span className="text-purple-700 underline">Link</span>
                    </Link>
                </div>
                <div>
                    {user ? (
                        <>
                            {/* <Link to="/" className="text-white ml-5">
                                Home
                            </Link>
                            <Link to="/dashboard" className="text-white ml-5">
                                Dashboard
                            </Link> */}
                            <Link to="/logout" className="text-white text-xl bg-red-500 font-light py-2 px-4 rounded-lg hover:bg-transparent hover:border hover:border-white transition ">
                                Logout
                            </Link>
                        </>
                    )
                            :
                            (
                                <>
                                    <Link to="/login" className="btn-primary bg-purple-800 text-xl  transition hover:bg-purple-900">
                                        Login
                                    </Link>
                                </>
                            )
                }
                </div>

            </div>

            {/* <div className="text-xl text-white text-center flex">
                
            </div> */}
        </nav>
    );
}