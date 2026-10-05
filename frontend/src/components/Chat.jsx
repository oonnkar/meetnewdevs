import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import { BACKEND_API } from "../utils/constants";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { id } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BACKEND_API + "/chat/" + id, {
      withCredentials: true,
    });
    const chatMessages = chat.data.messages.map((message) => {
      return {
        senderId: message.senderId._id,
        firstName: message.senderId.firstName,
        lastName: message.senderId.lastName,
        text: message.text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, id });

    socket.on("messageReceived", ({ firstName, text, userId: senderId }) => {
      setMessages((currentMessages) => [
        ...currentMessages,
        { text, firstName, senderId },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, id]);

  const sendMessage = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstName: user.firstName, userId, id, text });

    setMessages((currentMessages) => [
      ...currentMessages,
      { text, senderId: userId, firstName: user.firstName },
    ]);
    setInput("");
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] px-4 py-8 text-slate-100 sm:px-6 sm:py-12">
      <section
        aria-label={`Chat with ${id}`}
        className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/75 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6"
      >
        <header className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-indigo-400 text-lg font-bold text-slate-950">✦</div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Your conversation</p>
            <h1 className="mt-1 text-lg font-bold text-white">Messages</h1>
          </div>
          <span className="ml-auto size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" title="Connected" />
        </header>
        <div
          role="log"
          aria-live="polite"
          className="flex min-h-64 flex-1 flex-col gap-3 overflow-y-auto rounded-2xl border border-white/[0.06] bg-slate-950/70 p-4 sm:max-h-[32rem] sm:p-5"
        >
          {messages.length === 0 && (
            <div className="m-auto max-w-xs py-8 text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-white/[0.04] text-xl text-slate-400">✦</div>
              <p className="font-semibold text-slate-300">Start the conversation</p>
              <p className="mt-1 text-sm text-slate-500">Send a message to say hello.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex w-full ${message.senderId === userId ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`flex max-w-[85%] flex-col gap-1 rounded-2xl px-4 py-3 shadow-sm sm:max-w-[75%] ${
                  message.senderId === userId
                    ? "rounded-bl-md border border-cyan-300/15 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-white"
                    : "rounded-br-md border border-white/[0.08] bg-slate-800 text-slate-100"
                }`}
              >
                {message.senderId !== userId && message.firstName && (
                  <p className="m-0 text-xs font-semibold text-cyan-200">
                    {message.firstName}
                  </p>
                )}
                <p className="m-0 break-words text-sm leading-6">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Write a message..."
            aria-label="Write a message"
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 transition focus:border-cyan-300/50 focus:outline-none focus:ring-4 focus:ring-cyan-300/10"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-xl bg-gradient-to-r from-cyan-300 to-indigo-400 px-5 py-3 font-bold text-slate-950 shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </section>
    </main>
  );
};

export default Chat;
