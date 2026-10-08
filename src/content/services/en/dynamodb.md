---
title: "Amazon DynamoDB"
serviceName: "DynamoDB"
category: "Database"
description: "Fast, flexible NoSQL database service for single-digit millisecond performance at any scale."
---

# Amazon DynamoDB

Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database designed to run high-performance applications at any scale.

## Key Features
- **Performance:** Offers consistent, single-digit millisecond latency.
- **Serverless:** No instances to provision or manage. Scales automatically.
- **Capacity Modes:** Choose between Provisioned capacity (if workloads are predictable) or On-Demand capacity (for unpredictable or spikey workloads).
- **DynamoDB Streams:** A time-ordered sequence of item-level changes in a table, often used to trigger AWS Lambda functions.

## Exam Tips
- **Global Tables:** If the exam asks for a highly available database that allows **multi-region, active-active** writes with sub-second replication, choose DynamoDB Global Tables.
- **Use cases:** Great for gaming leaderboards, shopping carts, and session data. Not meant for complex SQL JOINs.
