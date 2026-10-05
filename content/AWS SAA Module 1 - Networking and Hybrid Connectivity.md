# Module 1: Networking & Hybrid Connectivity

โครงข่ายเน็ตเวิร์กคือกระดูกสันหลังของสถาปัตยกรรมระบบบน AWS ในข้อสอบ Solutions Architect – Associate (SAA) สัดส่วนคำถามที่เกี่ยวข้องกับ VPC, Routing, Endpoints และ Hybrid Connectivity ถือเป็นแกนหลักที่ส่งผลต่อหมวดหมู่อื่นๆ ทั้งหมด

---

## 1. Amazon VPC Fundamentals (รากฐานโครงข่ายเสมือน)

### 1.1 IP Addressing & CIDR Block
* **CIDR (Classless Inter-Domain Routing):** กำหนดช่วง IP ภายใน VPC โดยใช้มาตรฐาน RFC 1918 (Private IP):
  * `10.0.0.0/8` (ขนาดใหญ่ สำหรับองค์กร)
  * `172.16.0.0/12`
  * `192.168.0.0/16` (ขนาดที่พบบ่อยในการทดสอบ)
* **ข้อจำกัดขนาด Subnet:** เล็กสุดคือ `/28` (16 IPs) และใหญ่สุดคือ `/16` (65,536 IPs)
* **5 Reserved IPs per Subnet:** ทุก Subnet บน AWS จะถูกสงวนไว้ 5 IP เสมอ (ไม่สามารถนำไปแจกจ่ายให้ Instances ได้):
  * `.0`: Network Address
  * `.1`: AWS Reserved สำหรับ Default VPC Router
  * `.2`: AWS Reserved สำหรับ DNS Resolver (AmazonProvidedDNS)
  * `.3`: AWS Reserved สำหรับการใช้งานในอนาคต
  * `.255`: Network Broadcast (AWS ไม่รองรับ broadcast แต่ยังคงสงวน IP นี้ไว้)
  * *สูตรคำนวณจำนวน Host ใช้งานได้จริง:* $2^{(32 - \text{prefix})} - 5$ เช่น `/24` จะได้ $256 - 5 = 251$ IPs

---

### 1.2 Public vs Private Subnet

| เกณฑ์เปรียบเทียบ | Public Subnet | Private Subnet |
|---|---|---|
| **Route Table Target** | มี Route ชี้ `0.0.0.0/0` ไปยัง **Internet Gateway (IGW)** | ชี้ `0.0.0.0/0` ไปยัง **NAT Gateway** หรือ **ไม่มี Default Route ออกเน็ต** (Isolated) |
| **Public IP Assignment** | มี Auto-assign Public IPv4 หรือผูก Elastic IP | มีเฉพาะ Private IP เท่านั้น |
| **Use Cases** | Reverse Proxy, Application Load Balancer (ALB), Bastion Host | Application Backend, Databases (RDS/Aurora), Internal Microservices |

---

## 2. Ingress & Egress Architecture (การรับ-ส่งข้อมูลออกสู่ภายนอก)

### 2.1 Internet Gateway (IGW)
* เป็น Component แบบ **Horizontally Scaled, Redundant, Highly Available** โดยธรรมชาติ ไม่มีคอขวดแบนด์วิดท์ และไม่มีค่าบริการรายชั่วโมง
* 1 VPC สามารถ Attach เข้ากับ IGW ได้เพียง **1 ตัวเท่านั้น**

### 2.2 NAT Gateway vs NAT Instance

| มิติการเปรียบเทียบ | NAT Gateway (Managed) | NAT Instance (Self-Managed) |
|---|---|---|
| **Availability** | High Availability ภายใน AZ ตัวเอง (ถ้าต้องการ Multi-AZ ต้องสร้าง 1 NAT GW ต่อ 1 AZ) | ไม่รองรับ High Availability ในตัว (ต้องทำ ASG ข้าม AZ และสคริปต์สลับ Route เอง) |
| **Bandwidth** | เริ่มต้นที่ 5 Gbps และ Auto-scale อัตโนมัติสูงสุดถึง **100 Gbps** | ขึ้นอยู่กับประเภท EC2 Instance Type ที่เลือก |
| **Maintenance** | AWS จัดการ Patching และ OS ทั้งหมด | ผู้ดูแลระบบต้องอัปเดต OS, Security Patches เอง |
| **Security Groups** | ไม่สามารถผูก Security Group ได้ | สามารถและต้องผูก Security Group ควบคุม Inbound/Outbound |
| **Source/Dest. Check** | ไม่ต้องตั้งค่า | **ต้องปิด (Disable)** Source/Destination Check บน EC2 เสมอ |
| **Exam Recommendation** | เป็นตัวเลือกที่ถูกต้องเสมอ เว้นแต่โจทย์ระบุว่าต้องการ Cost ต่ำสุดสำหรับ Dev/Test | ไม่แนะนำสำหรับ Production |

