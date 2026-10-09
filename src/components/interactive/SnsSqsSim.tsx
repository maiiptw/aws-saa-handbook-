import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SnsSqsSim() {
  const [messages, setMessages] = useState<{ id: number }[]>([]);

  const publishMessage = () => {
    const newMsg = { id: Date.now() };
    setMessages(prev => [...prev, newMsg]);

    // Auto remove message after animation completes
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== newMsg.id));
    }, 2500);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg my-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">SNS + SQS "Fan-out" Pattern</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            One message published to SNS is instantly pushed to multiple SQS queues for parallel processing.
          </p>
        </div>
        <button
          onClick={publishMessage}
          className="px-6 py-2 bg-aws-orange hover:bg-[#d97706] text-white font-bold rounded-lg transition-transform active:scale-95 shadow-md flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          Publish Event
        </button>
      </div>

      <div className="relative w-full h-[350px] bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center p-4">

        {/* Publisher Node */}
        <div className="absolute left-[5%] z-10">
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-300 flex items-center justify-center flex-col">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <span className="text-[10px] font-bold mt-1">WebApp</span>
          </div>
        </div>

        {/* SNS Topic */}
        <div className="absolute left-[35%] z-10">
          <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 rounded-full border-4 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)] flex flex-col items-center justify-center text-pink-700 dark:text-pink-400 font-bold">
            <span className="text-sm">SNS</span>
            <span className="text-[10px]">(Topic)</span>
          </div>
        </div>

        {/* Background Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <path d="M 10% 175 L 35% 175" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />
          <path d="M 35% 175 Q 60% 80 80% 80" fill="none" stroke="#f472b6" strokeWidth="2" className="opacity-50" />
          <path d="M 35% 175 Q 60% 175 80% 175" fill="none" stroke="#f472b6" strokeWidth="2" className="opacity-50" />
          <path d="M 35% 175 Q 60% 270 80% 270" fill="none" stroke="#f472b6" strokeWidth="2" className="opacity-50" />
        </svg>

        {/* Animations */}
        <AnimatePresence>
          {messages.map((msg) => (
            <React.Fragment key={msg.id}>
              {/* WebApp to SNS */}
              <motion.div
                initial={{ left: '10%', top: '50%', scale: 0.5, opacity: 1 }}
                animate={{ left: '35%', top: '50%', scale: 1, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className="absolute w-4 h-4 bg-gray-600 rounded shadow z-20 -translate-x-1/2 -translate-y-1/2"
              />

              {/* SNS to Queue 1 (Top) */}
              <motion.div
                initial={{ left: '35%', top: '50%', scale: 0.5, opacity: 0 }}
                animate={{ left: '80%', top: '23%', scale: 1.2, opacity: [0, 1, 0] }}
                transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
                className="absolute w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899] z-20 -translate-x-1/2 -translate-y-1/2"
              />

              {/* SNS to Queue 2 (Middle) */}
              <motion.div
                initial={{ left: '35%', top: '50%', scale: 0.5, opacity: 0 }}
                animate={{ left: '80%', top: '50%', scale: 1.2, opacity: [0, 1, 0] }}
                transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
                className="absolute w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899] z-20 -translate-x-1/2 -translate-y-1/2"
              />

              {/* SNS to Queue 3 (Bottom) */}
              <motion.div
                initial={{ left: '35%', top: '50%', scale: 0.5, opacity: 0 }}
                animate={{ left: '80%', top: '77%', scale: 1.2, opacity: [0, 1, 0] }}
                transition={{ delay: 0.5, duration: 1.0, ease: "easeOut" }}
                className="absolute w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899] z-20 -translate-x-1/2 -translate-y-1/2"
              />
            </React.Fragment>
          ))}
        </AnimatePresence>

        {/* SQS Queues & Workers */}
        <div className="absolute right-[5%] flex flex-col justify-between h-[80%] z-10 w-48">
          {['Process Payment', 'Update Inventory', 'Send Email'].map((task, i) => (
            <div key={i} className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 shadow-sm">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 flex items-center justify-center rounded shrink-0">
                <span className="text-[8px] font-bold text-blue-600">SQS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold whitespace-nowrap">{task}</span>
                <span className="text-[9px] text-gray-500">Worker EC2</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
