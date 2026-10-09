---
title: "Auto Scaling Groups (ASG)"
description: "Automatically scale out/in EC2 instances to meet capacity and demand."
serviceName: "Amazon EC2 Auto Scaling"
category: "Compute"
---

Amazon EC2 Auto Scaling helps you ensure that you have the correct number of Amazon EC2 instances available to handle the load for your application. You create collections of EC2 instances, called **Auto Scaling Groups (ASGs)**.

## Core Components

1. **Launch Template (or Launch Configuration)**
   - Defines **WHAT** gets launched.
   - Includes the AMI ID, Instance Type, Key Pair, Security Groups, and IAM Roles.
   - *Note:* Launch Templates are the recommended approach over the older Launch Configurations as they support versioning and newer EC2 features (like spot instances).

2. **Auto Scaling Group**
   - Defines **WHERE** and **HOW MANY** instances to launch.
   - You specify the VPC and subnets to launch resources into.
   - You define the capacity bounds:
     - **Minimum Capacity:** The absolute floor. ASG will never go below this.
     - **Desired Capacity:** The current target number of instances.
     - **Maximum Capacity:** The absolute ceiling. ASG will never exceed this to protect against unbounded costs.

3. **Scaling Policies**
   - Defines **WHEN** to launch or terminate instances.

## Scaling Policies Explained

- **Target Tracking Scaling:** The easiest and most recommended policy. You choose a metric (like average CPU utilization at 50%) and ASG automatically adds or removes instances to keep the metric at that target.
- **Step Scaling:** You define steps based on alarm breaches. E.g., If CPU > 70%, add 2 instances. If CPU > 85%, add 4 instances. Better for spiky traffic where you need to react aggressively to sudden changes.
- **Simple Scaling:** Similar to Step Scaling but requires a **cooldown period** between scaling activities. Less flexible than Step Scaling.
- **Scheduled Scaling:** Predictive scaling based on time. Use this when you know traffic patterns in advance (e.g., scale out at 8 AM on Friday for a massive sale).

## Health Checks & Replacement

ASG automatically replaces unhealthy instances. It uses two main types of health checks:
- **EC2 Health Checks:** Default. Simply checks if the EC2 instance is in a "running" state.
- **ELB (Elastic Load Balancer) Health Checks:** Highly recommended when placing an ASG behind an ALB/NLB. If the application on the EC2 instance crashes (but the server is still "running"), the ELB marks it as unhealthy. ASG will then terminate the instance and launch a fresh one.

## Exam Traps & Tips
- **Cooldown Periods:** Prevent the ASG from launching or terminating additional instances before the previous scaling activity takes effect. If instances are launching too fast and exceeding desired capacity, check the cooldown period.
- **Termination Policy:** When scaling in (terminating), ASG by default destroys instances in the Availability Zone with the most instances to balance across AZs. It then chooses the instance with the oldest launch configuration/template.
- **Lifecycle Hooks:** Allows you to pause instances as they launch (Pending:Wait) to perform custom software configuration, or as they terminate (Terminating:Wait) to gracefully drain connections or extract logs before the instance is destroyed.