> **Flow การทำงานสำคัญ:** 
> Private EC2 $\rightarrow$ Route Table ของ Private Subnet (`0.0.0.0/0` $\rightarrow$ `nat-xxxx`) $\rightarrow$ **NAT Gateway ใน Public Subnet** $\rightarrow$ Route Table ของ Public Subnet (`0.0.0.0/0` $\rightarrow$ `igw-xxxx`) $\rightarrow$ **Internet Gateway** $\rightarrow$ โลกภายนอก

---

## 3. Network Security: Security Groups vs Network ACLs

การรักษาความปลอดภัยระดับเครือข่ายของ AWS ใช้หลักการ Defense-in-Depth สองชั้น:

```
[ Internet ] 
     │
     ▼
[ Network ACL (Subnet Level - Stateless) ]
     │
     ▼
[ Security Group (Instance/ENI Level - Stateful) ]
     │
     ▼
[ EC2 / Database Instance ]
```

### ตารางเปรียบเทียบเชิงลึก

| คุณสมบัติ | Security Group (SG) | Network ACL (NACL) |
|---|---|---|
| **ขอบเขตการทำงาน (Scope)** | ระดับ **Instance / ENI** | ระดับ **Subnet** |
| **สถานะการเชื่อมต่อ (State)** | **Stateful:** หาก Inbound ได้รับอนุญาต Outbound ขากลับจะผ่านได้ทันทีอัตโนมัติ | **Stateless:** ต้องเปิด Rule ทั้งขาเข้า (Inbound) และขาออก (Outbound) ให้ครบถ้วน |
| **ประเภทของ Rules** | **Allow Rules เท่านั้น** (ไม่มี Deny) | **ทั้ง Allow และ Deny Rules** |
| **ลำดับการประเมินผล** | ประเมินผล **ทุก Rule พร้อมกัน** ทั้งหมด | ประเมินผลตาม **ลำดับเลข Rule (1-32766)** จากน้อยไปมาก เมื่อตรงเงื่อนไขจะหยุดตรวจทันที |
| **Ephemeral Ports** | ไม่ต้องสนใจ (ระบบจัดการ Stateful ให้) | **ต้องเปิด Outbound ขากลับสำหรับ Ephemeral Ports (1024–65535)** เสมอ |
| **Use Case ดักข้อสอบ** | ควบคุม Access ทั่วไประหว่าง App $\rightarrow$ DB โดยใช้ **Security Group ID Chaining** | **การบล็อก IP เฉพาะเจาะจง (Explicit Deny IP)** ที่ตรวจพบการโจมตี DDoS หรือ Spammer |

---

## 4. Multi-VPC Architecture: VPC Peering vs Transit Gateway

### 4.1 VPC Peering
* เชื่อมต่อ VPC 2 ตัวเข้าด้วยกันโดยตรงผ่าน AWS Internal Backbone (Traffic เข้ารหัส ไม่วิ่งผ่าน Internet)
* **Non-Transitive Routing:** หาก A เชื่อมกับ B และ B เชื่อมกับ C $\rightarrow$ **A ไม่สามารถคุยกับ C ได้** (ต้องสร้าง Peering ระหว่าง A กับ C เพิ่ม)
* **ข้อจำกัด:** ไม่สามารถเชื่อมต่อระหว่าง VPC ที่มี **CIDR Block ทับซ้อนกัน (Overlapping CIDR)** ได้เด็ดขาด
* เหมาะสำหรับ: จำนวน VPC น้อยๆ (เช่น 2–5 VPC) ที่ต้องการ Throughput สูงสุดโดยไม่มีจุดกั้นกลาง

### 4.2 AWS Transit Gateway (TGW)
* ทำหน้าที่เป็น **Central Hub (Hub-and-Spoke topology)** สำหรับเชื่อมต่อหลักพัน VPC และ On-premises Network
* รองรับ **Transitive Routing** อย่างสมบูรณ์
* รองรับการทำ **Inter-Region Peering** ข้ามทวีป
* มีฟีเจอร์ Route Table Isolation (เช่น แยก Dev, Staging, Prod ไม่ให้คุยกันได้ภายใน Hub เดียว)
* รองรับ **IP Multicast** (ในขณะที่ VPC ทั่วไปไม่รองรับ)

---

## 5. VPC Endpoints: Gateway vs Interface (PrivateLink)

กลไกที่ช่วยให้ Instance ภายใน Private Subnet สามารถเรียกใช้ AWS Services ภายนอก VPC (เช่น S3, DynamoDB, SQS) ได้อย่างปลอดภัย **โดยไม่ต้องออก Public Internet** และไม่ต้องผ่าน NAT Gateway

```
[ Private EC2 ] ──(No Internet Required)──> [ VPC Endpoint ] ──> [ AWS Service (S3 / DynamoDB) ]
```

### การเลือกใช้งานระหว่าง Gateway Endpoint และ Interface Endpoint

