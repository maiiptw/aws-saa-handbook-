---
title: "Load Balancing & Route 53"
moduleNumber: 5
description: "การกระจายโหลดในระดับ Layer 4/7 และระบบจัดการ DNS อัจฉริยะบน AWS"
tags: ["ALB", "NLB", "Route53", "DNS"]
lastUpdated: 2024-10-05
---

# Load Balancing & Route 53

## Elastic Load Balancing (ELB)
ELB ทำหน้าที่กระจายทราฟฟิกขาเข้าไปยัง Target ต่างๆ (เช่น EC2, ECS, Lambda, IP Addresses) เพื่อให้แอปพลิเคชันของคุณมีความทนทาน (Highly Available)

1. **Application Load Balancer (ALB)**:
   - ทำงานที่ **Layer 7** (HTTP/HTTPS)
   - เก่งเรื่องการทำ Routing อัจฉริยะ เช่น **Path-based routing** (`/images` ไปยัง Server A, `/video` ไปยัง Server B) หรือ **Host-based routing** (`api.example.com` vs `web.example.com`)
   - รองรับ Microservices และ Containers
2. **Network Load Balancer (NLB)**:
   - ทำงานที่ **Layer 4** (TCP/UDP/TLS)
   - เร็วมาก (Ultra-low latency) และรองรับโหลดระดับหลายล้าน Request ต่อวินาที
   - ให้ **Static IP** ต่อ Availability Zone แก่ Load Balancer ของคุณ (ALB ทำไม่ได้)
3. **Gateway Load Balancer (GWLB)**:
   - ทำงานที่ **Layer 3** (Network layer)
   - ใช้เพื่อทำ Routing ทราฟฟิกผ่านระบบ 3rd Party Firewall หรือ Intrusion Detection Systems (IDS)

---

## Amazon Route 53
Route 53 เป็นระบบ DNS ระดับ Global ของ AWS ที่มีความน่าเชื่อถือสูง 100% SLA

### Routing Policies (จุดที่ออกสอบเยอะมาก)
ทำความเข้าใจนโยบายการกระจายทราฟฟิกให้แม่นยำ:

* **Simple Routing**: ใช้ชี้โดเมนไปยัง IP เดียว หรือหลาย IP (แต่ Route 53 จะสุ่มคืน IP กลับไป และ *ไม่สามารถ* เช็ค Health check แบบแยกตัวได้ใน Simple)
* **Weighted Routing**: แบ่งทราฟฟิกตามเปอร์เซ็นต์ (เช่น ส่งไปเซิร์ฟเวอร์ A 80% และเซิร์ฟเวอร์ B 20%) เหมาะสำหรับการทดสอบ A/B Testing หรือการทำ Blue/Green Deployment
* **Latency-based Routing**: ส่งผู้ใช้งานไปยัง Region ที่ตอบสนองพวกเขาได้รวดเร็วที่สุด (มีความหน่วงน้อยที่สุด) เพื่อประสบการณ์ผู้ใช้ที่ดีขึ้น
* **Failover Routing**: ทำงานร่วมกับ Health Check หากเครื่องหลัก (Primary) ล่ม ระบบจะส่งผู้ใช้ไปยังเครื่องสำรอง (Secondary/Disaster Recovery) ทันที
* **Geolocation Routing**: ส่งผู้ใช้ไปยังเซิร์ฟเวอร์ตาม **ตำแหน่งที่ตั้ง/ประเทศของผู้ใช้งาน** (เช่น ผู้ใช้จากยุโรปให้เข้าเว็บเซิร์ฟเวอร์ที่ยุโรป เพื่อรองรับ GDPR)
* **Geoproximity Routing**: คล้าย Geolocation แต่ใช้คำนวณจากพิกัด (Lat/Long) และสามารถปรับขนาดรัศมี (Bias) ได้ (ต้องใช้ร่วมกับ Route 53 Traffic Flow)

### Alias vs CNAME
* **CNAME**: ชี้ Hostname ไปยัง Hostname อื่น (เช่น `blog.myweb.com` -> `myweb.com`) แต่ **ไม่สามารถ** ชี้ที่ Root Domain (Zone Apex) ได้ (เช่น ทำ `myweb.com` -> `myotherweb.com` ไม่ได้)
* **Alias Record**: เป็นฟีเจอร์เฉพาะของ AWS ใช้ชี้ไปยัง AWS Resource อื่นๆ (เช่น ALB, CloudFront, S3 Bucket) รองรับการชี้ที่ Root Domain และไม่มีค่าใช้จ่ายในการ Resolve
