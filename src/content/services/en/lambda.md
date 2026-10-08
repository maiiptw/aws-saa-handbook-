---
title: "AWS Lambda"
serviceName: "AWS Lambda"
category: "Compute"
description: "Serverless compute service that runs code in response to events."
---

# AWS Lambda

AWS Lambda is a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without provisioning or managing servers. You pay only for the compute time you consume.

## Key Features
- **Serverless:** No servers to manage. AWS handles the infrastructure, scaling, and high availability.
- **Event-Driven:** Can be triggered by over 200 AWS services (e.g., S3 object uploads, DynamoDB updates, API Gateway requests).
- **Concurrency:** Automatically scales by running code in parallel in response to each trigger.

## Exam Tips
- **Timeout:** Maximum execution time for a Lambda function is **15 minutes**.
- **Cold Starts:** First-time invocations may experience latency while the execution environment is spun up. Use Provisioned Concurrency to avoid this.
