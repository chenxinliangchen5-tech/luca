/*
# Portfolio Site Content & Contact Messages

1. Purpose
   - Stores all editable text/image content for a personal portfolio website so the owner can log in and edit everything from an admin panel.
   - Stores contact form submissions from visitors.

2. New Tables
   - `site_content`: single-row table holding all editable portfolio content as JSONB columns grouped by section (hero, about, skills, projects, education, contact, profile).
     - `id` (int, primary key, always 1)
     - `hero` (jsonb) — hero section text, buttons, avatar URL, core strengths
     - `about` (jsonb) — about paragraphs (zh/en), bullet points
     - `skills` (jsonb) — array of skill cards
     - `projects` (jsonb) — array of project cards with expandable details
     - `education` (jsonb) — education entries, certificates, honors
     - `contact` (jsonb) — email, wechat, phone, tagline
     - `updated_at` (timestamptz)
   - `contact_messages`: stores messages submitted via the contact form.
     - `id` (uuid, primary key)
     - `name` (text)
     - `email` (text)
     - `message` (text)
     - `created_at` (timestamptz)

3. Security
   - RLS enabled on both tables.
   - `site_content`: anyone (anon + authenticated) can SELECT so the public site renders; only authenticated (logged-in owner) can UPDATE. No INSERT or DELETE needed (single seeded row).
   - `contact_messages`: anyone can INSERT (visitors submit forms); only authenticated (owner) can SELECT and DELETE. No UPDATE needed.
*/

