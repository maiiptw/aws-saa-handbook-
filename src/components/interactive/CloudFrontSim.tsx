import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CloudFrontSim() {
  const [requestState, setRequestState] = useState<'idle' | 'requesting' | 'cache-miss' | 'cache-hit'>('idle');
  const [cached, setCached] = useState(false);

  const simulateRequest = () => {
    setRequestState('requesting');

    if (cached) {
      // Fast response from Edge Location
      setTimeout(() => {
        setRequestState('cache-hit');
      }, 800);
    } else {
      // Slow response: needs to go to Origin
      setTimeout(() => {
        setRequestState('cache-miss');
        setCached(true); // Now it's cached for the next request
      }, 2000);
    }
  };

  const reset = () => {
    setRequestState('idle');
    setCached(false);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg my-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">CloudFront CDN Simulator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Compare latency between a Cache Miss (fetching from Origin) and a Cache Hit (fetching from Edge Location).
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold rounded-lg transition-colors text-sm"
          >
            Clear Cache
          </button>
          <button
            onClick={simulateRequest}
            disabled={requestState === 'requesting'}
            className="px-6 py-2 bg-aws-orange hover:bg-[#d97706] text-white font-bold rounded-lg transition-colors disabled:opacity-50 text-sm shadow-md"
          >
            Fetch Image
          </button>
        </div>
      </div>

      <div className="relative w-full h-[300px] bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-between px-4 md:px-12">

        {/* User Node */}
        <div className="flex flex-col items-center z-10 w-24">
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full border-4 border-blue-500 shadow-lg flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <div className="font-bold text-xs text-center">User<br/>(Thailand)</div>
        </div>

        {/* Edge Location Node */}
        <div className="flex flex-col items-center z-10 w-32 relative">
          <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-xl border-4 border-purple-500 shadow-lg flex items-center justify-center mb-2">
            <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="font-bold text-xs text-center text-purple-600 dark:text-purple-400">CloudFront Edge<br/>(Singapore)</div>

          {/* Cache Status Badge */}
          <div className={`absolute -top-3 -right-3 text-[10px] font-bold px-2 py-1 rounded-full text-white shadow ${cached ? 'bg-green-500' : 'bg-gray-400'}`}>
            {cached ? 'CACHED' : 'EMPTY'}
          </div>
        </div>

        {/* Origin Node */}
        <div className="flex flex-col items-center z-10 w-24">
          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl border-4 border-gray-400 dark:border-gray-600 shadow-lg flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
          </div>
          <div className="font-bold text-xs text-center text-gray-500">S3 Origin<br/>(USA)</div>
        </div>

        {/* Background Paths */}
        <div className="absolute inset-0 flex items-center pointer-events-none" style={{ zIndex: 0 }}>
          {/* Path 1: User to Edge */}
          <div className="w-[45%] h-px bg-gray-300 dark:bg-gray-700 ml-16 relative"></div>
          {/* Path 2: Edge to Origin */}
          <div className="w-[30%] h-px bg-gray-300 dark:bg-gray-700 relative"></div>
        </div>

        {/* Animation Layer */}
        <AnimatePresence>
          {requestState === 'requesting' && !cached && (
            <motion.div
              initial={{ left: '10%' }}
              animate={{ left: '90%' }}
              transition={{ duration: 1.0, ease: "linear" }}
              className="absolute w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] top-1/2 -translate-y-1/2 z-20"
            />
          )}

          {requestState === 'requesting' && cached && (
            <motion.div
              initial={{ left: '10%' }}
              animate={{ left: '50%' }}
              transition={{ duration: 0.4, ease: "linear" }}
              className="absolute w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] top-1/2 -translate-y-1/2 z-20"
            />
          )}

          {requestState === 'cache-miss' && (
            <motion.div
              initial={{ left: '90%' }}
              animate={{ left: '10%' }}
              transition={{ duration: 1.0, ease: "linear" }}
              className="absolute text-xs font-bold px-2 py-1 bg-red-500 text-white rounded shadow-lg top-1/2 -translate-y-1/2 z-20"
            >
              Cache Miss (Slow)
            </motion.div>
          )}

          {requestState === 'cache-hit' && (
            <motion.div
              initial={{ left: '50%' }}
              animate={{ left: '10%' }}
              transition={{ duration: 0.4, ease: "linear" }}
              className="absolute text-xs font-bold px-2 py-1 bg-green-500 text-white rounded shadow-lg top-1/2 -translate-y-1/2 z-20"
            >
              Cache Hit (Fast!)
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
