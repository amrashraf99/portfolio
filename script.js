/* ============================================================
   AMR ASHRAF PORTFOLIO — script.js
   Handles: Navbar, Scroll reveals, Skill bars, Filters,
            Project/Service/Course Modals, Forms, Floating UI
   ============================================================ */
 
/* ──────────────────────────────────────────────────────────────
   1. NAVBAR — scroll shrink + mobile toggle
────────────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
 
  // Shrink on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    // Show/hide back-to-top button
    const fabTop = document.querySelector('.fab-top');
    if (fabTop) fabTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
 
  // Mobile menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
 
  // Active link on scroll
  const sections  = document.querySelectorAll('section[id]');
  const allLinks  = document.querySelectorAll('.nav-links a[href^="#"]');
 
  const setActive = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    allLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };
 
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();
 
 
/* ──────────────────────────────────────────────────────────────
   2. SCROLL REVEAL
────────────────────────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
 
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
 
  els.forEach(el => io.observe(el));
})();
 
 
/* ──────────────────────────────────────────────────────────────
   3. SKILL BARS — animate on entering viewport
────────────────────────────────────────────────────────────── */
(function initSkillBars() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fills = e.target.querySelectorAll('.skill-bar-fill');
        fills.forEach(f => {
          f.style.width = f.dataset.pct + '%';
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
 
  const container = document.querySelector('#skills');
  if (container) io.observe(container);
})();
 
 
/* ──────────────────────────────────────────────────────────────
   4. SKILLS TABS
────────────────────────────────────────────────────────────── */
(function initSkillTabs() {
  const tabs   = document.querySelectorAll('.skill-tab');
  const panels = document.querySelectorAll('.skills-panel');
 
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t   => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(`skills-${target}`);
      if (panel) panel.classList.add('active');
    });
  });
})();
 
 
/* ──────────────────────────────────────────────────────────────
   5. PROJECT FILTER
────────────────────────────────────────────────────────────── */
(function initProjectFilter() {
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
 
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
 
      projectCards.forEach(card => {
        const match = cat === 'all' || card.dataset.category === cat;
        card.dataset.hidden = match ? 'false' : 'true';
        // Animate re-entry
        if (match) {
          card.style.animation = 'fadeInUp 0.4s ease both';
          setTimeout(() => { card.style.animation = ''; }, 500);
        }
      });
    });
  });
})();
 
 
/* ──────────────────────────────────────────────────────────────
   6. MODAL SYSTEM
────────────────────────────────────────────────────────────── */
const ModalSystem = (() => {
  const overlay = document.getElementById('modal-overlay');
  const modal   = document.getElementById('modal');
  if (!overlay || !modal) return { open: () => {} };
 
  const closeBtn = modal.querySelector('.modal-close');
 
  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };
 
  const open = (html) => {
    const contentEl = modal.querySelector('.modal-content');
    if (contentEl) contentEl.innerHTML = html;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
 
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
 
  return { open, close };
})();
 
 
/* ──────────────────────────────────────────────────────────────
   7. SERVICE MODALS — data definitions + trigger
────────────────────────────────────────────────────────────── */
const SERVICES = {
  s1: {
    tag: 'Accounting',
    title: 'Accounting Systems Setup',
    desc: 'End-to-end implementation and configuration of cloud accounting platforms (Daftra, Qoyod, Rawa, Wafiq, Phenix) tailored for small and medium enterprises in Saudi Arabia. From initial setup to ongoing monthly reporting.',
    steps: [
      'Assess current business workflow and data structure',
      'Configure chart of accounts aligned with GAAP & ZATCA requirements',
      'Migrate historical data and opening balances',
      'Set up automated invoicing, purchase orders and expense tracking',
      'Build monthly reporting templates for management review',
      'Train staff on daily usage and best practices',
    ],
    tools: ['Daftra', 'Qoyod', 'Rawa', 'Wafiq', 'Phenix', 'Excel', 'ZATCA Portal'],
    example: 'Migrated a contracting firm from spreadsheets to Daftra in under 3 weeks, reducing monthly close time by 60%.',
  },
  s2: {
    tag: 'Tax & Compliance',
    title: 'VAT & ZATCA Compliance',
    desc: 'Monthly and quarterly VAT filing, account reconciliation and audit-ready documentation. Ensuring full compliance with ZATCA regulations so businesses avoid penalties and pass audits confidently.',
    steps: [
      'Review and categorise all taxable transactions',
      'Reconcile VAT ledger with sales and purchase registers',
      'Prepare VAT return (Form 101) on the ZATCA portal',
      'Generate supporting schedules and exception reports',
      'Document all adjustments with proper audit trails',
      'Deliver a clean compliance summary to management',
    ],
    tools: ['ZATCA Portal', 'Excel', 'Qoyod', 'Daftra', 'Power Query'],
    example: 'Standardised the VAT workflow for a water company, reducing filing errors to near-zero across 9 consecutive months.',
  },
  s3: {
    tag: 'Finance',
    title: 'Financial Reporting & Analysis',
    desc: 'Custom Excel dashboards, cost models, and pricing analyses that transform raw journal entries into actionable management decisions. Covers income statements, balance sheets, cash flow projections, and job-costing.',
    steps: [
      'Gather and clean source data from accounting systems',
      'Build structured Excel models with automated formulas',
      'Create pivot-table dashboards with KPI summaries',
      'Conduct variance analysis and cost-driver identification',
      'Prepare executive summary with visual charts',
      'Schedule recurring model updates for ongoing monitoring',
    ],
    tools: ['Excel (Advanced)', 'Power Query', 'Pivot Tables', 'Daftra', 'Qoyod'],
    example: 'Built a manufacturing cost model linking 5 production stages to project-level profitability for a steel contracting firm.',
  },
  s4: {
    tag: 'Design',
    title: 'UI / UX Design',
    desc: 'Wireframes and high-fidelity Figma mockups for finance tools, admin dashboards, and SME web apps — with full Arabic/RTL support. Clean, user-tested designs ready for developer handoff.',
    steps: [
      'Conduct stakeholder interview to define user needs',
      'Sketch low-fidelity wireframes for key user flows',
      'Design high-fidelity Figma screens with design system',
      'Apply Arabic-first typography and RTL layout rules',
      'Prototype interactive flows for usability testing',
      'Package and deliver Figma file with style guide',
    ],
    tools: ['Figma', 'FigJam', 'Auto Layout', 'RTL Design', 'Iconify'],
    example: 'Designed a bilingual finance dashboard concept for Saudi SMEs — mobile-first, RTL-aware, with dark mode.',
  },
  s5: {
    tag: 'Frontend',
    title: 'Simple Websites & Landing Pages',
    desc: 'Responsive, fast-loading landing pages and small dashboards built with clean HTML, CSS, and JavaScript — or React/Tailwind for more interactive needs. No bloated frameworks, just solid code.',
    steps: [
      'Define scope: pages, sections, and interactive features',
      'Design component structure and responsive breakpoints',
      'Build semantic HTML with accessible markup',
      'Style with CSS variables or Tailwind utility classes',
      'Add smooth animations and micro-interactions',
      'Test across devices, optimise and deliver source files',
    ],
    tools: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'React', 'Vercel / Netlify'],
    example: 'Built this portfolio site as a fully bilingual (EN/AR) responsive site — 100 Lighthouse performance score on desktop.',
  },
  s6: {
    tag: 'Training',
    title: 'Excel Training Sessions',
    desc: 'Practical, hands-on Excel training tailored to finance and accounting teams. Covering advanced formulas, pivot tables, financial automation and dashboard building — sessions in Arabic or English.',
    steps: [
      'Assess current team skill level and pain points',
      'Design curriculum around real daily accounting tasks',
      'Deliver interactive session with live worked examples',
      'Provide take-home practice files and formula cheat-sheet',
      'Follow-up Q&A session one week later',
      'Optional: build a custom template for the team',
    ],
    tools: ['Excel (Advanced)', 'Power Query', 'Pivot Tables', 'XLOOKUP', 'Power BI (intro)'],
    example: 'Ran a 3-session Excel course for a 6-person accounting team, helping them reduce manual report time by 70%.',
  },
};
 
