// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Send, Bot, User, X } from "lucide-react";

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<
//     { text: string; sender: "user" | "bot" }[]
//   >([
//     {
//       text: "سلام! من ربات فروش APIKA هستم. چه محصولی نیاز دارید؟ (مثلاً: پمپ آب، موتور کولر، گیربکس)",
//       sender: "bot",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const fetchProducts = async (query: string) => {
//     try {
//       const res = await fetch(`https://apika.ir/apitak/get_products.php`);
//       const data = await res.json();
//       return data
//         .filter(
//           (p: any) =>
//             p.title.toLowerCase().includes(query.toLowerCase()) ||
//             p.categories.some((c: string) =>
//               c.toLowerCase().includes(query.toLowerCase())
//             )
//         )
//         .slice(0, 3);
//     } catch (err) {
//       return [];
//     }
//   };

//   const generateResponse = async (userInput: string) => {
//     const lowerInput = userInput.toLowerCase();

//     if (lowerInput.includes("سلام") || lowerInput.includes("سلامی")) {
//       return "سلام دوست عزیز! چه محصولی نیاز دارید؟";
//     }
//     if (lowerInput.includes("پمپ") || lowerInput.includes("پمپ آب")) {
//       const products = await fetchProducts("پمپ");
//       return (
//         "در دسته پمپ آب، این محصولات پیشنهاد می‌شوند:\n" +
//         products
//           .map((p) => `• ${p.title} - ${p.price.toLocaleString()} تومان`)
//           .join("\n")
//       );
//     }
//     if (lowerInput.includes("موتور") || lowerInput.includes("کولر")) {
//       const products = await fetchProducts("موتور کولر");
//       return (
//         "موتورهای کولر ما:\n" +
//         products
//           .map((p) => `• ${p.title} - ${p.price.toLocaleString()} تومان`)
//           .join("\n")
//       );
//     }
//     if (lowerInput.includes("گیربکس")) {
//       const products = await fetchProducts("گیربکس");
//       return (
//         "گیربکس‌های صنعتی:\n" +
//         products
//           .map((p) => `• ${p.title} - ${p.price.toLocaleString()} تومان`)
//           .join("\n")
//       );
//     }
//     return "متوجه نشدم. لطفاً نوع محصول مورد نظر خود را بگویید: پمپ، موتور کولر، گیربکس و غیره.";
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { text: input, sender: "user" as const };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     // پاسخ ربات
//     const response = await generateResponse(input);
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
//     }, 800);
//   };

//   return (
//     <div className="fixed bottom-6 left-6 z-50">
//       {/* دکمه باز و بسته چت */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
//         aria-label="باز کردن چت"
//       >
//         {isOpen ? <X size={24} /> : <Bot size={24} />}
//       </button>

//       {/* پنجره چت */}
//       {isOpen && (
//         <div className="mt-4 w-80 sm:w-96 h-96 bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200">
//           {/* هدر */}
//           <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Bot size={20} />
//               <span className="font-bold">ربات فروش APIKA</span>
//             </div>
//             <button onClick={() => setIsOpen(false)} className="text-white">
//               <X size={18} />
//             </button>
//           </div>

//           {/* پیام‌ها */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`flex ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`flex items-center gap-2 max-w-xs ${
//                     msg.sender === "user" ? "flex-row-reverse" : ""
//                   }`}
//                 >
//                   <div
//                     className={`p-3 rounded-2xl text-sm ${
//                       msg.sender === "user"
//                         ? "bg-blue-600 text-white rounded-tr-none"
//                         : "bg-white text-gray-800 rounded-tl-none shadow"
//                     }`}
//                   >
//                     {msg.text.split("\n").map((line, idx) => (
//                       <p key={idx} className="whitespace-pre-line">
//                         {line}
//                       </p>
//                     ))}
//                   </div>
//                   <div
//                     className={`p-1 rounded-full ${
//                       msg.sender === "user" ? "bg-blue-600" : "bg-gray-300"
//                     }`}
//                   >
//                     {msg.sender === "user" ? (
//                       <User size={16} className="text-white" />
//                     ) : (
//                       <Bot size={16} className="text-gray-700" />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* فرم ارسال */}
//           <form onSubmit={handleSubmit} className="p-3 border-t bg-white">
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="پیام خود را بنویسید..."
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
//               >
//                 <Send size={20} />
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBot;

'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, Bot, User, X, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    {
      text: 'سلام! خوش آمدید ✨<br/>چطور می‌توانم در انتخاب بهترین محصول به شما کمک کنم؟',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: 'خطا در برقراری ارتباط ⚠️', sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col border border-white/20 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 p-5 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">دستیار هوشمند APIKA</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-blue-100 text-[10px] font-medium uppercase tracking-tighter">Online Support</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gradient-to-b from-gray-50/50 to-white/50 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm
                      ${msg.sender === 'user' ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                      {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div
                      className={`max-w-[260px] p-4 rounded-[22px] text-[13px] leading-[1.6] shadow-sm
                        ${msg.sender === 'user' 
                          ? 'bg-indigo-600 text-white rounded-bl-none font-medium' 
                          : 'bg-white text-gray-700 rounded-br-none border border-gray-100'}`}
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-br-none shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="سوال خود را اینجا بپرسید..."
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all placeholder:text-gray-400 text-gray-700"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="absolute left-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:grayscale transition-all shadow-md active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-[24px] shadow-2xl flex items-center justify-center transition-all duration-500 ${
          isOpen ? 'bg-white text-gray-800' : 'bg-indigo-600 text-white'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 border-2 border-white"></span>
          </span>
        )}
      </motion.button>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;