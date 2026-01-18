import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { BarChart3, Download, TrendingUp } from 'lucide-react';
import { mockProfitLossReports } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TaxReports = () => {
    const currentReport = mockProfitLossReports[0];
    const previousReport = mockProfitLossReports[1];

    const comparisonData = [
        {
            category: 'Revenue',
            current: currentReport.revenue.total,
            previous: previousReport.revenue.total,
        },
        {
            category: 'Expenses',
            current: currentReport.expenses.total,
            previous: previousReport.expenses.total,
        },
        {
            category: 'Net Profit',
            current: currentReport.netProfit,
            previous: previousReport.netProfit,
        },
    ];

    const revenueBreakdown = [
        { name: 'Sales', value: currentReport.revenue.sales },
        { name: 'Services', value: currentReport.revenue.services },
        { name: 'Other', value: currentReport.revenue.other },
    ];

    const expenseBreakdown = [
        { name: 'Salaries', value: currentReport.expenses.salaries },
        { name: 'Rent', value: currentReport.expenses.rent },
        { name: 'Utilities', value: currentReport.expenses.utilities },
        { name: 'Supplies', value: currentReport.expenses.supplies },
        { name: 'Marketing', value: currentReport.expenses.marketing },
        { name: 'Other', value: currentReport.expenses.other },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Annual Tax Report</h2>
                    <p className="text-muted-foreground">Profit & Loss Statement for {currentReport.year}</p>
                </div>
                <div className="flex gap-2">
                    <Select defaultValue={currentReport.year.toString()}>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                    </Select>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600">
                            {formatCurrency(currentReport.revenue.total)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            +{(((currentReport.revenue.total - previousReport.revenue.total) / previousReport.revenue.total) * 100).toFixed(1)}% vs {previousReport.year}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Expenses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-600">
                            {formatCurrency(currentReport.expenses.total)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            +{(((currentReport.expenses.total - previousReport.expenses.total) / previousReport.expenses.total) * 100).toFixed(1)}% vs {previousReport.year}
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-primary">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Net Profit
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-primary">
                            {formatCurrency(currentReport.netProfit)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            +{(((currentReport.netProfit - previousReport.netProfit) / previousReport.netProfit) * 100).toFixed(1)}% vs {previousReport.year}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Year-over-Year Comparison */}
            <Card>
                <CardHeader>
                    <CardTitle>Year-over-Year Comparison</CardTitle>
                    <CardDescription>Compare {currentReport.year} vs {previousReport.year}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={comparisonData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Legend />
                            <Bar dataKey="previous" fill="#94A3B8" name={previousReport.year.toString()} radius={[8, 8, 0, 0]} />
                            <Bar dataKey="current" fill="#00B4D8" name={currentReport.year.toString()} radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Revenue Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Breakdown</CardTitle>
                        <CardDescription>Total: {formatCurrency(currentReport.revenue.total)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={revenueBreakdown} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={80} />
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                <Bar dataKey="value" fill="#2D6A4F" radius={[0, 8, 8, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Expense Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Expense Breakdown</CardTitle>
                        <CardDescription>Total: {formatCurrency(currentReport.expenses.total)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={expenseBreakdown} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={80} />
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                <Bar dataKey="value" fill="#FF6B6B" radius={[0, 8, 8, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Full P&L Statement */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Profit & Loss Statement - {currentReport.year}
                    </CardTitle>
                    <CardDescription>Detailed financial report for annual tax filing</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Revenue Section */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Revenue</h4>
                            <div className="space-y-1 pl-4">
                                <div className="flex justify-between text-sm">
                                    <span>Sales</span>
                                    <span>{formatCurrency(currentReport.revenue.sales)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Services</span>
                                    <span>{formatCurrency(currentReport.revenue.services)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Other Income</span>
                                    <span>{formatCurrency(currentReport.revenue.other)}</span>
                                </div>
                                <div className="border-t pt-1 flex justify-between font-bold">
                                    <span>Total Revenue</span>
                                    <span className="text-green-600">{formatCurrency(currentReport.revenue.total)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Expenses Section */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Expenses</h4>
                            <div className="space-y-1 pl-4">
                                <div className="flex justify-between text-sm">
                                    <span>Salaries & Wages</span>
                                    <span>{formatCurrency(currentReport.expenses.salaries)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Rent</span>
                                    <span>{formatCurrency(currentReport.expenses.rent)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Utilities</span>
                                    <span>{formatCurrency(currentReport.expenses.utilities)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Office Supplies</span>
                                    <span>{formatCurrency(currentReport.expenses.supplies)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Marketing</span>
                                    <span>{formatCurrency(currentReport.expenses.marketing)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Other Expenses</span>
                                    <span>{formatCurrency(currentReport.expenses.other)}</span>
                                </div>
                                <div className="border-t pt-1 flex justify-between font-bold">
                                    <span>Total Expenses</span>
                                    <span className="text-red-600">{formatCurrency(currentReport.expenses.total)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Net Profit */}
                        <div className="border-t-2 pt-4">
                            <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
                                <span className="text-xl font-bold">Net Profit (Before Tax)</span>
                                <span className="text-3xl font-bold text-primary">
                                    {formatCurrency(currentReport.netProfit)}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TaxReports;