(function initServiceModals() {
  document.querySelectorAll('.service-card[data-service]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const id  = card.dataset.service;
      const svc = SERVICES[id];
      if (!svc) return;
 
      const stepsHTML = svc.steps.map((s, i) => `
        <div class="modal-step">
          <span class="step-num">${i + 1}</span>
          <span>${s}</span>
        </div>
      `).join('');
 
      const toolsHTML = svc.tools.map(t => `<span class="modal-tool">${t}</span>`).join('');
 
      const html = `
        <div class="modal-header">
          <div class="modal-tag">${svc.tag}</div>
          <h2 class="modal-title">${svc.title}</h2>
          <p class="modal-desc">${svc.desc}</p>
        </div>
        <div class="modal-section">
          <div class="modal-section-title">Workflow Steps</div>
          <div class="modal-steps">${stepsHTML}</div>
        </div>
        <div class="modal-section">
          <div class="modal-section-title">Tools Used</div>
          <div class="modal-tools-list">${toolsHTML}</div>
        </div>
        <div class="modal-section">
          <div class="modal-section-title">Real Example</div>
          <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.7;font-style:italic;">"${svc.example}"</p>
        </div>
        <div class="modal-ctas">
          <a href="mailto:amrashraf631@gmail.com?subject=Inquiry: ${svc.title}" class="btn btn-primary">✉ Email Me</a>
          <a href="https://wa.me/966569621221?text=Hi Amr, I'm interested in your ${svc.title} service." target="_blank" class="btn btn-ghost">💬 WhatsApp</a>
        </div>
      `;
 
      ModalSystem.open(html);
    });
  });
})();
 
 
/* ──────────────────────────────────────────────────────────────
   8. PROJECT MODALS
────────────────────────────────────────────────────────────── */
const PROJECTS = {
  p1: {
    tag: 'Accounting',
    title: 'Daftra Implementation — Modern Supplies',
    problem: 'A contracting company was managing all financial transactions in unstructured spreadsheets, causing delayed reports, reconciliation errors, and zero visibility into job-level costs.',
    solution: 'Migrated all data to Daftra, rebuilt the chart of accounts from scratch aligned with Saudi GAAP, automated recurring entries, and established a monthly close checklist.',
    tools: ['Daftra', 'Excel', 'ZATCA Portal', 'Power Query'],
    outcome: 'Monthly close time reduced from 5 days to under 1. Management reports delivered by the 3rd of each month without exception.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  },
  p2: {
    tag: 'Tax & Compliance',
    title: 'VAT Returns Workflow (ZATCA)',
    problem: 'Monthly VAT filings were inconsistent, error-prone, and often late — with no standardised checklist or audit trail.',
    solution: 'Designed a repeatable 6-step monthly VAT workflow: transaction categorisation → ledger reconciliation → portal submission → documentation → manager sign-off → archive.',
    tools: ['ZATCA Portal', 'Excel', 'Qoyod', 'Internal Controls'],
    outcome: 'Tax filing errors dropped to near-zero across 9 consecutive months. First audit passed without queries.',
    image: 'https://images.pexels.com/photos/7735778/pexels-photo-7735778.jpeg?w=1200',
  },
  p3: {
    tag: 'Cost Accounting',
    title: 'Cost Analysis Model — Manufacturing',
    problem: 'A steel manufacturing & installation firm had no visibility into which jobs were profitable. All costing was done manually by memory.',
    solution: 'Built a multi-stage Excel cost model covering: raw material procurement, cutting, painting, galvanising, installation and packaging — linked to job numbers and client invoices.',
    tools: ['Excel (Advanced)', 'Pivot Tables', 'Power Query', 'Named Ranges'],
    outcome: 'Identified 3 loss-making job types. Pricing strategy adjusted, improving average project margin by an estimated 12%.',
    image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=1200&q=80',
  },
  p4: {
    tag: 'UI Design',
    title: 'Finance Dashboard — UI Concept',
    problem: 'Most Arabic-language accounting tools have poor UI — cluttered layouts, poor RTL support and no mobile consideration.',
    solution: 'Designed a clean, Arabic-first finance dashboard in Figma. Used a card-based layout, dark mode, and clear visual hierarchy for KPIs, recent transactions, and budget tracking.',
    tools: ['Figma', 'Auto Layout', 'RTL Design', 'Iconify', 'Google Fonts (Cairo)'],
    outcome: 'Personal concept project — received positive feedback from peers on LinkedIn. Used as portfolio reference for UI/UX capability.',
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&q=80',
  },
  p5: {
    tag: 'Frontend',
    title: 'Personal Portfolio Site',
    problem: 'Needed a professional online presence that showcases both accounting expertise and frontend development skills — without relying on generic templates.',
    solution: 'Designed and built this portfolio from scratch: bilingual (EN/AR), responsive, single-page app with modular structure. Used Fraunces + DM Sans for a finance-meets-tech aesthetic.',
    tools: ['HTML5', 'CSS3 (Variables)', 'JavaScript (Vanilla)', 'Google Fonts', 'Netlify'],
    outcome: 'Live portfolio site — clean, fast, and SEO-optimised. Serves as a real working reference for frontend skills.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80',
  },
  p6: {
    tag: 'Inventory',
    title: 'Inventory Control Revamp — Masafi',
    problem: 'High stock variance in monthly inventory counts at a bottled water company — caused by poor reconciliation cadence and inconsistent counting procedures.',
    solution: 'Redesigned the stock-count procedure: introduced cycle counting, established reconciliation deadlines, and built an Excel tracker linking physical counts to system records.',
    tools: ['Excel', 'Internal Controls', 'Qoyod', 'Variance Analysis'],
    outcome: 'Stock variance reduced by an estimated 70% within 2 months. Zero stock-related audit findings in the following quarter.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  },
};
 
(function initProjectModals() {
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const id  = card.dataset.project;
      const prj = PROJECTS[id];
      if (!prj) return;
 
      const toolsHTML = prj.tools.map(t => `<span class="modal-tool">${t}</span>`).join('');
 
      const html = `
        <div class="modal-header">
          <div class="modal-tag">${prj.tag}</div>
          <h2 class="modal-title">${prj.title}</h2>
        </div>
        <img src="${prj.image}" alt="${prj.title}" style="width:100%;height:200px;object-fit:cover;border-radius:12px;margin-bottom:1.5rem;filter:brightness(0.8) saturate(0.7);">
        <div class="modal-section">
          <div class="modal-section-title">The Problem</div>
          <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.7;">${prj.problem}</p>
        </div>
        <div class="modal-section">
          <div class="modal-section-title">The Solution</div>
          <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.7;">${prj.solution}</p>
        </div>
        <div class="modal-section">
          <div class="modal-section-title">Outcome</div>
          <p style="font-size:0.9rem;color:var(--gold-light);line-height:1.7;font-style:italic;">"${prj.outcome}"</p>
        </div>
        <div class="modal-section">
          <div class="modal-section-title">Tools Used</div>
          <div class="modal-tools-list">${toolsHTML}</div>
        </div>
        <div class="modal-ctas">
          <a href="mailto:amrashraf631@gmail.com?subject=Project Inquiry" class="btn btn-primary">✉ Discuss a Project</a>
          <a href="https://wa.me/966569621221" target="_blank" class="btn btn-ghost">💬 WhatsApp</a>
        </div>
      `;
 
      ModalSystem.open(html);
    });
  });
})();
 
 
/* ──────────────────────────────────────────────────────────────
   9. COURSE MODALS
────────────────────────────────────────────────────────────── */
const COURSES = {
  c1: {
    icon: '📊',
    title: 'Advanced Excel for Finance',
    source: 'Edraak Platform',
    desc: 'Comprehensive course covering advanced formulas (XLOOKUP, INDEX-MATCH, array formulas), Power Query for data transformation, Pivot Tables for financial reporting, and dashboard automation.',
    topics: ['XLOOKUP & Dynamic Arrays', 'Power Query & Data Cleaning', 'Financial Dashboards', 'VBA Macro Basics', 'Scenario & Sensitivity Analysis'],
  },
  c2: {
    icon: '🎓',
    title: 'Financial Accounting Fundamentals',
    source: 'Mansoura University',
    desc: 'Formal university curriculum covering the full accounting cycle: journal entries, ledgers, trial balance, income statement, balance sheet and cash flow statement preparation.',
    topics: ['Double-Entry Bookkeeping', 'Financial Statements', 'Adjusting Entries', 'Closing Entries', 'Accounting Ethics'],
  },
  c3: {
    icon: '🏭',
    title: 'Cost Accounting for Industrial Companies',
    source: 'Professional Certificate',
    desc: 'Specialised course covering job-order costing, process costing, overhead allocation, standard costing, variance analysis and cost-volume-profit analysis for manufacturing firms.',
    topics: ['Job-Order vs Process Costing', 'Overhead Allocation', 'Standard Costs & Variances', 'CVP Analysis', 'Activity-Based Costing'],
  },
  c4: {
    icon: '🏗️',
    title: 'Contracting Accounting',
    source: 'Professional Certificate',
    desc: 'Industry-specific accounting for construction and contracting companies — covering percentage-of-completion method, contract cost tracking, retention management, and project profitability analysis.',
    topics: ['Percentage-of-Completion Method', 'Contract Cost Tracking', 'Retention & Milestone Billing', 'Subcontractor Management', 'Project P&L Reporting'],
  },
  c5: {
    icon: '💼',
    title: 'Full Financial Accounting Course',
    source: 'Professional Certificate',
    desc: 'End-to-end practical accounting course covering everything from recording the first entry to preparing audited financial statements — with hands-on case studies using real Saudi company scenarios.',
    topics: ['Accounting Cycle Mastery', 'VAT Treatment', 'Bank Reconciliation', 'Payroll Accounting', 'Financial Statement Analysis'],
  },
  c6: {
    icon: '📋',
    title: 'VAT Accounting & Tax Returns',
    source: 'Professional Certificate',
    desc: 'Saudi-specific VAT course covering ZATCA regulations, input/output tax, VAT filing procedures, exemptions, penalties, and end-to-end return preparation using the ZATCA e-portal.',
    topics: ['VAT Fundamentals (ZATCA)', 'Input vs Output Tax', 'VAT Return Filing', 'Exempt & Zero-Rated Supplies', 'Audit Preparation'],
  },
};
 
