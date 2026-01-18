// Mock data for the AI Tax System

export interface BankTransaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    categoryAI?: string; // AI suggested category
    confidence?: number; // AI confidence score
    gstApplicable: boolean;
    notes?: string;
}

export interface GSTReturn {
    id: string;
    period: string;
    startDate: string;
    endDate: string;
    totalIncome: number;
    totalExpense: number;
    gstCollected: number; // 15% of income
    gstPaid: number; // 15% of expenses
    netGST: number; // gstCollected - gstPaid (positive = pay IRD, negative = refund)
    status: 'draft' | 'submitted' | 'paid';
}

export interface Contract {
    id: string;
    type: 'employment' | 'rental';
    title: string;
    partyA: string; // Employer or Landlord
    partyB: string; // Employee or Tenant
    startDate: string;
    endDate?: string;
    amount: number; // Salary or Rent
    terms: string;
    status: 'active' | 'expired' | 'terminated';
    createdDate: string;
}

export interface Timesheet {
    id: string;
    employeeId: string;
    employeeName: string;
    weekStarting: string;
    weekEnding: string;
    hours: {
        monday: number;
        tuesday: number;
        wednesday: number;
        thursday: number;
        friday: number;
        saturday: number;
        sunday: number;
    };
    totalHours: number;
    hourlyRate: number;
    totalPay: number;
}

export interface PayrollEntry {
    id: string;
    employeeId: string;
    employeeName: string;
    period: string;
    grossPay: number;
    paye: number; // Tax
    kiwisaverEmployee: number; // 3% of gross
    kiwisaverEmployer: number; // 3% of gross
    netPay: number;
    status: 'draft' | 'processed' | 'paid';
}

export interface Invoice {
    id: string;
    invoiceNumber: string;
    clientName: string;
    clientEmail: string;
    issueDate: string;
    dueDate: string;
    items: {
        description: string;
        quantity: number;
        unitPrice: number;
        amount: number;
    }[];
    subtotal: number;
    gst: number;
    total: number;
    status: 'draft' | 'sent' | 'paid' | 'overdue';
}

export interface ProfitLossReport {
    year: number;
    revenue: {
        sales: number;
        services: number;
        other: number;
        total: number;
    };
    expenses: {
        salaries: number;
        rent: number;
        utilities: number;
        supplies: number;
        marketing: number;
        other: number;
        total: number;
    };
    grossProfit: number;
    operatingExpenses: number;
    netProfit: number;
}

export type UserTier = 'free' | 'lite' | 'enterprise';

export interface User {
    id: string;
    name: string;
    email: string;
    company: string;
    tier: UserTier;
    subscriptionDate: string;
}

// Mock Bank Transactions (ANZ format)
export const mockTransactions: BankTransaction[] = [
    {
        id: '1',
        date: '2025-12-15',
        description: 'Client Payment - ABC Ltd',
        amount: 5750.00,
        type: 'income',
        category: 'Sales Revenue',
        categoryAI: 'Sales Revenue',
        confidence: 0.95,
        gstApplicable: true,
        notes: 'Invoice #1234'
    },
    {
        id: '2',
        date: '2025-12-14',
        description: 'Office Supplies - Warehouse Stationery',
        amount: -345.60,
        type: 'expense',
        category: 'Office Supplies',
        categoryAI: 'Office Supplies',
        confidence: 0.92,
        gstApplicable: true,
    },
    {
        id: '3',
        date: '2025-12-13',
        description: 'Professional Services - Consulting',
        amount: 8625.00,
        type: 'income',
        category: 'Service Revenue',
        categoryAI: 'Service Revenue',
        confidence: 0.98,
        gstApplicable: true,
    },
    {
        id: '4',
        date: '2025-12-12',
        description: 'Rent Payment - Commercial Property',
        amount: -3500.00,
        type: 'expense',
        category: 'Rent',
        categoryAI: 'Rent',
        confidence: 0.99,
        gstApplicable: true,
    },
    {
        id: '5',
        date: '2025-12-10',
        description: 'Internet - Spark NZ',
        amount: -89.99,
        type: 'expense',
        category: 'Utilities',
        categoryAI: 'Utilities',
        confidence: 0.96,
        gstApplicable: true,
    },
    {
        id: '6',
        date: '2025-12-08',
        description: 'Software Subscription - Adobe',
        amount: -125.00,
        type: 'expense',
        category: 'Software',
        categoryAI: 'Software',
        confidence: 0.94,
        gstApplicable: true,
    },
    {
        id: '7',
        date: '2025-12-05',
        description: 'Client Payment - XYZ Corp',
        amount: 12650.00,
        type: 'income',
        category: 'Sales Revenue',
        categoryAI: 'Sales Revenue',
        confidence: 0.97,
        gstApplicable: true,
    },
    {
        id: '8',
        date: '2025-12-03',
        description: 'Marketing - Google Ads',
        amount: -850.00,
        type: 'expense',
        category: 'Marketing',
        categoryAI: 'Marketing',
        confidence: 0.93,
        gstApplicable: true,
    },
    {
        id: '9',
        date: '2025-11-28',
        description: 'Equipment Purchase - PB Tech',
        amount: -2400.00,
        type: 'expense',
        category: 'Equipment',
        categoryAI: 'Equipment',
        confidence: 0.91,
        gstApplicable: true,
    },
    {
        id: '10',
        date: '2025-11-25',
        description: 'Consulting Services Income',
        amount: 6500.00,
        type: 'income',
        category: 'Service Revenue',
        categoryAI: 'Service Revenue',
        confidence: 0.96,
        gstApplicable: true,
    },
];

