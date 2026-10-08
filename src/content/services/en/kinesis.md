---
title: "Amazon Kinesis"
serviceName: "Kinesis"
category: "Other"
description: "Easily collect, process, and analyze video and data streams in real time."
---

# Amazon Kinesis

Amazon Kinesis makes it easy to collect, process, and analyze real-time, streaming data so you can get timely insights and react quickly to new information.

## Main Services
- **Kinesis Data Streams:** Capture, process, and store data streams (like application logs, website clickstreams, IoT telemetry). Data persists from 24 hours to 365 days. Consumers process the data.
- **Kinesis Data Firehose:** The easiest way to reliably load streaming data into data lakes, data stores, and analytics services (e.g., directly to S3, Redshift, or OpenSearch). It is fully managed and auto-scales.
- **Kinesis Data Analytics:** Analyze streaming data using standard SQL or Apache Flink.

## Exam Tips
- **Kinesis vs SQS:** SQS is for message queuing/decoupling (messages are deleted after processing). Kinesis is for real-time big data streaming (data is retained and can be processed multiple times by multiple different consumers).
