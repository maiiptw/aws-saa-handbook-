---
title: "AWS SAA Module 3 - Storage and Data Lifecycle"
moduleNumber: 3
description: "Understand Amazon S3, EBS, EFS, FSx, and Storage Gateway to optimize storage performance, cost, and data lifecycle management."
tags: ["S3", "EBS", "EFS", "Storage Gateway", "FSx"]
lastUpdated: 2024-03-01
---

# Storage and Data Lifecycle

AWS provides a variety of storage services tailored for block, file, and object storage requirements.

## Amazon S3 (Simple Storage Service)

S3 is an object storage service offering industry-leading scalability, data availability, security, and performance.

### Storage Classes
1. **S3 Standard**: General purpose, frequently accessed data.
2. **S3 Standard-IA (Infrequent Access)**: Data accessed less frequently but requires rapid access when needed. Lower storage cost, but incurs retrieval fees.
3. **S3 One Zone-IA**: Same as Standard-IA but stored in only one AZ. Lower cost, but data can be lost if the AZ is destroyed.
4. **S3 Glacier Flexible Retrieval**: Archive storage. Retrieval takes minutes to hours.
5. **S3 Glacier Deep Archive**: Lowest cost storage. Retrieval takes 12-48 hours.
6. **S3 Intelligent-Tiering**: Automatically moves data to the most cost-effective access tier based on access patterns without performance impact or retrieval fees.

### Lifecycle Policies
Rules that define actions applied to objects during their lifetime.
- **Transition actions**: Move objects to another storage class (e.g., Standard to Glacier after 30 days).
- **Expiration actions**: Delete objects after a specified period.

## Block Storage: Amazon EBS (Elastic Block Store)

EBS provides persistent block storage volumes for use with EC2 instances.
- **gp2/gp3 (General Purpose SSD)**: Balances price and performance for most workloads.
- **io1/io2 (Provisioned IOPS SSD)**: Highest performance for mission-critical, low-latency, or high-throughput workloads (e.g., large databases).
- **st1 (Throughput Optimized HDD)**: Low-cost storage for frequently accessed, throughput-intensive workloads (e.g., Big Data, log processing).
- **sc1 (Cold HDD)**: Lowest cost storage for infrequently accessed workloads.
- EBS snapshots are incremental backups of EBS volumes stored in S3.

## File Storage

### Amazon EFS (Elastic File System)
- A serverless, fully elastic file storage system.
- Can be mounted on multiple EC2 instances simultaneously across different AZs.
- Uses the NFS protocol (Linux only).

### Amazon FSx
- **FSx for Windows File Server**: Fully managed native Windows file system (uses SMB protocol). Supports Active Directory integration.
- **FSx for Lustre**: High-performance file system optimized for fast processing of workloads like machine learning and high-performance computing (HPC). Can be linked directly to an S3 bucket.

## Hybrid Storage: AWS Storage Gateway
Connects on-premises environments to AWS cloud storage.
- **File Gateway**: Provides a file interface (NFS/SMB) to S3.
- **Volume Gateway**: Provides block storage (iSCSI) volumes backed by S3 (Cached or Stored volumes).
- **Tape Gateway**: Replaces physical tapes with virtual tapes stored in S3/Glacier.

## Exam Traps
- **Multi-AZ vs Single-AZ Storage**: EFS is regional (Multi-AZ) by default. EBS is tied to a single AZ (unless using EBS Multi-Attach with io1/io2, but it's still intra-AZ).
- **Windows vs Linux File Shares**: For Windows instances, use FSx for Windows. For Linux instances needing shared storage, use EFS.
- **S3 Object Locks**: Use S3 Object Lock for WORM (Write Once Read Many) compliance to prevent deletion or modification of objects.
