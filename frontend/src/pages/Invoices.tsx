import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Plus, Send, Eye, Download, Clock, CheckCircle } from 'lucide-react';
import { mockInvoices, Invoice } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

const Invoices = () => {
    const [invoices, setInvoices] = useState(mockInvoices);
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid':
                return <Badge variant="success"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>;
            case 'sent':
                return <Badge variant="default"><Send className="h-3 w-3 mr-1" />Sent</Badge>;
            case 'overdue':
                return <Badge variant="destructive"><Clock className="h-3 w-3 mr-1" />Overdue</Badge>;
            case 'draft':
                return <Badge variant="outline">Draft</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const paidInvoices = invoices.filter(inv => inv.status === 'paid');
    const pendingInvoices = invoices.filter(inv => inv.status === 'sent');
    const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            From {invoices.length} invoices
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Paid
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(paidInvoices.reduce((sum, inv) => sum + inv.total, 0))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {paidInvoices.length} invoice(s)
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pending
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(pendingInvoices.reduce((sum, inv) => sum + inv.total, 0))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {pendingInvoices.length} invoice(s)
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Overdue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            {formatCurrency(overdueInvoices.reduce((sum, inv) => sum + inv.total, 0))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {overdueInvoices.length} invoice(s)
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Invoices List */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>All Invoices</CardTitle>
                            <CardDescription>Manage and track your customer invoices</CardDescription>
                        </div>
                        <Button onClick={() => setShowCreateDialog(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            New Invoice
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Issue Date</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Subtotal</TableHead>
                                <TableHead>GST</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{invoice.clientName}</div>
                                            <div className="text-xs text-muted-foreground">{invoice.clientEmail}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                                    <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                                    <TableCell>{formatCurrency(invoice.subtotal)}</TableCell>
                                    <TableCell className="text-primary">{formatCurrency(invoice.gst)}</TableCell>
                                    <TableCell className="font-semibold">{formatCurrency(invoice.total)}</TableCell>
                                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            {invoice.status === 'draft' && (
                                                <Button variant="ghost" size="sm">
                                                    <Send className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Create Invoice Dialog Simulation */}
            {showCreateDialog && (
                <Card className="border-2 border-primary">
                    <CardHeader>
                        <CardTitle>Create New Invoice</CardTitle>
                        <CardDescription>Fill in the details to generate a new invoice</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium">Client Name</label>
                                <Input placeholder="Client Ltd" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Client Email</label>
                                <Input placeholder="client@example.co.nz" type="email" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Issue Date</label>
                                <Input type="date" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Due Date</label>
                                <Input type="date" />
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h4 className="font-semibold mb-2">Line Items</h4>
                            <div className="grid grid-cols-12 gap-2 mb-2">
                                <Input placeholder="Description" className="col-span-6" />
                                <Input placeholder="Qty" type="number" className="col-span-2" />
                                <Input placeholder="Unit Price" type="number" className="col-span-2" />
                                <Input placeholder="Amount" disabled className="col-span-2" />
                            </div>
                            <Button variant="outline" size="sm">Add Line Item</Button>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button variant="outline" className="flex-1" onClick={() => setShowCreateDialog(false)}>
                                Cancel
                            </Button>
                            <Button className="flex-1">Create Invoice</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Invoices;
