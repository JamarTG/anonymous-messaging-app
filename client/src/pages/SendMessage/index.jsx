
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import generateRandomNickname from "../../utilities/nameGenerator";

import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function SendMessage() {
    const { username } = useParams();
    const toastId= "empty-msg-toast"

    const [anonymousUser, setAnonymousUser] = useState({
        name: "Random Noob",
        id: uuidv4(),
    });
    const [charCount, setCharCount] = useState(0);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(null);

    const conditions = [
        "Please keep messages fun, kind and respectful. We do not tolerate cyberbullying.",
        "Messages sent here are encrypted to ensure safe transmission to and from our server.",
        "Anyone can send an anonymous message, a user doesn't have to be signed in to send a message.",
    ];

    function handleChange(event) {
        const { value } = event.target;
        const length = value.length;

        setMessage((prev) => {
            return value;
        });
        setCharCount(length);
    }

    async function handleMessageSubmission() {
        const messageEndPoint = `http://localhost:3000/messages/${username}`;

        if(message.trim() == "") {
            // toast will not duplicate while 1 is visible
            //  although the handleMessageSubmission function will still run
            toast.warn("Message body can't be empty.", {toastId: toastId})
            return
        }

        async function determineIfUserExists() {
            // was an error with an uncaught exception fixed it 
            try {
                const res = await axios
                .get(`http://localhost:3000/user/${username}`)
                .then((response) => setUserId(response.data));

                return res
            }catch(err) {
                console.error(err)
                // toast.error("Error sending message")
            }
            
        }

        await determineIfUserExists().then(async function () {
            if (!userId) {
                // alert("User dont exist")
                // create a toast to indicate that you can't send a message to that person
                toast.warn("Error this user don't exist")
                return;
            }

            const messageData = {
                username: username,
                sender: anonymousUser.name,
                content: message,
                senderId: anonymousUser.id,
                recipient: username,
                recipientId: userId,
            };

            try {
                await axios.post(messageEndPoint, messageData);

                // toast to indicate success sending the message
                // smth sus is happening here i think
                // it seems like it takes a while to check if the user exist
                // cause i get the user dont exist error and then the second time it works
                toast.success("Message sent!")
                setMessage("")
            } catch (error) {
                const errorStatus = error.response.data.s;
                toast.error("Error sending message!!")
                console.log(messageData);
                // Please use appropriate toast messages and not what I write in comments

                switch (errorStatus) {
                    case 404:
                        // The user was not found
                        toast.error("User not found")
                        break;
                    case 401:
                        // creating the message failed - prolly bad request
                        toast.error("Error sending message. Try again later.")
                        break;
                    case 500:
                        // server error :(
                            toast.error("Server error. It's us not you.")
                        break;
                    default:
                    // Unknown error
                }
            }
        });
    }

    let terms = conditions.map((condition, index) => {
        return <li key={index}>{condition}</li>;
    });

    useEffect(function () {
        const storedAnonymousUser = localStorage.getItem("AnonUser");

        if (storedAnonymousUser) {
            setAnonymousUser(JSON.parse(storedAnonymousUser));
        } else {
            const randomAnonymousNickname = generateRandomNickname();

            const randomAnonymousUser = {
                id: uuidv4(),
                name: randomAnonymousNickname,
            };

            setAnonymousUser(randomAnonymousUser);
            localStorage.setItem(
                "AnonUser",
                JSON.stringify(randomAnonymousUser)
            );
        }
    }, []);

    return (
        <div className="my-20 container mx-auto bg-gray-800 px-6 py-10 max-w-[800px]">
            <h1 className="text-2xl md:text-4xl text-center text-white/90 ">
                Send a secret message to{" "}
                <span className="text-green-400 underline font-bold">
                    {username}
                </span>
            </h1>

            <p className="text-white my-4 text-xl">
                {" "}
                You are{" "}
                <span className="text-purple-400 underline">
                    {anonymousUser && anonymousUser.name}
                </span>
            </p>

            <p
                className={`text-right ${
                    message.length === 255 ? "text-red-500" : "text-white"
                }`}
            >
                {message.length}/255
            </p>

            <textarea
                name="message"
                id=""
                cols="30"
                rows="10"
                maxLength="255"
                className="text-white px-4 py-4 bg-gray-700 rounded-lg outline-0 resize-none w-full md:w-4/5 mx-auto ring-2 block  ring-green-400"
                onChange={handleChange}
                placeholder={`${username} will never know who sent this message🙈...`}
                value={message}
            ></textarea>
            <button
                className="text-white px-4 py-3 rounded bg-green-400 shadow-lg block my-4 mx-auto hover:bg-green-500 hover:scale-95 transition"
                onClick={handleMessageSubmission}
            >
                Send Message
            </button>

            <p className="text-white my-4">If you ever want your own personal link to send to your friends and receive <span className="text-green-400">anonymous messages</span> you can always <Link to="/signup" className="text-green-400 underline">SIGN UP!</Link></p>

            <h2 className="text-white text-3xl underline text-center">
                Terms and Conditions
            </h2>

            <ul className="list-disc space-y-4 text-white mt-4 ml-4">
                {terms}
            </ul>
        </div>
    );
}