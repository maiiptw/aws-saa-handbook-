---
title: "AWS SAA Module 4 - Databases and Caching Layers"
moduleNumber: 4
description: "Select the right database engine: Amazon RDS, Aurora, DynamoDB, ElastiCache, and Redshift based on performance, scalability, and access patterns."
tags: ["RDS", "DynamoDB", "Aurora", "ElastiCache", "Databases"]
lastUpdated: 2024-03-01
---

# Databases and Caching Layers

Selecting the correct database and caching strategy is crucial for application performance and scalability.

## Relational Databases (OLTP)

### Amazon RDS (Relational Database Service)
Managed service for relational databases (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server).
- **Multi-AZ Deployments**: Used for High Availability (Disaster Recovery). Synchronous replication to a standby instance in another AZ.
- **Read Replicas**: Used for scalability (read-heavy workloads). Asynchronous replication to other instances (up to 15 per RDS instance).

### Amazon Aurora
A MySQL and PostgreSQL-compatible relational database built for the cloud.
- Performance and availability of commercial databases at 1/10th the cost.
- Storage automatically scales up to 128 TB.
- **Aurora Serverless**: On-demand, auto-scaling configuration for unpredictable or intermittent workloads.
- **Aurora Global Database**: Spans multiple AWS regions, providing low-latency global reads and disaster recovery from region-wide outages.
- **Aurora Multi-Master**: Every node in the cluster is a read/write node. Ensures high availability for write operations.

## NoSQL Databases

### Amazon DynamoDB
Fully managed, highly available, key-value and document database.
- Single-digit millisecond performance at any scale.
- Serverless: No instances to provision or manage.
- **DynamoDB Streams**: Captures a time-ordered sequence of item-level modifications in any DynamoDB table (useful for triggering Lambda functions).
- **Global Tables**: Fully managed, multi-region, and multi-active database for globally distributed applications.

## Caching

### Amazon ElastiCache
Fully managed in-memory data store and cache service.
- **Memcached**: Simple, scalable, multi-threaded caching. No persistence or Multi-AZ support.
- **Redis**: Advanced data structures, pub/sub capabilities, Multi-AZ with automatic failover, data persistence, and backups.

### DynamoDB Accelerator (DAX)
- A fully managed, highly available, in-memory cache for DynamoDB that delivers up to a 10x performance improvement (microseconds latency).

## Data Warehousing (OLAP)

### Amazon Redshift
Fast, fully managed, petabyte-scale data warehouse service.
- Optimized for complex queries against large datasets (OLAP).
- Uses columnar storage and massively parallel processing (MPP).
- **Redshift Spectrum**: Allows querying data directly in Amazon S3 without loading it into Redshift tables.

## Exam Traps
- **RDS Multi-AZ vs Read Replicas**: Multi-AZ is for HA/DR (failover), not for scaling read traffic. Read Replicas are for read scaling.
- **DynamoDB Use Cases**: Look for "key-value store," "single-digit millisecond latency," or "flexible schema" as indicators to choose DynamoDB.
- **ElastiCache Redis vs Memcached**: If the requirement mentions HA, failover, pub/sub, or complex data types, choose Redis. If it mentions simple caching and multi-threading, choose Memcached.
