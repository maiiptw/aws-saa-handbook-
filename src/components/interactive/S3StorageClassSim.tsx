import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function S3StorageClassSim() {
  const [days, setDays] = useState(0);

  // Determine storage class state based on days
  let currentClass = 'S3 Standard';
  let color = 'from-blue-400 to-blue-600';
  let iconColor = 'text-blue-100';
  let description = 'Frequently accessed data, millisecond access, highest storage cost.';
  let yPosition = 0; // standard depth
  let opacityLevels = { standard: 1, ia: 0.3, glacier: 0.3 };

  if (days >= 90) {
    currentClass = 'Glacier Flexible Retrieval';
    color = 'from-cyan-600 to-cyan-800';
    iconColor = 'text-cyan-200';
    description = 'Archive data, minutes to hours retrieval, lowest storage cost.';
    yPosition = 160; // deep depth
    opacityLevels = { standard: 0.2, ia: 0.2, glacier: 1 };
  } else if (days >= 30) {
    currentClass = 'S3 Standard-IA';
    color = 'from-teal-400 to-teal-600';
    iconColor = 'text-teal-100';
    description = 'Less frequent access, millisecond access, retrieval fee applies.';
    yPosition = 80; // mid depth
    opacityLevels = { standard: 0.2, ia: 1, glacier: 0.3 };
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg mt-6 mb-8">
      <div className="mb-8 text-center">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">S3 Lifecycle Policy Simulation</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Drag the slider to see how data automatically transitions to colder storage tiers over time to save costs.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">

        {/* Visualizer Area */}
        <div className="relative w-full md:w-1/2 h-[300px] bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-4">

          {/* Tier Background Lines/Labels */}
          <div className="absolute inset-x-0 top-[15%] border-b border-dashed border-gray-300 dark:border-gray-600 w-full" />
          <div className="absolute top-[5%] right-4 text-xs font-bold text-gray-400" style={{ opacity: opacityLevels.standard }}>Standard Tier</div>

          <div className="absolute inset-x-0 top-[50%] border-b border-dashed border-gray-300 dark:border-gray-600 w-full" />
          <div className="absolute top-[40%] right-4 text-xs font-bold text-gray-400" style={{ opacity: opacityLevels.ia }}>Infrequent Access Tier</div>

          <div className="absolute inset-x-0 top-[85%] border-b border-dashed border-gray-300 dark:border-gray-600 w-full" />
          <div className="absolute top-[75%] right-4 text-xs font-bold text-gray-400" style={{ opacity: opacityLevels.glacier }}>Archive Tier (Glacier)</div>

          {/* Animated Data Block */}
          <div className="absolute inset-x-0 flex justify-center top-6">
            <motion.div
              animate={{
                y: yPosition,
                backgroundColor: 'var(--tw-gradient-to)' // Fallback if gradient animate fails
              }}
              transition={{ type: "spring", stiffness: 60, damping: 12 }}
              className={`w-32 h-24 rounded-xl shadow-xl flex flex-col items-center justify-center text-white p-2 text-center bg-gradient-to-br ${color} z-10 border border-white/20`}
            >
              <svg className={`w-8 h-8 mb-1 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
              <div className="font-bold text-sm leading-tight">{currentClass}</div>
            </motion.div>
          </div>

        </div>

        {/* Controls Area */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center space-y-6">

          <div className="h-20 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 text-center px-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
            "{description}"
          </div>

          {/* Timeline Slider */}
          <div className="w-full w-max-md relative pt-6 px-2">
            <input
              type="range"
              min="0"
              max="120"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-aws-orange focus:outline-none focus:ring-2 focus:ring-aws-orange/50"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-3 font-bold px-1">
              <span>Day 0</span>
              <span className="ml-4">Day 30</span>
              <span>Day 90</span>
            </div>

            {/* Current Day Marker */}
            <div className="text-center mt-6">
              <span className="inline-flex items-center justify-center bg-aws-orange text-white px-5 py-2 rounded-full font-bold shadow-md text-lg">
                Current Time: Day {days}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
