# Module 7: High Availability & Disaster Recovery

ระบบคลาวด์ที่ดีไม่ได้วัดกันที่ "ระบบจะล่มหรือไม่" แต่วัดกันที่ **"ถ้าระบบล่มขึ้นมา จะฟื้นคืนชีพกลับมาได้เร็วแค่ไหน และข้อมูลจะสูญหายไปมากเท่าใด"**

---

## ปูพื้นฐาน: สองคำศัพท์ตัดสินใจกู้ชีพ (RPO vs RTO)

หากไม่มีพื้นฐานมาก่อน ให้จินตนาการถึงเหตุการณ์ **"ไฟดับขณะกำลังพิมพ์รายงานส่งอาจารย์"**:

```
[ เวลา 10:00 น. ] ── เซฟงานครั้งล่าสุด
       │
       │ (นั่งพิมพ์งานต่อมาเรื่อยๆ เป็นเวลา 30 นาที...)
       ▼
[ เวลา 10:30 น. ] ── จู่ๆ ไฟดับ พรึ่บ! ───> [ ปริมาณข้อมูลที่หายไป = งาน 30 นาที ] = RPO
       │
       │ (ต้องเดินไปสับคัตเอาต์ รอเปิดคอมใหม่ บูตเครื่องอีก 15 นาที...)
       ▼
[ เวลา 10:45 น. ] ── คอมเปิดติด พร้อมพิมพ์งานต่อ ──> [ เวลาที่เสียไป = 15 นาที ] = RTO
```

1. **RPO (Recovery Point Objective) - "ข้อมูลยอมให้หายได้ย้อนหลังกี่นาที?":**
   * ขึ้นอยู่กับ **"ความถี่ในการสำรองข้อมูล (Backup Frequency)"**
   * ถ้าระบบสำรองข้อมูลทุกเที่ยงคืน หากระบบล่มตอน 23:00 น. ข้อมูลของทั้งวันจะหายไปเกือบหมด ($RPO = 23$ ชั่วโมง)
2. **RTO (Recovery Time Objective) - "ยอมให้ระบบหยุดทำงาน (Downtime) ได้นานกี่นาที?":**
   * ขึ้นอยู่กับ **"ความเร็วในการเปิดเครื่องและกู้ระบบกลับคืนมา (Restore Speed)"**

---

## 1. กลยุทธ์กู้ภัย 4 รูปแบบ (4 Disaster Recovery Strategies)

ข้อสอบ SAA จะออกเรื่องการเลือกกลยุทธ์กู้ภัย โดยต้องชั่งน้ำหนักระหว่าง **ต้นทุน (Cost)** กับ **ความเร็วในการฟื้นตัว (RPO/RTO)**:

```
[ ต่ำสุด ] ────────────────────── ต้นทุนค่าใช้จ่าย ──────────────────────> [ สูงสุด ]
[ ช้าสุด ] <───────────────────── ความเร็วในการฟื้นตัว ──────────────────── [ เร็วระดับวินาที ]

1. Backup & Restore ───> 2. Pilot Light ───> 3. Warm Standby ───> 4. Multi-Site Active-Active
```

### ตารางเปรียบเทียบกลยุทธ์ DR ทั้ง 4 ระดับ

| กลยุทธ์ | ระบบที่สอง (Backup Site) มีหน้าตาอย่างไร? | $RPO$ / $RTO$ | ต้นทุนค่าใช้จ่าย | คำอธิบายแบบเข้าใจง่าย |
|---|---|---|---|---|
| **1. Backup & Restore** | **ไม่มีเซิร์ฟเวอร์อะไรรันอยู่เลย** มีแค่ไฟล์สำรองข้อมูล (Snapshots/S3) ข้ามทวีปไว้ | หลายชั่วโมง จนถึงเป็นวัน | **ถูกที่สุด** | เหมือนบ้านไฟไหม้ แล้วค่อยเอาเงินประกันไปจ้างช่างมาเริ่มก่ออิฐสร้างบ้านใหม่ |
| **2. Pilot Light** | **เปิดรันเฉพาะฐานข้อมูลหลัก (Core DB)** คอยซิงค์ข้อมูลสดตลอดเวลา แต่เซิร์ฟเวอร์เว็บปิดไว้หมด (เตรียมเป็น AMI/Template ไว้) | $RPO$ หลักนาที<br>$RTO$ หลักสิบนาที | ต่ำ | เหมือนเตาแก๊สที่ **จุดไฟล่อ (Pilot light)** ทิ้งไว้ตลอดเวลา พอจะทำอาหารค่อยหมุนเร่งไฟ |
| **3. Warm Standby** | **เปิดระบบทั้งหมดรันไว้ตลอดเวลา แต่เป็นขนาดมินิ (Scaled-down)** เช่น เครื่องหลักมี 10 เครื่อง สาขาสำรองเปิดไว้แค่ 2 เครื่อง | $RPO$ หลักวินาที<br>$RTO$ หลักนาที | ปานกลาง | เหมือนเปิดร้านสาขาย่อยสำรองไว้ พอสาขาหลักล่ม ค่อยสั่ง Auto Scaling ขยายขนาดทันที |
| **4. Multi-Site Active-Active** | **เปิดระบบขนาดเต็ม 100% พร้อมกัน 2 แห่งทั่วโลก** รองรับลูกค้าจริงทั้งสองที่ตลอดเวลา | $RPO$ ใกล้ 0<br>$RTO$ เป็นศูนย์ (ทันที) | **แพงที่สุด** | เปิดร้านขนาดใหญ่ 2 สาขาพร้อมกัน ถ้าสาขาหนึ่งไฟดับ ลูกค้าก็เดินเข้าอีกสาขาได้ทันที |

