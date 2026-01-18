import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { FileText, Download, Send, Calculator } from 'lucide-react';
import { mockGSTReturns, GSTReturn } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GSTReturns = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(mockGSTReturns[0]);

    const chartData = [
        { name: 'Income', gst: selectedPeriod.gstCollected },
        { name: 'Expenses', gst: selectedPeriod.gstPaid },
        { name: 'Net GST', gst: selectedPeriod.netGST },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return <Badge variant="success">Paid</Badge>;
            case 'submitted':
                return <Badge variant="default">Submitted</Badge>;
            case 'draft':
                return <Badge variant="outline">Draft</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Current Period Summary */}
            <div className="grid gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Income (incl. GST)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(selectedPeriod.totalIncome)}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            GST Collected (15%)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">
                            {formatCurrency(selectedPeriod.gstCollected)}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            GST Paid (15%)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(selectedPeriod.gstPaid)}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-primary">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Calculator className="h-4 w-4" />
                            Net GST Due
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${selectedPeriod.netGST > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {formatCurrency(selectedPeriod.netGST)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {selectedPeriod.netGST > 0 ? 'To pay IRD' : 'IRD refund'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* GST Calculation Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>GST Breakdown - {selectedPeriod.period}</CardTitle>
                    <CardDescription>Visual breakdown of GST calculation</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Bar dataKey="gst" fill="#00B4D8" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>

                    <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Total Income (excl. GST):</span>
                            <span className="font-semibold">{formatCurrency(selectedPeriod.totalIncome / 1.15)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>GST on Income (15%):</span>
                            <span className="font-semibold text-primary">{formatCurrency(selectedPeriod.gstCollected)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Total Expenses (excl. GST):</span>
                            <span className="font-semibold">{formatCurrency(selectedPeriod.totalExpense / 1.15)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>GST on Expenses (15%):</span>
                            <span className="font-semibold text-green-600">-{formatCurrency(selectedPeriod.gstPaid)}</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                            <span>Net GST {selectedPeriod.netGST > 0 ? 'Payable' : 'Return'}:</span>
                            <span className={selectedPeriod.netGST > 0 ? 'text-red-600' : 'text-green-600'}>
                                {formatCurrency(selectedPeriod.netGST)}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <Button variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Export PDF
                        </Button>
                        <Button className="flex-1">
                            <Send className="h-4 w-4 mr-2" />
                            Submit to IRD
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/*Historical GST Returns */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Historical GST Returns
                    </CardTitle>
                    <CardDescription>View all previous GST return periods</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Period</TableHead>
                                <TableHead>Total Income</TableHead>
                                <TableHead>Total Expenses</TableHead>
                                <TableHead>GST Collected</TableHead>
                                <TableHead>GST Paid</TableHead>
                                <TableHead>Net GST</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockGSTReturns.map((gstReturn) => (
                                <TableRow
                                    key={gstReturn.id}
                                    className={selectedPeriod.id === gstReturn.id ? 'bg-muted' : ''}
                                >
                                    <TableCell className="font-medium">{gstReturn.period}</TableCell>
                                    <TableCell>{formatCurrency(gstReturn.totalIncome)}</TableCell>
                                    <TableCell>{formatCurrency(gstReturn.totalExpense)}</TableCell>
                                    <TableCell className="text-primary">
                                        {formatCurrency(gstReturn.gstCollected)}
                                    </TableCell>
                                    <TableCell className="text-green-600">
                                        {formatCurrency(gstReturn.gstPaid)}
                                    </TableCell>
                                    <TableCell
                                        className={`font-semibold ${gstReturn.netGST > 0 ? 'text-red-600' : 'text-green-600'
                                            }`}
                                    >
                                        {formatCurrency(gstReturn.netGST)}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(gstReturn.status)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedPeriod(gstReturn)}
                                        >
                                            View
                                        </Button>
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

export default GSTReturns;
