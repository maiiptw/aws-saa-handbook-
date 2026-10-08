---
title: "Amazon CloudFront"
serviceName: "CloudFront"
category: "Networking"
description: "บริการ Content Delivery Network (CDN) เพื่อการส่งมอบคอนเทนต์ที่รวดเร็วและปลอดภัยทั่วโลก"
---

# Amazon CloudFront

Amazon CloudFront เป็นบริการเครือข่ายจัดส่งข้อมูล (CDN) ที่รวดเร็ว ซึ่งทำหน้าที่ส่งมอบข้อมูล วิดีโอ แอปพลิเคชัน และ API ไปยังลูกค้าทั่วโลกด้วยความหน่วง (Latency) ต่ำและคล่องตัว

## ฟีเจอร์ที่สำคัญ
- **Edge Locations:** แคช (Cache) คอนเทนต์ไว้ที่เซิร์ฟเวอร์ปลายทางทั่วโลก เพื่อเสิร์ฟข้อมูลให้ผู้ใช้จากจุดที่ใกล้ที่สุด
- **Security:** ทำงานร่วมกับ AWS WAF (ป้องกันการโจมตีเว็บ) และ AWS Shield (ป้องกัน DDoS) ได้โดยตรง
- **Origins (ต้นทางข้อมูล):** รองรับต้นทางข้อมูลได้หลากหลาย เช่น S3 bucket, EC2, ALB หรือเซิร์ฟเวอร์ของคุณเองที่ไม่ได้อยู่บน AWS

## ข้อควรรู้สำหรับสอบ (Exam Tips)
- **OAC/OAI:** หากต้องการบังคับให้คนเข้ามาดูไฟล์ผ่าน CloudFront เท่านั้น (ห้ามเข้าตรงๆ ผ่าน S3 URL) ต้องเปิดใช้ Origin Access Control (OAC) และตั้งค่า S3 Bucket Policy ให้อนุญาตเฉพาะ CloudFront
- **Cache Invalidation:** หากคุณอัปเดตไฟล์ต้นฉบับใหม่ แต่หน้าเว็บยังแสดงไฟล์เก่าอยู่ แปลว่าไฟล์เก่ายังติดแคช คุณต้องสั่ง Invalidate Cache ใน CloudFront เพื่อบังคับให้ลบแคชทิ้ง