// Mock GST Returns
export const mockGSTReturns: GSTReturn[] = [
    {
        id: '1',
        period: 'Nov 2025 - Dec 2025',
        startDate: '2025-11-01',
        endDate: '2025-12-31',
        totalIncome: 33525.00,
        totalExpense: 7310.59,
        gstCollected: 5028.75,
        gstPaid: 1096.59,
        netGST: 3932.16,
        status: 'draft'
    },
    {
        id: '2',
        period: 'Sep 2025 - Oct 2025',
        startDate: '2025-09-01',
        endDate: '2025-10-31',
        totalIncome: 28450.00,
        totalExpense: 6890.00,
        gstCollected: 4267.50,
        gstPaid: 1033.50,
        netGST: 3234.00,
        status: 'submitted'
    },
    {
        id: '3',
        period: 'Jul 2025 - Aug 2025',
        startDate: '2025-07-01',
        endDate: '2025-08-31',
        totalIncome: 31800.00,
        totalExpense: 7200.00,
        gstCollected: 4770.00,
        gstPaid: 1080.00,
        netGST: 3690.00,
        status: 'paid'
    }
];

// Mock Contracts
export const mockContracts: Contract[] = [
    {
        id: '1',
        type: 'employment',
        title: 'Full-time Employment Agreement',
        partyA: 'TechCorp NZ Ltd',
        partyB: 'John Smith',
        startDate: '2025-01-15',
        amount: 75000,
        terms: 'Full-time position, 40 hours per week, 4 weeks annual leave, 3% Kiwisaver',
        status: 'active',
        createdDate: '2025-01-10'
    },
    {
        id: '2',
        type: 'employment',
        title: 'Part-time Employment Agreement',
        partyA: 'TechCorp NZ Ltd',
        partyB: 'Sarah Johnson',
        startDate: '2025-03-01',
        amount: 45000,
        terms: 'Part-time position, 24 hours per week, 4 weeks annual leave, 3% Kiwisaver',
        status: 'active',
        createdDate: '2025-02-25'
    },
    {
        id: '3',
        type: 'rental',
        title: 'Commercial Lease Agreement',
        partyA: 'Smith Properties Ltd',
        partyB: 'TechCorp NZ Ltd',
        startDate: '2024-06-01',
        endDate: '2027-05-31',
        amount: 3500,
        terms: 'Monthly rent $3,500, 3-year lease, annual CPI increases',
        status: 'active',
        createdDate: '2024-05-15'
    }
];

// Mock Timesheets
export const mockTimesheets: Timesheet[] = [
    {
        id: '1',
        employeeId: 'emp1',
        employeeName: 'John Smith',
        weekStarting: '2025-12-09',
        weekEnding: '2025-12-15',
        hours: {
            monday: 8,
            tuesday: 8,
            wednesday: 8,
            thursday: 8,
            friday: 8,
            saturday: 0,
            sunday: 0
        },
        totalHours: 40,
        hourlyRate: 36.06,
        totalPay: 1442.40
    },
    {
        id: '2',
        employeeId: 'emp2',
        employeeName: 'Sarah Johnson',
        weekStarting: '2025-12-09',
        weekEnding: '2025-12-15',
        hours: {
            monday: 6,
            tuesday: 6,
            wednesday: 6,
            thursday: 6,
            friday: 0,
            saturday: 0,
            sunday: 0
        },
        totalHours: 24,
        hourlyRate: 35.90,
        totalPay: 861.60
    }
];

// Mock Payroll
export const mockPayroll: PayrollEntry[] = [
    {
        id: '1',
        employeeId: 'emp1',
        employeeName: 'John Smith',
        period: 'December 2025',
        grossPay: 6250.00,
        paye: 1187.50,
        kiwisaverEmployee: 187.50,
        kiwisaverEmployer: 187.50,
        netPay: 4875.00,
        status: 'processed'
    },
    {
        id: '2',
        employeeId: 'emp2',
        employeeName: 'Sarah Johnson',
        period: 'December 2025',
        grossPay: 3750.00,
        paye: 562.50,
        kiwisaverEmployee: 112.50,
        kiwisaverEmployer: 112.50,
        netPay: 3075.00,
        status: 'processed'
    }
];

