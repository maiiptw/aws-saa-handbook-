---
title: "AWS Transit Gateway"
serviceName: "Transit Gateway"
category: "Networking"
description: "Central hub to connect VPCs and on-premises networks."
---

# AWS Transit Gateway

AWS Transit Gateway connects your Amazon Virtual Private Clouds (VPCs) and on-premises networks through a central hub. This simplifies your network and puts an end to complex peering relationships.

## Key Features
- **Hub and Spoke:** Replaces complex point-to-point VPC peering connections with a star (hub-and-spoke) topology.
- **Transitive Routing:** Unlike VPC Peering, Transit Gateway supports transitive routing (VPC A can talk to VPC C through the central hub).
- **On-Premises Connectivity:** Easily integrates with AWS Direct Connect and Site-to-Site VPNs.

## Exam Tips
- If the exam mentions connecting **10s or 100s of VPCs** together, or mentions a **"hub-and-spoke"** architecture, the answer is always **Transit Gateway**.
- Supports IP Multicast (VPC does not support this natively).
