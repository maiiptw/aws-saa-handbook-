---
title: "Amazon Route 53"
serviceName: "Route 53"
category: "Networking"
description: "Highly available and scalable cloud Domain Name System (DNS) web service."
---

# Amazon Route 53

Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service. It is designed to give developers and businesses an extremely reliable and cost-effective way to route end users to internet applications.

## Key Routing Policies
- **Simple Routing:** Maps a domain to one or more IP addresses. No health checks.
- **Weighted Routing:** Routes traffic to multiple resources in proportions that you specify (e.g., 80% to Server A, 20% to Server B). Great for A/B testing.
- **Latency-based Routing:** Routes traffic to the AWS region that provides the lowest latency to the user.
- **Failover Routing:** Routes traffic to a primary resource; if health checks fail, it routes to a secondary (standby) resource.
- **Geolocation/Geoproximity:** Routes based on the geographic location of the user or the resource.

## Exam Tips
- **Alias Records:** Use Alias records (specific to AWS) instead of CNAMEs to map a domain to AWS resources like ALBs or CloudFront distributions, especially at the apex/root domain (e.g., example.com). Alias records are free.
