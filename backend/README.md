# AITax Backend API

This is a placeholder for the backend API server.

## Planned Technology Stack

- **Framework**: Node.js + Express / Python + FastAPI
- **Database**: MySQL 8.0+
- **Authentication**: JWT tokens
- **AI Services**: OpenAI API for classification and chatbot

## API Endpoints (Planned)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

### Bank Transactions
- `POST /api/transactions/import` - Import bank statement CSV
- `GET /api/transactions` - Get all transactions
- `PUT /api/transactions/:id` - Update transaction category
- `POST /api/transactions/classify` - AI classification (Lite+)

### GST Returns
- `GET /api/gst/calculate` - Calculate GST for period
- `GET /api/gst/returns` - Get historical GST returns
- `POST /api/gst/submit` - Submit GST return to IRD (Enterprise)

### Contracts
- `GET /api/contracts` - Get all contracts
- `POST /api/contracts/generate` - AI contract generation (Enterprise)
- `GET /api/contracts/:id` - Get contract by ID
- `DELETE /api/contracts/:id` - Delete contract

### Payroll & Timesheets
- `GET /api/timesheets` - Get employee timesheets
- `POST /api/timesheets` - Create/update timesheet
- `GET /api/payroll` - Get payroll entries
- `POST /api/payroll/calculate` - Calculate payroll

### Invoices
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create invoice
- `PUT /api/invoices/:id` - Update invoice
- `POST /api/invoices/:id/send` - Send invoice via email

### Tax Reports
- `GET /api/reports/profit-loss` - Get P&L report
- `GET /api/reports/export` - Export report as PDF

### AI Assistant
- `POST /api/ai/tax-chat` - Tax knowledge chatbot (Lite+)
- `POST /api/ai/database-query` - Natural language DB query (Enterprise)

### Integrations
- `POST /api/integrations/bank/connect` - Connect bank account (Enterprise)
- `POST /api/integrations/ird/connect` - Connect to IRD (Enterprise)
- `GET /api/integrations/status` - Get integration status

## Database Schema (MySQL)

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  tier ENUM('free', 'lite', 'enterprise') DEFAULT 'free',
  subscription_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Bank Transactions Table
```sql
CREATE TABLE transactions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  category VARCHAR(100),
  category_ai VARCHAR(100),
  confidence DECIMAL(3,2),
  gst_applicable BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### GST Returns Table
```sql
CREATE TABLE gst_returns (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  period VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_income DECIMAL(15,2) NOT NULL,
  total_expense DECIMAL(15,2) NOT NULL,
  gst_collected DECIMAL(15,2) NOT NULL,
  gst_paid DECIMAL(15,2) NOT NULL,
  net_gst DECIMAL(15,2) NOT NULL,
  status ENUM('draft', 'submitted', 'paid') DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Contracts Table
```sql
CREATE TABLE contracts (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  type ENUM('employment', 'rental') NOT NULL,
  title VARCHAR(255) NOT NULL,
  party_a VARCHAR(255) NOT NULL,
  party_b VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  amount DECIMAL(15,2) NOT NULL,
  terms TEXT,
  status ENUM('active', 'expired', 'terminated') DEFAULT 'active',
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Invoices Table
```sql
CREATE TABLE invoices (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  subtotal DECIMAL(15,2) NOT NULL,
  gst DECIMAL(15,2) NOT NULL,
  total DECIMAL(15,2) NOT NULL,
  status ENUM('draft', 'sent', 'paid', 'overdue') DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Payroll Table
```sql
CREATE TABLE payroll (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  employee_id VARCHAR(36) NOT NULL,
  employee_name VARCHAR(255) NOT NULL,
  period VARCHAR(50) NOT NULL,
  gross_pay DECIMAL(15,2) NOT NULL,
  paye DECIMAL(15,2) NOT NULL,
  kiwisaver_employee DECIMAL(15,2) NOT NULL,
  kiwisaver_employer DECIMAL(15,2) NOT NULL,
  net_pay DECIMAL(15,2) NOT NULL,
  status ENUM('draft', 'processed', 'paid') DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Environment Variables Required

See `.env.example` in the root directory for all required environment variables.

## Setup Instructions (Future)

1. Install dependencies: `npm install` or `pip install -r requirements.txt`
2. Set up MySQL database
3. Configure environment variables in `.env`
4. Run migrations: `npm run migrate` or `python manage.py migrate`
5. Start server: `npm run dev` or `python app.py`

## Notes

- All monetary values use DECIMAL(15,2) for precision
- User tier determines feature access (enforced in middleware)
- AI features require OpenAI API key (Lite+ tiers)
- IRD and Bank integrations require additional API credentials (Enterprise only)
