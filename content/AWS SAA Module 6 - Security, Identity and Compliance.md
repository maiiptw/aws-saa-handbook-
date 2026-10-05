# Module 6: Security, Identity & Compliance

ความปลอดภัยบน AWS ยึดหลัก **"Shared Responsibility Model" (โมเดลแบ่งปันความรับผิดชอบ)**:
* **AWS รับผิดชอบ:** ความปลอดภัยของตัวคลาวด์เอง (Security **OF** the Cloud) เช่น อาคาร Data Center, สายไฟ, เซิร์ฟเวอร์จริง, ฮาร์ดแวร์
* **ลูกค้า (เรา) รับผิดชอบ:** ความปลอดภัยของสิ่งที่เอาไปวางบนคลาวด์ (Security **IN** the Cloud) เช่น ข้อมูล, การตั้งรหัสผ่าน, สิทธิ์ผู้ใช้งาน, การเปิดพอร์ต Firewall

---

## ปูพื้นฐาน: เปรียบเทียบระบบรักษาความปลอดภัยกับ "โรงแรมหรู"

```
[ IAM Roles ]            [ KMS Encryption ]          [ AWS WAF ]              [ GuardDuty ]
┌────────────────────┐   ┌───────────────────────┐   ┌────────────────────┐   ┌────────────────────┐
│ บัตรพนักงานโรงแรม    │   │ กุญแจและตู้เซฟในห้องพัก │   │ ยามตรวจกระเป๋าหน้าประตู │   │ นักสืบตรวจกล้องวงจรปิด │
│ ให้ใครยืมบัตรชั่วคราว│   │ ล็อคไฟล์ไว้ ขโมยไปก็เปิดดู│   │ ดักจับคนพกอาวุธ (SQLi, │   │ คอยส่องพฤติกรรมน่าสงสัย│
│ ก็ได้สิทธิ์ตามตำแหน่งนั้น│  │ ไม่ได้ถ้าไม่มีกุญแจ      │   │ แฮกเกอร์ปั๊มรีเควสต์)    │   │ เช่น แอบขุดบิตคอยน์   │
└────────────────────┘   └───────────────────────┘   └────────────────────┘   └────────────────────┘
```

---

## 1. AWS IAM (Identity and Access Management)

IAM คือประตูบ้านด่านแรกที่ใช้ควบคุมว่า **"ใคร (Authentication)"** มีสิทธิ์เข้ามาทำ **"อะไร (Authorization)"** ในระบบ

### 1.1 เสาหลัก 4 ต้นของ IAM
1. **Users:** บัญชีสำหรับคนจริง 1 คน (มี Username, Password, และควรเปิด MFA เสมอ)
2. **Groups:** กลุ่มรวม User เพื่อให้แจกสิทธิ์ง่ายๆ เช่น กลุ่ม `Admins`, กลุ่ม `Developers`
3. **Roles (บทบาทสมมุติ - สำคัญที่สุดในข้อสอบ):**
   * บัตรผ่านชั่วคราวที่ไม่มีรหัสผ่านถาวร
   * ใช้มอบสิทธิ์ให้ **AWS Services คุยกันเอง** เช่น มอบสิทธิ์ให้เครื่อง EC2 มี Role ในการเข้าไปอ่านไฟล์ใน S3 ได้อย่างปลอดภัย **โดยที่เราไม่ต้องแอบเอา Access Key/Secret Key ไปแปะทิ้งไว้ในโค้ด**
4. **Policies:** เอกสารข้อกำหนด (รูปแบบ JSON) ที่ระบุว่าอนุญาตหรือห้ามทำอะไร

### 1.2 ลำดับการประเมินสิทธิ์ (Evaluation Logic)
จำสมการนี้ไว้เสมอ: **`Explicit Deny > Explicit Allow > Default Deny`**
* เริ่มต้นมา ทุกคนจะ **ไม่มีสิทธิ์อะไรเลย (Default Deny)**
* หากมี Policy สั่งว่า **Allow** คุณถึงจะทำได้
* แต่ถ้ามีแม้แต่ Policy เดียวที่สั่งว่า **Deny (Explicit Deny)** สิทธิ์ของคุณจะถูกปฏิเสธทันที ต่อให้มี Allow อีก 100 ใบก็ตาม!

