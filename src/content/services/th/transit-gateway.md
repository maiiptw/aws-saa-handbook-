---
title: "AWS Transit Gateway"
serviceName: "Transit Gateway"
category: "Networking"
description: "ศูนย์กลาง (Hub) สำหรับเชื่อมต่อ VPC หลายวงและเครือข่าย On-premises เข้าด้วยกัน"
---

# AWS Transit Gateway

AWS Transit Gateway ทำหน้าที่เป็นศูนย์กลาง (Central Hub) เพื่อเชื่อมต่อ Amazon VPC หลายๆ วงและเครือข่าย On-premises ของคุณเข้าด้วยกัน ช่วยลดความซับซ้อนของการเชื่อมต่อแบบโยงไปโยงมา (Point-to-point)

## ฟีเจอร์ที่สำคัญ
- **Hub and Spoke:** เปลี่ยนโครงสร้างแบบใยแมงมุมที่ยุ่งยากของการทำ VPC Peering ให้กลายเป็นโครงสร้างแบบดาว (Hub-and-spoke) ที่จัดการง่ายที่จุดเดียว
- **Transitive Routing:** แตกต่างจาก VPC Peering ตรงที่ Transit Gateway อนุญาตให้ส่งข้อมูลแบบทอดๆ ได้ (เช่น VPC A ส่งไป Hub แล้ว Hub ส่งต่อไป VPC C ให้ได้เลย)
- **การเชื่อมต่อ On-Premises:** สามารถรับการเชื่อมต่อจาก AWS Direct Connect และ Site-to-Site VPN เข้ามาที่ตัวมันเพื่อกระจายต่อให้ทุก VPC ได้ทันที

## ข้อควรรู้สำหรับสอบ (Exam Tips)
- หากโจทย์ระบุว่าต้องการเชื่อมต่อ **VPC จำนวนมาก (หลักสิบถึงร้อยวง)** หรือพูดถึงสถาปัตยกรรมแบบ **"Hub-and-spoke"** คำตอบที่ถูกต้องคือ **Transit Gateway** เสมอ
- เป็นบริการเดียวที่รองรับเครือข่ายแบบ IP Multicast บนคลาวด์
