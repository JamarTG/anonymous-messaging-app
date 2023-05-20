import { toast } from "react-toastify";
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../../contexts/userContext";
import axios from "axios";
import ChatContainer from "../../components/ChatContainer";
import Panel from "../../components/Panel";

export default function Dashboard() {
    const { user } = useContext(userContext);
    const [messages, setMessages] = useState([]);
    const [userToReplyTo, setUserToReplyTo] = useState({
        name: "Nobody",
        id: "default",
    });
    const navigate = useNavigate();
    const [refreshState, setRefreshState] = useState(false);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [hasNoMessages , setHasNoMessages] = useState(false);
    const userMessageInputReference = useRef("");

    useEffect(
        function () {
            async function fetchMessages() {
                try {
                    setIsMessagesLoading(true);
                    const response = await axios.get(
                        `http://localhost:3000/messages/${user.username}`
                    );
                    setMessages(response.data.userMessages);
                    if(messages.length === 0){
                        setHasNoMessages(true);
                    }
                    setIsMessagesLoading(false);
                } catch (err) {
                    toast.error("Error fetching messages");
                    navigate("/");
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

        console.log("this ran with the text" , userMessageInputReference)
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
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex flex-row">
            <Panel user={user} />
            <ChatContainer 
                isMessagesLoading={isMessagesLoading} 
                hasNoMessages={hasNoMessages}
                userMessageInputReference = {userMessageInputReference}
                handleMessageSubmission={handleMessageSubmission}
                setUserToReplyTo={setUserToReplyTo}
                userToReplyTo={userToReplyTo}
                messages  = {messages}  
                ref={userMessageInputReference}  
            />

            {console.log(userMessageInputReference)}
        </div>
    );
}
