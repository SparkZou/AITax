import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Wallet, Download, Send } from 'lucide-react';
import { mockPayroll } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

const Payroll = () => {
    const totalGross = mockPayroll.reduce((sum, p) => sum + p.grossPay, 0);
    const totalPaye = mockPayroll.reduce((sum, p) => sum + p.paye, 0);
    const totalKiwisaver = mockPayroll.reduce((sum, p) => sum + p.kiwisaverEmployee + p.kiwisaverEmployer, 0);
    const totalNet = mockPayroll.reduce((sum, p) => sum + p.netPay, 0);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return <Badge variant="success">Paid</Badge>;
            case 'processed':
                return <Badge variant="default">Processed</Badge>;
            case 'draft':
                return <Badge variant="outline">Draft</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Gross Pay
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalGross)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total PAYE
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{formatCurrency(totalPaye)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Kiwisaver
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{formatCurrency(totalKiwisaver)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Employee + Employer</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Net Pay
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{formatCurrency(totalNet)}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Payroll Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Wallet className="h-5 w-5" />
                                Employee Payroll & Kiwisaver
                            </CardTitle>
                            <CardDescription>Automated payroll calculation with Kiwisaver contributions</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                            <Button>
                                <Send className="h-4 w-4 mr-2" />
                                Process Payroll
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Period</TableHead>
                                <TableHead>Gross Pay</TableHead>
                                <TableHead>PAYE</TableHead>
                                <TableHead>Kiwisaver (EE)</TableHead>
                                <TableHead>Kiwisaver (ER)</TableHead>
                                <TableHead>Net Pay</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockPayroll.map((payroll) => (
                                <TableRow key={payroll.id}>
                                    <TableCell className="font-medium">{payroll.employeeName}</TableCell>
                                    <TableCell>{payroll.period}</TableCell>
                                    <TableCell className="font-semibold">{formatCurrency(payroll.grossPay)}</TableCell>
                                    <TableCell className="text-red-600">-{formatCurrency(payroll.paye)}</TableCell>
                                    <TableCell className="text-primary">
                                        -{formatCurrency(payroll.kiwisaverEmployee)}
                                        <span className="text-xs text-muted-foreground ml-1">(3%)</span>
                                    </TableCell>
                                    <TableCell className="text-primary">
                                        {formatCurrency(payroll.kiwisaverEmployer)}
                                        <span className="text-xs text-muted-foreground ml-1">(3%)</span>
                                    </TableCell>
                                    <TableCell className="font-semibold text-green-600">
                                        {formatCurrency(payroll.netPay)}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(payroll.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Calculation Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle>Payroll Calculation Details</CardTitle>
                    <CardDescription>How we calculate employee payroll</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 p-4 bg-muted rounded-lg text-sm">
                        <div className="flex justify-between">
                            <span>Gross Pay:</span>
                            <span className="font-semibold">Base salary amount</span>
                        </div>
                        <div className="flex justify-between">
                            <span>PAYE (Tax):</span>
                            <span className="font-semibold">Calculated based on IRD tax tables</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Kiwisaver (Employee):</span>
                            <span className="font-semibold text-primary">3% of gross pay (deducted)</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Kiwisaver (Employer):</span>
                            <span className="font-semibold text-primary">3% of gross pay (employer cost)</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold">
                            <span>Net Pay:</span>
                            <span className="text-green-600">Gross - PAYE - KiwiSaver (EE)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Payroll;
