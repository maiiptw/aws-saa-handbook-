import React, { useState } from 'react';
import { ReactFlow, Background, Controls, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function AlbFailoverSim() {
  const [azAOutage, setAzAOutage] = useState(false);

  const nodes = [
    {
      id: 'route53',
      position: { x: 250, y: 0 },
      data: { label: 'Route 53 (DNS)' },
      style: { background: '#232F3E', color: 'white', borderRadius: '8px', padding: '10px' }
    },
    {
      id: 'alb',
      position: { x: 250, y: 100 },
      data: { label: 'Application Load Balancer' },
      style: { background: '#FF9900', color: 'black', borderRadius: '8px', padding: '10px' }
    },
    {
      id: 'ec2-aza',
      position: { x: 100, y: 250 },
      data: {
        label: azAOutage ? 'EC2 (AZ-a) - DOWN' : 'EC2 (AZ-a) - HEALTHY'
      },
      style: {
        background: azAOutage ? '#ef4444' : '#22c55e',
        color: 'white',
        borderRadius: '8px',
        padding: '10px'
      }
    },
    {
      id: 'ec2-azb',
      position: { x: 400, y: 250 },
      data: { label: 'EC2 (AZ-b) - HEALTHY' },
      style: { background: '#22c55e', color: 'white', borderRadius: '8px', padding: '10px' }
    }
  ];

  const edges = [
    {
      id: 'e1', source: 'route53', target: 'alb',
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed }
    },
    {
      id: 'e2', source: 'alb', target: 'ec2-aza',
      animated: !azAOutage,
      style: { stroke: azAOutage ? '#ef4444' : '#b1b1b7', opacity: azAOutage ? 0.3 : 1 },
      markerEnd: { type: MarkerType.ArrowClosed }
    },
    {
      id: 'e3', source: 'alb', target: 'ec2-azb',
      animated: true,
      style: { stroke: azAOutage ? '#3b82f6' : '#b1b1b7', strokeWidth: azAOutage ? 3 : 1 },
      markerEnd: { type: MarkerType.ArrowClosed }
    }
  ];

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900 shadow-md my-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">ALB Failover Simulation</h3>
        <button
          onClick={() => setAzAOutage(!azAOutage)}
          className={`px-4 py-2 rounded font-semibold text-white transition-colors ${
            azAOutage ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {azAOutage ? 'Restore AZ-a' : 'Simulate AZ-a Outage'}
        </button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {azAOutage
          ? "AZ-a has failed! The ALB detects the EC2 instance is unhealthy and automatically routes 100% of traffic to the healthy instance in AZ-b."
          : "Traffic is being evenly distributed by the Application Load Balancer across multiple Availability Zones."}
      </p>

      <div style={{ height: 400, width: '100%' }} className="border border-dashed border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-black">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#ccc" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
