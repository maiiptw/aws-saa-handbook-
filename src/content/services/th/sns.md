---
title: "Amazon SNS"
serviceName: "SNS"
category: "Other"
description: "บริการส่งข้อความแบบ Publish/Subscribe สำหรับแจ้งเตือนและเชื่อมต่อระบบ"
---

# Amazon Simple Notification Service (Amazon SNS)

Amazon SNS เป็นบริการส่งข้อความแบบจัดการเต็มรูปแบบที่ใช้โมเดล Publish/Subscribe (Pub/Sub) ใช้ได้ทั้งระบบคุยกับระบบ (A2A) และระบบส่งหาคน (A2P เช่น อีเมลหรือ SMS)

## คอนเซปต์หลัก
- **Topics & Subscriptions:** ผู้ส่ง (Publisher) จะส่งข้อความเข้าไปที่ "Topic" (ห้องกระจายเสียง) และผู้รับ (Subscriber) ทุกคนที่ติดตาม Topic นี้จะได้รับข้อความทันที
- **รูปแบบ Push:** ต่างจาก SQS ที่คนรับต้องเดินมา "ดึง (Pull)" ข้อมูลเอง SNS จะใช้วิธี "ผลัก (Push)" ข้อมูลไปให้ผู้รับทันที
- **ปลายทางที่รองรับ:** สามารถส่ง Push ไปหา Lambda, SQS, Webhook (HTTP), อีเมล, และ SMS

## ข้อควรรู้สำหรับสอบ (Exam Tips)
- **Fan-Out Pattern:** แพทเทิร์นยอดฮิตในข้อสอบ คือการใช้ SNS ร่วมกับ SQS โดยนำ SQS หลายๆ คิวไป Subscribe ตัว SNS Topic เมื่อมีข้อความ 1 ชิ้นยิงเข้า SNS มันจะกระจาย (Fan-out) ไปเข้า SQS ทุกคิวพร้อมๆ กัน ทำให้หลายระบบหลังบ้านทำงานขนานกันได้จากคำสั่งเดียว
