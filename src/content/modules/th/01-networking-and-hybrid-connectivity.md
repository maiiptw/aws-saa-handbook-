---
title: "AWS SAA บทที่ 1 - เครือข่ายและการเชื่อมต่อแบบผสม (Networking & Hybrid Connectivity)"
moduleNumber: 1
description: "ทำความเข้าใจ Amazon VPC, Subnets, Route Tables, NAT Gateways, Transit Gateway, Direct Connect และ VPN สำหรับสร้างระบบเครือข่าย AWS"
tags: ["VPC", "Networking", "Direct Connect", "Transit Gateway", "VPN"]
lastUpdated: 2024-03-01
---

# เครือข่ายและการเชื่อมต่อแบบผสม (Networking and Hybrid Connectivity)

ระบบเครือข่ายเป็นพื้นฐานสำคัญของการติดตั้งระบบบน AWS ในบทนี้ เราจะเรียนรู้แนวคิดหลักของ Amazon Virtual Private Cloud (VPC), ความปลอดภัยของเครือข่าย, การจัดเส้นทาง (routing) และระบบการเชื่อมต่อแบบผสมที่เชื่อม Data Center ในองค์กรกับ AWS

## พื้นฐาน Amazon VPC

Amazon VPC ช่วยให้คุณสามารถสร้างเครือข่ายเสมือน (Virtual Network) ที่แยกส่วนอย่างเป็นอิสระบน AWS Cloud ซึ่งคุณสามารถกำหนดค่าต่างๆ และใช้งานทรัพยากรของ AWS ภายในเครือข่ายนั้นได้

### VPC Peering vs Transit Gateway
- **VPC Peering**: เชื่อมต่อ 2 VPC เข้าด้วยกันโดยตรงผ่านเครือข่ายส่วนตัวของ AWS โดยไม่มีคุณสมบัติ Transitive (ถ้า VPC A เชื่อมกับ B, และ B เชื่อมกับ C, A จะไม่สามารถคุยกับ C ได้โดยอัตโนมัติ)
- **AWS Transit Gateway (TGW)**: ศูนย์กลางเครือข่าย (แบบ Hub-and-Spoke) ที่สามารถเชื่อมต่อ VPC นับพันแห่งและเครือข่าย On-premises เข้าด้วยกัน แก้ปัญหาสายใยแมงมุม (Complex Mesh) ของ VPC Peering ได้

### VPC Endpoints (Gateway vs Interface)
VPC Endpoints อนุญาตให้เชื่อมต่อแบบส่วนตัว (Private) จาก VPC ของคุณไปยังบริการต่างๆ ของ AWS โดยไม่ต้องออกอินเทอร์เน็ตผ่าน Internet Gateway หรือ NAT Gateway
- **Gateway Endpoints**: ใช้งานฟรี (ไม่มีค่าใช้จ่ายรายชั่วโมง) โดยจะถูกนำไปวางไว้ใน Route Table ปัจจุบันรองรับเพียง **Amazon S3** และ **DynamoDB** เท่านั้น
- **Interface Endpoints (AWS PrivateLink)**: มีค่าใช้จ่ายรายชั่วโมงและค่าประมวลผลข้อมูล จะสร้าง Elastic Network Interface (ENI) ขึ้นมาใน Subnet ของคุณพร้อม Private IP รองรับบริการจำนวนมาก (เช่น SNS, SQS, Kinesis, EC2 API)

### Subnets
- **Public Subnet**: ซับเน็ตที่มี Route table ชี้การรับส่งข้อมูลไปยัง Internet Gateway (IGW)
- **Private Subnet**: ซับเน็ตที่ไม่มีเส้นทางออกไปยัง IGW ทำให้อินสแตนซ์ที่อยู่ภายในไม่สามารถเข้าถึงได้โดยตรงจากอินเทอร์เน็ตสาธารณะ

### Route Tables
ตารางจัดเส้นทางประกอบด้วยชุดของกฎ (routes) ที่กำหนดทิศทางการรับส่งข้อมูลเครือข่ายจากซับเน็ตหรือเกตเวย์
- กฎ `local` อนุญาตให้อินสแตนซ์ภายใน VPC เดียวกันสามารถสื่อสารกันได้

### Internet Gateway (IGW) และ NAT Gateway
- **IGW**: ส่วนประกอบของ VPC ที่ขยายขนาดได้ตามแนวนอน มีความพร้อมใช้งานสูง และช่วยให้อินสแตนซ์ใน VPC สื่อสารกับอินเทอร์เน็ตได้
- **NAT Gateway**: ช่วยให้อินสแตนซ์ใน Private Subnet เชื่อมต่อกับอินเทอร์เน็ตหรือบริการอื่นๆ ของ AWS ได้ แต่ป้องกันไม่ให้อินเทอร์เน็ตเริ่มต้นการเชื่อมต่อเข้ามาหาอินสแตนซ์เหล่านั้น

