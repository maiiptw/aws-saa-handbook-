---
title: "AWS SAA Module 6 - Security, Identity and Compliance"
moduleNumber: 6
description: "Implement robust security controls with IAM, KMS, WAF, Shield, GuardDuty, and Security Hub to protect AWS environments."
tags: ["IAM", "KMS", "WAF", "GuardDuty", "Security"]
lastUpdated: 2024-03-01
---

# Security, Identity, and Compliance

Security is the highest priority in AWS (Job Zero). The Shared Responsibility Model dictates that AWS is responsible for the security *of* the cloud, while the customer is responsible for security *in* the cloud.

## Identity and Access Management (IAM)
Manages access to AWS services and resources securely.
- **Users**: Individuals or applications needing access to AWS.
- **Groups**: Collections of IAM users (simplifies permission management).
- **Roles**: Identities with specific permissions, assumable by users, applications, or AWS services (e.g., granting an EC2 instance access to S3). **Never store long-term credentials on EC2 instances; always use Roles.**
- **Policies**: JSON documents attached to identities (identity-based) or resources (resource-based) defining allowed/denied actions.
- Principle of Least Privilege: Grant only the permissions required to perform a task.

## Data Protection and Encryption
- **AWS KMS (Key Management Service)**: Managed service for creating and controlling cryptographic keys used to encrypt data.
- **AWS CloudHSM**: Cloud-based hardware security module (HSM) for managing encryption keys, providing dedicated, single-tenant, FIPS 140-2 Level 3 validated hardware. (Customer has exclusive control over the keys, unlike KMS).
- **Amazon Macie**: Uses machine learning to discover, classify, and protect sensitive data (e.g., PII) stored in S3.

## Network and Application Security
- **AWS WAF (Web Application Firewall)**: Protects web applications against common web exploits (SQL injection, Cross-Site Scripting) that could affect availability, compromise security, or consume excessive resources.
- **AWS Shield**: Managed DDoS protection service. (Shield Standard is free; Shield Advanced provides enhanced protection for specific resources).
- **AWS Network Firewall**: Managed network firewall and intrusion detection/prevention service for VPCs.

## Threat Detection and Monitoring
- **Amazon GuardDuty**: Threat detection service that continuously monitors for malicious activity and unauthorized behavior (analyzes VPC Flow Logs, CloudTrail logs, DNS logs).
- **AWS Security Hub**: Provides a comprehensive view of your security state across AWS and helps check compliance against security industry standards and best practices.

## Exam Traps
- **IAM Roles vs Users**: Always choose IAM Roles for applications running on EC2 needing access to AWS services, never embed user credentials (access keys).
- **KMS vs CloudHSM**: If a question requires FIPS 140-2 Level 3 compliance or exclusive control over the hardware encryption module, choose CloudHSM.
- **WAF vs Network Firewall**: WAF is for Layer 7 (HTTP/HTTPS) web application protection. Network Firewall is for Layer 3/4 VPC-wide protection.
