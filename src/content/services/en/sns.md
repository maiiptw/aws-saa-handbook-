---
title: "Amazon SNS"
serviceName: "SNS"
category: "Other"
description: "Fully managed Pub/Sub service for A2A and A2P messaging."
---

# Amazon Simple Notification Service (Amazon SNS)

Amazon SNS is a fully managed messaging service for both application-to-application (A2A) and application-to-person (A2P) communication. It follows the Publish/Subscribe (Pub/Sub) model.

## Key Concepts
- **Topics & Subscriptions:** Publishers send messages to "Topics". Subscribers receive messages pushed from Topics.
- **Push Mechanism:** Unlike SQS where consumers "pull" or "poll" for messages, SNS "pushes" the messages instantly to all subscribers.
- **Endpoints:** Subscribers can be Lambda functions, SQS queues, HTTP/HTTPS endpoints, Email, or SMS.

## Exam Tips
- **Fan-Out Pattern:** A very common exam architecture is using SNS to "fan-out" a single message to multiple SQS queues. This allows a single event to trigger multiple independent backend processes simultaneously and reliably.
