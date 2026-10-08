---
title: "Amazon CloudWatch"
serviceName: "CloudWatch"
category: "Other"
description: "Monitoring and observability service for AWS resources."
---

# Amazon CloudWatch

Amazon CloudWatch is a monitoring and observability service built for DevOps engineers, developers, site reliability engineers (SREs), and IT managers.

## Key Components
- **Metrics:** Data points representing the performance of resources (e.g., EC2 CPU utilization).
- **Logs:** Centralized repository to store and search log files from EC2 instances, Lambda, Route 53, etc.
- **Alarms:** Watch a single metric and perform one or more actions (like sending an SNS email or triggering Auto Scaling) based on a threshold.
- **EventBridge (formerly CloudWatch Events):** A serverless event bus that connects applications together using data from your own applications, SaaS applications, and AWS services.

## Exam Tips
- **CloudWatch vs CloudTrail:** CloudWatch monitors **Performance** (CPU, memory, errors). CloudTrail monitors **API Actions** (Who created this EC2 instance? Who deleted that S3 bucket?).
