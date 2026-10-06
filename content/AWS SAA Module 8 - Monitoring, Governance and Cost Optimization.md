# Module 8: Monitoring, Governance & Cost Optimization

การสร้างระบบขึ้นมาทำงานได้ถือเป็นแค่ครึ่งทาง อีกครึ่งทางคือการดูแลให้ระบบทำงานได้อย่างโปร่งใส รู้ตัวเมื่อมีปัญหา ปฏิบัติตามกฎหมาย และควบคุมงบประมาณไม่ให้บานปลาย

---

## ปูพื้นฐาน: สามสหายดูแลระบบ (จุดสับสนอันดับ 1 ของข้อสอบ SAA)

ข้อสอบชอบถามบริการ 3 ตัวนี้สลับกันบ่อยมาก ให้จำบทบาทของแต่ละตัวตามนี้:

```
[ Amazon CloudWatch ]          [ AWS CloudTrail ]             [ AWS Config ]
┌────────────────────────┐     ┌────────────────────────┐     ┌────────────────────────┐
│ "เครื่องวัดชีพจร"       │     │ "กล้องวงจรปิด"         │     │ "ผู้ตรวจการกฎระเบียบ"   │
│ ตรวจดู Performance     │     │ บันทึกประวัติ API Calls │     │ บันทึก Timeline และ    │
│ สบายดีไหม? ร้อนไปไหม?  │     │ ใคร ทำอะไร เมื่อไหร่?    │     │ ตรวจว่าทำผิดกฎองค์กรไหม│
└────────────────────────┘     └────────────────────────┘     └────────────────────────┘
```

1. **Amazon CloudWatch:**
   * ส่องดูความสมบูรณ์ของเครื่อง (CPU เท่าไหร่, เครือข่ายวิ่งกี่ MB, ฮาร์ดดิสก์ใกล้เต็มหรือยัง)
   * หากมีค่าตัวเลขผิดปกติ สามารถส่งเสียงเตือน (**CloudWatch Alarm**) เพื่อสั่งให้ Auto Scaling ขยายเครื่อง หรือส่งอีเมลแจ้งเตือน
2. **AWS CloudTrail:**
   * บันทึกประวัติศาสตร์การคลิกปุ่มหรือการรันคำสั่ง API ในระบบทั้งหมด
   * ตอบคำถามทางนิติวิทยาศาสตร์: *"ใครเป็นคนสั่งปิดเซิร์ฟเวอร์ตัวนี้เมื่อวานตอนตีสอง?"*
3. **AWS Config:**
   * ตรวจสอบความถูกต้องตามกฎระเบียบ (Compliance) และบันทึกประวัติการเปลี่ยนแปลง Config ตลอดเวลา
   * ตอบคำถาม: *"มีใครเผลอเปิด S3 Bucket ให้คนนอกอ่านฟรีไหม?"* หรือ *"เซิร์ฟเวอร์ทุกเครื่องเข้ารหัสดิสก์ตามระเบียบบริษัทหรือยัง?"*

---

## 1. Amazon CloudWatch เชิงลึก

### 1.1 Metrics พื้นฐาน vs Custom Metrics
* **สิ่งที่ CloudWatch เก็บได้ฟรีโดยไม่ต้องลงโปรแกรมเพิ่ม (Host-level Metrics):**
  * CPU Utilization, Network In/Out, Disk Read/Write (IOPS)
* **สิ่งที่ CloudWatch มองไม่เห็นจากภายนอก (ข้อสอบชอบหลอกมาก!):**
  * **Memory / RAM Utilization (การใช้งานแรม)**
  * **Disk Space Remaining (พื้นที่ฮาร์ดดิสก์คงเหลือภายในระบบ OS)**
* **วิธีแก้:** ต้องเข้าไปติดตั้งโปรแกรมเสริมชื่อ **CloudWatch Agent (Unified Agent)** ภายในระบบปฏิบัติการของ EC2 ถึงจะเก็บค่า RAM และเนื้อที่ดิสก์ได้

---

## 2. การจัดการองค์กรขนาดใหญ่ (AWS Organizations)

เมื่อบริษัทขยายใหญ่ขึ้น การใช้ Account เดียวจะเสี่ยงเกินไป องค์กรจึงต้องแตกเป็นหลายๆ Accounts (เช่น Account แผนกพัฒนา, ทดสอบ, และใช้งานจริง)

```
                       ┌─── [ Core OU ] ──────> Shared Services Account
                       │
[ Root Account ] ──────┼─── [ Dev OU ] ───────> Dev Account 1, Dev Account 2
(ศูนย์รวมการจ่ายเงิน)   │
                       └─── [ Prod OU ] ──────> Production Account
                                                (ผูกกฎเหล็ก: ห้ามปิด CloudTrail)
```

