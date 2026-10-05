# Module 2: Compute, Scaling & Elastic Load Balancing

หัวใจสำคัญของการออกแบบระบบบน AWS คือการเลือกระบบประมวลผล (Compute) ให้เหมาะกับลักษณะงาน โดยต้องรักษาสมดุลระหว่าง **ประสิทธิภาพ (Performance), ความยืดหยุ่น (Elasticity), และต้นทุน (Cost Optimization)** 

---

## 1. Amazon EC2: Purchasing Options & Sizing

ข้อสอบ SAA จะทดสอบความสามารถในการเลือก Pricing Model ให้ตรงกับ Requirement ด้านงบประมาณและความต่อเนื่องของระบบ

### ตารางเปรียบเทียบ EC2 Pricing Models

| โมเดลการซื้อ | ความต่อเนื่องของ Workload | สัญญาผูกมัด | ส่วนลดสูงสุด | Use Cases ที่ตรงกับโจทย์ข้อสอบ |
|---|---|---|---|---|
| **On-Demand** | สั้น, คาดเดาไม่ได้, ห้ามถูกขัดจังหวะ | ไม่มี | ราคาเต็ม (Baseline) | แอประยะเริ่มต้น, Dev/Test, งานที่เพิ่งเปิดตัวยังไม่รู้โหลด |
| **Spot Instances** | ยืดหยุ่น ทนต่อการหยุดทำงานได้ (Fault-tolerant) | ไม่มี (อาจถูก Terminate โดยมีแจ้งเตือนล่วงหน้า 2 นาที) | สูงสุด **90%** | Batch processing, Big data, Rendering, งานจำลองสถิติ ห้ามใช้กับ Database |
| **Reserved Instances (RI)** | สม่ำเสมอ คาดเดาได้ ทำงานต่อเนื่อง | 1 หรือ 3 ปี (All/Partial/No Upfront) | สูงสุด **72%** | **Standard:** เปลี่ยนแปลงสเปกไม่ได้ (ลดเยอะสุด)<br>**Convertible:** เปลี่ยนตระกูล Instance ได้ (ส่วนลดสูงสุด 54%) |
| **Savings Plans** | ใช้ต่อเนื่อง วัดตามการใช้งานขั้นต่ำ ($/hr) | 1 หรือ 3 ปี | สูงสุด **72%** | **Compute Savings Plans:** ยืดหยุ่นสูงสุด ข้าม EC2, Fargate, และ Lambda ได้ |
| **Dedicated Hosts** | ผูกขาดระดับ Physical Server | 1 หรือ 3 ปี | ต้นทุนสูงสุด | กฎหมายกำหนด (Compliance/Regulatory), ใช้ License ซอฟต์แวร์เดิม (BYOL) |

---

## 2. EC2 Placement Groups (กลยุทธ์การจัดวางเครื่อง)

Placement Groups ใช้ควบคุมตำแหน่งทางกายภาพของ EC2 บนโครงข่ายฮาร์ดแวร์จริงของ AWS:

```
[ Cluster ]                  [ Spread ]                   [ Partition ]
┌─────────────────┐          ┌──────┐ ┌──────┐ ┌──────┐   ┌─────────┐ ┌─────────┐
│ EC2  EC2  EC2   │          │ Rack │ │ Rack │ │ Rack │   │Partition│ │Partition│
│ (Same Hardware) │          │ EC2  │ │ EC2  │ │ EC2  │   │[EC2][EC2│ │[EC2][EC2│
└─────────────────┘          └──────┘ └──────┘ └──────┘   └─────────┘ └─────────┘
 Low Latency, 10Gbps+          Max 7 Instances / AZ        HDFS, Cassandra, Kafka
```

| ประเภท Group | พฤติกรรมการวางฮาร์ดแวร์ | ข้อจำกัดและลักษณะเฉพาะ | Use Cases หลัก |
|---|---|---|---|
| **Cluster** | รวมทุก Instance ไว้ใน **Rack เดียวกัน ภายใน AZ เดียวกัน** | หากฮาร์ดแวร์ล่ม ทุกเครื่องล่มพร้อมกัน ข้าม AZ ไม่ได้ | High Performance Computing (HPC), Big Data ที่ต้องการ Network Latency ต่ำสุด |
| **Spread** | กระจายเครื่องแยก **Rack และ Power Source คนละจุดกันเด็ดขาด** | สูงสุด **7 Instances ต่อ 1 AZ** ต่อ 1 Placement Group | Workload ขนาดเล็กที่ต้องการ High Availability สูงสุด เช่น Critical DB nodes |
| **Partition** | แบ่ง Rack ออกเป็นกลุ่ม (Partitions) ไม่ใช้อุปกรณ์ร่วมกัน | แต่ละ Partition มีได้หลาย Instances รองรับการขยายตัว | Distributed Data เช่น Hadoop HDFS, Apache Cassandra, Apache Kafka |

