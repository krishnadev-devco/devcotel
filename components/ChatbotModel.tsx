
import React, { useState, useEffect, useRef } from 'react';
import { createChatSession } from '../services/geminiService';
import { Chat } from "@google/genai";

interface Message {
    role: 'user' | 'model';
    text: string;
}

interface ChatbotModalProps {
    onClose: () => void;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Namaste! I am Devcotel's Premium AI Assistant. I can help you find the best Indian courses to boost your career based on reviews, modules, and potential. What skill are you looking to master today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatSessionRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = async () => {
            try {
                const session = await createChatSession();
                chatSessionRef.current = session;
            } catch (e) {
                console.error("Failed to init chat", e);
                setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting to the server right now. Please check your internet connection." }]);
            }
        };
        initChat();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsLoading(true);

        try {
            if (!chatSessionRef.current) {
                // Try to reconnect if session is missing
                 const session = await createChatSession();
                 chatSessionRef.current = session;
            }
            
            if (chatSessionRef.current) {
                const response = await chatSessionRef.current.sendMessage({ message: userMsg });
                setMessages(prev => [...prev, { role: 'model', text: response.text }]);
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I encountered an error. Please try asking again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-backdrop" onClick={onClose}>
            <div className="chatbot-container" onClick={(e) => e.stopPropagation()}>
                <div className="chatbot-header">
                    <div className="chatbot-title">
                        <div className="bot-avatar"><i className="fas fa-robot"></i></div>
                        <div>
                            <h3>Devcotel Premium AI</h3>
                            <span>Indian Course Consultant</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="chatbot-close" aria-label="Close Chat">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                
                <div className="chatbot-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`chat-message ${msg.role}`}>
                            <div className="message-content">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chat-message model">
                            <div className="message-content typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                <form className="chatbot-input-area" onSubmit={handleSend}>
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="Ask for recommendations..." 
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    );
};
