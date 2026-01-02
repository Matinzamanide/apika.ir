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
import { Send, Bot, User, X } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
    {
      text: 'سلام! من ربات هوشمند APIKA هستم. چه محصولی به دنبالش هستید؟ (مثل: الکتروپمپ 12 ولت کم صدا)',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // اسکرول به آخر
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ارسال پیام
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
      const botMessage = { text: data.reply || 'پاسخی دریافت نشد.', sender: 'bot' as const };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { text: 'ارتباط با سرور برقرار نشد. لطفاً دوباره امتحان کنید.', sender: 'bot' },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* دکمه اصلی چت */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label={isOpen ? 'بستن چت' : 'باز کردن چت'}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {/* پنجره چت */}
      {isOpen && (
        <div className="mt-4 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
          {/* هدر */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold text-sm sm:text-base">ربات هوشمند APIKA</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition"
              aria-label="بستن چت"
            >
              <X size={18} />
            </button>
          </div>

          {/* بخش پیام‌ها */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-start gap-2 max-w-xs">
                  {msg.sender === 'bot' && (
                    <div className="p-1 rounded-full bg-gray-300 mt-1">
                      <Bot size={16} className="text-gray-700" />
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none shadow'
                    }`}
                    // ✅ نمایش لینک‌های داخل پیام ربات
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                  {msg.sender === 'user' && (
                    <div className="p-1 rounded-full bg-blue-600 mt-1">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* وضعیت "در حال تفکر" */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-xs">
                  <div className="p-1 rounded-full bg-gray-300 mt-1">
                    <Bot size={16} className="text-gray-700" />
                  </div>
                  <div className="px-4 py-2 bg-white rounded-2xl rounded-tl-none shadow text-sm text-gray-500">
                    در حال تفکر...
                  </div>
                </div>
              </div>
            )}

            {/* برای اسکرول خودکار */}
            <div ref={messagesEndRef} />
          </div>

          {/* فرم ارسال پیام */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="پیام خود را بنویسید..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm placeholder:text-gray-400"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
                aria-label="ارسال پیام"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;