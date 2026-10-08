---
title: "Amazon EBS"
serviceName: "EBS"
category: "Storage"
description: "พื้นที่จัดเก็บข้อมูลแบบบล็อก (Block Storage) ประสิทธิภาพสูงสำหรับ EC2"
---

# Amazon Elastic Block Store (Amazon EBS)

Amazon EBS ให้บริการพื้นที่จัดเก็บข้อมูลระดับบล็อก เปรียบเสมือนฮาร์ดดิสก์จำลอง (Virtual Hard Drive) ที่นำไปเสียบเข้ากับ EC2 Instance

## ประเภทของ Volume (Volume Types)
- **General Purpose SSD (gp2/gp3):** คุ้มค่าและสมดุลระหว่างราคาและประสิทธิภาพ เป็นตัวเลือกเริ่มต้นสำหรับงานทั่วไปและ Root OS
- **Provisioned IOPS SSD (io1/io2):** ประสิทธิภาพสูงสุด ออกแบบมาสำหรับฐานข้อมูลสำคัญที่ต้องการค่า IOPS สูงและนิ่งตลอดเวลา
- **Throughput Optimized HDD (st1):** ฮาร์ดดิสก์ราคาถูก เน้นการส่งถ่ายข้อมูลขนาดใหญ่ (Throughput) เช่น Big Data, Log processing (ไม่สามารถใช้บูต OS ได้)
- **Cold HDD (sc1):** ฮาร์ดดิสก์ราคาถูกที่สุด สำหรับเก็บข้อมูลไฟล์ที่นานๆ จะถูกเรียกใช้ที

## ข้อควรรู้สำหรับสอบ (Exam Tips)
- **ผูกติดกับ AZ (AZ Bound):** EBS 1 ลูกจะถูกล็อคให้อยู่ใน Availability Zone เดียวกับที่สร้างเท่านั้น หากต้องการย้ายไปต่อกับ EC2 ใน AZ อื่น คุณต้องสร้าง Snapshot แล้วค่อยไป Create Volume จาก Snapshot ใน AZ ใหม่
- **Snapshots:** การแบ็คอัป EBS ทำได้โดยการทำ Snapshot ซึ่งจะเป็นการแบ็คอัปแบบส่วนต่าง (Incremental) และไฟล์จะถูกนำไปเก็บไว้อย่างปลอดภัยใน Amazon S3
