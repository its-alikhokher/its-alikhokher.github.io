/*  Apne projects yahan add / edit karein.
 *  Naya project sabse upar (newest -> oldest).
 *  Fields: title, date, description, tags[], repo (optional), demo (optional)
 */
window.PROJECTS = [
  {
    title: "CMS — Clinic Management System (Gainhis)",
    date: "Feb 2025 – Nov 2025",
    description:
      "Full clinic management system for a Saudi healthcare provider on Frappe/ERPNext — patient registration, appointments, EHR with role-based access, billing and inventory. Pharmacy and diagnostics connected through custom APIs, bilingual Arabic/English UI, and real-time dashboards for patient flow, revenue and staff performance. Billing and insurance claim cycles cut admin workload by ~40%.",
    tags: ["Frappe", "ERPNext", "Healthcare", "Team Lead"],
    demo: "https://cms.gainhis.com"
  },
  {
    title: "SAM — Municipal Management System (Fraijanes, Guatemala)",
    date: "Mar 2024 – Jan 2025",
    description:
      "Municipal ERP for the Fraijanes government: revenue management, public works, citizen services and financial reporting. Permit, licensing and service-request workflows cut manual effort by ~50%; role-based departmental permissions, budgeting dashboards and custom APIs for interdepartmental data. Delivered with 99% uptime and zero critical issues.",
    tags: ["Frappe", "ERPNext", "Government", "Tech Lead"],
    demo: "https://sam.fraijanes.gt"
  },
  {
    title: "Safdar Hotel",
    date: "Aug 2026",
    description:
      "Hotel website with rooms, booking enquiries and gallery. Built with TypeScript / Next.js and deployed on Vercel.",
    tags: ["TypeScript", "Next.js", "Vercel"],
    repo: "https://github.com/its-alikhokher/safdar-hotel",
    demo: "https://safdar-hotel.vercel.app"
  },
  {
    title: "FlyRank ML",
    date: "Aug 2026",
    description:
      "A machine-learning experiment for ranking flight search results — Python-based ranking model.",
    tags: ["Python", "Machine Learning"],
    repo: "https://github.com/its-alikhokher/flyrank-ml"
  },
  {
    title: "Swift Theme",
    date: "Jul 2026",
    description:
      "A modern UI theme for Frappe Framework and ERPNext v16 — improves the look and feel of the whole app while staying compatible with the core framework.",
    tags: ["Frappe", "ERPNext", "CSS", "Open source"],
    repo: "https://github.com/its-alikhokher/swift_theme"
  },
  {
    title: "Frappe / ERPNext v16 on Ubuntu 24.04",
    date: "Jul 2026",
    description:
      "A step-by-step installation guide — from bench setup to production deployment on Ubuntu 24.04 LTS.",
    tags: ["ERPNext", "Ubuntu", "Guide"],
    repo: "https://github.com/its-alikhokher/Frappe-ERPNext-Version-16--in-Ubuntu-24.04-LTS"
  },
  {
    title: "Alkhidmat HR Platform",
    date: "Jan 2025 – Jun 2026",
    description:
      "Integrated HR platform on Frappe/ERPNext HRMS with 60+ custom DocTypes: a multi-level approval workflow engine with dynamic approver resolution, ZKTeco biometric integration with GPS geofenced check-in, an automated payroll deduction engine, a React employee self-service portal on 30+ REST APIs, and a Vue/Ionic PWA with Firebase push notifications.",
    tags: ["Frappe", "HRMS", "React", "Vue / Ionic"]
  },
  {
    title: "Is it Alzheimer's or Dementia?",
    date: "Jul 2026",
    description:
      "A small web tool that explains the difference between the two conditions through simple questions and plain-language answers.",
    tags: ["JavaScript", "Web"],
    repo: "https://github.com/its-alikhokher/is-it-alzheimers-dementia"
  },
  {
    title: "Frappe Enhanced Calendar View",
    date: "Feb 2026",
    description:
      "A better calendar view for Frappe v15 — more readable layout and improved event handling.",
    tags: ["Frappe", "JavaScript", "Open source"],
    repo: "https://github.com/its-alikhokher/Frappe_Enhance_Calender_view"
  },
  {
    title: "ZKT Integration",
    date: "Feb 2026",
    description:
      "Syncs employee check-ins from ZKTeco biometric devices straight into ERPNext HRMS, with cloud sync and geofenced validation.",
    tags: ["Python", "HRMS", "Biometrics", "Open source"],
    repo: "https://github.com/its-alikhokher/zkt_integration"
  },
  {
    title: "PostgreSQL Setup Scripts",
    date: "Feb 2026",
    description:
      "Shell scripts for a quick PostgreSQL setup — install, user/database creation and basic tuning.",
    tags: ["Shell", "PostgreSQL", "DevOps"],
    repo: "https://github.com/its-alikhokher/postgresql"
  },
  {
    title: "POS Awesome (Vue)",
    date: "Jul 2025",
    description:
      "Work on the open-source Point of Sale for ERPNext — a touch-friendly POS screen built with Vue.js and Vuetify.",
    tags: ["Vue", "ERPNext", "POS"],
    repo: "https://github.com/its-alikhokher/posawesome"
  },
  {
    title: "Frappe Enhanced Grid View",
    date: "Jun 2025",
    description:
      "Upgrades Frappe's child-table grid — faster inline editing and bulk data entry.",
    tags: ["Frappe", "JavaScript", "Open source"],
    repo: "https://github.com/its-alikhokher/frappe_enhanced_gridview"
  },
  {
    title: "Mubtkir Business Solution",
    date: "Jul 2023 – Feb 2024",
    description:
      "Tailored ERPNext solution for a digital solutions provider: project tracking, resource planning, client handling and billing automation, with lifecycle workflows from lead to invoice, revenue/profitability dashboards and RESTful integrations with third-party tools.",
    tags: ["ERPNext", "Automation", "APIs"],
    demo: "https://www.mubtkir.com/"
  },
  {
    title: "Offerter",
    date: "Nov 2024",
    description:
      "A lightweight HTML-based tool for creating and sharing quotations and offers.",
    tags: ["HTML", "Tool"],
    repo: "https://github.com/its-alikhokher/offerter"
  },
  {
    title: "Petty Cash",
    date: "Jul 2024",
    description:
      "Petty cash management app for ERPNext — recording small daily expenses with an approval flow.",
    tags: ["Python", "ERPNext"],
    repo: "https://github.com/its-alikhokher/petty_cash"
  },
  {
    title: "ERP for a Spanish Client",
    date: "Nov 2022 – Apr 2023",
    description:
      "ERPNext rollout adapted to Spanish business needs — inventory, sales, purchasing, accounting and reporting. Approval workflows cut document processing time by ~45%, with multilingual Spanish/English support, GDPR compliance, a custom HTML/CSS/JS UI and custom API integrations.",
    tags: ["ERPNext", "Multilingual", "GDPR"]
  }
];
