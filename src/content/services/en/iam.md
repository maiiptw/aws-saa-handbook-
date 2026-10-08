---
title: "AWS IAM"
serviceName: "IAM"
category: "Security"
description: "Securely manage access to AWS services and resources."
---

# AWS Identity and Access Management (IAM)

AWS IAM enables you to manage access to AWS services and resources securely. You can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources.

## Key Components
- **Users:** Individuals or applications.
- **Groups:** A collection of IAM users. Permissions attached to a group apply to all users in it.
- **Roles:** An identity that you can assume to gain temporary security credentials. Often assigned to EC2 instances or Lambda functions.
- **Policies:** JSON documents that define permissions (Allow/Deny).

## Exam Tips
- **Roles for EC2:** Never store AWS Access Keys directly on an EC2 instance. Instead, assign an IAM Role to the EC2 instance so it can securely access other AWS services.
- **Least Privilege:** Always follow the principle of least privilege—granting only the permissions required to perform a task.