---

## 2. การปกป้องข้อมูลและการเข้ารหัส (KMS & Secrets)

### 2.1 AWS KMS (Key Management Service)
บริการจัดการ "กุญแจเข้ารหัสข้อมูล" ข้อมูลที่เก็บอยู่บน S3, EBS, RDS สามารถสั่งติ๊กถูกเพื่อให้ KMS เข้ารหัสแบบ **Encryption at Rest** ได้ง่ายๆ

* **Envelope Encryption (การเข้ารหัสแบบซองจดหมาย):**
  * ข้อมูลจริงขนาดใหญ่ จะถูกเข้ารหัสด้วย **Data Encryption Key (DEK)**
  * จากนั้น ตัวกุญแจ DEK จะถูกนำไปเข้ารหัสซ้ำอีกชั้นด้วย **KMS Master Key (KMS Key)**
  * *ประโยชน์:* ทำให้เข้ารหัสข้อมูลขนาดใหญ่หลายสิบ GB ได้อย่างรวดเร็วโดยที่แม่กุญแจ KMS ไม่ต้องเหนื่อยประมวลผลไฟล์ใหญ่เอง

---

### 2.2 AWS Secrets Manager vs SSM Parameter Store (จุดสับสนอันดับ 1)

ทั้งสองบริการใช้เก็บรหัสผ่านและค่าความลับเหมือนกัน แต่มีจุดตัดที่ชัดเจน:

| หัวข้อ | AWS Secrets Manager | AWS Systems Manager (SSM) Parameter Store |
|---|---|---|
| **ความสามารถเด่น** | **รองรับการหมุนเวียนรหัสผ่านอัตโนมัติ (Automatic Rotation)** มีระบบจับมือกับ RDS เปลี่ยนรหัสผ่านใหม่ทุก 30 วันได้เอง | เก็บค่าตัวแปร Configuration ทั่วไป เช่น URL ปลายทาง หรือ License Key |
| **โครงสร้างราคา** | มีค่าบริการรายเดือนต่อ Secret + ค่าจำนวนครั้งที่เรียกดู | **ฟรี (สำหรับ Standard Tier)** |
| **Use Cases** | รหัสผ่านฐานข้อมูลที่มีกฎ Compliance ว่าต้องเปลี่ยนรหัสผ่านทุกเดือน | ค่า Config ของแอปพลิเคชันทั่วไป, รหัส API ที่ไม่จำเป็นต้อง Rotate บ่อยๆ |

---

## 3. การป้องกันโครงข่ายและเว็บแอปพลิเคชัน

```
[ ผู้ใช้งาน / แฮกเกอร์บนอินเทอร์เน็ต ]
              │
              ▼
    [ AWS Shield ] ──────────> สกัดกั้นการโจมตีถล่มระบบระดับโครงข่าย (DDoS Layer 3/4)
              │
              ▼
    [ AWS WAF ] ─────────────> ตรวจสอบเนื้อหาและโค้ดอันตราย (Layer 7: SQLi, XSS)
              │
              ▼
[ CloudFront / ALB / API Gateway ]
              │
              ▼
      [ เซิร์ฟเวอร์เว็บ ]
```

### 3.1 AWS WAF (Web Application Firewall)
* ทำงานที่ **Layer 7 (Application Layer)**
* คอยดักจับโค้ดอันตรายที่แฝงมากับคำขอ HTTP/HTTPS เช่น:
  * **SQL Injection:** การแอบพิมพ์คำสั่งเจาะฐานข้อมูลลงในช่องค้นหา
  * **Cross-Site Scripting (XSS):** การฝังโค้ดหลอกขโมยข้อมูลผู้ใช้
  * **Rate Limiting:** บล็อก IP ที่กดยิงรีเควสต์รัวๆ เกิน 1,000 ครั้งใน 5 นาที

