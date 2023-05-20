import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import { useParams , Link  } from "react-router-dom";
import generateRandomNickname from "../../utilities/nameGenerator";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import MessageBox from "../../components/MessageBox";
import AnonUserMessageBox from "../../components/AnonUserMessageBox";

export default function SendMessage() {

    const { username } = useParams();
    const navigate = useNavigate();
    const anonUserMessageReference = useRef("");
    const toastId = "empty-msg-toast"

    const [anonymousUser, setAnonymousUser] = useState({
        name: "Random Noob",
        id: uuidv4(),
    });

    const [userId, setUserId] = useState(null);
    const [messages, setMessages] = useState([])


    useEffect(function () {
        async function fetchMessages() {
            try {
                const response = await axios.get(
                    `http://localhost:3000/messages/${username}`
                );
                setMessages(response.data.userMessages);    
            } catch (err) {
                toast.error("Error fetching messages");
                navigate("/");
            }
        }
        fetchMessages();
    }, []);

    async function handleMessageSubmission() {
        const messageEndPoint = `http://localhost:3000/messages/${username}`;

        if (anonUserMessageReference.current.value.trim() == "") {
            toast.warn("cannot deliver empty message", { toastId: toastId })
            return
        }

        async function determineIfUserExists() {
            try {
                const res = await axios
                    .get(`http://localhost:3000/user/${username}`)
                    .then(function (response) {
                        console.log(response.data)
                        setUserId(response.data)
                    }
                );

                return res;
            } catch (err) {
                toast.error("error finding user", { autoClose: 500 })
            }

        }

        await determineIfUserExists().then(async function () {
            if (!userId) {
                toast.error("no such user found", { autoClose: 100 })
                return;
            }

            const messageData = {
                username: username,
                sender: anonymousUser.name,
                content: anonUserMessageReference.current.value,
                senderId: anonymousUser.id,
                recipient: username,
                recipientId: userId,
            };

            try {
                await axios.post(messageEndPoint, messageData);
                toast.success("message delivered!", { autoClose: 500 })
                anonUserMessageReference.current.value = "";
            } catch (error) {
                const errorStatus = error.response.status;

                switch (errorStatus) {
                    case 404:
                        toast.error("User not found. Please check the username.");
                        break;
                    case 401:
                        toast.error("Unauthorized. Error sending message. Please try again later.");
                        break;
                    case 500:
                        toast.error("Server error. We apologize for the inconvenience. Please try again later.");
                        break;
                    default:
                        toast.error("An unknown error occurred. Please try again later.");
                }
            }

        });
    }

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
                {"Send a secret message to "}
                <p className="text-green-400 underline font-bold">
                    {username}
                </p>
                <p className="text-white my-4 text-xl">
                    {" You are "}
                    <span className="text-purple-400 underline">
                        {anonymousUser && anonymousUser.name}
                    </span>
                </p>
            </h1>
            {messages.map(function (message, index) {
            return (
              <AnonUserMessageBox
                key={index}
                sender={message.sender}
                senderId={message.senderId}
                message={message.content}
                date={new Date(message.dateSent)}
              />
            );
          })}
            <div className="flex flex-col px-30 justify-center items-center">
                <div className="relative w-1/2">
                    <input
                        type="text"
                        ref={anonUserMessageReference}
                        name="password"
                        id="password"
                        className="floating-input peer border-0 w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="Type your message here..."
                    />
                    <label htmlFor="password" className="absolute top-0 left-0 ml-4 mt-2 text-gray-500">
                        {/* {userToReplyTo.name !== "Nobody" && `Replying to ${userToReplyTo?.name}`} */}
                    </label>
                </div>
                <button
                    type="submit"
                    className="text-white/80 h-8 font-bold rounded-lg px-4 py-2 ring-2 ring-green-400 mt-4 transition bg-green-500 hover:bg-green-400"
                    onClick={handleMessageSubmission}
                >
                    Send
                </button>
            </div>

            <p className="text-white my-4">If you ever want your own personal link to send to your friends and receive <span className="text-green-400">anonymous messages</span> you can always <Link to="/signup" className="text-green-400 underline">SIGN UP!</Link></p>

        </div>
    );
}