// Mock Invoices
export const mockInvoices: Invoice[] = [
    {
        id: '1',
        invoiceNumber: 'INV-2025-001',
        clientName: 'ABC Limited',
        clientEmail: 'accounts@abc.co.nz',
        issueDate: '2025-12-01',
        dueDate: '2025-12-31',
        items: [
            {
                description: 'Consulting Services - December',
                quantity: 40,
                unitPrice: 125.00,
                amount: 5000.00
            }
        ],
        subtotal: 5000.00,
        gst: 750.00,
        total: 5750.00,
        status: 'paid'
    },
    {
        id: '2',
        invoiceNumber: 'INV-2025-002',
        clientName: 'XYZ Corporation',
        clientEmail: 'billing@xyz.co.nz',
        issueDate: '2025-12-05',
        dueDate: '2026-01-05',
        items: [
            {
                description: 'Software Development',
                quantity: 80,
                unitPrice: 135.00,
                amount: 10800.00
            },
            {
                description: 'Project Management',
                quantity: 20,
                unitPrice: 110.00,
                amount: 2200.00
            }
        ],
        subtotal: 13000.00,
        gst: 1950.00,
        total: 14950.00,
        status: 'sent'
    },
    {
        id: '3',
        invoiceNumber: 'INV-2025-003',
        clientName: 'Tech Innovations Ltd',
        clientEmail: 'finance@techinno.co.nz',
        issueDate: '2025-11-20',
        dueDate: '2025-12-20',
        items: [
            {
                description: 'AI Implementation Services',
                quantity: 60,
                unitPrice: 150.00,
                amount: 9000.00
            }
        ],
        subtotal: 9000.00,
        gst: 1350.00,
        total: 10350.00,
        status: 'overdue'
    }
];

// Mock Profit & Loss Reports
export const mockProfitLossReports: ProfitLossReport[] = [
    {
        year: 2025,
        revenue: {
            sales: 185000,
            services: 245000,
            other: 15000,
            total: 445000
        },
        expenses: {
            salaries: 180000,
            rent: 42000,
            utilities: 12000,
            supplies: 8500,
            marketing: 15000,
            other: 22000,
            total: 279500
        },
        grossProfit: 445000,
        operatingExpenses: 279500,
        netProfit: 165500
    },
    {
        year: 2024,
        revenue: {
            sales: 165000,
            services: 210000,
            other: 12000,
            total: 387000
        },
        expenses: {
            salaries: 155000,
            rent: 40000,
            utilities: 11000,
            supplies: 7500,
            marketing: 12000,
            other: 18000,
            total: 243500
        },
        grossProfit: 387000,
        operatingExpenses: 243500,
        netProfit: 143500
    }
];

// Mock Users
export const mockUsers: { [key in UserTier]: User } = {
    free: {
        id: 'user1',
        name: 'Demo User (Free)',
        email: 'free@example.co.nz',
        company: 'Startup NZ',
        tier: 'free',
        subscriptionDate: '2025-01-01'
    },
    lite: {
        id: 'user2',
        name: 'Demo User (Lite)',
        email: 'lite@example.co.nz',
        company: 'Growing Business Ltd',
        tier: 'lite',
        subscriptionDate: '2025-01-01'
    },
    enterprise: {
        id: 'user3',
        name: 'Demo User (Enterprise)',
        email: 'enterprise@example.co.nz',
        company: 'TechCorp NZ Ltd',
        tier: 'enterprise',
        subscriptionDate: '2025-01-01'
    }
};

// Feature access by tier
export const featureAccess = {
    free: [
        'bank-import',
        'manual-tagging',
        'gst-calculation',
        'tax-reports',
        'invoices'
    ],
    lite: [
        'bank-import',
        'manual-tagging',
        'gst-calculation',
        'ai-classification',
        'chatbot',
        'email-support',
        'tax-reports',
        'invoices'
    ],
    enterprise: [
        'bank-import',
        'manual-tagging',
        'gst-calculation',
        'ai-classification',
        'chatbot',
        'email-support',
        'contracts',
        'timesheets',
        'payroll',
        'ai-qna',
        'chat-database',
        'tax-reports',
        'invoices',
        'bank-integration',
        'ird-integration'
    ]
};

export function hasAccess(tier: UserTier, feature: string): boolean {
    return featureAccess[tier].includes(feature);
}

// Calculate summary statistics
export function calculateDashboardStats(transactions: BankTransaction[]) {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const gstCollected = totalIncome * 0.15;
    const gstPaid = totalExpenses * 0.15;
    const netGST = gstCollected - gstPaid;

    const profit = totalIncome - totalExpenses;

    return {
        totalIncome,
        totalExpenses,
        gstCollected,
        gstPaid,
        netGST,
        profit
    };
}
