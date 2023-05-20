import React, { forwardRef } from "react";
import MessageBox from "./MessageBox";


const Chat = forwardRef(function (props, userMessageInputReference) {
  const {
    messages,
    setUserToReplyTo,
    userToReplyTo,
    handleMessageSubmission,
    hasNoMessages
  } = props;


  return (
    <div className="bottom-0 right-0">
      <div
        className="container-with-scrollbar rounded-lg p-10 container w-[70vw] overflow-y-scroll overflow-x-hidden"
        style={{
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "gray",
        }}
      >
        <div className="space-y-3 pt-2">
          {hasNoMessages && (
            <p className="text-white max-w-md text-center mx-auto">
              <span className="text-6xl block mb-4">😓</span>
              Oops! It looks like you have no messages at the moment. Share the
              link above with your friends to start receiving anonymous messages!
            </p>
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
      </div>
      (
      <div className="flex flex-col px-30 justify-center items-center">
        <div className="relative w-1/2">
          <input
            type="text"
            ref={userMessageInputReference}
            name="password"
            id="password"
            className="floating-input peer border-0 w-full px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Type your message here..."
          />
          <label htmlFor="password" className="absolute top-0 left-0 ml-4 mt-2 text-gray-500">
            {userToReplyTo.name !== "Nobody" && `Replying to ${userToReplyTo?.name}`}
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
      )
    </div>
  );

})

export default Chat;
