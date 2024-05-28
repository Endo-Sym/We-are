import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';

const Comment = ({ user }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSendComment = () => {
        // Handle sending the comment
    };

    return (
        <div className="mt-2">
            <div className="mt-4 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                    <img src={user.imgUrl} alt="User" className="size-10 rounded-full min-w-10 bg-black border border-primary-pink" />
                </div>
                <div className="flex flex-col relative">
                    <textarea
                        className="w-full h-24 p-2 border border-primary-pink rounded-[20px] bg-primary-dark text-white mb-2 bg-black"
                        placeholder={`Write a comment as ${user.name ?? user.username}...`}
                        value={comment}
                        onChange={handleCommentChange}
                    />
                    <button className="absolute bottom-3 right-3 bg-primary-pink text-black px-4 py-3 rounded-[30px] hover:bg-pink-500" onClick={handleSendComment}>
                        <MdSend size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Comment;
