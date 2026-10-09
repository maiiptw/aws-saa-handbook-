import React, { useState } from 'react';

export default function TransitGatewaySim() {
  const [useTgw, setUseTgw] = useState(false);

  // Layout positions for 5 VPCs
  const vpcs = [
    { id: 1, x: '50%', y: '10%' },
    { id: 2, x: '85%', y: '40%' },
    { id: 3, x: '75%', y: '85%' },
    { id: 4, x: '25%', y: '85%' },
    { id: 5, x: '15%', y: '40%' },
  ];

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg my-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Transit Gateway vs Peering</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {useTgw
              ? "Transit Gateway (Hub-and-Spoke): All VPCs connect to a single central hub. Simple to manage."
              : "VPC Peering (Mesh): Requires point-to-point connections between every VPC. Complex to manage."}
          </p>
        </div>
        <button
          onClick={() => setUseTgw(!useTgw)}
          className={`shrink-0 px-6 py-2 rounded-lg font-bold text-white transition-all shadow-md ${
            useTgw ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
          }`}
        >
          {useTgw ? 'Switch to VPC Peering' : 'Enable Transit Gateway'}
        </button>
      </div>

      <div className="relative w-full h-[400px] bg-slate-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center p-4">

        {/* Background Network Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {useTgw ? (
            // Hub and Spoke Lines
            vpcs.map((vpc) => (
              <line
                key={`tgw-line-${vpc.id}`}
                x1="50%" y1="50%"
                x2={vpc.x} y2={vpc.y}
                stroke="#a855f7" strokeWidth="3" className="opacity-60"
              />
            ))
          ) : (
            // Mesh Peering Lines (connecting everyone to everyone)
            vpcs.map((v1, i) =>
              vpcs.slice(i + 1).map(v2 => (
                <line
                  key={`peer-line-${v1.id}-${v2.id}`}
                  x1={v1.x} y1={v1.y}
                  x2={v2.x} y2={v2.y}
                  stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" className="opacity-40"
                />
              ))
            )
          )}
        </svg>

        {/* The Transit Gateway Hub */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500 flex flex-col items-center ${
            useTgw ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/40 border-4 border-purple-500 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center mb-1">
            <span className="font-bold text-purple-700 dark:text-purple-400">TGW</span>
          </div>
          <span className="text-[10px] font-bold bg-white dark:bg-gray-800 px-2 rounded border shadow-sm">Central Hub</span>
        </div>

        {/* VPC Nodes */}
        {vpcs.map((vpc) => (
          <div
            key={vpc.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: vpc.x, top: vpc.y }}
          >
            <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded shadow-md border-2 border-aws-orange flex items-center justify-center">
              <span className="font-bold text-xs">VPC {vpc.id}</span>
            </div>
          </div>
        ))}

        {/* Stat Badge */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 border border-gray-200 shadow rounded px-3 py-2 text-xs font-mono">
          <div className="font-bold mb-1">Connections Required:</div>
          {useTgw ? (
            <div className="text-purple-600 font-bold text-lg">5 (Hub-and-Spoke)</div>
          ) : (
            <div className="text-red-500 font-bold text-lg">10 (n*(n-1)/2 Mesh)</div>
          )}
        </div>

      </div>
    </div>
  );
}
