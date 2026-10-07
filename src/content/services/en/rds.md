---
title: "Amazon RDS"
serviceName: "RDS"
category: "Database"
description: "Managed relational database service supporting MySQL, PostgreSQL, Oracle, and more."
---

# Amazon Relational Database Service (Amazon RDS)

Amazon RDS is a managed service that makes it easy to set up, operate, and scale a relational database in the cloud. It provides cost-efficient and resizable capacity while automating time-consuming administration tasks such as hardware provisioning, database setup, patching, and backups.

## Key Features

- **Supported Engines:** MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, and Amazon Aurora.
- **Automated Backups:** By default, automated backups are enabled and can be retained for up to 35 days.
- **Multi-AZ Deployments:** Provides high availability and failover support for DB instances by synchronously replicating data to a standby instance in a different Availability Zone.
- **Read Replicas:** Allows you to create one or more read-only copies of your database instance to scale out read-heavy workloads asynchronously.

## Common Use Cases

1. Traditional applications (ERP, CRM, e-commerce) that require complex joins and transactions.
2. Web and mobile applications needing a standard relational database backend.

## Exam Tips
- **Multi-AZ vs Read Replicas:**
  - **Multi-AZ** is purely for **High Availability (Disaster Recovery)**. You cannot read from the standby instance.
  - **Read Replicas** are for **Performance Scaling**. You can offload read queries to them, but data is replicated asynchronously.
- **Amazon Aurora:** AWS's proprietary database engine. It is compatible with MySQL and PostgreSQL but performs up to 5x faster. Storage automatically scales in 10GB increments up to 128TB.