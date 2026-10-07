---
title: "Amazon EC2"
serviceName: "EC2"
category: "Compute"
description: "เซิร์ฟเวอร์เสมือนบนคลาวด์ บริการประมวลผลหลักของ AWS"
---

# Amazon Elastic Compute Cloud (Amazon EC2)

Amazon Elastic Compute Cloud (Amazon EC2) ให้บริการความจุในการประมวลผลที่ปรับขนาดได้บนคลาวด์ของ AWS การใช้ Amazon EC2 ช่วยขจัดความจำเป็นในการลงทุนด้านฮาร์ดแวร์ล่วงหน้า ทำให้คุณสามารถพัฒนาและปรับใช้แอปพลิเคชันได้รวดเร็วขึ้น

## ฟีเจอร์ที่สำคัญ

- **เซิร์ฟเวอร์เสมือน (Virtual Servers):** สร้างและเปิดใช้งานเครื่องเสมือน (Instances) ได้ตามต้องการ
- **ประเภทอินสแตนซ์ (Instance Types):** เลือกประเภทอินสแตนซ์ที่หลากหลายเพื่อให้เหมาะกับรูปแบบการใช้งานต่างๆ (General Purpose, Compute Optimized, Memory Optimized ฯลฯ)
- **การปรับขนาดอัตโนมัติ (Auto Scaling):** เพิ่มหรือลดความจุของคุณโดยอัตโนมัติตามเงื่อนไขที่คุณกำหนด
- **รูปแบบราคา:** จ่ายตามที่ใช้ (On-Demand), ประหยัดด้วยการทำสัญญาระยะยาว (Savings Plans, Reserved Instances), หรือประมูลความจุที่เหลืออยู่ (Spot Instances)

## กรณีการใช้งานทั่วไป (Use Cases)

1. โฮสต์เว็บแอปพลิเคชันและเว็บไซต์
2. รันแอปพลิเคชันระดับองค์กร (เช่น SAP, Oracle)
3. การประมวลผลแบบแบทช์ (Batch processing) และการวิเคราะห์ข้อมูลขนาดใหญ่

## ข้อควรรู้สำหรับสอบ (Exam Tips)
- **Spot Instances:** เหมาะที่สุดสำหรับงานที่ยืดหยุ่นและทนต่อความล้มเหลวได้ (เช่น Batch processing) เพราะอาจถูกปิดกั้น (Interrupt) ได้โดยมีการแจ้งเตือนล่วงหน้าเพียง 2 นาที
- **Reserved Instances (RIs) vs Savings Plans:** RIs จะผูกมัดคุณไว้กับ Instance Family เฉพาะเจาะจง ในขณะที่ Compute Savings Plans ให้ส่วนลดระดับเดียวกันแต่ยืดหยุ่นกว่า (เปลี่ยน Family และ Region ได้)