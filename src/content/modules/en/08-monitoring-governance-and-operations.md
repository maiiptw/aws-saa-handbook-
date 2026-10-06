---
title: "AWS SAA Module 8 - Monitoring, Governance and Operations"
moduleNumber: 8
description: "Master CloudWatch, CloudTrail, AWS Config, Systems Manager, and Organizations for effective monitoring, auditing, and governance."
tags: ["CloudWatch", "CloudTrail", "AWS Config", "Organizations", "Governance"]
lastUpdated: 2024-03-01
---

# Monitoring, Governance, and Operations

Maintaining visibility into your AWS environment is essential for optimizing performance, ensuring security compliance, and controlling costs.

## Monitoring and Logging

### Amazon CloudWatch
Monitors AWS resources and applications in real-time.
- **Metrics**: Data about the performance of your systems (e.g., CPU utilization, Network In/Out).
- **Alarms**: Watch a single metric over a specified time period and perform actions (e.g., trigger ASG scaling, send SNS notification).
- **Logs**: Centralized repository for application and OS log files (e.g., from EC2 instances, Lambda functions).
- **Events (EventBridge)**: Delivers a near real-time stream of system events that describe changes in AWS resources.

### AWS CloudTrail
Enables governance, compliance, operational auditing, and risk auditing of your AWS account.
- Records API calls made on your account (who made the call, when, from which IP, and what was affected).
- Crucial for security investigations and troubleshooting "who did what".
- **CloudTrail Insights**: Helps users identify and respond to unusual activity associated with API calls and API error rates.

## Governance and Compliance

### AWS Config
Service that enables you to assess, audit, and evaluate the configurations of your AWS resources.
- Continuously monitors and records resource configurations.
- Allows you to automate the evaluation of recorded configurations against desired configurations (e.g., "Are all my S3 buckets private?", "Are all EBS volumes encrypted?").
- Helpful for maintaining compliance standards (HIPAA, PCI-DSS).

### AWS Organizations
Account management service that enables you to consolidate multiple AWS accounts into an organization that you create and centrally manage.
- Consolidates billing across all accounts to leverage volume discounts.
- **Service Control Policies (SCPs)**: Centralized control over the maximum available permissions for all accounts in your organization, overriding even administrator permissions within those accounts.

## Operations

### AWS Systems Manager (SSM)
Provides a unified user interface so you can view operational data from multiple AWS services and allows you to automate operational tasks across your AWS resources.
- **Run Command**: Safely manage the configuration of your managed instances at scale without needing SSH access or bastion hosts.
- **Patch Manager**: Automates the process of patching managed instances with both security related and other types of updates.
- **Parameter Store**: Provides secure, hierarchical storage for configuration data management and secrets management (passwords, database strings).

## Exam Traps
- **CloudWatch vs CloudTrail**: CloudWatch is for *performance* monitoring (metrics, logs, alarms). CloudTrail is for *auditing* API calls ("who did what").
- **AWS Config vs CloudTrail**: Config records the *state/configuration* of a resource over time. CloudTrail records the *API call* that caused the change.
- **Parameter Store vs Secrets Manager**: Both store secrets, but Secrets Manager has built-in capability for automatic rotation of database credentials (e.g., RDS) out of the box. Parameter Store is typically cheaper for simple key-value configuration data.
