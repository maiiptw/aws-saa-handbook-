import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function VpcPeeringSim() {
  const [peeringActive, setPeeringActive] = useState(false);
  const [packets, setPackets] = useState<{ id: number; direction: 'left-to-right' | 'right-to-left' }[]>([]);

  // Generate bi-directional traffic packets when peering is active
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (peeringActive) {
      interval = setInterval(() => {
        setPackets((prev) => {
          const newPackets = prev.slice(-8); // Keep last 8 packets to avoid memory leak
          const direction = Math.random() > 0.5 ? 'left-to-right' : 'right-to-left';
          return [...newPackets, { id: Date.now(), direction }];
        });
      }, 600);
    } else {
      setPackets([]);
    }
    return () => clearInterval(interval);
  }, [peeringActive]);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg mt-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">VPC Peering Connection</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Connect VPC A and VPC B via AWS internal network using private IP addresses.
          </p>
        </div>
        <button
          onClick={() => setPeeringActive(!peeringActive)}
          className={`shrink-0 px-6 py-2.5 rounded-lg font-bold text-white transition-all shadow-md transform active:scale-95 ${
            peeringActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-aws-orange hover:bg-[#e88b00]'
          }`}
        >
          {peeringActive ? 'Disconnect Peering' : 'Establish Peering'}
        </button>
      </div>

      <div className="relative h-[300px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-slate-50 dark:bg-slate-900 overflow-hidden flex items-center justify-between px-4 sm:px-12">

        {/* VPC A Container */}
        <div className="relative w-[30%] sm:w-48 h-48 border-2 border-pink-400 bg-pink-50 dark:bg-pink-900/20 rounded-xl flex flex-col items-center justify-center shadow-inner">
          <div className="absolute top-2 left-0 w-full text-center font-bold text-pink-600 dark:text-pink-400">VPC A</div>
          <div className="absolute top-8 left-0 w-full text-center text-xs text-pink-500/80">10.0.0.0/16</div>

          <div className="mt-8 w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-gray-800 border-2 border-pink-300 rounded-full flex items-center justify-center shadow-md">
            <span className="text-xs font-bold text-center">EC2<br/>Inst A</span>
          </div>
        </div>

        {/* Central Peering Connection Line */}
        <div className="flex-1 h-2 relative mx-2">
          {/* Base Connection Line */}
          <div className={`absolute inset-0 top-1/2 -translate-y-1/2 h-1.5 transition-colors duration-500 rounded-full ${
            peeringActive ? 'bg-emerald-200 dark:bg-emerald-800/50' : 'bg-gray-200 dark:bg-gray-700'
          }`} />

          {/* Peering Active Indicator Line (Animated Dash) */}
          {peeringActive && (
            <motion.div
              className="absolute inset-0 top-1/2 -translate-y-1/2 h-1.5"
              style={{
                backgroundImage: 'linear-gradient(90deg, #10b981 50%, transparent 50%)',
                backgroundSize: '20px 100%'
              }}
              animate={{ backgroundPosition: ['0px 0px', '40px 0px'] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          )}

          {/* Broken Connection Indicator (X) */}
          {!peeringActive && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-full p-1 z-10">
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
              </div>
            </div>
          )}

          {/* Animated Data Packets */}
          {peeringActive && packets.map((pkt) => (
            <motion.div
              key={pkt.id}
              initial={{
                left: pkt.direction === 'left-to-right' ? '0%' : '100%',
                opacity: 0,
                scale: 0.5
              }}
              animate={{
                left: pkt.direction === 'left-to-right' ? '100%' : '0%',
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.2, 1.2, 0.5]
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-[0_0_12px_currentColor] z-20 ${
                pkt.direction === 'left-to-right' ? 'bg-pink-500 text-pink-500' : 'bg-blue-500 text-blue-500'
              }`}
            />
          ))}
        </div>

        {/* VPC B Container */}
        <div className="relative w-[30%] sm:w-48 h-48 border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex flex-col items-center justify-center shadow-inner">
          <div className="absolute top-2 left-0 w-full text-center font-bold text-blue-600 dark:text-blue-400">VPC B</div>
          <div className="absolute top-8 left-0 w-full text-center text-xs text-blue-500/80">10.1.0.0/16</div>

          <div className="mt-8 w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-gray-800 border-2 border-blue-300 rounded-full flex items-center justify-center shadow-md">
            <span className="text-xs font-bold text-center">EC2<br/>Inst B</span>
          </div>
        </div>

        {/* Status indicator bottom left */}
        <div className="absolute bottom-4 left-4">
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-colors ${
            peeringActive ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border border-red-200'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${peeringActive ? 'bg-emerald-500 animate-ping' : 'bg-red-500'}`}></span>
            {peeringActive ? 'Connected (Private IPs)' : 'Isolated (No Route)'}
          </span>
        </div>

      </div>
    </div>
  );
}