---

## 3. Elastic Load Balancing (ELB) Architecture

AWS ให้บริการ Load Balancer 3 ประเภทหลักในข้อสอบ โดยทำงานที่ Layer ต่างกันใน OSI Model:

```
                     ┌─── Application Load Balancer (ALB) ──> Layer 7 (HTTP/HTTPS, Host/Path routing)
                     │
[ Ingress Traffic ] ─┼─── Network Load Balancer (NLB) ──────> Layer 4 (TCP/UDP, Ultra-low Latency, Static IP)
                     │
                     └─── Gateway Load Balancer (GWLB) ─────> Layer 3/4 (Inline Third-party Security Appliances)
```

### การเปรียบเทียบเชิงลึกสำหรับการตัดสินใจในสถาปัตยกรรม

| คุณสมบัติ | Application Load Balancer (ALB) | Network Load Balancer (NLB) | Gateway Load Balancer (GWLB) |
|---|---|---|---|
| **OSI Layer** | **Layer 7** (Application) | **Layer 4** (Transport) | **Layer 3 Gateway + Layer 4 Encap** |
| **โปรโตคอล** | HTTP, HTTPS, gRPC | TCP, UDP, TLS | GENEVE protocol (Port 6081) |
| **IP Addressing** | IP เปลี่ยนแปลงตลอดเวลา (ต้องอ้างอิงผ่าน **DNS Name**) | มี **Static IP** หรือผูก **Elastic IP** ต่อ AZ ได้ | ทำงานระดับ Transparent bump-in-the-wire |
| **Routing Features** | Content-based: Hostname, URL Path, Query string, HTTP Headers | ส่งต่อไปยัง Target Group ตาม Port/IP โดยตรง | กระจาย Traffic ให้กลุ่ม Firewall Appliance ตรวจสอบ |
| **ความเร็ว & Throughput** | Latency หลัก Milliseconds (ปกติ) | **Ultra-low latency (Microseconds)**, รับทราฟฟิกหลักล้าน RPS | ออกแบบมาเฉพาะสำหรับ Network Virtual Appliances |
| **SSL/TLS Termination** | รองรับ (ผูกหลายใบรับรองผ่าน **SNI**) | รองรับ High-performance TLS offloading | ส่ง Pass-through ให้ Appliance ตรวจสอบ |

> **Sticky Sessions (Target Cookie):** 
> * หากต้องการให้ User เดิมวิ่งไปหา EC2 Instance เดิมเสมอ ต้องเปิดฟีเจอร์ Sticky Session บน Target Group ของ ALB
> * แนะนำให้หลีกเลี่ยงหากแอปพลิเคชันสามารถทำ Stateless Session ผ่าน Redis/ElastiCache ได้

---

## 4. Auto Scaling Groups (ASG) & Elastic Policies

Auto Scaling ช่วยให้ระบบปรับขนาดอัตโนมัติตาม Workload เพื่อรักษา Availability และคุมต้นทุน

### 4.1 Scaling Policies 4 รูปแบบ
1. **Target Tracking Scaling:** ตั้งค่า Metric เป้าหมายที่ต้องการคุม เช่น *"รักษา CPU Utilization เฉลี่ยรวมของทั้ง Group ไว้ที่ 50%"* (เป็นตัวเลือกมาตรฐานที่ AWS แนะนำมากที่สุด)
2. **Simple / Step Scaling:** ปรับเครื่องตามขั้นบันไดเมื่อ CloudWatch Alarm ดัง เช่น *หาก CPU > 70% เพิ่ม 2 เครื่อง, หาก CPU > 85% เพิ่ม 4 เครื่อง*
3. **Scheduled Scaling:** เพิ่ม/ลดขนาดตามเวลาที่ทราบล่วงหน้า เช่น *เพิ่มเครื่องรอไว้ทุกวันศุกร์เวลา 18:00 น. เพื่อรองรับยอดซื้อของช่วงสุดสัปดาห์*
4. **Predictive Scaling:** ใช้ Machine Learning พยากรณ์รูปแบบ Traffic ล่วงหน้า 24 ชั่วโมง และเตรียมเครื่องล่วงหน้าอัตโนมัติ

