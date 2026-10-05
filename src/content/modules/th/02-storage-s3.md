---
title: "Storage: S3 & EBS"
moduleNumber: 2
description: "ทำความเข้าใจความต่างระหว่าง Block Storage (EBS) และ Object Storage (S3) รวมถึงการเลือก Storage Class"
tags: ["S3", "EBS", "EFS"]
lastUpdated: 2024-10-05
---

# Storage: Amazon S3 & EBS

## Amazon S3 (Simple Storage Service)
S3 คือ Object Storage ที่ได้รับความนิยมมากที่สุดในโลก มีความคงทนของข้อมูล (Durability) สูงถึง 11 9s (99.999999999%) ซึ่งหมายความว่าถ้าคุณเก็บไฟล์ 10 ล้านไฟล์ มีโอกาสที่ไฟล์จะหายเพียง 1 ไฟล์ในรอบหมื่นปี

### S3 Storage Classes (ออกสอบแน่นอน)
การเลือก Storage Class ให้เหมาะสมกับรูปแบบการเข้าถึง (Access Pattern) จะช่วยประหยัดเงินได้มหาศาล:

* **S3 Standard**: ใช้งานทั่วไป เข้าถึงข้อมูลบ่อย (Frequent access) ดึงข้อมูลได้ทันที จ่ายค่าเก็บแพงสุดแต่ค่าดึงข้อมูลถูก
* **S3 Standard-IA (Infrequent Access)**: สำหรับข้อมูลที่ไม่ได้ใช้บ่อย แต่ถ้าต้องใช้ ต้องดึงมาได้ทันที (ระดับ Millisecond) ค่าเก็บถูกลง แต่จะคิดเงินแพงขึ้นตอนสั่ง "ดึงข้อมูล"
* **S3 One Zone-IA**: เหมือน IA แต่เก็บแค่ AZ เดียว (ราคาถูกลง 20%) เหมาะกับข้อมูลที่สร้างใหม่ได้ถ้าสูญหาย หรือใช้เป็น Secondary backup
* **S3 Glacier Flexible Retrieval**: สำหรับเก็บถาวร (Archive) รอข้อมูลได้ 1-5 นาที ถึง 12 ชั่วโมง ค่าเก็บถูกมาก
* **S3 Glacier Deep Archive**: ถูกที่สุดใน S3 เหมาะสำหรับข้อมูลตามกฎหมายที่ต้องเก็บไว้หลายๆ ปี แต่แทบไม่เคยเปิดดู รอข้อมูลนานกว่า 12 ชั่วโมง

### S3 Security
* **Bucket Policies**: ควบคุมสิทธิ์ระดับ Bucket (เป็นไฟล์ JSON) เช่น บังคับให้ต้องเข้ารหัสข้อมูลก่อนอัปโหลด
* **S3 Versioning**: เปิดเพื่อกันการลบหรือเขียนทับข้อมูลโดยไม่ตั้งใจ (ถ้าเปิดแล้วจะปิดไม่ได้ ทำได้แค่ Suspend)

---

## Amazon EBS (Elastic Block Store)
เป็น Network Drive (Block Storage) ที่นำมาเสียบเข้ากับ EC2 Instance เพื่อลง OS หรือเก็บ Database

* **ผูกติดกับ 1 Availability Zone (AZ) เสมอ** ไม่สามารถนำ EBS จาก AZ-A ไปเสียบกับ EC2 ใน AZ-B ได้ทันที (ต้องทำ Snapshot แล้ว Restore ใน AZ-B)
* **Delete on Termination**: โดย Default รูทไดรฟ์ (Root volume) จะถูกลบทิ้งเมื่อปิด EC2 Instance

### ประเภทของ EBS
* **gp2 / gp3 (General Purpose SSD)**: สมดุลระหว่างราคากับประสิทธิภาพ ใช้เป็น Root volume ทั่วไป
* **io1 / io2 (Provisioned IOPS SSD)**: สำหรับ Database ขนาดใหญ่ที่ต้องการ IOPS สูงมากและสม่ำเสมอ (> 16,000 IOPS)
* **st1 (Throughput Optimized HDD)**: เน้นแบนด์วิดท์สูง สำหรับ Big Data, Data Warehouses
* **sc1 (Cold HDD)**: ถูกที่สุด สำหรับไฟล์ Log ขนาดใหญ่ที่ไม่ค่อยถูกเรียกใช้

---

## Amazon EFS (Elastic File System)
* เป็น Network File System (NFS) แบบแชร์กันใช้ (Shared Storage)
* สามารถเชื่อมต่อ EC2 **หลายร้อยเครื่องพร้อมกันได้**
* ทำงานข้าม AZ ภายใน VPC เดียวกันได้ (ต่างจาก EBS ที่ผูกติดแค่ AZ เดียว)
