---
title: "AWS SAA Module 5 - Decoupled and Event-Driven Architectures"
moduleNumber: 5
description: "Architect loose coupling and asynchronous workflows using Amazon SQS, SNS, EventBridge, Step Functions, and API Gateway."
tags: ["SQS", "SNS", "EventBridge", "Step Functions", "Microservices"]
lastUpdated: 2024-03-01
---

# Decoupled and Event-Driven Architectures

Decoupling application components ensures that the failure of one component doesn't bring down the entire system. AWS provides several messaging and workflow services to achieve this.

## Amazon SQS (Simple Queue Service)
Fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications.
- **Standard Queues**: Maximum throughput, best-effort ordering, at-least-once delivery (duplicates can occur).
- **FIFO Queues (First-In-First-Out)**: Strict ordering, exactly-once processing, lower throughput compared to Standard queues.
- **Visibility Timeout**: The amount of time a message is invisible in the queue after a reader picks it up. If processing fails, the message reappears in the queue after the timeout.
- **Dead-Letter Queues (DLQ)**: A queue to send messages that can't be processed successfully after a certain number of retries.

## Amazon SNS (Simple Notification Service)
Fully managed pub/sub messaging service.
- Publishers send messages to "topics".
- Subscribers (e.g., SQS queues, Lambda functions, HTTP/S endpoints, email, SMS) receive messages pushed from the topic.
- **Fanout pattern**: One SNS topic sends a message to multiple SQS queues simultaneously.

## Amazon EventBridge
A serverless event bus that connects applications together using data from your own applications, SaaS applications, and AWS services.
- Replaces CloudWatch Events.
- Can set rules to route events to targets (e.g., Lambda, Step Functions, SNS).
- **Schema Registry**: Allows you to discover, create, and manage OpenAPI schemas for events.

## AWS Step Functions
Serverless function orchestrator that makes it easy to sequence AWS Lambda functions and multiple AWS services into business-critical applications.
- Built using state machines (JSON-based Amazon States Language).
- Manages state, error handling, retries, and parallel execution.
- **Standard Workflows**: For long-running workflows (up to 1 year).
- **Express Workflows**: For high-volume, short-duration workflows (up to 5 minutes).

## Amazon API Gateway
Fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.
- Can act as a "front door" for applications to access data, business logic, or functionality from backend services like Lambda or EC2.
- Supports RESTful APIs and WebSocket APIs.
- Features include throttling, caching, and API key management.

## Exam Traps
- **SQS vs SNS**: SQS is a pull mechanism (consumers poll the queue). SNS is a push mechanism (pub/sub). Use both for the "fanout" pattern.
- **SQS Standard vs FIFO**: If the question emphasizes that duplicate messages are unacceptable and order must be preserved, choose FIFO.
- **Step Functions vs SQS**: If the requirement is complex workflow orchestration with state tracking and multiple steps, choose Step Functions. If it's simple decoupling or buffering, choose SQS.
