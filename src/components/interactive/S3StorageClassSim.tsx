import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function S3StorageClassSim() {
  const [days, setDays] = useState(0);

  // Determine storage class based on days
  let currentClass = 'Standard';
  let color = 'bg-blue-500';
  let description = 'Frequently accessed data, millisecond access, highest storage cost.';

  if (days >= 90) {
    currentClass = 'Glacier Flexible Retrieval';
    color = 'bg-cyan-600';
    description = 'Archive data, minutes to hours retrieval, lower storage cost.';
  } else if (days >= 30) {
    currentClass = 'Standard-IA (Infrequent Access)';
    color = 'bg-teal-500';
    description = 'Less frequent access, millisecond access, retrieval fee applies.';
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gray-50 dark:bg-gray-800/50 mt-6 mb-8">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold mb-2">S3 Lifecycle Policy Simulation</h3>
        <p className="text-gray-500 dark:text-gray-400">Drag the slider to see how data moves across storage tiers over time.</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8">

        {/* Animated Object Box */}
        <motion.div
          animate={{ backgroundColor: color }}
          className="w-48 h-48 rounded-xl shadow-lg flex flex-col items-center justify-center text-white p-4 text-center transition-colors duration-500"
        >
          <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
          <div className="font-bold text-lg">{currentClass}</div>
        </motion.div>

        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-sm text-center">
          {description}
        </div>

        {/* Timeline Slider */}
        <div className="w-full max-w-md relative pt-6">
          <input
            type="range"
            min="0"
            max="120"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-aws-orange"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-bold">
            <span>Day 0 (Creation)</span>
            <span>Day 30</span>
            <span>Day 90+</span>
          </div>

          {/* Current Day Marker */}
          <div className="text-center mt-4">
            <span className="inline-block bg-aws-orange text-white px-4 py-1 rounded-full font-bold shadow">
              Current Time: Day {days}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
