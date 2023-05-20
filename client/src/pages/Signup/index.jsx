
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"
import * as yup from 'yup';



const validationSchema = yup.object().shape({
    firstName : yup
        .string()
        .required("First name is required"),
    lastName  : yup
        .string()
        .required("Last name is required"),
    username  : yup
        .string()
        .required("Username is required"),
    email     : yup
        .string()
        .required("Email is required")
        .email("Invalid email"),
    password  : yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long'),
});

const routes = {
    homeRoute : "/",
    loginRoute : "/login",
}

export default function SignUp() {
    const [isChecked, setIsChecked] = useState(false);

    const firstNameInputReference = useRef("");
    const lastNameInputReference = useRef("");
    const usernameInputReference = useRef("");
    const emailInputReference = useRef("");
    const passwordInputReference = useRef("");

    const navigate = useNavigate();

    async function handleShowPasswordChange(event) {
        setIsChecked(!isChecked);
    }

    const toastOptions = {autoClose : 700}

    async function handleSubmission(event) {
        event.preventDefault();
        const registrationEndpoint = "http://localhost:3000/auth/register";

        const formData = {
            firstName: firstNameInputReference.current.value,
            lastName:  lastNameInputReference.current.value,
            username:  usernameInputReference.current.value,
            email:     emailInputReference.current.value,
            password:  passwordInputReference.current.value,
        };

        try {

            validationSchema.validateSync(formData);

            const a = await axios.post(registrationEndpoint, formData)
            console.log(a)
            const toastMessage = 'Registration completed!';
            toast.success(toastMessage, toastOptions)
            navigate("/login");
   
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <form
            onSubmit={handleSubmission}
            className="container mx-auto w-full md:w-[350px] px-4 shadow-lg py-4 text-white/80 mt-20 min-h-screen space-y-4"
        >
            <h1 className="text-green-400 text-3xl text-center">Signup</h1>
            <p>To get started in receiving <span className="text-green-400">Anonymous Messages</span> please signup.</p>

            <div className="space-y-4 mt-4">
                <div className="relative">
                    <input
                        type="text"
                        id="firstname"
                        className="floating-input peer"
                        name="firstname"
                        placeholder=" "
                        ref={firstNameInputReference}
                        maxLength="30"
                    />
                    <label htmlFor="firstname" className="floating-label">
                        Firstname
                    </label>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        id="lastname"
                        className="floating-input peer"
                        name="lastname"
                        placeholder=" "
                        ref={lastNameInputReference}
                        maxLength="30"

                    />
                    <label htmlFor="lastname" className="floating-label">
                        Lastname
                    </label>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        id="username"
                        className="floating-input peer"
                        name="username"
                        placeholder=" "
                        ref={usernameInputReference}

                    />
                    <label htmlFor="username" className="floating-label">
                        Username
                    </label>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        id="email"
                        className="floating-input peer"
                        name="email"
                        placeholder=" "
                        ref={emailInputReference}
                    />
                    <label htmlFor="email" className="floating-label">
                        Email
                    </label>
                </div>

                <div className="relative">
                    <input
                        type={isChecked ? "text" : "password"}
                        id="password"
                        className="floating-input peer"
                        placeholder=" "
                        ref={passwordInputReference}
                    />
                    <label htmlFor="password" className="floating-label">
                        Password
                    </label>
                </div>
            </div>

            <div className="mt-4">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleShowPasswordChange}
                    name="showPassword"
                    id="showpassword"
                />
                <label htmlFor="showpassword" className="ml-2">
                    Show Password
                </label>
            </div>

            <button
                type="submit"
                className="text-white/80 btn-primary ring-2 ring-green-400 mt-4 transition mx-auto block hover:bg-green-400 hover:text-black">
                Get Started
            </button>

            <p className="text-center">
                {"Already have an account? "}
                <Link to="/login" className="text-green-400 underline">
                    Log In!
                </Link>
            </p>
        </form>
    );
}