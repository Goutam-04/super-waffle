import { useState } from "react";
import { RiRobot2Fill } from "react-icons/ri";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">AI Chatbot</h2>
            <button onClick={() => setIsOpen(false)} className="text-sm text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          {/* Chat content placeholder */}
          <div className="h-80 overflow-y-auto border rounded p-2 text-sm text-gray-700 mb-2">
            <p>Hello! How can I help you?</p>
          </div>

          <input
            type="text"
            placeholder="Type a message..."
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring"
          />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-yellow-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg transition-all z-40"
      >
        <RiRobot2Fill className="w-6 h-6" />
      </button>
    </>
  );
}
