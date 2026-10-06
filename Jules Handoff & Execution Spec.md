# Jules Task Specification: AWS SAA Handbook & Interactive Platform

เอกสารฉบับนี้จัดทำขึ้นสำหรับส่งมอบงาน (Handoff) ให้กับ **Jules (Google Coding Agent)** ทำงานต่อบน GitHub Repository โดยอัตโนมัติ

---

## 1. Quick Copy-Paste Prompt สำหรับสั่งงาน Jules

เมื่อเปิดเข้าใช้งานที่ [jules.google.com](https://jules.google.com) หรือเปิด GitHub Issue ใน Repository ให้คัดลอกข้อความด้านล่างนี้ไปวางเป็น Prompt สั่งงานได้ทันที:

```markdown
# Objective: Build AWS Solutions Architect (SAA) Handbook Web Platform

Please initialize and build a modern, high-performance educational documentation website for AWS Solutions Architect - Associate (SAA) exam preparation using Astro, Tailwind CSS, MDX, and React Islands.

### Architecture & Tech Stack:
- **Framework:** Astro (latest) with `@astrojs/tailwind`, `@astrojs/react`, and `@astrojs/mdx`
- **Component Libraries:** `lucide-react`, `framer-motion`, `@xyflow/react` (for architecture diagrams)
- **Content Engine:** Astro Content Collections (Schema validated with Zod)
- **Styling:** Tailwind CSS with full Dark Mode support (AWS Console & Cloud Theme colors)

### Key Deliverables:
1. **Project Setup & Dependencies:**
   - Configure `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, and `tsconfig.json`.
   - Ensure `npm run build` passes with zero errors.

2. **Content Schema & Ingestion:**
   - Create `src/content/config.ts` defining a collection for modules: `title` (string), `moduleNumber` (number), `description` (string), `tags` (string[]), `lastUpdated` (date).
   - Ingest all 8 markdown modules from `content/module-*.md` into `src/content/modules/`.

3. **Layouts & Pages:**
   - `src/layouts/BaseLayout.astro`: Responsive navigation bar, dark mode toggle, mobile drawer sidebar, and footer.
   - `src/layouts/ModuleLayout.astro`: Split-view layout featuring a sticky Table of Contents (TOC) on the right, reading progress bar, and prev/next module navigation.
   - `src/pages/index.astro`: Modern hero section with module cards (showing progress and keywords) and quick-action exam shortcuts.
   - `src/pages/cheatsheet.astro`: Interactive filterable table of Exam Traps & Decision Matrices aggregated across all modules with real-time text search.
   - `src/pages/modules/[slug].astro`: Dynamic route rendering the MDX content.

4. **Interactive Component (React Island):**
   - Create `src/components/interactive/AlbFailoverSim.tsx`: An interactive traffic routing simulator. It shows Route 53 -> ALB -> EC2 in AZ-a and AZ-b, with a "Simulate AZ Outage" toggle button that reroutes traffic and updates status tags. Use `client:visible`.

5. **Definition of Done:**
   - Run `npm install` and verify all dependencies install cleanly.
   - Run `npm run build` and ensure all static pages are generated without type or markdown rendering errors.
   - Create a clean Pull Request with a summary of the implementation.
```

---

## 2. Directory & File Blueprint สำหรับ Jules

โครงสร้างโฟลเดอร์เป้าหมายที่ Jules จะต้องสร้างขึ้นใน Repository:

```
aws-saa-handbook/
├── .github/
│   └── workflows/
│       └── build-test.yml          # CI workflow for PR verification
├── src/
│   ├── content/
│   │   ├── config.ts               # Content Collections Zod Schema
│   │   └── modules/                # เนื้อหา 8 บทเดิม ย้ายมาที่นี่ (.md / .mdx)
│   │       ├── module-01-networking.md
│   │       ├── module-02-compute.md
│   │       ├── module-03-storage.md
│   │       ├── module-04-databases.md
│   │       ├── module-05-decoupled-systems.md
│   │       ├── module-06-security-identity.md
│   │       ├── module-07-ha-disaster-recovery.md
│   │       └── module-08-governance-monitoring.md
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.astro
│   │   │   ├── Sidebar.astro
│   │   │   ├── TableOfContents.astro
│   │   │   └── ThemeToggle.astro
│   │   ├── content/
│   │   │   ├── Callout.astro       # กล่องเน้นข้อความ Exam Trap
│   │   │   └── DecisionTable.astro # ตารางสรุปจุดตัด
│   │   └── interactive/
│   │       └── AlbFailoverSim.tsx  # React Island จำลอง Failover
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ModuleLayout.astro
│   ├── pages/
│   │   ├── index.astro             # หน้าหลักรวมโมดูล
│   │   ├── cheatsheet.astro        # หน้ารวมคีย์เวิร์ดและตารางตัดสินใจ
│   │   └── modules/[slug].astro    # Dynamic routing
│   └── styles/
│       └── global.css              # Custom scrollbars & markdown prose styles
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 3. Reference Configurations สำหรับตรวจงาน

### 3.1 Content Schema Reference (`src/content/config.ts`)
```typescript
import { defineCollection, z } from 'astro:content';

const modulesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    moduleNumber: z.number(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    examWeight: z.string().optional(),
  }),
});

export const collections = {
  modules: modulesCollection,
};
```

### 3.2 Astro Configuration (`astro.config.mjs`)
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    tailwind({ applyBaseStyles: true }),
    react(),
    mdx()
  ],
  output: 'static',
});
```

---

## 4. ขั้นตอนการส่งงานผ่าน Jules บนมือถือ (3 ขั้นตอน)

1. **Commit เอกสารขึ้น GitHub:** 
   * นำไฟล์โมดูล `content/module-*.md` และไฟล์ `JULES_TASK.md` นี้ขึ้นสู่ GitHub Repository ของคุณ
2. **เปิด Jules Web App:**
   * เข้าเว็บ [jules.google.com](https://jules.google.com) ด้วยบัญชี Google ที่ผูกกับ Google AI Pro
   * เลือก GitHub Repository ที่คุณสร้างไว้
3. **เริ่มภารกิจ (Start Task):**
   * ก๊อปปี้ข้อความในกล่อง **Quick Copy-Paste Prompt (หัวข้อ 1)** ส่งให้ Jules
   * Jules จะเปิด Cloud VM ขึ้นมาโคลนโค้ด วางแผนการเขียนไฟล์ รันคำสั่ง `npm install` และสร้าง Pull Request (PR) ให้คุณตรวจสอบและกด Merge ได้ทันที