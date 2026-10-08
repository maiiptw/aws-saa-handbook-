---
title: "Amazon API Gateway"
serviceName: "API Gateway"
category: "Networking"
description: "Fully managed service to create, publish, maintain, monitor, and secure APIs."
---

# Amazon API Gateway

Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.

## Key Features
- **Integration:** Perfectly integrates with AWS Lambda for serverless architectures, or can sit in front of EC2, ALBs, or even on-premises web services.
- **Throttling & Caching:** Can throttle requests to prevent your backend from being overwhelmed, and cache responses to reduce backend load and improve latency.
- **Security:** Supports AWS IAM, Amazon Cognito User Pools, or custom Lambda authorizers for API access control.

## Exam Tips
- **Throttling:** If you need to protect your backend servers from traffic spikes or DDoS, API Gateway throttling is a key mechanism.
- **Cross-Origin Resource Sharing (CORS):** If your frontend (e.g., hosted on S3) tries to call an API Gateway on a different domain and gets blocked, you must enable CORS in the API Gateway.
