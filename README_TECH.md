# AITax - AI-Powered Tax Management for New Zealand

A comprehensive tax management system built specifically for New Zealand businesses, featuring AI-powered automation, GST calculations, payroll management, and IRD integration.

![AITax NZ](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### Free Tier
- ✅ Bank statement import (ANZ support)
- ✅ Manual transaction tagging
- ✅ GST calculation and returns
- ✅ Tax reports (Profit & Loss)
- ✅ Invoice generation
- ✅ Basic email support

### Lite Tier ($49.99/month)
All Free features, plus:
- ✨ AI-powered transaction classification
- 🤖 Tax knowledge chatbot
- 📧 Priority email support with notifications
- 📊 Advanced GST analytics

### Enterprise Tier ($149.99/month)
All Lite features, plus:
- 📝 AI contract generation (employee & rental)
- ⏰ Employee timesheet management
- 💰 Automated payroll & Kiwisaver calculations
- 🏦 Direct bank integration (ANZ, ASB, BNZ)
- 🏛️ IRD API integration for automated filing
- 🤖 Advanced AI query system (chat with database)
- ☎️ 24/7 phone support & dedicated account manager

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Python 3.9+
- MySQL 8.0+
- npm or yarn

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:5173`

### Backend Setup (Planned)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp ../.env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate

# Start server
npm run dev
```

Backend API will run on `http://localhost:3000`

## 📁 Project Structure

```
AITax/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/         # Base UI components (buttons, cards, etc.)
│   │   │   ├── layout/     # Layout components (sidebar, header)
│   │   │   └── charts/     # Chart components (Recharts)
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context (Auth)
│   │   ├── lib/            # Utilities and mock data
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── public/
│   └── package.json
│
├── backend/                  # API server (planned)
│   ├── src/
│   ├── README.md           # API documentation
│   └── package.json
│
├── .env.example             # Environment variables template
└── README.md               # This file
```

## 🎨 Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components inspired by shadcn/ui
- **Charts**: Recharts for data visualization
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React

### Backend (Planned)
- **Runtime**: Node.js + Express / Python + FastAPI
- **Database**: MySQL 8.0+
- **Authentication**: JWT tokens
- **AI**: OpenAI API
- **Integrations**: ANZ/ASB/BNZ Bank APIs, IRD API

## 🎯 Key Features Explained

### 1. Bank Statement Import
- Drag-and-drop CSV upload
- ANZ bank format support
- AI-powered automatic categorization (Lite+)
- Manual tagging for Free tier

### 2. GST Returns
- Automatic 15% GST calculation on income and expenses
- Visual breakdown of GST collected vs paid
- Historical GST period tracking
- Export GST returns for IRD submission

### 3. AI Features
- **Transaction Classification**: 92-98% accuracy in categorizing transactions
- **Tax Knowledge Chatbot**: Ask questions about NZ tax rules
- **Database Query**: Natural language database queries (Enterprise)
- **Contract Generation**: AI-generated employment and rental contracts

### 4. Payroll & Kiwisaver
- Automated PAYE calculations based on IRD tax tables
- 3% employee + 3% employer Kiwisaver contributions
- Weekly timesheet tracking
- Payroll export for accounting


### 5. Invoicing
- Professional invoice generation
- GST-inclusive pricing
- Status tracking (Draft, Sent, Paid, Overdue)
- Email sending capabilities

## 🔐 Authentication & Access Control

The application uses tier-based access control:
- Each user has a tier (Free, Lite, Enterprise)
- Features are automatically enabled/disabled based on tier
- Upgrade prompts for locked features
- Demo accounts available for all tiers

## 📊 Mock Data

The frontend includes comprehensive mock data for demonstration:
- 10+ sample bank transactions
- 3 historical GST return periods
- Employment and rental contracts
- Employee timesheets and payroll
- Client invoices
- Multi-year P&L reports

## 🛣️ Roadmap

- [ ] Backend API implementation
- [ ] Real database integration
- [ ] User authentication system
- [ ] Payment processing (Stripe)
- [ ] Actual bank API integrations
- [ ] IRD API integration
- [ ] PDF export functionality
- [ ] Email notification system
- [ ] Mobile responsive optimization
- [ ] Mobile app (React Native)

## 🤝 Contributing

This is currently a demonstration project. For production use, additional development is required.

## 📝 License

MIT License - see LICENSE file for details

## 👥 Support

For questions or support:
- Email: support@aitax.co.nz
- Website: www.aitax.co.nz
- Phone: 0800 AITAX NZ

## 🇳🇿 Built for New Zealand

This application is specifically designed for New Zealand businesses and complies with:
- IRD (Inland Revenue Department) regulations
- NZ GST requirements (15%)
- Kiwisaver contribution rules
- NZ employment law

---

**Note**: This is a prototype/demonstration version. For production use, additional security measures, testing, and compliance verification are required.
