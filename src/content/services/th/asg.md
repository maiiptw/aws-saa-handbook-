---
title: "Auto Scaling Group (ASG)"
serviceName: "Auto Scaling Group"
category: "Compute"
description: "ปรับลดหรือเพิ่มจำนวน EC2 Instances อัตโนมัติตามปริมาณการใช้งาน"
---

# Amazon EC2 Auto Scaling

Amazon EC2 Auto Scaling ช่วยรักษาความพร้อมใช้งานของแอปพลิเคชัน โดยการเพิ่ม (Scale-out) หรือลด (Scale-in) จำนวนเครื่อง EC2 อัตโนมัติตามเงื่อนไขหรือการใช้งานจริง

## ฟีเจอร์ที่สำคัญ
- **Dynamic Scaling:** ปรับขนาดตามเมทริกซ์ที่กำหนด เช่น ยอดการใช้ CPU (มีทั้งแบบ Target Tracking, Step และ Simple)
- **Predictive Scaling:** ใช้ Machine Learning เพื่อทำนายล่วงหน้าว่าทราฟฟิกจะมาช่วงไหน แล้วเตรียมเปิดเครื่องรอไว้ก่อน
- **Health Checks:** ตรวจสอบสถานะเครื่อง หากพบเครื่องพัง (Unhealthy) จะทำการปิดทิ้ง (Terminate) แล้วสร้างเครื่องใหม่มาแทนที่อัตโนมัติ

## ข้อควรรู้สำหรับสอบ (Exam Tips)
- **Launch Template:** ต้องระบุเสมอ เพื่อบอกให้ ASG รู้ว่าเวลาจะสร้างเครื่องใหม่ ต้องใช้ OS (AMI) อะไร ขนาดเท่าไหร่ และ Security Group ไหน
- **Cooldown Period:** ช่วงเวลาพักเบรกหลังจากการปรับขนาด เพื่อป้องกันไม่ให้ระบบสร้างหรือลบเครื่องซ้ำซ้อนในขณะที่เครื่องเก่ายังบูตไม่เสร็จ
