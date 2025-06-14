//import { useState } from 'react';
import React from 'react';
//import styled from "styled-components";

interface ChatWindowProps {
    context: string;
    contextType: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ context, contextType }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '20px',
            background: 'white',
            border: '1px solid black',
            zIndex: 10000
        }}>
            <h3>Context Information</h3>
            <p>Context: {context}</p>
            <p>Type: {contextType}</p>
        </div>
    );
};

export default ChatWindow;