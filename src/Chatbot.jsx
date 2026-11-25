import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Minus,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_CHATBOT_API_URL || "http://127.0.0.1:8000/chatrobot";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hey there! 👋\nI'm your portfolio assistant. Ask me about my projects, skills, experience, or tech stack.",
    },
  ]);

  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, status]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const updateLastBotMessage = (text) => {
    setMessages((prev) => {
      const updated = [...prev];

      for (let i = updated.length - 1; i >= 0; i--) {
        if (updated[i].sender === "bot") {
          updated[i] = { ...updated[i], text };
          break;
        }
      }

      return updated;
    });
  };

  const cleanAnswer = (text) => {
    return text
      // Remove common Markdown bold/italic markers.
      .replace(/\*\*(.*?)\*\*/gs, "$1")
      .replace(/__(.*?)__/gs, "$1")
      .replace(/(^|[\s(])\*([^*\n]+)\*(?=$|[\s).,!?])/g, "$1$2")
      // Remove stray asterisks and escaped asterisks.
      .replace(/\\\*/g, "")
      .replace(/\*/g, "")
      .trim();
  };

  const handleSend = async (event) => {
    event?.preventDefault();

    const question = message.trim();

    if (!question || isLoading) return;

    setMessage("");
    setIsLoading(true);
    setStatus("Connecting to assistant...");

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      { sender: "bot", text: "" },
    ]);

    let answer = "";
    let receivedDone = false;

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const processEvent = (data) => {
      if (data.error) {
        throw new Error(data.error);
      }

      if (typeof data.status === "string") {
        setStatus(data.status);
      }

      if (typeof data.token === "string") {
        answer += data.token;
        updateLastBotMessage(cleanAnswer(answer));
        setStatus("Writing a response...");
      }

      if (data.done) {
        receivedDone = true;
        setStatus("");
        return true;
      }

      return false;
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Streaming is not supported by this response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finished = false;

      while (!finished) {
        const { value, done } = await reader.read();

        buffer += done
          ? decoder.decode()
          : decoder.decode(value, { stream: true });

        const events = buffer.split(/\r?\n\r?\n/);
        buffer = events.pop() || "";

        for (const event of events) {
          const dataLines = event
            .split(/\r?\n/)
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice(5).trimStart());

          if (!dataLines.length) continue;

          const data = JSON.parse(dataLines.join("\n"));

          if (processEvent(data)) {
            finished = true;
            break;
          }
        }

        if (done) break;
      }

      // Process the final SSE event if it has no trailing blank line.
      if (buffer.trim() && !finished) {
        const dataLines = buffer
          .split(/\r?\n/)
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trimStart());

        if (dataLines.length) {
          finished = processEvent(JSON.parse(dataLines.join("\n")));
        }
      }

      if (!receivedDone) {
        throw new Error("The stream ended before the answer was complete.");
      }

      if (!answer.trim()) {
        updateLastBotMessage("No response received. Please try again.");
      } else {
        updateLastBotMessage(cleanAnswer(answer));
      }
    } catch (error) {
      if (error.name === "AbortError") return;

      console.error("Chatbot error:", error);

      updateLastBotMessage(
        error.message ||
          "I couldn't connect to the assistant. Please check that the Python API is running."
      );
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }

      setIsLoading(false);
      setStatus("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* Floating launcher */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open portfolio assistant"
          className="group relative flex h-[66px] w-[66px] items-center justify-center rounded-full border border-lime-300/30 bg-[#171914] text-lime-300 shadow-[0_8px_35px_rgba(0,0,0,0.25)] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(190,242,100,0.25)]"
        >
          <span className="absolute inset-[-5px] rounded-full border border-lime-300/20 transition group-hover:scale-110 group-hover:opacity-0" />
          <MessageCircle size={27} strokeWidth={1.8} />
          <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-[#171914] bg-lime-400" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="flex h-[min(620px,calc(100dvh-48px))] w-[390px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#11120f] text-white shadow-[0_25px_100px_rgba(0,0,0,0.45)] animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Header */}
          <div className="relative overflow-hidden border-b border-white/[0.08] bg-[#191b16] px-5 py-5">
            <div className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-lime-400/[0.09] blur-3xl" />

            <div className="relative flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-lime-300/20 bg-lime-300/[0.09] text-lime-300">
                  <Bot size={25} strokeWidth={1.7} />
                  <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-[3px] border-[#191b16] bg-lime-400" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-[15px] font-semibold tracking-wide">
                      Dhruvil Portfolio Assistant
                    </h3>
                    <Sparkles
                      size={14}
                      className="shrink-0 text-lime-300"
                    />
                  </div>

                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                    {isLoading ? status || "Thinking..." : "Here to help you"}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Minimize chatbot"
                  className="rounded-xl p-2 text-white/50 transition hover:bg-white/[0.08] hover:text-white"
                >
                  <Minus size={18} />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chatbot"
                  className="rounded-xl p-2 text-white/50 transition hover:bg-white/[0.08] hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="relative mt-4 rounded-xl border border-white/[0.07] bg-black/20 px-3.5 py-3">
              <p className="text-xs leading-relaxed text-red-400/90">
                {/* Explore my work, technical skills, and professional journey. */}
                Currently working on RAG implementation.
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto bg-[radial-gradient(ellipse_at_top,rgba(190,242,100,0.035),transparent_55%)] px-4 py-5 [scrollbar-width:thin] [scrollbar-color:#393c32_transparent]">
            <div className="flex justify-center">
              <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1 text-[10px] tracking-wide text-white/35">
                PORTFOLIO ASSISTANT
              </span>
            </div>

            {messages.map((msg, index) => {
              const isBot = msg.sender === "bot";
              const isLatestEmptyBot =
                isBot &&
                index === messages.length - 1 &&
                !msg.text &&
                isLoading;

              return (
                <div
                  key={index}
                  className={`flex items-end gap-2.5 ${
                    isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  {isBot && (
                    <div className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-lime-300/15 bg-lime-300/[0.08] text-lime-300">
                      <Bot size={17} />
                    </div>
                  )}

                  <div
                    className={`max-w-[83%] whitespace-pre-wrap break-words px-4 py-3.5 text-[13px] leading-[1.75] ${
                      isBot
                        ? "rounded-[18px] rounded-bl-[5px] border border-white/[0.07] bg-[#20211c] text-white/85"
                        : "rounded-[18px] rounded-br-[5px] bg-lime-300 text-[#171914]"
                    }`}
                  >
                    {msg.text ? (
                      msg.text
                    ) : isLatestEmptyBot ? (
                      <div className="flex items-center gap-2 py-1 text-xs text-white/50">
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-lime-300 [animation-delay:-0.3s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-lime-300 [animation-delay:-0.15s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-lime-300" />
                        </span>
                        <span>{status || "Thinking..."}</span>
                      </div>
                    ) : null}
                  </div>

                  {!isBot && (
                    <div className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-white/75">
                      <User size={16} />
                    </div>
                  )}
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-white/[0.08] bg-[#171813] p-4">
            <form
              onSubmit={handleSend}
              className="flex items-center gap-2 rounded-2xl border border-white/[0.10] bg-[#22231d] p-1.5 transition focus-within:border-lime-300/40 focus-within:ring-2 focus-within:ring-lime-300/[0.06]"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Currently disabled. Please check back later!"
                // disabled={isLoading}
                disabled={true}
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[13px] text-red-600 outline-none placeholder:text-white/30 disabled:opacity-50"
              />

              <button
                type="submit"
                // disabled={isLoading || !message.trim()}
                disabled={true}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-300 text-[#171914] transition duration-200 hover:bg-lime-200 hover:shadow-[0_0_18px_rgba(190,242,100,0.16)] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/25 disabled:shadow-none"
              >
                <Send size={17} />
              </button>
            </form>

            <p className="mt-3 text-center text-[10px] tracking-wide text-white/30">
              Powered by ShahTech · Portfolio knowledge assistant
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
