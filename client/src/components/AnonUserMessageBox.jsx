// import {MdOutlineContentCopy} from "react-icons/md"
import RelativeDate from "./RelativeDate"
import Sender from "./Sender"
import userContext from "../../contexts/userContext"
import { useContext, useEffect, useState } from "react"


export default function MessageBox({ message: content, date, sender, senderId }) {
    const { user, setUser } = useContext(userContext);
    const [isUserMessage, setIsUserMessage] = useState(false)


    useEffect(function () {
    }, [])

    return (
        <div className={`relative text-white  rounded-lg p-2 w-fit break-words max-w-[90%] md:max-w-[70%] ${isUserMessage ? "bg-slate-700 ml-auto" : "bg-slate-800"}`}>
            <div className={`z-[-1] absolute flex items-center h-full ${isUserMessage ? "-right-4" : "-left-6"} top-0 w-6 overflow-hidden`}>
                <div className={`border-[16px] border-transparent ${isUserMessage ? "border-l-slate-700" : "border-r-slate-800"} `}></div>
            </div>
            <p className="">{content}</p>

            <div className="flex justify-between pt-2 gap-2 text-slate-400">
                <RelativeDate date={date} />
            </div>
        </div>
    )
}