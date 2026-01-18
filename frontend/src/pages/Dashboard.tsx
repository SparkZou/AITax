import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Receipt,
    FileText,
    AlertCircle,
} from 'lucide-react';
import { mockTransactions, calculateDashboardStats } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CashFlowChart, GSTChart, ExpenseBreakdownChart, IncomeChart } from '@/components/charts/Charts';

const Dashboard = () => {
    const stats = calculateDashboardStats(mockTransactions);
    const recentTransactions = mockTransactions.slice(0, 5);

    const statCards = [
        {
            title: 'Total Revenue',
            value: stats.totalIncome,
            change: '+12.5%',
            trend: 'up' as const,
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-950',
        },
        {
            title: 'Total Expenses',
            value: stats.totalExpenses,
            change: '+5.2%',
            trend: 'up' as const,
            icon: Receipt,
            color: 'text-red-600',
            bgColor: 'bg-red-50 dark:bg-red-950',
        },
        {
            title: 'Net GST Due',
            value: stats.netGST,
            change: 'Due 20 Jan',
            trend: 'neutral' as const,
            icon: FileText,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
        },
        {
            title: 'Profit',
            value: stats.profit,
            change: '+18.3%',
            trend: 'up' as const,
            icon: TrendingUp,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50 dark:bg-emerald-950',
        },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(stat.value)}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                {stat.trend === 'up' ? (
                                    <TrendingUp className="h-3 w-3 text-green-600" />
                                ) : stat.trend === 'down' ? (
                                    <TrendingDown className="h-3 w-3 text-red-600" />
                                ) : (
                                    <AlertCircle className="h-3 w-3 text-blue-600" />
                                )}
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                <CashFlowChart />
                <GSTChart />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <IncomeChart />
                <ExpenseBreakdownChart />
            </div>

            {/* Recent Transactions */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">
                                        {formatDate(transaction.date)}
                                    </TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{transaction.category}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={transaction.type === 'income' ? 'success' : 'secondary'}
                                        >
                                            {transaction.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell
                                        className={`text-right font-semibold ${transaction.type === 'income'
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                            }`}
                                    >
                                        {formatCurrency(Math.abs(transaction.amount))}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
