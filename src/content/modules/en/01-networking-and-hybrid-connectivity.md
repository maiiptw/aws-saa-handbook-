---
title: "AWS SAA Module 1 - Networking and Hybrid Connectivity"
moduleNumber: 1
description: "Master Amazon VPC, Subnets, Route Tables, NAT Gateways, Transit Gateway, Direct Connect, and VPNs for building robust AWS network topologies."
tags: ["VPC", "Networking", "Direct Connect", "Transit Gateway", "VPN"]
lastUpdated: 2024-03-01
---

# Networking and Hybrid Connectivity

Networking is the foundational layer of any AWS deployment. In this module, we will explore the core concepts of Amazon Virtual Private Cloud (VPC), network security, routing, and hybrid connectivity solutions connecting on-premises data centers to AWS.

## Amazon VPC Fundamentals

Amazon VPC allows you to provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.

### VPC Peering vs Transit Gateway
- **VPC Peering**: Connects two VPCs directly using AWS's private network. It is not transitive. If VPC A is peered with B, and B with C, A cannot talk to C.
- **AWS Transit Gateway (TGW)**: A network transit hub (hub-and-spoke model) that interconnects thousands of VPCs and on-premises networks. Solves the complex mesh problem of VPC Peering.

### VPC Endpoints (Gateway vs Interface)
VPC Endpoints allow private connections from your VPC to supported AWS services without requiring an Internet Gateway or NAT Gateway.
- **Gateway Endpoints**: Free to use. Placed in a Route Table. Supports **only** Amazon S3 and DynamoDB.
- **Interface Endpoints (AWS PrivateLink)**: Incurs an hourly cost and data processing charges. Creates an Elastic Network Interface (ENI) in your subnet with a private IP. Supports many services (e.g., SNS, SQS, Kinesis, EC2 API).


### Subnets
- **Public Subnet**: A subnet whose route table directs traffic to the Internet Gateway (IGW).
- **Private Subnet**: A subnet without a route to the IGW. Instances here cannot be accessed directly from the public internet.

### Route Tables
Route tables contain a set of rules (routes) that determine where network traffic from your subnet or gateway is directed.
- The `local` route allows instances within the same VPC to communicate with each other.

### Internet Gateway (IGW) & NAT Gateway
- **IGW**: A horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet.
- **NAT Gateway**: Allows instances in a private subnet to connect to the internet or other AWS services, but prevents the internet from initiating a connection with those instances.

## Network Security

### Security Groups (SGs)
- Act as a firewall at the **instance level**.
- Are **stateful**: If you send a request from your instance, the response traffic for that request is allowed to flow in regardless of inbound security group rules.
- Default: All inbound traffic is denied, all outbound traffic is allowed.

### Network ACLs (NACLs)
- Act as a firewall at the **subnet level**.
- Are **stateless**: Return traffic must be explicitly allowed by rules.
- Support allow and deny rules.

## Edge & Content Delivery

### Amazon CloudFront vs AWS Global Accelerator
- **Amazon CloudFront**: A Content Delivery Network (CDN) that caches content (static and dynamic) at Edge Locations for faster delivery to users. Uses the public internet for the last mile.
- **AWS Global Accelerator**: Routes traffic to optimal regional endpoints over the AWS global network. It does **not** cache content but provides a pair of static Anycast IP addresses and improves performance for UDP/TCP traffic (e.g., gaming, IoT).

## Hybrid Connectivity

When extending on-premises networks to AWS, you have multiple options:

### AWS Site-to-Site VPN
Creates a secure connection between your data center or branch office and your AWS resources.
- Uses IPsec tunnels over the public internet.
- Quick to set up, but bandwidth and latency can vary based on internet performance.

### AWS Direct Connect (DX)
Establishes a dedicated network connection from your premises to AWS.
- Bypasses the public internet.
- Provides a more consistent network experience and higher bandwidth (up to 100 Gbps).

### AWS Transit Gateway (TGW)
A network transit hub that you can use to interconnect your virtual private clouds (VPCs) and on-premises networks.
- Simplifies network architecture by using a hub-and-spoke topology.
- Supports cross-region peering.

## Exam Traps
- **NAT Gateway vs NAT Instance**: Always prefer NAT Gateway for high availability and managed scaling.
- **VPC Peering vs Transit Gateway**: If connecting more than a few VPCs, Transit Gateway is highly recommended to avoid complex peer-to-peer routing meshes.
- **Direct Connect Setup Time**: Direct Connect takes weeks to set up physically; use Site-to-Site VPN as an interim solution.
