---
title: "Amazon EFS"
serviceName: "EFS"
category: "Storage"
description: "Serverless, fully elastic file storage (NFS) for EC2."
---

# Amazon Elastic File System (Amazon EFS)

Amazon EFS provides a simple, serverless, set-and-forget elastic file system for use with AWS Cloud services and on-premises resources. It is built to scale on demand to petabytes without disrupting applications.

## Key Features
- **Multi-Instance Access:** EFS can be mounted by hundreds or thousands of EC2 instances concurrently.
- **Elasticity:** Grows and shrinks automatically as you add and remove files. No provisioning required.
- **Protocol:** Uses the NFSv4 protocol (Linux based). Not natively supported on Windows EC2 instances (use Amazon FSx for Windows instead).

## Exam Tips
- If an application running on **multiple EC2 instances across different AZs** needs to access the **same shared files simultaneously**, the answer is almost always **Amazon EFS**.
- Remember: EBS can only be mounted to ONE instance at a time (with some specific exceptions like io2 Multi-Attach, but EFS is the default answer for shared file systems).
