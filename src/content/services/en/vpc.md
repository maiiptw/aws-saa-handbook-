---
title: "Amazon VPC"
serviceName: "VPC"
category: "Networking"
description: "Virtual network dedicated to your AWS account. Logically isolated."
---

# Amazon Virtual Private Cloud (Amazon VPC)

Amazon VPC lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment.

## Key Components

- **Subnets:** A range of IP addresses in your VPC. Public subnets have access to the internet, while private subnets do not.
- **Internet Gateway (IGW):** Allows resources in a public subnet to connect to the internet.
- **NAT Gateway:** Allows resources in a private subnet to connect to the internet for updates, without allowing incoming internet traffic.
- **Route Tables:** A set of rules (routes) used to determine where network traffic from your subnet or gateway is directed.
- **Security Groups:** Act as a stateful virtual firewall for your EC2 instances.
- **Network ACLs:** Act as a stateless firewall at the subnet level.

## Exam Tips
- **Security Groups vs NACLs:** Security Groups are stateful (if request is allowed in, response is automatically allowed out). NACLs are stateless (rules must be explicitly defined for both inbound and outbound).
- **VPC Peering:** Connects two VPCs directly. It is NOT transitive. You cannot jump from VPC A to VPC B to VPC C.
- **VPC Endpoints (PrivateLink):** Allows you to securely connect your VPC to supported AWS services (like S3 or DynamoDB) using private IP addresses, completely bypassing the public internet.