# 🌍 EcoSphere — Enterprise ESG Management Platform

> An enterprise-grade Environmental, Social, and Governance (ESG) Management Platform built for the Odoo Hackathon. EcoSphere empowers organizations to track, analyze, and improve their sustainability performance through intelligent automation, gamification, and AI-powered insights.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    UI Layer                          │
│        Next.js App Router + React Components        │
├─────────────────────────────────────────────────────┤
│                Client State Layer                   │
│              Zustand State Management               │
├─────────────────────────────────────────────────────┤
│                   API Layer                         │
│             Next.js Route Handlers                  │
├─────────────────────────────────────────────────────┤
│               Service / ORM Layer                   │
│               Prisma ORM + SQLite                   │
├─────────────────────────────────────────────────────┤
│                  Database                           │
│          SQLite (dev) / PostgreSQL (prod)            │
└─────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

| Layer           | Technology                         |
|-----------------|-------------------------------------|
| Framework       | Next.js 16 (App Router)            |
| Language        | TypeScript (strict mode)           |
| Styling         | Tailwind CSS v4                    |
| State Mgmt      | Zustand                            |
| ORM             | Prisma 5                           |
| Database        | SQLite (dev) / PostgreSQL (prod)   |
| Auth            | NextAuth.js (Credentials Provider) |
| Charts          | Recharts                           |
| Forms           | React Hook Form + Zod              |
| Icons           | Lucide React                       |
| Notifications   | Sonner                             |

## ✨ Features

### 📊 Executive Dashboard
- Real-time ESG Score calculation (weighted: Env 40%, Social 30%, Gov 30%)
- Carbon footprint tracking with live data
- Department rankings with dynamic scoring
- Compliance alerts with severity indicators
- Employee leaderboard and gamification stats

### 🌿 Environmental Module
- Carbon transaction management (CRUD)
- Auto-emission calculation using configurable emission factors
- Department-level emission breakdown
- Active sustainability goal tracking
- Emission factor library

### 👥 Social & Gamification
- CSR activity tracking with participation workflow
- XP-based gamification system
- Badge auto-awarding with configurable thresholds
- Rewards catalog with XP redemption and stock management
- Diversity metrics dashboard
- Employee leaderboard

### ⚖️ Governance
- Audit tracking and compliance issue management
- Policy acknowledgement workflow with reminders
- Issue resolution timeline visualization
- Compliance status tracking (Open → Investigating → Resolved)
- Automated overdue issue detection

### 📈 Reports
- Custom report builder with dynamic filters
- Department, date range, category, and employee filters
- Mock PDF/CSV export functionality

### 🤖 AI Copilot
- Interactive ESG intelligence assistant
- Pre-built analyses: Executive Summary, Carbon Trends, Risk Analysis, Sustainability Recommendations
- Context-aware responses using live platform data
- Conversation history with persistent sessions

### ⚙️ Settings & Master Data
- Configurable business rules (auto-emission, evidence requirements, badge auto-award)
- Notification preferences management
- Master data CRUD for departments, categories, emission factors, policies

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/RajvardhanS-Patil/EcoSphere-ESG-Management-Platform.git
cd EcoSphere-ESG-Management-Platform

# Install dependencies
npm install

# Set up the database
npx prisma db push
npx prisma generate

# Seed demo data (optional)
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/                # REST API route handlers
│   │   ├── auth/           # NextAuth.js authentication
│   │   └── master-data/    # Master data endpoints
│   ├── ai/                 # AI Copilot page
│   ├── environmental/      # Environmental tracking page
│   ├── governance/         # Governance & compliance page
│   ├── reports/            # Custom reports page
│   ├── settings/           # Settings & master data page
│   └── social/             # Social & gamification page
├── components/
│   ├── shared/             # Reusable components (KPICard, SectionHeader, etc.)
│   └── ui/                 # shadcn/ui components
├── layouts/                # MainLayout, SideNavBar, TopNavBar
├── lib/
│   ├── mock/               # Static mock data for UI components
│   ├── prisma.ts           # Prisma client singleton
│   └── utils.ts            # Utility functions
├── modules/                # Feature-specific components
│   ├── ai/                 # AI Copilot components
│   ├── dashboard/          # Dashboard widgets
│   ├── environmental/      # Environmental module components
│   ├── governance/         # Governance module components
│   ├── reports/            # Report builder components
│   ├── settings/           # Settings components
│   └── social/             # Social & gamification components
├── stores/                 # Zustand state stores
│   ├── environmentalStore  # Carbon transactions state
│   ├── governanceStore     # Audits, issues, policies state
│   ├── masterDataStore     # Departments, categories, etc.
│   ├── notificationStore   # Notification management
│   ├── scoreStore          # ESG score calculation engine
│   ├── settingsStore       # Business rule configuration
│   └── socialGamificationStore  # CSR, XP, badges, rewards
└── prisma/
    ├── schema.prisma       # Database schema
    └── seed.ts             # Database seeding script
```

## 🔮 Future Scope

- **Live AI Integration:** Connect to OpenAI/Gemini APIs for real-time ESG analysis
- **Role-Based Dashboards:** Customized views for Admin, Manager, and Employee roles
- **Real-time Notifications:** WebSocket-based live notification system
- **Advanced Analytics:** Predictive carbon modeling and trend forecasting
- **Multi-tenant Support:** Organization-level data isolation
- **Mobile App:** React Native companion app for field workers
- **Odoo Integration:** Direct ERP module integration via XML-RPC

## 📝 License

Built for the Odoo Hackathon 2024-25.
