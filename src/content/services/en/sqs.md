---
title: "Amazon SQS"
serviceName: "SQS"
category: "Other"
description: "Fully managed message queuing for microservices, distributed systems, and serverless applications."
---

# Amazon Simple Queue Service (Amazon SQS)

Amazon SQS is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications.

## Key Concepts
- **Decoupling:** Prevents tightly coupled architectures. If a downstream consumer (like a database or an EC2 instance) crashes, messages remain safe in the SQS queue until the consumer recovers.
- **Standard Queue:** Unlimited throughput, at-least-once delivery, best-effort ordering.
- **FIFO Queue (First-In-First-Out):** Strict ordering, exactly-once processing, lower throughput limit (up to 300 or 3000 msg/sec with batching).

## Exam Tips
- **Visibility Timeout:** The period of time during which a message is "hidden" from other consumers after it's picked up by one consumer. If the consumer fails to process and delete the message in this time, it becomes visible again.
- **Dead-Letter Queue (DLQ):** A queue to send messages that can't be processed successfully after a maximum number of retries, allowing you to isolate and debug problematic messages.
