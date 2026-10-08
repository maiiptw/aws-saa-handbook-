---
title: "Amazon API Gateway"
serviceName: "API Gateway"
category: "Networking"
description: "บริการจัดการ API ที่ช่วยให้การสร้างและดูแล API ปลอดภัยและรองรับสเกลขนาดใหญ่"
---

# Amazon API Gateway

Amazon API Gateway เป็นบริการที่มีการจัดการเต็มรูปแบบ (Fully Managed) ซึ่งช่วยให้นักพัฒนาสร้าง เผยแพร่ ดูแลรักษา ตรวจสอบ และรักษาความปลอดภัย API ได้ในทุกระดับการใช้งาน

## ฟีเจอร์ที่สำคัญ
- **Integration:** ทำงานร่วมกับ AWS Lambda เพื่อสร้างระบบแบบ Serverless ได้อย่างสมบูรณ์แบบ หรือจะใช้วางขวางหน้า EC2, ALB หรือเซิร์ฟเวอร์ On-premises ก็ได้
- **Throttling & Caching:** สามารถจำกัดโควต้า (Throttle) การเรียก API เพื่อป้องกันไม่ให้เซิร์ฟเวอร์หลังบ้านทำงานหนักเกินไป และสามารถเปิดแคช (Cache) เพื่อลดภาระโหลดและลด Latency
- **Security:** ตรวจสอบสิทธิ์ผู้ใช้งานได้หลายวิธี เช่น ใช้ AWS IAM, ตรวจสอบโทเคนจาก Amazon Cognito หรือเขียนโค้ดเช็คเองด้วย Lambda Authorizers

## ข้อควรรู้สำหรับสอบ (Exam Tips)
- **Throttling:** หากโจทย์ต้องการวิธีป้องกันแบคเอนด์เซิร์ฟเวอร์จากการถูกเรียกใช้งานหนักเกินไป (Traffic spikes) การเปิด Throttling ใน API Gateway คือทางแก้ปัญหาหลัก
- **CORS (Cross-Origin Resource Sharing):** หากโค้ด Frontend ของคุณ (ที่วางบน S3) พยายามเรียกใช้ API Gateway ซึ่งอยู่คนละโดเมนแล้วถูกเบราว์เซอร์บล็อก คุณจะต้องไปกด "Enable CORS" ใน API Gateway
