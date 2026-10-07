import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AlbFailoverSim() {
  const [azAOutage, setAzAOutage] = useState(false);
  const [packets, setPackets] = useState<{ id: number; path: 'a' | 'b' }[]>([]);

  // Generate traffic packets periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPackets((prev) => {
        // Remove old packets (keep only last 10)
        const newPackets = prev.slice(-10);
        // Decide path based on outage state. If A is down, all go to B.
        // If both up, 50/50 split.
        const path = azAOutage ? 'b' : (Math.random() > 0.5 ? 'a' : 'b');

        return [...newPackets, { id: Date.now(), path }];
      });
    }, 800); // New packet every 800ms

    return () => clearInterval(interval);
  }, [azAOutage]);

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900 shadow-md my-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">ALB Failover Simulation</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {azAOutage
              ? "AZ-a has failed! The ALB detects the EC2 instance is unhealthy and automatically routes 100% of traffic to the healthy instance in AZ-b."
              : "Traffic is being evenly distributed by the Application Load Balancer across multiple Availability Zones."}
          </p>
        </div>
        <button
          onClick={() => {
            setAzAOutage(!azAOutage);
            setPackets([]); // Clear packets on state change
          }}
          className={`shrink-0 px-5 py-2.5 rounded-lg font-bold text-white transition-all shadow-lg transform active:scale-95 ${
            azAOutage
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500'
              : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500'
          }`}
        >
          {azAOutage ? 'Restore AZ-a' : 'Simulate AZ-a Outage'}
        </button>
      </div>

      <div className="relative h-[450px] w-full border border-gray-200 dark:border-gray-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 overflow-hidden flex flex-col items-center justify-center p-4">

        {/* Route 53 Node */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <div className="bg-[#232F3E] text-white px-6 py-3 rounded-lg shadow-xl font-bold text-sm border-2 border-slate-700">
            Route 53 (DNS)
          </div>
          {/* Line to ALB */}
          <div className="w-1 h-12 bg-slate-300 dark:bg-slate-600 mt-2"></div>
        </div>

        {/* ALB Node */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-br from-aws-orange to-[#d97706] text-white px-8 py-4 rounded-xl shadow-[0_0_15px_rgba(255,153,0,0.5)] font-bold border-2 border-[#b45309] text-center">
            <div className="text-lg">Application Load Balancer</div>
            <div className="text-xs opacity-90 mt-1 font-normal">Cross-Zone Load Balancing: ON</div>
          </div>
        </div>

        {/* Connections from ALB to EC2s */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {/* Path to AZ-a */}
          <path
            d="M 50% 50% Q 25% 60% 25% 75%"
            fill="none"
            stroke={azAOutage ? "#ef4444" : "#94a3b8"}
            strokeWidth="3"
            strokeDasharray={azAOutage ? "0" : "5,5"}
            className={azAOutage ? "opacity-30" : "opacity-100"}
          />
          {/* Path to AZ-b */}
          <path
            d="M 50% 50% Q 75% 60% 75% 75%"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="3"
            strokeDasharray="5,5"
          />
        </svg>

        {/* Animated Packets */}
        {packets.map((pkt) => (
          <motion.div
            key={pkt.id}
            initial={{ top: '15%', left: '50%', opacity: 1, scale: 0.5 }}
            animate={
              pkt.path === 'a'
                ? { top: '75%', left: '25%', opacity: 0, scale: 1.2 }
                : { top: '75%', left: '75%', opacity: 0, scale: 1.2 }
            }
            transition={{ duration: 1.5, ease: "linear" }}
            className={`absolute z-20 w-4 h-4 rounded-full shadow-[0_0_10px_currentColor] ${
              pkt.path === 'a' ? 'bg-blue-500 text-blue-500' : 'bg-purple-500 text-purple-500'
            }`}
            style={{ transform: 'translate(-50%, -50%)' }}
          />
        ))}

        {/* EC2 Node AZ-A */}
        <div className="absolute top-[75%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10 w-40">
          <motion.div
            animate={{
              scale: azAOutage ? 0.95 : 1,
              borderColor: azAOutage ? '#ef4444' : '#22c55e'
            }}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-4 shadow-lg transition-colors duration-500 ${
              azAOutage
                ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
            }`}
          >
            <div className="font-bold mb-1">EC2 (AZ-a)</div>
            {azAOutage ? (
              <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-red-100 dark:bg-red-800 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> UNHEALTHY
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-green-100 dark:bg-green-800 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> HEALTHY
              </div>
            )}
          </motion.div>
        </div>

        {/* EC2 Node AZ-B */}
        <div className="absolute top-[75%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-10 w-40">
          <div className="flex flex-col items-center justify-center p-4 rounded-xl border-4 border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 shadow-lg">
            <div className="font-bold mb-1">EC2 (AZ-b)</div>
            <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-green-100 dark:bg-green-800 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> HEALTHY
            </div>
            {azAOutage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 whitespace-nowrap text-xs font-bold text-aws-orange bg-white dark:bg-gray-800 px-2 py-1 rounded shadow"
              >
                Handling 100% Traffic
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
