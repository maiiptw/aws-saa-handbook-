import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AsgSim() {
  const [traffic, setTraffic] = useState(20);

  // Calculate required instances based on traffic (max 5, min 1)
  const targetInstances = Math.max(1, Math.ceil((traffic + 1) / 20));

  // We want to simulate the "time it takes to boot/terminate",
  // so we won't change instances instantly, but we'll use a small delay.
  const [currentInstances, setCurrentInstances] = useState(1);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentInstances < targetInstances) {
      // Scale out
      timeout = setTimeout(() => setCurrentInstances(prev => prev + 1), 600);
    } else if (currentInstances > targetInstances) {
      // Scale in
      timeout = setTimeout(() => setCurrentInstances(prev => prev - 1), 600);
    }
    return () => clearTimeout(timeout);
  }, [traffic, currentInstances, targetInstances]);

  // Generate an array of instance IDs for rendering
  const instanceArray = Array.from({ length: currentInstances }, (_, i) => i);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg my-8">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Auto Scaling Simulation</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Drag the traffic slider to see how the Auto Scaling Group adds or removes EC2 instances to maintain performance.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Controls */}
        <div className="w-full md:w-1/3 flex flex-col justify-center space-y-6 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Website Traffic Load
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={traffic}
              onChange={(e) => setTraffic(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-aws-orange"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-bold">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">CPU Load:</span>
              <span className={`font-bold ${traffic > 80 ? 'text-red-500' : 'text-green-500'}`}>{traffic}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Instances:</span>
              <span className="font-bold text-aws-orange">{currentInstances} / 5</span>
            </div>
          </div>

          {currentInstances !== targetInstances && (
            <div className="text-center text-xs font-bold text-blue-500 animate-pulse">
              {currentInstances < targetInstances ? 'Scaling Out (Launching...)' : 'Scaling In (Terminating...)'}
            </div>
          )}
        </div>

        {/* Visualizer */}
        <div className="w-full md:w-2/3 h-64 bg-slate-100 dark:bg-slate-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 relative overflow-hidden p-6 flex flex-col">
          <div className="absolute top-2 left-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
            Auto Scaling Group Target
          </div>

          <div className="flex-1 flex items-center justify-center gap-4 flex-wrap content-center">
            <AnimatePresence>
              {instanceArray.map((id) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-20 h-24 bg-white dark:bg-gray-800 border-2 border-[#22c55e] rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.3)] flex flex-col items-center justify-center relative group"
                >
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                  </svg>
                  <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">EC2 Inst</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