## ความปลอดภัยของเครือข่าย

### Security Groups (SGs)
- ทำหน้าที่เป็นไฟร์วอลล์ระดับ **Instance**
- เป็นแบบ **Stateful**: หากส่งคำขอออกจากอินสแตนซ์ การรับส่งข้อมูลตอบกลับสำหรับคำขอนั้นจะได้รับอนุญาตให้เข้ามาได้เสมอ โดยไม่คำนึงถึงกฎขาเข้า (inbound rules) ของ Security Group
- ค่าเริ่มต้น: ปฏิเสธ (Deny) การรับส่งข้อมูลขาเข้าทั้งหมด, อนุญาต (Allow) ขาออกทั้งหมด

### Network ACLs (NACLs)
- ทำหน้าที่เป็นไฟร์วอลล์ระดับ **Subnet**
- เป็นแบบ **Stateless**: การรับส่งข้อมูลตอบกลับต้องได้รับอนุญาตอย่างชัดเจนในกฎด้วย
- รองรับทั้งกฎแบบ Allow (อนุญาต) และ Deny (ปฏิเสธ)

## เครือข่ายขอบ (Edge) & การส่งมอบเนื้อหา (Content Delivery)

### Amazon CloudFront vs AWS Global Accelerator
- **Amazon CloudFront**: เป็น Content Delivery Network (CDN) ที่ใช้แคชข้อมูล (ทั้ง Static และ Dynamic) ไว้ที่ Edge Locations เพื่อส่งมอบเนื้อหาให้ผู้ใช้ได้เร็วขึ้น แต่จะใช้อินเทอร์เน็ตสาธารณะในช่วงสุดท้าย (Last mile)
- **AWS Global Accelerator**: กำหนดเส้นทางทราฟฟิกไปยัง Endpoint ระดับภูมิภาคที่เหมาะสมที่สุดผ่านเครือข่ายแกนกลาง (Global Network) ของ AWS บริการนี้ **ไม่ทำ Cache ข้อมูล** แต่ให้ IP แบบ Static Anycast 2 ไอพี และช่วยเพิ่มประสิทธิภาพสำหรับทราฟฟิกแบบ UDP/TCP อย่างมาก (เช่น เกม, IoT)

## การเชื่อมต่อแบบผสม (Hybrid Connectivity)

เมื่อต้องขยายเครือข่ายภายในองค์กรไปที่ AWS จะมีหลายทางเลือกดังนี้:

### AWS Site-to-Site VPN
สร้างการเชื่อมต่อที่ปลอดภัยระหว่าง Data center หรือสำนักงานสาขากับทรัพยากร AWS
- ใช้ช่องสัญญาณ IPsec (IPsec tunnels) ผ่านอินเทอร์เน็ตสาธารณะ
- ตั้งค่าได้รวดเร็ว แต่แบนด์วิดท์และความหน่วงอาจผันผวนตามประสิทธิภาพของอินเทอร์เน็ต

### AWS Direct Connect (DX)
สร้างการเชื่อมต่อเครือข่ายเฉพาะ (Dedicated network connection) จากองค์กรไปที่ AWS
- ไม่ผ่านอินเทอร์เน็ตสาธารณะ
- ให้ประสบการณ์เครือข่ายที่คงที่และมีแบนด์วิดท์สูงกว่า (สูงสุด 100 Gbps)

### AWS Transit Gateway (TGW)
ศูนย์กลางการถ่ายโอนเครือข่ายที่ใช้เชื่อมต่อ VPC และเครือข่ายองค์กรหลายๆ แห่งเข้าด้วยกัน
- ทำให้โครงสร้างสถาปัตยกรรมเครือข่ายง่ายขึ้นโดยใช้รูปแบบ Hub-and-Spoke
- รองรับการเชื่อมต่อข้าม Region (Cross-region peering)

## จุดหลอกข้อสอบ (Exam Traps)
- **NAT Gateway vs NAT Instance**: ควรเลือก NAT Gateway เสมอเพื่อให้ได้ความพร้อมใช้งานสูง (HA) และมีการจัดการขยายขนาดโดยอัตโนมัติ
- **VPC Peering vs Transit Gateway**: หากต้องเชื่อมต่อ VPC จำนวนมาก แนะนำให้ใช้ Transit Gateway เพื่อหลีกเลี่ยงการกำหนดเส้นทางแบบ Peer-to-Peer ที่ซับซ้อน (Mesh)
- **เวลาในการติดตั้ง Direct Connect**: Direct Connect ใช้เวลาในการติดตั้งทางกายภาพหลายสัปดาห์ ควรใช้ Site-to-Site VPN เป็นทางออกชั่วคราวไปก่อน
