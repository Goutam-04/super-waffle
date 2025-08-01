import { useState, useRef, useEffect } from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key from the environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today? ✨", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Add the user's message to the state
    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      // Send the user's message to the Gemini API
      const result = await model.generateContent(userMessage.text);
      const response = await result.response;
      const botMessageText = response.text();
      
      // Add the bot's response to the state
      setMessages((prevMessages) => [...prevMessages, { text: botMessageText, sender: "bot" }]);
    } catch (error) {
      console.error("Error calling the Gemini API:", error);
      // Handle the error by providing a friendly message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: "bot" }
      ]);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 max-h-[500px] bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col z-50 overflow-hidden">
          {/* Chat content area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] text-sm ${
                    msg.sender === "user"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <button
              onClick={handleSendMessage}
              className="bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white p-3 rounded-full shadow-md transition-all transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
        <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-full shadow-lg transition-all z-40 transform hover:scale-110"
        style={{ boxShadow: "0 0 15px #a855f7" }}
      >
        <RiRobot2Fill className="w-6 h-6" />
      </button>
    
    </>
  );
}