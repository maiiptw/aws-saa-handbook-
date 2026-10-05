# AWS Solutions Architect - Associate (SAA) Platform Task Plan

แผนงานพัฒนาเว็บไซต์สรุปเนื้อหาและเครื่องมือเตรียมสอบ AWS SAA ด้วยสถาปัตยกรรม **Astro + Tailwind CSS + MDX + React Islands**

---

## 1. System Architecture & Directory Layout

โครงสร้างโปรเจกต์ถูกออกแบบให้แยกส่วนเนื้อหา (Markdown/MDX) ออกจากตรรกะของ UI และ Animation อย่างชัดเจน เพื่อให้อัปเดตเนื้อหาได้รวดเร็ว:

```
aws-saa-handbook/
├── public/
│   └── icons/aws/               # Official AWS Architecture SVG Icons
├── src/
│   ├── content/
│   │   ├── config.ts            # Content Collections Schema (Zod)
│   │   └── modules/             # เนื้อหาหลัก 8 โมดูล (MDX)
│   │       ├── 01-networking.md
│   │       ├── 02-compute.md
│   │       ├── 03-storage.md
│   │       ├── 04-databases.md
│   │       ├── 05-decoupled-systems.md
│   │       ├── 06-security-identity.md
│   │       ├── 07-ha-disaster-recovery.md
│   │       └── 08-governance-monitoring.md
│   ├── components/
│   │   ├── common/              # Navbar, Sidebar, Footer, DarkModeToggle
│   │   ├── content/             # Callout, ExamTrapCard, DecisionTable
│   │   └── interactive/         # React Islands (Loaded via client:visible)
│   │       ├── AlbFailoverSim.tsx
│   │       ├── NatVsIgwFlow.tsx
│   │       └── StorageTierCalculator.tsx
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ModuleLayout.astro   # Table of Contents + Reading Progress Bar
│   └── pages/
│       ├── index.astro          # Landing Page & Progress Overview
│       ├── cheatsheet.astro     # รวม Exam Trap Keywords ค้นหาได้ Real-time
│       └── modules/[slug].astro # Dynamic Route เรนเดอร์ MDX
├── package.json
├── astro.config.mjs
└── tailwind.config.mjs
```

---

## 2. Phase-by-Phase Execution Plan

### Phase 1: Content Ingestion (คลังเนื้อหาหลัก 8 โมดูล)
* [x] **Module 1:** Networking & Hybrid Connectivity (VPC, Subnets, Routing, TGW, DX, Endpoints)
* [x] **Module 2:** Compute, Scaling & Load Balancing (EC2, ASG, ALB/NLB, Lambda, ECS/Fargate)
* [x] **Module 3:** Storage & Data Lifecycle (S3 Storage Classes, EBS Types, EFS, FSx, Storage Gateway)
* [x] **Module 4:** Databases & Caching Layer (RDS Multi-AZ vs Read Replica, Aurora, DynamoDB, ElastiCache, Redshift)
* [x] **Module 5:** Decoupled & Event-Driven Systems (SQS FIFO/Standard, SNS Fanout, EventBridge, Kinesis)
* [x] **Module 6:** Security, IAM & Governance (IAM Policies, KMS, Secrets Manager, WAF, Shield, GuardDuty)
* [x] **Module 7:** High Availability & Disaster Recovery (RPO/RTO, Route 53 Policies, 4 DR Strategies)
* [x] **Module 8:** Monitoring, Governance & Cost Optimization (CloudWatch vs CloudTrail, Config, AWS Organizations, Cost Tools)

### Phase 2: Core Web Framework Setup (Astro + Tailwind)
* [ ] ติดตั้ง Base Astro Project พร้อม Integrations (`@astrojs/tailwind`, `@astrojs/react`, `@astrojs/mdx`)
* [ ] กำหนด Content Collection Schema ใน `src/content/config.ts` (Title, Module Number, Estimated Reading Time, Keywords)
* [ ] ทำ Layout หน้าบทเรียน (Sticky Table of Contents, Reading Progress Bar, Mobile Sidebar)

### Phase 3: Interactive Diagrams & Animation Islands (React Flow + Motion)
* [ ] **Widget 1: VPC Route Simulator** (จำลอง Request ข้าม Public/Private Subnet ชี้เป้า NAT GW และ IGW)
* [ ] **Widget 2: ALB vs NLB Traffic Router** (จำลอง Path-based Routing vs Static IP Routing)
* [ ] **Widget 3: Disaster Recovery Strategy Slider** (ปรับสไลเดอร์ RPO/RTO เพื่อดูการสลับ Architecture จาก Pilot Light สู่ Active-Active)
* [ ] **Widget 4: Storage Tier Lifecycle Cost Visualizer** (แสดงการย้ายไฟล์ตามวัน พร้อมเปรียบเทียบ Cost กราฟแท่ง)

### Phase 4: Exam Cheatsheet & Search Matrix
* [ ] สร้างหน้า Quick-Filter Cheatsheet รวมตาราง Decision Matrix ทั้งหมด
* [ ] ทำระบบ Instant Search ค้นหาตามคำสำคัญ (เช่น "Sub-millisecond", "POSIX", "SMB", "Stateful")
* [ ] ระบบ Flashcards สรุปประเด็นดักทางข้อสอบ (Exam Trap Flips)

---

## 3. Quick Start Commands สำหรับเครื่องคอมพิวเตอร์

เมื่อเปิดคอมพิวเตอร์ สามารถรันคำสั่งชุดนี้เพื่อตั้งต้นโปรเจกต์ได้ทันที:

```bash
# 1. สร้างโปรเจกต์ Astro
npm create astro@latest aws-saa-handbook -- --template minimal --typescript strict

# 2. เข้าโฟลเดอร์และลง dependencies หลัก
cd aws-saa-handbook
npx astro add tailwind react mdx

# 3. ลงแพ็กเกจสำหรับ Animation & Diagram
npm install @xyflow/react lucide-react framer-motion clsx tailwind-merge

# 4. รัน Dev Server
npm run dev
```