### 4.2 กลไกสำคัญที่ควรรู้
* **Cooldown Period:** ช่วงเวลารอคอย (Default 300 วินาที) หลังจากการ Scale ครั้งก่อนหน้าเสร็จสิ้น เพื่อป้องกันไม่ให้ ASG สั่งสร้างหรือลบเครื่องซ้ำซ้อนก่อนที่ระบบจะเห็นผลของ Metric จริง
* **Lifecycle Hooks:** หยุดสถานะของ Instance ชั่วคราวก่อนที่จะขึ้นสู่ Production (`Pending:Wait`) หรือก่อนที่จะถูกลบ (`Terminating:Wait`) เพื่อให้รันสคริปต์โหลดไฟล์, ส่ง Logs, หรือทำ Process ดึงข้อมูลออกก่อนดับเครื่อง
* **Termination Policy:** ลำดับการเลือกเครื่องที่จะถูกลบออก:
  1. เลือก AZ ที่มี Instance มากที่สุดก่อน
  2. เลือก Instance ที่ใช้ Launch Configuration / Template เก่าที่สุด
  3. เลือก Instance ที่ใกล้จะครบรอบชั่วโมงการคิดเงินถัดไป

---

## 5. Serverless & Containers: Lambda, ECS และ Fargate

เมื่อต้องการลดภาระการดูแลระบบปฏิบัติการ (No OS Management):

### 5.1 AWS Lambda (Function as a Service)
* **Execution Limit:** รันได้สูงสุด **15 นาที (900 วินาที)** ต่อการเรียกใช้งาน 1 ครั้ง (หากงานนานกว่านี้ ต้องพิจารณาใช้ ECS/Batch/Step Functions)
* **Resource Scaling:** Memory ปรับได้ตั้งแต่ 128 MB ถึง 10,240 MB (CPU และ Network Bandwidth จะขยายตามขนาด Memory ที่เลือกโดยอัตโนมัติ)
* **Cold Starts & Concurrency:**
  * *Reserved Concurrency:* การันตีจำนวน Instances สูงสุดที่ฟังก์ชันนี้เรียกได้ (ป้องกันไม่ให้ฟังก์ชันอื่นใน Account โดนแย่ง Quota)
  * *Provisioned Concurrency:* เปิดฟังก์ชันรอไว้ล่วงหน้าเพื่อลดปัญหา Cold Start สำหรับงานที่ต้องการ Latency ต่ำมาก

### 5.2 Container Orchestration: ECS vs EKS และ Launch Types

| หัวข้อ | ECS (Elastic Container Service) | EKS (Elastic Kubernetes Service) |
|---|---|---|
| **ความซับซ้อน** | AWS-Native ไม่ซับซ้อน กลมกลืนกับ Services อื่นใน AWS สูง | มาตรฐาน Kubernetes (K8s) รองรับ Multi-cloud / On-premise |
| **Launch Type: EC2** | ผู้ใช้ต้องจัดการ Patching, Scaling, และ OS ของ EC2 Instances เอง | ผู้ใช้จัดการ Worker Nodes เอง |
| **Launch Type: Fargate** | **Serverless:** กำหนดแค่ CPU/RAM ระบบจัดการฮาร์ดแวร์เบื้องหลังให้อัตโนมัติ ปลอดภัยและไม่ต้องดูแล OS | Serverless Pods สำหรับ K8s |

---

## 6. Exam Trap & Keyword Decision Matrix

สรุปจุดตัดในการตัดสินใจเลือก Compute Services ในข้อสอบ SAA:

| โจทย์ระบุคีย์เวิร์ด (Exam Trigger) | ตัดสินใจเลือกใช้ (Architecture Decision) | เหตุผลและจุดหลอก |
|---|---|---|
| *"Batch processing that can be interrupted, lowest cost"* | **Spot Instances** | งานประเภท Batch หรืองาน Render ที่เซฟสถานะได้ ให้เลือก Spot เสมอเพื่อส่วนลดสูงสุด 90% |
| *"Legacy application requiring fixed static IP address"* | **Network Load Balancer (NLB)** | ALB ไม่มี Static IP (ให้เฉพาะ DNS) หาก Client มีการ Whitelist IP ตายตัว ต้องใช้ NLB เท่านั้น |
| *"Routing based on HTTP request path (e.g. /api vs /web)"* | **Application Load Balancer (ALB)** | Path-based routing เป็นความสามารถเฉพาะของ Layer 7 บน ALB |
| *"High Performance Computing (HPC), lowest latency between nodes"* | **EC2 Cluster Placement Group** | จัดเครื่องรวมใน Rack เดียวกัน เพื่อ Throughput สูงสุดและ Latency ต่ำสุด |
| *"Critical database nodes across separate hardware in single AZ"* | **EC2 Spread Placement Group** | แยก Rack เด็ดขาด ป้องกัน Hardware failure จุดเดียว แต่จำกัด 7 เครื่องต่อ AZ |
| *"Microservices on containers without managing underlying servers"* | **ECS or EKS with AWS Fargate** | คีย์เวิร์ดคือ "Without managing servers" $\rightarrow$ Fargate เสมอ |
| *"Process uploaded images to S3, execution time under 2 minutes"* | **AWS Lambda Event-Driven** | งานสั้น (< 15 นาที) Trigger จาก S3 เข้าข่าย Serverless Event-Driven สมบูรณ์แบบ |