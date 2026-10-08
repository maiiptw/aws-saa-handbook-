---
title: "Amazon CloudFront"
serviceName: "CloudFront"
category: "Networking"
description: "Global Content Delivery Network (CDN) service for secure, low-latency content delivery."
---

# Amazon CloudFront

Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds.

## Key Features
- **Edge Locations:** Caches content at edge locations worldwide to serve it closer to the user.
- **Security:** Integrates seamlessly with AWS WAF (Web Application Firewall) and AWS Shield to protect against DDoS attacks.
- **Origins:** Can use S3 buckets, EC2 instances, ALBs, or custom on-premises servers as the origin.

## Exam Tips
- **OAC/OAI:** To restrict users from directly accessing an S3 bucket (bypassing the CDN), use Origin Access Control (OAC) or Origin Access Identity (OAI) so the bucket only allows access from CloudFront.
- **Cache Invalidation:** If you update a file on the origin but users still see the old version, you need to perform a Cache Invalidation in CloudFront.
