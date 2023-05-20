import React from 'react'
import PreLoader from './PreLoader';
import Chat from './Chat';
import { forwardRef } from 'react';

const ChatContainer = forwardRef(function ChatContainer(
    props , userMessageInputReference
) {


    const {
        isMessagesLoading,
        setUserToReplyTo,
        userToReplyTo,
        handleMessageSubmission,
        messages

    } = props;
  return (
    <div className="overflow-y-hidden w-full flex flex-col items-center justify-center  max-h-screen">
                {    isMessagesLoading ? (
                    <PreLoader />
                ) : (
                 <Chat 
                    // userMessageInputReference={userMessageInputReference}
                    setUserToReplyTo={setUserToReplyTo}
                    userToReplyTo={userToReplyTo}
                    handleMessageSubmission={handleMessageSubmission}
                    messages={messages}
                    ref={userMessageInputReference}
                />
                )}
            </div>
  )
})

export default ChatContainer;