### 3.2 AWS Shield (เกราะป้องกัน DDoS)
* **AWS Shield Standard:** เปิดทำงานให้ **ฟรีอัตโนมัติสำหรับลูกค้าทุกคน** ป้องกันการยิงถล่มด้วย SYN Flood, UDP Reflection ที่ระดับ Layer 3 และ 4
* **AWS Shield Advanced:** บริการแบบเสียเงินสำหรับองค์กร มีทีมวิศวกรผู้เชี่ยวชาญด้าน DDoS (SRT) คอยดูแล 24 ชั่วโมง และมีประกันคุ้มครองค่าใช้จ่ายกรณีโดนยิงถล่มจนเซิร์ฟเวอร์สเกลพุ่ง

---

## 4. ระบบตรวจจับภัยคุกคามอัจฉริยะ (Specialty Security Services)

| บริการ | ทำหน้าที่อะไร? | ข้อมูลที่นำไปวิเคราะห์ | คีย์เวิร์ดในข้อสอบ |
|---|---|---|---|
| **Amazon GuardDuty** | **นักสืบ AI ส่องตรวจจับภัย** แอบดูว่ามีใครขโมยสิทธิ์ไปเปิดเซิร์ฟเวอร์ขุดบิตคอยน์ หรือเข้าสู่ระบบจากประเทศต้องสงสัย | VPC Flow Logs, DNS Query Logs, CloudTrail Events, EKS Audit Logs | **Intelligent threat detection, Machine Learning, Anomaly behavior** |
| **Amazon Inspector** | **หมอตรวจสุขภาพเซิร์ฟเวอร์** ค้นหาช่องโหว่ความปลอดภัย (CVE) และการเผลอเปิดพอร์ตเสี่ยงทิ้งไว้ | สแกนตัวเครื่อง EC2, Docker Images บน ECR, และ Lambda Functions | **Vulnerability assessment, CVE scan, Software compliance** |
| **Amazon Macie** | **นักสืบข้อมูลส่วนบุคคล (PDPA/PII)** ค้นหาว่ามีใครเผลอเอาเลขบัตรประชาชน, เลขบัตรเครดิต ไปวางทิ้งไว้ใน S3 ไหม | สแกนไฟล์ที่เก็บอยู่ใน Amazon S3 | **Data privacy, PII detection, Credit card numbers in S3** |

---

## 5. Exam Trap & Keyword Decision Matrix

| โจทย์ระบุคีย์เวิร์ด (Exam Trigger) | ตัดสินใจเลือกใช้ (Architecture Decision) | เหตุผลและจุดหลอก |
|---|---|---|
| *"EC2 instance needs to securely access S3 bucket without storing credentials in code"* | **Attach IAM Role to the EC2 Instance** | ห้ามสร้าง Access Key แปะในแอปพลิเคชัน ให้ใช้ IAM Role แจกสิทธิ์ชั่วคราวเสมอ |
| *"Store database credentials with automatic rotation every 30 days"* | **AWS Secrets Manager** | ถ้าโจทย์ระบุ "Automatic Rotation" คำตอบต้องเป็น Secrets Manager เท่านั้น (SSM ทำไม่ได้) |
| *"Protect website against SQL injection and Cross-Site Scripting (XSS)"* | **AWS WAF (Web Application Firewall)** | การโจมตีระดับ Application Layer ต้องใช้ WAF เสมอ |
| *"Discover sensitive data such as Personally Identifiable Information (PII) in S3"* | **Amazon Macie** | ตรวจจับข้อมูลส่วนบุคคลใน S3 เป็นหน้าที่เฉพาะของ Macie |
| *"Detect unauthorized cryptocurrency mining or suspicious SSH logins automatically"* | **Amazon GuardDuty** | ตรวจจับภัยคุกคามและพฤติกรรมผิดปกติด้วย AI ตอบ GuardDuty |
| *"A user has an Allow policy and a Deny policy for the same action"* | **The action is DENIED** | กฎเหล็ก: Explicit Deny ชนะทุกอย่างเสมอ |