---
title: "Amazon ElastiCache"
serviceName: "ElastiCache"
category: "Database"
description: "In-memory data store and cache service (Redis and Memcached)."
---

# Amazon ElastiCache

Amazon ElastiCache allows you to seamlessly set up, run, and scale popular open-source compatible in-memory data stores in the cloud. It helps improve the performance of web applications by retrieving data from fast, managed, in-memory caches, instead of relying entirely on slower disk-based databases.

## Key Engines
- **Redis:** Supports complex data structures (sorted sets, hashes), data persistence, Multi-AZ high availability, and backups.
- **Memcached:** Simpler design, pure caching, multi-threading, no persistence or backups.

## Exam Tips
- **Use Case:** Whenever the exam talks about a relational database (RDS) suffering from high read loads and slow response times due to frequent identical queries, adding **ElastiCache** is the typical solution.
- **Session Data:** Often used to store stateless session data for EC2 auto-scaling groups.
