---
title: "Amazon EBS"
serviceName: "EBS"
category: "Storage"
description: "Easy to use, high-performance block storage at any scale for EC2."
---

# Amazon Elastic Block Store (Amazon EBS)

Amazon EBS provides block level storage volumes for use with EC2 instances. EBS volumes behave like raw, unformatted block devices. You can mount these volumes as devices on your instances.

## Volume Types
- **General Purpose SSD (gp2/gp3):** Balances price and performance. Default choice for most workloads.
- **Provisioned IOPS SSD (io1/io2):** Highest performance for mission-critical databases requiring sustained IOPS performance.
- **Throughput Optimized HDD (st1):** Low cost, designed for frequently accessed, throughput-intensive workloads (Big Data, Data Warehouses).
- **Cold HDD (sc1):** Lowest cost HDD, meant for less frequently accessed workloads (File Archives).

## Exam Tips
- **AZ Bound:** An EBS volume is locked to a specific Availability Zone. To move it to another AZ, you must take a snapshot and restore it in the new AZ.
- **Snapshots:** EBS Snapshots are incremental and are stored in Amazon S3 (though managed via the EC2 console).
