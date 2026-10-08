---
title: "Amazon Aurora"
serviceName: "Aurora"
category: "Database"
description: "MySQL and PostgreSQL-compatible relational database built for the cloud."
---

# Amazon Aurora

Amazon Aurora is a MySQL and PostgreSQL-compatible relational database built for the cloud, that combines the performance and availability of traditional enterprise databases with the simplicity and cost-effectiveness of open source databases.

## Key Features
- **High Performance:** Up to 5x faster than standard MySQL and 3x faster than standard PostgreSQL.
- **Storage:** Storage automatically scales in 10 GB increments up to 128 TB. You don't need to provision storage in advance.
- **Durability:** Automatically maintains 6 copies of your data across 3 Availability Zones.
- **Aurora Serverless:** Automatically starts up, shuts down, and scales capacity up or down based on your application's needs.

## Exam Tips
- **Aurora Multi-Master:** Allows you to create multiple read/write instances across multiple AZs. Perfect if the application requires continuous write availability and no failover downtime.
- **Aurora Global Database:** Designed for globally distributed applications, allowing a single Aurora database to span multiple AWS regions with less than 1-second replication latency.
