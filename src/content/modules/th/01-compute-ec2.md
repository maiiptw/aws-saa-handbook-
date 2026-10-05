---
title: "Compute: EC2 & Auto Scaling"
moduleNumber: 1
description: "เจาะลึก EC2 Instances, การคำนวณราคาแบบต่างๆ, และวิธีออกแบบ Auto Scaling Groups ให้ทนทาน"
tags: ["EC2", "ASG", "Compute"]
lastUpdated: 2024-10-05
---

# Compute: Amazon EC2 & Auto Scaling

Amazon Elastic Compute Cloud (Amazon EC2) เป็นบริการหัวใจสำคัญของ AWS ที่ให้เราเช่า Virtual Server บนคลาวด์ได้

## EC2 Pricing Models (จุดหลอกสอบบ่อยมาก)

การเลือก Pricing Model ให้ตรงกับ Workload คือสิ่งที่ข้อสอบ SAA เน้นมาก:

1. **On-Demand**:
   - *เหมาะสำหรับ*: งานระยะสั้น, คาดเดาโหลดไม่ได้, หรือเพิ่งเริ่มทดสอบแอปพลิเคชัน
   - *จุดเด่น*: ไม่ต้องทำสัญญาผูกมัด จ่ายตามวินาทีที่ใช้งานจริง (สำหรับ Linux)
2. **Reserved Instances (RI)**:
   - *เหมาะสำหรับ*: Workload ที่ใช้งานต่อเนื่องเป็นเวลานาน และรู้ปริมาณการใช้งานที่แน่นอน (Steady-state)
   - *จุดเด่น*: ลดราคาสูงสุดถึง 72% เมื่อเทียบกับ On-Demand (ทำสัญญา 1 ปี หรือ 3 ปี)
3. **Spot Instances**:
   - *เหมาะสำหรับ*: งานที่ถูกขัดจังหวะได้ (Fault-tolerant, Flexible), งานประมวลผล Big Data, Batch processing, CI/CD
   - *จุดเด่น*: ราคาถูกที่สุด (ลดสูงสุด 90%) แต่เครื่องอาจถูก AWS ดึงคืน (Reclaim) หากมีคนให้ราคาสูงกว่า หรือ AWS ต้องการ Capacity คืน
4. **Dedicated Hosts**:
   - *เหมาะสำหรับ*: การทำ Compliance ที่เข้มงวด, หรือมี License ซอฟต์แวร์ที่ผูกติดกับ Hardware (เช่น BYOL - Bring Your Own License)
   - *จุดเด่น*: ได้เครื่อง Physical Server มาใช้งานคนเดียวเลย (แพงที่สุด)

---

## EC2 Placement Groups
ใช้กำหนดการจัดวางเครื่อง EC2 ใน Data Center เพื่อให้ได้ประสิทธิภาพตามที่ต้องการ:
* **Cluster**: เครื่องอยู่ใกล้กันที่สุด (ใน AZ เดียวกัน) เพื่อ Latency ที่ต่ำที่สุด (เหมาะกับ High Performance Computing)
* **Spread**: กระจายเครื่องข้าม Hardware / Rack ให้มากที่สุด ลดความเสี่ยงกรณี Hardware พัง (เหมาะกับแอปที่ต้องการ High Availability สูงสุด)
* **Partition**: กระจายเครื่องเป็นกลุ่มๆ (Partitions) นิยมใช้กับระบบ Distributed Data (เช่น Hadoop, Cassandra, Kafka)

---

## Auto Scaling Groups (ASG)
ASG ช่วยให้แอปพลิเคชันของคุณสามารถรองรับโหลดที่เปลี่ยนแปลงได้ตลอดเวลา โดยการเพิ่มหรือลดจำนวน EC2 อัตโนมัติ

* **Scale-Out**: เพิ่มจำนวนเครื่อง (เช่น เมื่อ CPU > 70% หรือ Request Count ต่อเป้าหมายเกินกำหนด)
* **Scale-In**: ลดจำนวนเครื่องเมื่อโหลดน้อยลง เพื่อประหยัดค่าใช้จ่าย
* **Health Checks**: ASG สามารถตรวจสอบสถานะเครื่อง (EC2 Status Check หรือ ELB Health Check) ถ้าเจอเครื่องเสีย ASG จะ Terminate เครื่องนั้นและสร้างเครื่องใหม่มาแทนที่โดยอัตโนมัติ

### ⚠️ Exam Trap (จุดหลอกสอบ)
ถ้าข้อสอบบอกว่า "Database ทำงานช้าลงเมื่อคนเข้าเยอะ ควรทำอย่างไร?"
**อย่าตอบ** ว่าใช้ Auto Scaling Group เพิ่มจำนวน Database เพราะ ASG มักจะใช้กับฝั่ง Compute (Web/App Server) แบบ Stateless หากเป็น Database ควรเลือกใช้ Read Replicas หรืออัปเกรด Instance Type (Scale-up) แทน
