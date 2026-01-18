import React from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface CashFlowData {
    month: string;
    income: number;
    expenses: number;
}

const cashFlowData: CashFlowData[] = [
    { month: 'Jul', income: 31800, expenses: 7200 },
    { month: 'Aug', income: 29500, expenses: 6800 },
    { month: 'Sep', income: 28450, expenses: 6890 },
    { month: 'Oct', income: 30200, expenses: 7100 },
    { month: 'Nov', income: 33525, expenses: 7310 },
    { month: 'Dec', income: 35100, expenses: 7800 },
];

export function CashFlowChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cash Flow Trend</CardTitle>
                <CardDescription>Last 6 months income vs expenses</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={cashFlowData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-sm" />
                        <YAxis className="text-sm" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                            }}
                            formatter={(value: number) => formatCurrency(value)}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#00B4D8"
                            strokeWidth={3}
                            dot={{ fill: '#00B4D8', r: 4 }}
                            name="Income"
                        />
                        <Line
                            type="monotone"
                            dataKey="expenses"
                            stroke="#FF6B6B"
                            strokeWidth={3}
                            dot={{ fill: '#FF6B6B', r: 4 }}
                            name="Expenses"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export function GSTChart() {
    const data = [
        { period: 'Jul-Aug', collected: 4770, paid: 1080, net: 3690 },
        { period: 'Sep-Oct', collected: 4267.5, paid: 1033.5, net: 3234 },
        { period: 'Nov-Dec', collected: 5028.75, paid: 1096.59, net: 3932.16 },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>GST Summary</CardTitle>
                <CardDescription>GST collected vs paid by period</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="period" className="text-sm" />
                        <YAxis className="text-sm" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                            }}
                            formatter={(value: number) => formatCurrency(value)}
                        />
                        <Legend />
                        <Bar dataKey="collected" fill="#00B4D8" name="GST Collected" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="paid" fill="#2D6A4F" name="GST Paid" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="net" fill="#FF6B6B" name="Net GST" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export function ExpenseBreakdownChart() {
    const data = [
        { name: 'Rent', value: 3500, color: '#00B4D8' },
        { name: 'Salaries', value: 2304, color: '#0077B6' },
        { name: 'Equipment', value: 2400, color: '#2D6A4F' },
        { name: 'Marketing', value: 850, color: '#90E0EF' },
        { name: 'Software', value: 125, color: '#03045E' },
        { name: 'Other', value: 631, color: '#C1C1C1' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Current month expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export function IncomeChart() {
    const data = [
        { month: 'Jul', sales: 11800, services: 20000 },
        { month: 'Aug', sales: 12500, services: 17000 },
        { month: 'Sep', sales: 10450, services: 18000 },
        { month: 'Oct', sales: 13200, services: 17000 },
        { month: 'Nov', sales: 14025, services: 19500 },
        { month: 'Dec', sales: 16100, services: 19000 },
    ];

    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Income Breakdown</CardTitle>
                <CardDescription>Sales vs Services revenue</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-sm" />
                        <YAxis className="text-sm" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                            }}
                            formatter={(value: number) => formatCurrency(value)}
                        />
                        <Legend />
                        <Bar dataKey="sales" stackId="a" fill="#00B4D8" name="Sales" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="services" stackId="a" fill="#2D6A4F" name="Services" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
