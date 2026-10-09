---
title: "Auto Scaling Groups (ASG)"
description: "เพิ่มหรือลดจำนวน EC2 instances อัตโนมัติตามปริมาณการใช้งาน"
serviceName: "Amazon EC2 Auto Scaling"
category: "Compute"
---

Amazon EC2 Auto Scaling ช่วยให้คุณมั่นใจได้ว่ามีจำนวน Amazon EC2 instances ที่เหมาะสมและพร้อมใช้งานเพื่อรองรับโหลดของแอปพลิเคชันของคุณเสมอ โดยคุณจะสร้างกลุ่มของ EC2 instances ที่เรียกว่า **Auto Scaling Groups (ASGs)**

## องค์ประกอบหลัก

1. **Launch Template (หรือ Launch Configuration)**
   - กำหนด **WHAT** (อะไรที่จะถูกสร้างขึ้นมา)
   - ประกอบด้วย AMI ID, Instance Type, Key Pair, Security Groups และ IAM Roles
   - *หมายเหตุ:* แนะนำให้ใช้ Launch Templates แทน Launch Configurations แบบเก่า เนื่องจากรองรับการทำ Versioning และฟีเจอร์ใหม่ๆ ของ EC2 (เช่น Spot instances)

2. **Auto Scaling Group**
   - กำหนด **WHERE** และ **HOW MANY** (สร้างที่ไหนและจำนวนเท่าไหร่)
   - คุณต้องระบุ VPC และ Subnets ที่จะให้ EC2 ไปรันอยู่
   - กำหนดขอบเขตความจุ (Capacity Bounds):
     - **Minimum Capacity:** จุดต่ำสุด ASG จะไม่ลดจำนวนลงต่ำกว่านี้
     - **Desired Capacity:** จำนวนเป้าหมายปัจจุบันที่ต้องการให้ระบบรักษาไว้
     - **Maximum Capacity:** จุดสูงสุด ASG จะไม่สร้างเพิ่มเกินค่านี้เพื่อป้องกันค่าใช้จ่ายบานปลาย

3. **Scaling Policies**
   - กำหนด **WHEN** (จะเพิ่มหรือลดเมื่อไหร่)

## รูปแบบของ Scaling Policies

- **Target Tracking Scaling:** วิธีที่ง่ายและแนะนำที่สุด คุณเลือก Metric (เช่น รักษา CPU เฉลี่ยไว้ที่ 50%) แล้ว ASG จะเพิ่ม/ลดเครื่องให้อัตโนมัติเพื่อรักษาค่านั้นไว้
- **Step Scaling:** กำหนดขั้นบันไดตาม Alarm E.g., ถ้า CPU > 70% ให้เพิ่ม 2 เครื่อง, ถ้า CPU > 85% ให้เพิ่ม 4 เครื่อง เหมาะกับทราฟฟิกที่พุ่งปรี๊ด (Spiky) และต้องการการตอบสนองที่รุนแรง/รวดเร็ว
- **Simple Scaling:** คล้าย Step Scaling แต่ต้องมี **Cooldown period** คั่นระหว่างการสเกลแต่ละครั้ง มีความยืดหยุ่นน้อยกว่า Step Scaling
- **Scheduled Scaling:** สเกลตามเวลาที่กำหนดล่วงหน้า ใช้เมื่อรู้แพทเทิร์นทราฟฟิกชัดเจน (เช่น เพิ่มเครื่องทุกเช้าวันศุกร์ 8:00 น. เพื่อรองรับแคมเปญลดราคา)

## Health Checks & การแทนที่เครื่องเสีย

ASG จะทำลายเครื่องที่พังและสร้างใหม่ขึ้นมาแทนที่โดยอัตโนมัติ โดยอิงจาก Health Check สองประเภทหลัก:
- **EC2 Health Checks:** (ค่าเริ่มต้น) เช็คแค่ว่าสถานะของ EC2 instance คือ "running" หรือไม่
- **ELB (Elastic Load Balancer) Health Checks:** แนะนำอย่างยิ่งถ้า ASG ของคุณอยู่หลัง ALB/NLB หากแอปใน EC2 แครช (แม้เซิร์ฟเวอร์จะ "running") ELB จะมองว่า Unhealthy และส่งสัญญาณให้ ASG ทำลายเครื่องนั้นทิ้งและสร้างใหม่

## ข้อควรระวังในห้องสอบ (Exam Traps & Tips)
- **Cooldown Periods:** ป้องกันไม่ให้ ASG รีบสร้างหรือทำลายเครื่องรัวๆ ก่อนที่คำสั่งครั้งก่อนหน้าจะส่งผลเต็มที่ หากเจอโจทย์ที่เครื่องถูกสร้างรัวๆ เกิน Desired Capacity ให้ไปเช็ค Cooldown period
- **Termination Policy:** เวลาสเกลอิน (ลดเครื่อง) ค่าเริ่มต้นคือ ASG จะไปทำลายเครื่องใน Availability Zone ที่มีเครื่องเยอะที่สุดก่อน (เพื่อบาลานซ์ AZ) จากนั้นจะเลือกทำลายเครื่องที่ใช้ Launch configuration/template เก่าที่สุด
- **Lifecycle Hooks:** อนุญาตให้คุณ "หยุดชั่วคราว" จังหวะที่เครื่องกำลังสร้าง (Pending:Wait) เพื่อรันสคริปต์ติดตั้งซอฟต์แวร์ หรือหยุดตอนกำลังทำลาย (Terminating:Wait) เพื่อดูด Log หรือปิด Connection อย่างปลอดภัยก่อนเครื่องจะปลิว
