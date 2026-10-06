import React, { useState } from 'react';
import { ReactFlow, Background, Controls, MarkerType } from '@xyflow/react';
import type { Edge, Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function VpcPeeringSim() {
  const [peeringActive, setPeeringActive] = useState(false);

  const nodes: Node[] = [
    {
      id: 'vpc-a',
      position: { x: 50, y: 50 },
      data: { label: <div className="text-center"><div className="font-bold">VPC A</div><div className="text-xs">10.0.0.0/16</div></div> },
      style: { backgroundColor: '#fdf2f8', borderColor: '#ec4899', width: 150 },
    },
    {
      id: 'vpc-b',
      position: { x: 350, y: 50 },
      data: { label: <div className="text-center"><div className="font-bold">VPC B</div><div className="text-xs">10.1.0.0/16</div></div> },
      style: { backgroundColor: '#eff6ff', borderColor: '#3b82f6', width: 150 },
    },
    {
      id: 'ec2-a',
      position: { x: 75, y: 150 },
      data: { label: 'EC2 Instance A' },
      style: { borderRadius: '100%', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' },
      parentNode: 'vpc-a',
      extent: 'parent',
    },
    {
      id: 'ec2-b',
      position: { x: 25, y: 150 },
      data: { label: 'EC2 Instance B' },
      style: { borderRadius: '100%', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' },
      parentNode: 'vpc-b',
      extent: 'parent',
    }
  ];

  const edges: Edge[] = [
    {
      id: 'peer-edge',
      source: 'ec2-a',
      target: 'ec2-b',
      animated: peeringActive,
      style: { stroke: peeringActive ? '#10b981' : '#ef4444', strokeWidth: 2 },
      label: peeringActive ? 'Traffic Flowing' : 'No Route',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: peeringActive ? '#10b981' : '#ef4444',
      },
    }
  ];

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-800/50 mt-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold">VPC Peering Connection</h3>
          <p className="text-sm text-gray-500">Connect VPC A and VPC B via AWS internal network.</p>
        </div>
        <button
          onClick={() => setPeeringActive(!peeringActive)}
          className={`px-4 py-2 rounded-md font-bold text-white transition-colors ${peeringActive ? 'bg-red-500 hover:bg-red-600' : 'bg-aws-orange hover:bg-yellow-600'}`}
        >
          {peeringActive ? 'Disconnect Peering' : 'Establish Peering'}
        </button>
      </div>

      <div className="h-64 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-900 relative">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background color="#ccc" gap={16} />
          <Controls />
        </ReactFlow>

        {/* Status indicator */}
        <div className="absolute bottom-4 left-4">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${peeringActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <span className={`w-2 h-2 rounded-full ${peeringActive ? 'bg-green-500 animate-ping' : 'bg-red-500'}`}></span>
            {peeringActive ? 'Connected (Private IPs)' : 'Isolated'}
          </span>
        </div>
      </div>
    </div>
  );
}