| หัวข้อ | Gateway Endpoint | Interface Endpoint (AWS PrivateLink) |
|---|---|---|
| **Service ที่รองรับ** | **Amazon S3** และ **DynamoDB** เท่านั้น | รองรับ Services ส่วนใหญ่ของ AWS เกือบทั้งหมด (SQS, SNS, Kinesis, CloudWatch ฯลฯ) รวมถึง Third-party SaaS |
| **กลไกทางเทคนิค** | เป็น **Route Target** ใน Route Table (เช่น `pl-xxxx` $\rightarrow$ Target `vpce-xxxx`) | สร้าง **Elastic Network Interface (ENI)** พร้อม Private IP เข้าไปอยู่ใน Subnet |
| **ต้นทุนค่าบริการ** | **ฟรี (No Charge)** | มีค่าบริการรายชั่วโมงต่อ ENI + ค่าถ่ายโอนข้อมูล ($/GB) |
| **การเชื่อมต่อจาก On-prem** | **ไม่รองรับ** การเรียกใช้จาก Site-to-Site VPN หรือ Direct Connect | **รองรับ** On-premises สามารถเรียกใช้ผ่าน Private IP ได้โดยตรง |
| **Security Control** | ควบคุมผ่าน **Endpoint Policy** | ควบคุมผ่าน **Security Groups** ที่ผูกกับ ENI |

---

## 6. Hybrid Cloud Connectivity (การเชื่อมต่อ On-Premises)

### 6.1 AWS Site-to-Site VPN
* เชื่อมต่อผ่าน **Public Internet** โดยใช้โปรโตคอล **IPsec**
* **ข้อดี:** ตั้งค่าได้รวดเร็ว (หลักนาที), มีการเข้ารหัสข้อมูลต้นทางถึงปลายทาง (Encrypted in transit)
* **ข้อเสีย:** ความเร็วและความหน่วง (Latency) ขึ้นอยู่กับเสถียรภาพของ Internet สาธารณะ (Bandwidth จำกัดสูงสุด 1.25 Gbps ต่อ Tunnel)
* **องค์ประกอบ:**
  * **Customer Gateway (CGW):** ฝั่ง On-premises (อุปกรณ์ Hardware หรือ Software)
  * **Virtual Private Gateway (VGW)** หรือ **Transit Gateway (TGW):** ฝั่ง AWS

### 6.2 AWS Direct Connect (DX)
* ลากสายสัญญาณเคเบิลเฉพาะ (Dedicated Physical Fiber) จาก On-premises เข้าสู่ AWS Direct Connect Location
* **ข้อดี:** Latency ต่ำและนิ่งมาก, Throughput สูง (1 Gbps ถึง 100 Gbps), ช่วยลดต้นทุน Data Egress สำหรับข้อมูลขนาดใหญ่
* **ข้อจำกัดที่ข้อสอบชอบหลอก:** **Direct Connect ไม่ได้เข้ารหัสข้อมูล natively** (Traffic วิ่งเป็น Clear text บนสายส่วนตัว)
* **โซลูชันเมื่อโจทย์ต้องการ "DX + High Performance + Encryption":**
  * รัน **IPsec VPN ซ้อนบน Direct Connect** (ใช้ Public VIF ต่อ VPN หรือใช้ AWS Direct Connect MACsec encryption)

### 6.3 Backup & Resiliency Architecture
* **Cost-Effective Redundancy:** ใช้ **Direct Connect เป็น Primary Link** และตั้งค่า **Site-to-Site VPN เป็น Failover Backup** (กรณีสาย DX ขาด)
* **Maximum Resiliency (Active-Active DX):** วาง Direct Connect Connections แยกคนละ Data Center Location พร้อม BGP Multipath (ECMP)

---

## 7. Exam Trap & Keyword Decision Matrix

สรุปคีย์เวิร์ดในโจทย์ข้อสอบ SAA ที่นำทางไปสู่คำตอบที่ถูกต้องทันที:

| โจทย์ระบุคีย์เวิร์ด (Exam Trigger) | ตัดสินใจเลือกใช้ (Architecture Decision) | เหตุผลและจุดหลอก |
|---|---|---|
| *"Block a single malicious IP address"* | **Network ACL (NACL) Inbound Deny Rule** | Security Group ไม่สามารถตั้ง Deny ได้ ต้องใช้ NACL เท่านั้น |
| *"Connect Private Subnet to S3 without internet at lowest cost"* | **S3 Gateway Endpoint** | Gateway Endpoint ฟรี ไม่มีค่าบริการรายชั่วโมง ต่างจาก Interface Endpoint |
| *"Transitive routing across hundreds of VPCs and On-premise"* | **AWS Transit Gateway (TGW)** | VPC Peering ไม่รองรับ Transitive routing จะกลายเป็น Full-mesh ที่จัดการไม่ไหว |
| *"Dedicated network connection with encryption in transit"* | **Direct Connect + VPN (IPsec)** หรือ **DX with MACsec** | จำไว้เสมอว่า DX อย่างเดียวไม่มี native encryption |
| *"Instances in private subnet cannot download software patches"* | **NAT Gateway in Public Subnet + Update Private Route Table** | ตรวจสอบว่า NAT GW วางถูก Subnet (ต้องวางใน Public Subnet ที่มี IGW) |
| *"Communicate with database using SG rules, IPs change often"* | **Security Group Chaining (Reference SG ID as Source)** | ห้าม Hardcode CIDR IP ให้ใช้ SG ID ของ App Layer มาใส่ใน Inbound ของ DB Layer |