---

## 2. Amazon Route 53 (ระบบนำทาง DNS อัจฉริยะ)

Amazon Route 53 คือบริการ Domain Name System (DNS) ที่ไม่ได้มีหน้าที่แค่แปลงชื่อเว็บ `www.myweb.com` เป็น IP Address แต่ยังสามารถนำทาง Traffic และทำ **Automated Failover** ได้อย่างยอดเยี่ยม

### นโยบายการนำทางของ Route 53 (Routing Policies ที่ต้องรู้)

```
[ Simple ]                 [ Weighted ]               [ Latency-based ]          [ Failover ]
 ┌─────────┐               ┌─────────┐                ┌─────────┐                ┌─────────┐
 │ IP เดียว │               │ 80%     │ 20%            │ วิ่งหา     │             │ Primary │
 └─────────┘               ▼         ▼                │ ทวีปที่ไวสุด│             └────┬────┘
                     [Server A] [Server B]            └─────────┘                     │ (ล่ม)
                                                                                      ▼
                                                                                 [Standby]
```

1. **Simple Routing:** ส่งไปหา Server หรือ IP เครื่องเดียวแบบธรรมดา (ไม่รองรับ Health Check)
2. **Weighted Routing (การถ่วงน้ำหนัก):** กำหนดสัดส่วน Traffic เช่น ส่งคน 80% ไป Server เก่า และ 20% ไป Server ใหม่ เพื่อทดสอบฟีเจอร์ใหม่ (A/B Testing หรือ Canary Deployment)
3. **Latency-based Routing:** วัดความเร็วจากตำแหน่งของผู้ใช้ แล้วส่งผู้ใช้ไปยัง Data Center ของ AWS ที่ **มีความหน่วง (Latency) ต่ำที่สุดสำหรับเขา**
4. **Failover Routing (Active-Passive):**
   * ชี้ไปหาเซิร์ฟเวอร์หลัก (Primary) ตลอดเวลา
   * มีระบบ **Route 53 Health Check** คอยเช็กว่า Primary ยังมีชีวิตอยู่ไหม หากตรวจพบว่าพัง จะสลับเส้นทางไปหาเครื่องสำรอง (Secondary/DR) อัตโนมัติ
5. **Geolocation Routing:** ส่งคนตาม **"สัญชาติหรือพิกัดของทวีป/ประเทศ"** เช่น ถ้าเปิดมาจากยุโรป ให้พาไปหน้าเว็บภาษาฝรั่งเศส, เปิดจากไทย พาไปหน้าภาษาไทย
6. **Multi-Value Answer:** ตอบกลับ IP หลายๆ ตัวพร้อมกัน โดยสุ่มส่งเฉพาะ IP ของเครื่องที่ผ่านการตรวจสุขภาพ (Health Check) เท่านั้น

---

## 3. Exam Trap & Keyword Decision Matrix

| โจทย์ระบุคีย์เวิร์ด (Exam Trigger) | ตัดสินใจเลือกใช้ (Architecture Decision) | เหตุผลและจุดหลอก |
|---|---|---|
| *"Lowest cost disaster recovery strategy, hours of downtime acceptable"* | **Backup and Restore** | ต้นทุนต่ำสุดและยอมรับเวลา Downtime ได้เป็นชั่วโมง คือ Backup & Restore |
| *"DR strategy where core database is replicated, web servers spun up on failure"* | **Pilot Light** | รันเฉพาะ DB ไว้ตลอดเวลา และใช้ AMI ปั่นเครื่องเว็บขึ้นมาเมื่อเกิดเหตุ คือ Pilot Light |
| *"Zero downtime, lowest possible RPO and RTO across multiple regions"* | **Multi-Site Active-Active** | โจทย์ระบุไม่มี Downtime เลย และ RPO/RTO ใกล้ศูนย์ ต้องตอบ Active-Active เท่านั้น |
| *"A/B testing, send 10% of user traffic to a new application version"* | **Route 53 Weighted Routing Policy** | การแบ่งเปอร์เซ็นต์ทราฟฟิกทดสอบระบบ ต้องใช้ Weighted Routing |
| *"Automatically divert traffic to a disaster recovery region when primary site fails"* | **Route 53 Failover Routing with Health Checks** | การทำ Automated Failover ข้าม Region คู่กับ Health Check เป็นหน้าที่ของ Failover Policy |
| *"Route users to the AWS Region that provides the best application responsiveness"* | **Route 53 Latency-based Routing** | responsiveness ที่ดีที่สุด = ความหน่วงต่ำสุด ตอบ Latency-based Routing |