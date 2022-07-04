import React, { Component } from 'react';
import ChatBot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import ActionProvider from './ActionProvider.jsx';
import config from './Config.jsx';
import MessageParser from './MessageParser.jsx';


export default function Chat({chatbot, setChatbot}){
    
            return (
            <div className="chatbotContainer ">
         
            <button onClick={() =>setChatbot(!chatbot)} className="button-chatbot">X</button>
            <ChatBot setChatbot={setChatbot} chatbot={chatbot} 
            config={config} 
            actionProvider={ActionProvider}
            messageParser ={MessageParser} 
            
            />
            </div>
           
            
                
            
        )
    }