import React, { useState } from "react";
import styles from "../style";

function Gpt() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats([...msgs]);

    setMessage("");

    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chats: msgs }),
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats([...msgs]);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
        setIsTyping(false);
      });
  };

  return (
    <main className={`flex flex-col items-center ${styles.paddingY}`}>
      <h1 className="text-4xl font-semibold text-center text-white mb-8">TechTro AI Helper</h1>

      <section className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg mb-4">
        {chats && chats.length > 0 ? (
          chats.map((chat, index) => (
            <p key={index} className={`mb-2 ${chat.role === "user" ? "text-right" : "text-left"}`}>
              <span className="font-bold text-white">{chat.role.toUpperCase()}</span>:{" "}
              <span className="text-gray-300">{chat.content}</span>
            </p>
          ))
        ) : (
          <p className="text-gray-400">No messages yet</p>
        )}
      </section>

      <div className={`${isTyping ? "block" : "hidden"} mb-4`}>
        <p className="text-gray-400"><i>{isTyping ? "Typing..." : ""}</i></p>
      </div>

      <form className="w-full max-w-2xl" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-500 placeholder-gray-400"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

export default Gpt;
