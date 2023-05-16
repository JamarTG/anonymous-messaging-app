import {MdOutlineContentCopy, MdShare, MdWhatsapp} from "react-icons/md"
import {toast } from "react-toastify"

import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"
import userContext from "../../../contexts/userContext";
import axios from "axios";
import MessageBox from "../../components/MessageBox";

import PreLoader from "../../components/PreLoader";

export default function Dashboard() {
    const { user } = useContext(userContext);
    const [messages, setMessages] = useState([]);
    const [userToReplyTo, setUserToReplyTo] = useState({
        name: "Nobody",
        id: "default",
    });
    const navigate = useNavigate()
    const [refreshState, setRefreshState] = useState(false);
    const [loading, setLoading] = useState(false)

    const userMessageInputReference = useRef("");

    const text = `⚡⚡Send me a message! I will never know who sent it!🙈🙈\n\n ${window.location.host}/send/${user.username}`
    const whatsappLink = `https://api.whatsapp.com/send?text=${text}`

    useEffect(
        function () {
            async function fetchMessages() {
                try {
                    setLoading(true)
                    const response = await axios.get(
                        `http://localhost:3000/messages/${user.username}`
                    );
                    setMessages(response.data.userMessages);
                    setLoading(false)
                    
                    // use toast to notify success sending message
                    toast.success("Messages Updated!")
                } catch(err)
                    {
                    // use a toast to notify user that the messages cannot be fetched
                    toast.error("Eror fetching messages")
                    navigate('/')

                }
            }

            if (!userToReplyTo) {
                setUserToReplyTo({ name: "Nobody", id: "default" });
            }
            window.scrollTo(0, document.body.scrollHeight);
            fetchMessages();
        },
        [refreshState, setRefreshState]
    );

    async function handleMessageSubmission() {
        const messageEndPoint = `http://localhost:3000/messages/${user.username}`;

        if (userToReplyTo.name === undefined) {
            setUserToReplyTo({ name: "Nobody", id: "default" });
        }

        const messageData = {
            sender: user.username,
            content: userMessageInputReference.current.value,
            senderId: user._id,
            recipient: userToReplyTo ? userToReplyTo.name : "Nobody",
            recipientId: userToReplyTo ? userToReplyTo.id : "default",
        };

        try {
            await axios.post(messageEndPoint, messageData);
            setRefreshState(!refreshState);
            // toast to indicate success sending the message
        } catch (error) {
            // const errorStatus = error.response.data.s;
            // Please use appropriate toast messages and not what I write in comments

            console.log(error);
            //   switch (errorStatus) {
            //     case 404:
            //       // The user was not found
            //       break;
            //     case 401:
            //       // creating the message failed - prolly bad request
            //       break;
            //     case 500:
            //       // server error :(
            //       break;
            //     default:
            //     // Unknown error
            //   }
            // }
            // })
        }
    }

    function copyToClipboard() {
        
        navigator.clipboard.writeText(text)

        toast.success("Link copied to clipboard!")
    }

    return (
        <div className="mt-20 flex  flex-col align-center items-center justify-center ">
        {
            loading ?
            
            (<PreLoader />)
                : 
            (
                <>
                    <div className="flex flex-col pb-4 mb-4 text-white space-y-4">
                        <p className="text-3xl text-center">
                            Welcome back ,{" "}
                            <span className="text-3xl text-green-400 font-semibold">
                                {user?.username}
                            </span>
                            
                        </p>

                        <p className="text-center">
                            {
                                messages?.length == 0 ?
                                    "You have no messages"
                                    :
                                    (
                                        <>
                                            You have{" "}
                                            <span className="text-green-400 underline">
                                                {messages?.length}
                                            </span>{" "}
                                            message{messages?.length > 1 ? "s" : ""}
                                        </>
                                    )
                            }
                        </p>
                
                        <div className="space-y-4">
                            <p>Copy the link below and share it!</p>
                            {/* using location.host so the link will change when deploying */}
                            <div className="relative bg-purple-900 p-2">
                            <p className="bg-purple-900 p-2 text-white max-w-[80%] break-words ">{`${window.location.host}/send/${user.username}`}</p>
                            <div className="flex space-x-2 text-white absolute right-2 bottom-4">
                            <MdOutlineContentCopy size={20} onClick={copyToClipboard} className="hover:text-green-400 transition hover:cursor-pointer" title="Copy text to clipboard" />
                            <Link to={whatsappLink}><MdWhatsapp size={20} className="hover:text-green-400 transition hover:cursor-pointer" title="Send link to whatsapp"/></Link>
                            </div>
                            </div>
                        
                        </div>
                    </div>

                    <hr className="w-4/5 border-gray-400"/>
                    <div className="container mx-auto max-w-[800px] p-6">
                        <div className="space-y-3">

                        {messages.length==0 && (
                            <p className="text-white max-w-md text-center mx-auto"><span className="text-6xl block mb-4">😓</span>Ooops... You currently have no messages... copy the above link now and send to your friends so they can start sending you anonymous messages!</p>
                        )}

                            {messages.map(function (message, index) {
                                return (
                                    <MessageBox
                                        key={index}
                                        setUserToReplyTo={setUserToReplyTo}
                                        userToReplyTo={userToReplyTo}
                                        sender={message.sender}
                                        senderId={message.senderId}
                                        message={message.content}
                                        date={new Date(message.dateSent)}
                                    />
                                );
                            })}
                </div>

                <div className={`${messages.length==0 ? "hidden" : "block"}`}>
                    {/* <PreLoader /> */}
                    <div className="relative mt-10 bottom-1 w-full">
                        <input
                            type={"text"}
                            ref={userMessageInputReference}
                            name="password"
                            id="password"
                            className="floating-input peer"
                            placeholder=" "
                        />
                        <label
                            htmlFor="password"
                            className="floating-label"
                        >{`Replying to ${userToReplyTo?.name}`}</label>
                    </div>
                    <button
                        type="submit"
                        className="text-white/80 font-bold rounded-lg px-4 py-2 ring-2 ring-green-400 mt-4 transition mx-auto block hover:bg-green-400"
                        onClick={handleMessageSubmission}
                    >
                        Send
                    </button>
                </div>
            </div>
                        </>
                    )
            }

            
        </div>
    );
}