### 2.1 Service Control Policies (SCPs - กฎเหล็กของตระกูล)
* SCPs คือนโยบายที่ใช้กำหนด **"ขอบเขตสิทธิ์สูงสุด (Permission Guardrails)"** ให้กับ Accounts ลูก
* **กฎสำคัญมาก:** ต่อให้ผู้ใช้งานใน Account ลูกจะเป็น **Root Account หรือ Full Admin** หากหัวหน้าใหญ่ติดกฎ **SCP Deny** เอาไว้ บัญชีลูกนั้นก็ **ไม่มีทางฝ่าฝืนกฎได้เด็ดขาด** (เช่น ตั้งกฎห้าม Account แผนกทดสอบเปิดเครื่องนอก Region สิงคโปร์)

### 2.2 Consolidated Billing (รวมบิลไว้ที่เดียวเพื่อส่วนลด)
* รวมยอดการใช้จ่ายของทุก Account มาเรียกเก็บที่ Root Account บัญชีเดียว
* ช่วยให้เข้าเกณฑ์ **ส่วนลดตามปริมาณการใช้งาน (Volume Discounts)** ของ S3 หรือ Data Transfer ได้เร็วขึ้น และสามารถแชร์การใช้งาน Reserved Instances (RI) ร่วมกันในตระกูลได้

---

## 3. เครื่องมือบริหารจัดการต้นทุน (Cost Optimization Tools)

| เครื่องมือ | หน้าที่หลัก | Use Case ในข้อสอบ |
|---|---|---|
| **AWS Cost Explorer** | **ส่องกราฟวิเคราะห์อดีตและพยากรณ์อนาคต** | ดูกราฟย้อนหลัง 12 เดือน และคาดการณ์ยอดใช้จ่ายล่วงหน้า 3 เดือน พร้อมแนะนำการซื้อ Savings Plans |
| **AWS Budgets** | **ตั้งงบประมาณและตั้งด่านเตือน** | ตั้งงบว่าห้ามใช้เกิน $500/เดือน หากพุ่งถึง 80% ให้ส่งแจ้งเตือน หรือสั่ง Shutdown เครื่องทดสอบทิ้งอัตโนมัติ |
| **AWS Compute Optimizer** | **ที่ปรึกษา AI ลดขนาดเครื่อง** | ใช้ Machine Learning วิเคราะห์ว่าเครื่อง EC2 ตัวไหนใช้ CPU แค่ 2% แล้วแนะนำให้ลดขนาด (Right-sizing) เพื่อประหยัดเงิน |
| **Cost Allocation Tags** | **การแปะป้ายชื่อแบ่งหมวดค่าใช้จ่าย** | แปะ Tag เช่น `Environment: Production`, `Project: MobileApp` เพื่อดึงรายงานบัญชีแยกตามแผนก |

---

## 4. Exam Trap & Keyword Decision Matrix

| โจทย์ระบุคีย์เวิร์ด (Exam Trigger) | ตัดสินใจเลือกใช้ (Architecture Decision) | เหตุผลและจุดหลอก |
|---|---|---|
| *"Monitor EC2 memory and swap utilization or disk space"* | **Install CloudWatch Unified Agent on EC2** | CloudWatch ไม่เก็บค่า Memory เป็นค่าเริ่มต้น ต้องติดตั้ง Agent เสมอ |
| *"Find out who terminated an EC2 instance or modified a Security Group"* | **AWS CloudTrail Event History** | ต้องการสืบหา "ใครทำอะไรกับระบบ" ตรวจสอบได้ที่ CloudTrail |
| *"Check compliance rules (e.g., ensure all EBS volumes are encrypted)"* | **AWS Config Rules** | ตรวจสอบการตั้งค่าผิดกฎระเบียบของระบบ ตอบ AWS Config |
| *"Prevent member accounts from disabling CloudTrail, even by account root users"* | **Service Control Policies (SCPs) in AWS Organizations** | กฎควบคุมเหนือ Root account ของบัญชีลูก ต้องใช้ SCPs เท่านั้น |
| *"Receive an alert when monthly AWS bill is projected to exceed a specific budget limit"* | **AWS Budgets** | แจ้งเตือนเมื่อค่าใช้จ่ายเข้าใกล้งบประมาณ ตอบ AWS Budgets |
| *"Recommend right-sizing EC2 instances to reduce cost based on usage patterns"* | **AWS Compute Optimizer** | การวิเคราะห์และแนะนำลดขนาดเครื่องด้วย AI ตอบ Compute Optimizer |