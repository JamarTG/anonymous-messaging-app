import React from 'react'
import {toast} from 'react-toastify';


function copyToClipboard() {
    navigator.clipboard.writeText("127.0.0.1:5173/send/jamarithegreat");

    toast.success("copied!", { autoClose: 500 });
}

export default function Panel({user}) {
    return (
        <div className="flex flex-row">
                <div className="pt-10 text-white flex flex-col items-center">
                    <img
                        src="https://avatars.githubusercontent.com/u/71823011?v=4"
                        alt=""
                        className="w-10 sm:w-32 h-10 sm:h-32 rounded-full"
                    ></img>
                    <div className="flex flex-col leading-tight">
                        <div className="text-2xl mt-1 flex items-center">
                            <span className="text-gray-200 mr-3">{user.username}</span>
                        </div>
                        <span className="text-lg text-green-200">
                            {user.messages.length} messages available
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full ">
                        <div className="bg-gray-900 rounded-lg p-4 space-y-2 m-10">
                            <p className="text-white text-lg font-semibold">
                                Copy the link below and share it!
                            </p>
    
                            <div className="relative flex items-center justify-center">
                                <p className="p-2 text-white break-words bg-gray-800 rounded-md">
                                    {`${window.location.host}/send/${user.username}`}
                                </p>
                            </div>
                            <a
                                className="hover:cursor-pointer text-sm underline text-blue-200 text-center"
                                onClick={copyToClipboard}
                            >
                                Click to copy
                            </a>
                        </div>
                    </div>
    
                    <hr className="w-4/5 border-gray-400" />
                </div>
            </div>
      )
}