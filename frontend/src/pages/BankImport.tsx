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
import { Upload, FileCheck, Sparkles, Download } from 'lucide-react';
import { mockTransactions, BankTransaction } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { hasAccess } from '@/lib/mockData';

const BankImport = () => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<BankTransaction[]>(mockTransactions);
    const [dragActive, setDragActive] = useState(false);
    const [imported, setImported] = useState(false);

    const hasAIFeature = user && hasAccess(user.tier, 'ai-classification');

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        setImported(true);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImported(true);
        }
    };

    const updateCategory = (id: string, category: string) => {
        setTransactions(transactions.map(t =>
            t.id === id ? { ...t, category } : t
        ));
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Upload Area */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Import Bank Statement
                    </CardTitle>
                    <CardDescription>
                        Upload your ANZ bank statement (CSV format) to automatically classify transactions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center gap-4">
                            {imported ? (
                                <>
                                    <FileCheck className="h-16 w-16 text-primary" />
                                    <div>
                                        <p className="text-lg font-semibold">File Imported Successfully</p>
                                        <p className="text-sm text-muted-foreground">
                                            {mockTransactions.length} transactions found
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Upload className="h-16 w-16 text-muted-foreground" />
                                    <div>
                                        <p className="text-lg font-semibold">Drop your CSV file here</p>
                                        <p className="text-sm text-muted-foreground">or click to browse</p>
                                    </div>
                                    <Input
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileInput}
                                        className="max-w-xs"
                                    />
                                </>
                            )}
                            {!imported && (
                                <Button>Choose File</Button>
                            )}
                        </div>
                    </div>

                    {hasAIFeature && imported && (
                        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-start gap-3">
                            <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                            <div className="flex-1">
                                <p className="font-semibold">AI Classification Active</p>
                                <p className="text-sm text-muted-foreground">
                                    Transactions have been automatically classified with {' '}
                                    <span className="text-primary font-semibold">92-98% confidence</span>
                                </p>
                            </div>
                        </div>
                    )}

                    {!hasAIFeature && user && (
                        <div className="mt-4 p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">
                                <strong>Upgrade to Lite or Enterprise</strong> to unlock AI-powered transaction classification
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Transactions Table */}
            {imported && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Imported Transactions</CardTitle>
                                <CardDescription>Review and classify your transactions</CardDescription>
                            </div>
                            <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Export
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Category</TableHead>
                                    {hasAIFeature && <TableHead>AI Confidence</TableHead>}
                                    <TableHead>GST</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-medium">
                                            {formatDate(transaction.date)}
                                        </TableCell>
                                        <TableCell className="max-w-xs truncate">
                                            {transaction.description}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={transaction.type === 'income' ? 'success' : 'secondary'}>
                                                {transaction.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {hasAIFeature ? (
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline">{transaction.category}</Badge>
                                                    {transaction.categoryAI && (
                                                        <Sparkles className="h-3 w-3 text-primary" />
                                                    )}
                                                </div>
                                            ) : (
                                                <select
                                                    value={transaction.category}
                                                    onChange={(e) => updateCategory(transaction.id, e.target.value)}
                                                    className="text-sm border rounded px-2 py-1"
                                                >
                                                    <option>Sales Revenue</option>
                                                    <option>Service Revenue</option>
                                                    <option>Office Supplies</option>
                                                    <option>Rent</option>
                                                    <option>Utilities</option>
                                                    <option>Marketing</option>
                                                    <option>Equipment</option>
                                                    <option>Software</option>
                                                </select>
                                            )}
                                        </TableCell>
                                        {hasAIFeature && (
                                            <TableCell>
                                                {transaction.confidence && (
                                                    <Badge variant="outline">
                                                        {(transaction.confidence * 100).toFixed(0)}%
                                                    </Badge>
                                                )}
                                            </TableCell>
                                        )}
                                        <TableCell>
                                            {transaction.gstApplicable ? (
                                                <Badge variant="default">Yes</Badge>
                                            ) : (
                                                <Badge variant="outline">No</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell
                                            className={`text-right font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
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
            )}
        </div>
    );
};

export default BankImport;