(function initCourseModals() {
  document.querySelectorAll('.course-card[data-course]').forEach(card => {
    card.addEventListener('click', () => {
      const id  = card.dataset.course;
      const crs = COURSES[id];
      if (!crs) return;
 
      const topicsHTML = crs.topics.map(t => `
        <div class="modal-step">
          <span style="color:var(--gold);flex-shrink:0;">✓</span>
          <span>${t}</span>
        </div>
      `).join('');
 
      const html = `
        <div class="modal-header">
          <div style="font-size:3rem;margin-bottom:0.75rem;">${crs.icon}</div>
          <div class="modal-tag">${crs.source}</div>
          <h2 class="modal-title">${crs.title}</h2>
          <p class="modal-desc">${crs.desc}</p>
        </div>
        <div class="modal-section">
          <div class="modal-section-title">Topics Covered</div>
          <div class="modal-steps">${topicsHTML}</div>
        </div>
        <div class="modal-ctas">
          <a href="mailto:amrashraf631@gmail.com" class="btn btn-primary">✉ Ask About This</a>
        </div>
      `;
 
      ModalSystem.open(html);
    });
  });
})();
 
 
/* ──────────────────────────────────────────────────────────────
   10. CONTACT FORM
────────────────────────────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
 
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();
 
    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
 
    // Open mailto — works without a backend
    const mailtoLink = `mailto:amrashraf631@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
    showToast('Opening your email client…', 'success');
    form.reset();
  });
})();
 
 
/* ──────────────────────────────────────────────────────────────
   11. TOAST NOTIFICATION
────────────────────────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
 
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    background: type === 'error' ? 'var(--red)' : 'var(--gold)',
    color: 'var(--bg)',
    padding: '0.75rem 1.5rem',
    borderRadius: '100px',
    fontSize: '0.88rem',
    fontWeight: '600',
    zIndex: '9999',
    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
    animation: 'fadeInUp 0.3s ease',
  });
 
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
 
 
/* ──────────────────────────────────────────────────────────────
   12. BACK TO TOP
────────────────────────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.querySelector('.fab-top');
  if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
 