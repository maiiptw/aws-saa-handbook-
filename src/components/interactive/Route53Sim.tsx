import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type PolicyType = 'weighted' | 'failover';

export default function Route53Sim() {
  const [policy, setPolicy] = useState<PolicyType>('weighted');
  const [serverBFailed, setServerBFailed] = useState(false);
  const [packets, setPackets] = useState<{ id: number; path: 'a' | 'b' }[]>([]);

  useEffect(() => {
    // Generate packets
    const interval = setInterval(() => {
      setPackets((prev) => {
        const newPackets = prev.slice(-15);
        let path: 'a' | 'b' = 'a';

        if (policy === 'weighted') {
          // 80% to A, 20% to B
          // If B is failed in weighted mode, that 20% just drops, but we'll still route it
          path = Math.random() < 0.8 ? 'a' : 'b';
        } else if (policy === 'failover') {
          // Primary is B (just to make it different). If B is healthy, 100% to B.
          // If B is failed, 100% to A (Standby).
          path = serverBFailed ? 'a' : 'b';
        }

        return [...newPackets, { id: Date.now(), path }];
      });
    }, 500);

    return () => clearInterval(interval);
  }, [policy, serverBFailed]);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg my-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Route 53 Routing Policies</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {policy === 'weighted'
              ? "Weighted Routing: Distribute traffic across multiple resources based on proportions (e.g. 80/20)."
              : "Failover Routing: Route to Primary resource. If it fails health checks, route to Secondary."}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <select
            value={policy}
            onChange={(e) => {
              setPolicy(e.target.value as PolicyType);
              setPackets([]);
            }}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-lg outline-none border border-gray-300 dark:border-gray-600"
          >
            <option value="weighted">Weighted (80% / 20%)</option>
            <option value="failover">Failover (Active/Passive)</option>
          </select>
        </div>
      </div>

      <div className="relative w-full h-[350px] bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center p-4">

        {/* User Node */}
        <div className="absolute left-8 z-10 flex flex-col items-center">
          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow border-2 border-gray-300 flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
        </div>

        {/* Route 53 Node */}
        <div className="absolute left-1/3 z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#232F3E] to-gray-800 rounded-xl shadow-lg border-2 border-aws-orange flex items-center justify-center mb-2 text-white font-bold text-center leading-tight">
            Route 53
          </div>
          <div className="text-[10px] font-mono bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded shadow-sm border border-yellow-300">
            {policy === 'weighted' ? 'Weights: A=80, B=20' : 'Primary=B, Standby=A'}
          </div>
        </div>

        {/* Path Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {/* User to R53 */}
          <path d="M 50 175 L 33% 175" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />

          {/* R53 to Server A */}
          <path d="M 33% 175 Q 50% 80 80% 80" fill="none" stroke={policy === 'failover' && !serverBFailed ? "#94a3b8" : "#3b82f6"} strokeWidth="2" className={policy === 'failover' && !serverBFailed ? "opacity-30" : ""} />

          {/* R53 to Server B */}
          <path d="M 33% 175 Q 50% 270 80% 270" fill="none" stroke={serverBFailed ? "#ef4444" : "#22c55e"} strokeWidth="2" className={serverBFailed ? "opacity-30" : ""} />
        </svg>

        {/* Animated Packets */}
        <AnimatePresence>
          {packets.map((pkt) => (
            <motion.div
              key={pkt.id}
              initial={{ left: '33%', top: '50%', scale: 0.5, opacity: 1 }}
              animate={
                pkt.path === 'a'
                  ? { left: '80%', top: '23%', scale: 1.2, opacity: 0 } // Top path (Server A)
                  : { left: '80%', top: '77%', scale: 1.2, opacity: 0 } // Bottom path (Server B)
              }
              transition={{ duration: 1.5, ease: "linear" }}
              className={`absolute w-3 h-3 rounded-full z-20 -translate-x-1/2 -translate-y-1/2 ${
                pkt.path === 'a' ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-green-500 shadow-[0_0_8px_#22c55e]'
              }`}
            />
          ))}
        </AnimatePresence>

        {/* Server A Node */}
        <div className="absolute right-8 top-[10%] z-10 flex flex-col items-center w-32">
          <div className={`w-full py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md border-4 flex flex-col items-center transition-colors ${
             policy === 'failover' && !serverBFailed ? 'border-gray-300 dark:border-gray-600 opacity-60' : 'border-blue-400'
          }`}>
            <span className="font-bold text-sm">Server A</span>
            <span className="text-[10px] text-gray-500">{policy === 'failover' ? 'Secondary / Standby' : 'v1.0'}</span>
          </div>
        </div>

        {/* Server B Node */}
        <div className="absolute right-8 bottom-[10%] z-10 flex flex-col items-center w-32">
          <div className={`w-full py-3 bg-white dark:bg-gray-800 rounded-xl shadow-md border-4 flex flex-col items-center transition-colors ${
             serverBFailed ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-green-400'
          }`}>
            <span className="font-bold text-sm">Server B</span>
            <span className="text-[10px] text-gray-500">{policy === 'failover' ? 'Primary' : 'v2.0 (Beta)'}</span>
            {serverBFailed && <span className="text-xs text-red-500 font-bold mt-1">FAILING</span>}
          </div>

          <button
            onClick={() => setServerBFailed(!serverBFailed)}
            className={`mt-3 px-3 py-1 text-xs font-bold text-white rounded shadow transition-colors ${
              serverBFailed ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {serverBFailed ? 'Fix Server B' : 'Kill Server B'}
          </button>
        </div>

      </div>
    </div>
  );
}