-- ────────────────────────────────────────
-- site_content
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_content (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  hero jsonb NOT NULL DEFAULT '{}'::jsonb,
  about jsonb NOT NULL DEFAULT '{}'::jsonb,
  skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  projects jsonb NOT NULL DEFAULT '[]'::jsonb,
  education jsonb NOT NULL DEFAULT '{}'::jsonb,
  contact jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_site_content" ON site_content;
CREATE POLICY "read_site_content" ON site_content
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "update_site_content" ON site_content;
CREATE POLICY "update_site_content" ON site_content
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- ────────────────────────────────────────
-- contact_messages
-- ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "insert_contact_messages" ON contact_messages;
CREATE POLICY "insert_contact_messages" ON contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "read_contact_messages" ON contact_messages;
CREATE POLICY "read_contact_messages" ON contact_messages
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "delete_contact_messages" ON contact_messages;
CREATE POLICY "delete_contact_messages" ON contact_messages
  FOR DELETE TO authenticated
  USING (true);

-- ────────────────────────────────────────
-- Seed default content
-- ────────────────────────────────────────
INSERT INTO site_content (id, hero, about, skills, projects, education, contact)
VALUES (
  1,
  '{
    "name": "陈新亮",
    "name_en": "Chen Xinliang",
    "title": "商务英语专业 | 立志成为专业的外贸业务员",
    "title_en": "Business English Major | Aspiring Foreign Trade Sales Representative",
    "tagline": "具备扎实的商务英语写作与沟通能力，拥有创业项目实践与多平台运营经验。做事主动踏实，学习能力强，愿意从基层业务岗位做起，快速熟悉产品开发与客户对接工作。",
    "tagline_en": "Solid business English writing and communication skills, with hands-on experience in entrepreneurial projects and multi-platform operations. Proactive, grounded, and a fast learner — ready to start from an entry-level business role and quickly get up to speed on product development and client communication.",
    "avatar": "",
    "buttons": {
      "primary": "查看实践项目",
      "primary_en": "View Projects",
      "secondary": "联系我",
      "secondary_en": "Contact Me"
    },
    "strengths": [
      {"icon": "Languages", "label": "英语能力", "label_en": "English Proficiency", "desc": "CET-4，商务英语写作扎实", "desc_en": "CET-4, solid business writing"},
      {"icon": "Users", "label": "团队协作", "label_en": "Teamwork", "desc": "部门负责人经验", "desc_en": "Team leadership experience"},
      {"icon": "GraduationCap", "label": "学习力", "label_en": "Fast Learner", "desc": "专业排名前40%", "desc_en": "Top 40% in major"},
      {"icon": "ShieldCheck", "label": "抗压", "label_en": "Resilience", "desc": "乐于接受业务挑战", "desc_en": "Thrives under pressure"}
    ]
  }'::jsonb,
  '{
    "paragraphs": [
      {
        "zh": "山西财经大学商务英语专业在读（2023–2027），专业排名前40%。系统学习商务英语、国际贸易实务、高级英语、商务英语写作、商务英语视听说等核心课程。",
        "en": "Undergraduate student of Business English at Shanxi University of Finance and Economics (2023–2027), ranked in the top 40% of the major. Has systematically studied core courses including Business English, International Trade Practice, Advanced English, Business English Writing, and Business English Audio-Visual-Speaking."
      },
      {
        "zh": "已通过大学英语四级，英语听说读写能力良好，正在备考六级。曾担任灯苗班部门职位负责人，具备团队管理与活动组织经验。",
        "en": "Passed CET-4 (College English Test Band 4) with good all-round English skills; currently preparing for CET-6. Served as a department lead in the Dengmiao Class, with experience in team management and event organization."
      },
      {
        "zh": "有小红书等平台运营实践经历，对市场与客户需求有一定敏感度。个人特质：做事主动踏实，抗压能力较好，乐于接受业务类岗位挑战，愿意深耕外贸业务。",
        "en": "Hands-on experience operating social commerce platforms such as Xiaohongshu, with a good sense of market and customer needs. Proactive, resilient, and eager to take on business-role challenges and build a long-term career in foreign trade."
      }
    ],
    "bullets": [
      {"zh": "商务英语专业在读，专业排名前40%", "en": "Business English major, top 40% in class"},
      {"zh": "大学英语四级（CET-4）", "en": "CET-4 certified"},
      {"zh": "灯苗班部门负责人，团队管理经验", "en": "Department lead in Dengmiao Class"},
      {"zh": "小红书等多平台运营实践", "en": "Multi-platform operations experience"}
    ]
  }'::jsonb,
  '[
    {"icon": "Languages", "title": "语言与商务写作", "title_en": "Language & Business Writing", "desc": "大学英语四级 + 商务英语写作课程扎实，具备基础外贸函电写作能力", "desc_en": "CET-4 + solid coursework in Business English Writing; capable of basic foreign-trade correspondence"},
    {"icon": "BookOpen", "title": "专业课程", "title_en": "Professional Courses", "desc": "国际贸易实务、商务英语写作、商务英语视听说等", "desc_en": "International Trade Practice, Business English Writing, Business English Audio-Visual-Speaking"},
    {"icon": "Wrench", "title": "工具技能", "title_en": "Tools", "desc": "Excel、PPT、Word、Access、XMind", "desc_en": "Excel, PowerPoint, Word, Access, XMind"},
    {"icon": "Users", "title": "实践能力", "title_en": "Practical Skills", "desc": "团队协作、活动组织、多平台运营（小红书、抖音、得物）、内容创作", "desc_en": "Teamwork, event organization, multi-platform operations (Xiaohongshu, Douyin, Dewu), content creation"},
    {"icon": "Sparkles", "title": "软技能", "title_en": "Soft Skills", "desc": "主动学习、抗压、细致、善于总结与复盘", "desc_en": "Proactive learning, resilience, attention to detail, strong at review and reflection"},
    {"icon": "TrendingUp", "title": "市场敏感度", "title_en": "Market Sensitivity", "desc": "通过多平台运营实践，对客户需求有较敏锐的感知", "desc_en": "Keen sense of customer needs developed through hands-on platform operations"}
  ]'::jsonb,
  '[
    {
      "title": "基于商务英语写作课程的外贸开发信与询盘回复模拟案例",
      "title_en": "Simulated Foreign-Trade Development Letter & Inquiry Response",
      "featured": true,
      "tags": ["商务英语写作应用", "客户沟通逻辑", "外贸基础流程理解"],
      "tags_en": ["Business Writing", "Client Communication", "Trade Process"],
      "summary": "针对家居小件消费品，模拟从市场定位到客户开发的完整流程，包含目标客户画像、英文开发信、模拟询盘与专业回复、跟进策略。",
      "summary_en": "Simulated end-to-end flow from market positioning to client development for small home goods — including target customer profile, English development letter, simulated inquiry with professional reply, and follow-up strategy.",
      "details": {
        "customer_profile": {
          "label": "目标客户画像",
          "label_en": "Target Customer Profile",
          "text": "北美中小型家居零售商 / 电商卖家，采购预算中等，注重性价比与稳定供货，偏好简洁高效的邮件沟通。",
          "text_en": "Small-to-mid North American home goods retailers / e-commerce sellers with mid-range budgets, value cost-performance and reliable supply, prefer concise and efficient email communication."
        },
        "dev_letter": {
          "label": "英文开发信",
          "label_en": "Development Letter",
          "text": "Subject: Reliable Home Accessories Supplier — Quality Products at Competitive Prices\n\nDear Purchasing Manager,\n\nI hope this message finds you well. My name is Chen Xinliang, representing a home accessories manufacturer based in China. We specialize in well-crafted, competitively priced home goods that sell well in North American retail and e-commerce channels.\n\nKey advantages:\n• Over 200 SKUs across kitchen, storage, and decor categories\n• Flexible MOQ starting from 500 units\n• 15–25 day production lead time\n• Full quality inspection before shipment\n\nI would welcome the opportunity to send you our latest catalog and samples. Please let me know if you would like to receive them.\n\nBest regards,\nChen Xinliang",
          "text_en": "Subject: Reliable Home Accessories Supplier — Quality Products at Competitive Prices\n\nDear Purchasing Manager,\n\nI hope this message finds you well. My name is Chen Xinliang, representing a home accessories manufacturer based in China. We specialize in well-crafted, competitively priced home goods that sell well in North American retail and e-commerce channels.\n\nKey advantages:\n• Over 200 SKUs across kitchen, storage, and decor categories\n• Flexible MOQ starting from 500 units\n• 15–25 day production lead time\n• Full quality inspection before shipment\n\nI would welcome the opportunity to send you our latest catalog and samples. Please let me know if you would like to receive them.\n\nBest regards,\nChen Xinliang"
        },
        "inquiry": {
          "label": "模拟客户询盘",
          "label_en": "Simulated Customer Inquiry",
          "text": "Hi Chen,\n\nThanks for reaching out. We are interested in your kitchen organizer series. Could you provide:\n1. Catalog with pricing for items suitable for online retail\n2. MOQ and lead time for a trial order\n3. Whether you support custom packaging\n\nLooking forward to your reply.",
          "text_en": "Hi Chen,\n\nThanks for reaching out. We are interested in your kitchen organizer series. Could you provide:\n1. Catalog with pricing for items suitable for online retail\n2. MOQ and lead time for a trial order\n3. Whether you support custom packaging\n\nLooking forward to your reply."
        },
        "reply": {
          "label": "专业回复",
          "label_en": "Professional Reply",
          "text": "Dear [Client],\n\nThank you for your interest in our kitchen organizer series. Please find the details below:\n\n1. Catalog & Pricing: Attached is our latest catalog with FOB pricing. Items marked with a star are our best-sellers for online retail.\n2. MOQ & Lead Time: Trial order MOQ is 500 units per SKU; production lead time is 20 days after deposit confirmation.\n3. Custom Packaging: Yes — we support custom retail packaging and barcoding. A one-time packaging setup fee applies, which is waived for orders over 2,000 units.\n\nI have also included a recommended trial-order bundle for your reference. Please let me know if you would like samples.\n\nBest regards,\nChen Xinliang",
          "text_en": "Dear [Client],\n\nThank you for your interest in our kitchen organizer series. Please find the details below:\n\n1. Catalog & Pricing: Attached is our latest catalog with FOB pricing. Items marked with a star are our best-sellers for online retail.\n2. MOQ & Lead Time: Trial order MOQ is 500 units per SKU; production lead time is 20 days after deposit confirmation.\n3. Custom Packaging: Yes — we support custom retail packaging and barcoding. A one-time packaging setup fee applies, which is waived for orders over 2,000 units.\n\nI have also included a recommended trial-order bundle for your reference. Please let me know if you would like samples.\n\nBest regards,\nChen Xinliang"
        },
        "followup": {
          "label": "跟进策略",
          "label_en": "Follow-up Strategy",
          "text": "发送后3个工作日未收到回复时，发送简短跟进邮件附上最新热销单品推荐；7天后若仍无回复，分享一条行业趋势短文保持触达，避免过度打扰。",
          "text_en": "If no reply within 3 business days, send a brief follow-up with a best-seller recommendation. After 7 days, share a short industry-trend article to stay on their radar without being intrusive."
        }
      },
      "note": "模拟实践项目，用于展示商务英语写作与外贸沟通思维",
      "note_en": "Simulated practice project — demonstrates business English writing and foreign-trade communication thinking"
    },
    {
      "title": "灯苗班大学生集体创业启蒙项目",
      "title_en": "Dengmiao Class Student Entrepreneurship Program",
      "featured": false,
      "tags": ["团队管理", "组织协调", "执行力"],
      "tags_en": ["Team Management", "Coordination", "Execution"],
      "summary": "担任部门职位负责人，统筹团队活动与任务落地，锻炼组织协调、团队管理与执行力。",
      "summary_en": "Served as department lead, coordinating team activities and task execution — developed organization, team management, and execution skills.",
      "timeline": [
        {"time": "阶段一", "time_en": "Phase 1", "event": "组建团队，明确分工与目标", "event_en": "Team formation, role assignment, and goal setting"},
        {"time": "阶段二", "time_en": "Phase 2", "event": "策划并落地团队活动与任务", "event_en": "Planned and executed team activities and tasks"},
        {"time": "阶段三", "time_en": "Phase 3", "event": "复盘总结，优化流程", "event_en": "Reviewed and optimized processes"}
      ],
      "note": "校园创业启蒙实践项目",
      "note_en": "Campus entrepreneurship program"
    },
    {
      "title": "小红书等平台营销与运营实践",
      "title_en": "Multi-Platform Marketing & Operations Practice",
      "featured": false,
      "tags": ["内容创作", "多平台运营", "市场敏感度"],
      "tags_en": ["Content Creation", "Multi-Platform Ops", "Market Sense"],
      "summary": "参与小红书、抖音、得物等多平台产品线上运营，熟悉内容创作与推广流程，提升市场敏感度与客户需求感知能力。",
      "summary_en": "Participated in online operations across Xiaohongshu, Douyin, and Dewu — familiar with content creation and promotion workflows, sharpening market sensitivity and customer-need awareness.",
      "metrics": [
        {"value": "50+", "label": "内容创作数量", "label_en": "Content pieces created"},
        {"value": "3", "label": "运营平台数", "label_en": "Platforms operated"},
        {"value": "小红书/抖音/得物", "label": "熟悉平台", "label_en": "Familiar platforms"}
      ],
      "note": "模拟数据，用于展示运营实践能力",
      "note_en": "Simulated data — illustrates operational capability"
    }
  ]'::jsonb,
  '{
    "school": "山西财经大学",
    "school_en": "Shanxi University of Finance and Economics",
    "degree": "商务英语本科",
    "degree_en": "B.A. in Business English",
    "period": "2023.09 – 2027.06",
    "rank": "专业排名前40%",
    "rank_en": "Top 40% in major",
    "majors": ["商务英语", "国际贸易实务", "商务英语写作", "高级英语", "商务英语视听说"],
    "majors_en": ["Business English", "International Trade Practice", "Business English Writing", "Advanced English", "Business English Audio-Visual-Speaking"],
    "certificates": [{"name": "大学英语四级", "name_en": "CET-4 (College English Test Band 4)"}],
    "honors": [{"name": "英语竞赛", "name_en": "English Competition"}]
  }'::jsonb,
  '{
    "email": "待补充",
    "wechat": "待补充",
    "phone": "待补充",
    "tagline": "欢迎通过邮件或微信与我联系，期待有机会加入外贸业务团队，从基层做起。",
    "tagline_en": "Feel free to reach out via email or WeChat. I look forward to the opportunity to join a foreign-trade team and grow from the ground up."
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;