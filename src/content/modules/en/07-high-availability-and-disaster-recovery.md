---
title: "AWS SAA Module 7 - High Availability and Disaster Recovery"
moduleNumber: 7
description: "Design resilient systems using Route 53, Multi-AZ deployments, Global Accelerator, and robust Disaster Recovery (DR) strategies."
tags: ["Route 53", "DR", "Multi-AZ", "Global Accelerator"]
lastUpdated: 2024-03-01
---

# High Availability and Disaster Recovery

Designing systems that can withstand failures and recover quickly is a core tenet of the AWS Well-Architected Framework.

## Amazon Route 53
A highly available and scalable cloud Domain Name System (DNS) web service.
- Translates human-readable names (e.g., www.example.com) into IP addresses.
- Acts as a domain registrar.
- **Routing Policies**:
  - *Simple Routing*: Use for a single resource that performs a given function for your domain (e.g., a web server).
  - *Weighted Routing*: Route traffic to multiple resources in proportions that you specify (e.g., A/B testing).
  - *Latency Routing*: Route traffic to the AWS Region that provides the best latency for the user.
  - *Failover Routing*: Route traffic to a primary resource when healthy, and to a secondary resource when the primary is unhealthy (Active-Passive DR).
  - *Geolocation Routing*: Route traffic based on the location of your users.

## AWS Global Accelerator
A networking service that improves the availability and performance of applications with global users.
- Provides two static IP addresses that act as a fixed entry point to your application endpoints in a single or multiple AWS Regions.
- Uses the AWS global network to direct traffic to optimal endpoints over the AWS backbone, bypassing the public internet to reduce jitter and latency.

## Disaster Recovery (DR) Strategies
Disaster recovery focuses on keeping workloads available or recovering them in the event of a disaster.
- **RTO (Recovery Time Objective)**: The maximum acceptable delay between the interruption of service and the restoration of service.
- **RPO (Recovery Point Objective)**: The maximum acceptable amount of data loss measured in time.

### DR Patterns on AWS
1. **Backup and Restore**: Lowest cost, highest RTO/RPO. Data is backed up to S3; upon disaster, infrastructure is provisioned and data restored.
2. **Pilot Light**: Core infrastructure is running in a secondary region, but at a minimal scale (e.g., database running, but no compute). Faster recovery than Backup and Restore.
3. **Warm Standby**: A scaled-down version of the fully functional environment is always running in the secondary region.
4. **Multi-Site (Hot Standby)**: Active-Active configuration. The application is running at full scale in multiple regions simultaneously. Highest cost, lowest RTO/RPO (near zero).

## Exam Traps
- **Route 53 vs Global Accelerator**: Use Route 53 when routing based on geography, latency, or DNS. Use Global Accelerator when you need static IP addresses and want to optimize performance by leveraging the AWS global backbone instead of the public internet.
- **DR Strategies**: Be able to identify which DR strategy matches a given budget and RTO/RPO requirement. "Cost-effective but tolerates hours of downtime" = Backup and Restore. "Mission-critical, zero downtime" = Multi-Site Active-Active.
