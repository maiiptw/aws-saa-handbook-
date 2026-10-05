---
title: "Networking: VPC"
moduleNumber: 3
description: "การสร้างเครือข่ายส่วนตัวบน AWS (Virtual Private Cloud)"
tags: ["VPC", "Networking", "Subnet"]
lastUpdated: 2024-10-05
---

# Networking: VPC

Amazon Virtual Private Cloud (VPC) ช่วยให้คุณสร้างเครือข่ายจำลองบนคลาวด์ได้

## Key Components
* **Subnets**: แบ่งวง Network ภายใน VPC เป็น Public (ต่อ Internet Gateway) และ Private (ไม่มี IGW)
* **Internet Gateway (IGW)**: ประตูเชื่อมระหว่าง VPC กับ Internet
* **NAT Gateway / NAT Instance**: ให้ Private Subnet สามารถออก Internet ได้ (เช่น โหลดอัปเดต) แต่ข้างนอกเข้ามาไม่ได้
