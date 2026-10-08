---
title: "Auto Scaling Group (ASG)"
serviceName: "Auto Scaling Group"
category: "Compute"
description: "Automatically adjusts the number of EC2 instances to meet application demand."
---

# Amazon EC2 Auto Scaling

Amazon EC2 Auto Scaling helps you maintain application availability and allows you to automatically add or remove EC2 instances according to conditions you define.

## Key Features
- **Dynamic Scaling:** Adds or removes instances based on metrics like CPU utilization (Target Tracking, Step, or Simple scaling).
- **Predictive Scaling:** Uses Machine Learning to predict traffic patterns and proactively scale ahead of time.
- **Health Checks:** Automatically terminates unhealthy instances and launches new ones to replace them.

## Exam Tips
- **Launch Template:** You must specify a Launch Template (or legacy Launch Configuration) which defines the AMI, Instance Type, Security Group, etc., for the new instances.
- **Cooldown Period:** Prevents the ASG from launching or terminating additional instances before the previous scaling activity takes effect.
