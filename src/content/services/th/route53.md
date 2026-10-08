---
title: "Amazon Route 53"
serviceName: "Route 53"
category: "Networking"
description: "บริการจัดการ Domain Name System (DNS) บนคลาวด์ที่มีความพร้อมใช้งานสูง"
---

# Amazon Route 53

Amazon Route 53 เป็นบริการจัดการ Domain Name System (DNS) บนคลาวด์ที่ปรับขนาดได้และมีความน่าเชื่อถือสูง ใช้เพื่อแปลงชื่อโดเมน (เช่น www.example.com) เป็น IP Address และนำทางผู้ใช้งานไปยังแอปพลิเคชัน

## Routing Policies ที่สำคัญ
- **Simple Routing:** จับคู่โดเมนกับ IP ทั่วไป (ไม่มี Health check)
- **Weighted Routing:** แบ่งทราฟฟิกตามสัดส่วนที่กำหนด (เช่น ไปเซิร์ฟเวอร์ A 80%, ไป B 20%) เหมาะมากสำหรับทำ A/B Testing หรือทยอยอัปเดตเวอร์ชันใหม่
- **Latency-based Routing:** นำทางผู้ใช้ไปยัง Region ที่มีความหน่วง (Latency) ต่ำที่สุดสำหรับผู้ใช้นั้นๆ
- **Failover Routing:** นำทางไปยังเครื่องหลัก (Primary) ตลอดเวลา หาก Health check ตรวจพบว่าเครื่องหลักพัง จะสลับไปเครื่องสำรอง (Secondary/Standby) ให้ทันทีแบบ Active-Passive
- **Geolocation:** นำทางตาม "ตำแหน่งที่ตั้ง (ประเทศ/ทวีป)" ของผู้ใช้งาน

## ข้อควรรู้สำหรับสอบ (Exam Tips)
- **Alias Records:** หากต้องการชี้โดเมนหลัก (Root domain เช่น example.com) ไปที่ Load Balancer (ALB) หรือ CloudFront ต้องเลือกใช้ **Alias Record** เสมอ ห้ามใช้ CNAME (และ Alias record ค้นหาได้ฟรี ไม่เสียเงิน)
