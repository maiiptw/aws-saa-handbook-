---
title: "AWS SAA Module 2 - Compute, Scaling and Load Balancing"
moduleNumber: 2
description: "Deep dive into Amazon EC2, Auto Scaling Groups (ASG), and Elastic Load Balancing (ELB) to design scalable and highly available applications."
tags: ["EC2", "Auto Scaling", "ALB", "NLB", "Compute"]
lastUpdated: 2024-03-01
---

# Compute, Scaling, and Load Balancing

Choosing the right compute resources, automatically scaling them based on demand, and distributing traffic efficiently are critical for highly available AWS applications.

## Amazon EC2 (Elastic Compute Cloud)

EC2 provides secure, resizable compute capacity in the cloud.

### Pricing Models
1. **On-Demand**: Pay for what you use by the second/hour. Best for short-term, spiky, or unpredictable workloads.
2. **Reserved Instances (RI)**: Discounted rates for 1- or 3-year commitments. Best for steady-state usage.
3. **Savings Plans**: Flexible pricing model providing savings in exchange for a commitment to a consistent amount of usage (measured in $/hour).
4. **Spot Instances**: Steep discounts on spare capacity. Best for flexible, fault-tolerant workloads (e.g., batch processing). AWS can reclaim these with a 2-minute warning.
5. **Dedicated Hosts/Instances**: Physical servers dedicated to your use. Required for certain licensing compliance or strict regulatory requirements.

## Auto Scaling Groups (ASG)

ASGs ensure you have the correct number of EC2 instances available to handle the load for your application.
- **Launch Templates**: Define the configuration of instances launched by the ASG (AMI, instance type, security groups, etc.).
- **Scaling Policies**:
  - *Target Tracking*: Keep a specific metric (e.g., average CPU utilization) at a target value.
  - *Step Scaling*: Increase or decrease capacity based on alarm breaches.
  - *Scheduled Scaling*: Scale based on predictable schedules (e.g., business hours).

## Elastic Load Balancing (ELB)

ELB automatically distributes incoming application traffic across multiple targets, such as EC2 instances, containers, and IP addresses.

### Application Load Balancer (ALB)
- Operates at **Layer 7** (Application layer).
- Routes traffic based on HTTP/HTTPS characteristics (path, host, headers).
- Supports path-based routing (e.g., `/api` goes to one target group, `/web` to another).
- Excellent for microservices and containerized applications.

### Network Load Balancer (NLB)
- Operates at **Layer 4** (Transport layer).
- Routes traffic based on IP protocol data (TCP, UDP).
- Capable of handling millions of requests per second with ultra-low latency.
- Provides static IP addresses per Availability Zone.

### Gateway Load Balancer (GWLB)
- Used to deploy, scale, and manage third-party virtual appliances (firewalls, intrusion detection/prevention systems).
- Operates at Layer 3 (Network layer).

## Exam Traps
- **Spot Instances**: Never use Spot Instances for critical databases or stateful web servers without robust external state management.
- **ALB vs NLB**: If the question mentions "ultra-low latency," "TCP/UDP," or "static IP," the answer is likely NLB. If it mentions "HTTP headers" or "path-based routing," it's ALB.
- **ASG Default Termination Policy**: The default policy terminates instances in the Availability Zone with the most instances to maintain balance.
