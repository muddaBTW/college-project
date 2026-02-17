import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { askAI } from "../api";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "ai",
      text: "Hello. Ask me about medication timing, side effects, or safety concerns.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const composerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (composerRef.current && !composerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const appendFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const next = Array.from(fileList).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}`,
      name: file.name,
    }));
    setAttachments((prev) => [...prev, ...next]);
  };

  const submitMessage = async (event) => {
    event.preventDefault();
    if (!input.trim() && attachments.length === 0) return;

    const attachmentNames = attachments.map((file) => file.name);
    const attachmentText = attachments.length
      ? `\nAttachments: ${attachmentNames.join(", ")}`
      : "";
    const composedMessage = `${input.trim() || "Please review attached files."}${attachmentText}`;

    const userMsg = { id: Date.now(), from: "user", text: composedMessage };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setAttachments([]);
    setMenuOpen(false);
    setLoading(true);

    try {
      const response = await askAI(input.trim() || "Please review attached files.", attachmentNames);
      const aiMsg = { id: Date.now() + 1, from: "ai", text: response.data.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      const fallback = {
        id: Date.now() + 1,
        from: "ai",
        text: "Backend is not reachable. Start server on http://localhost:5000 to enable chat.",
      };
      setMessages((prev) => [...prev, fallback]);
    }
    setLoading(false);

    requestAnimationFrame(() => {
      gsap.fromTo(".chat-msg:last-child", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35 });
    });
  };

  return (
    <div className="rounded-3xl border border-safeLight/15 bg-white/50 p-5 shadow-[0_12px_30px_rgba(11,114,133,0.12)] md:p-8">
      <div className="h-[430px] space-y-4 overflow-y-auto rounded-2xl border border-safeLight/15 bg-safeNavy/55 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-msg max-w-[85%] rounded-2xl px-4 py-3 text-sm md:text-base ${
              message.from === "user"
                ? "ml-auto bg-safeBlue text-safeLight"
                : "bg-safeDarkTeal/85 text-white"
            }`}
          >
            {message.text}
          </div>
        ))}
        {loading && <div className="text-safeLight/70">SafeDose AI is thinking...</div>}
      </div>

      <div ref={composerRef} className="mt-4">
        {attachments.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {attachments.map((file) => (
              <span key={file.id} className="rounded-full bg-safeBlue/20 px-3 py-1 text-xs font-semibold text-safeLight">
                {file.name}
              </span>
            ))}
          </div>
        )}

        <form onSubmit={submitMessage} className="relative flex items-center rounded-full border border-safeLight/25 bg-white px-3 py-2 shadow-sm">
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="mr-2 flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-safeLight transition-colors hover:bg-safeBlue/20"
              aria-label="Add attachment"
            >
              +
            </button>
            {menuOpen && (
              <div className="absolute left-0 top-11 z-20 w-56 rounded-xl border border-safeLight/15 bg-white p-2 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    imageInputRef.current?.click();
                    setMenuOpen(false);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-safeLight transition-colors hover:bg-safeBlue/15"
                >
                  Upload image (JPG/PNG)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                    setMenuOpen(false);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-safeLight transition-colors hover:bg-safeBlue/15"
                >
                  Upload file (PDF/TXT)
                </button>
              </div>
            )}
          </div>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            className="flex-1 border-none bg-transparent px-2 py-1 text-safeLight placeholder-safeLight/55 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="cta-button ml-2 rounded-full bg-safeTeal px-5 py-2 font-semibold text-white disabled:opacity-60"
          >
            Send
          </button>
        </form>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={(event) => appendFiles(event.target.files)}
          className="hidden"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          onChange={(event) => appendFiles(event.target.files)}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ChatWindow;

