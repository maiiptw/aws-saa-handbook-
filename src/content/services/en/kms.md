---
title: "AWS KMS"
serviceName: "KMS"
category: "Security"
description: "Easily create and manage cryptographic keys."
---

# AWS Key Management Service (KMS)

AWS KMS makes it easy for you to create and manage cryptographic keys and control their use across a wide range of AWS services and in your applications.

## Key Features
- **Centralized Key Management:** Create, rotate, and disable Customer Master Keys (CMKs).
- **Integration:** Integrated tightly with services like EBS, S3, RDS, DynamoDB, to encrypt your data at rest seamlessly.
- **Envelope Encryption:** KMS primarily works by encrypting your data keys, not the raw data itself. The data key is then used to encrypt the large data payloads.

## Exam Tips
- **CloudHSM vs KMS:** KMS uses multi-tenant hardware security modules. If an enterprise requires a **dedicated, single-tenant Hardware Security Module (HSM)** that complies with FIPS 140-2 Level 3, the answer is **AWS CloudHSM**.
