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
import { FileSignature, Plus, Download, Sparkles } from 'lucide-react';
import { mockContracts } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';

const Contracts = () => {
    const [contracts, setContracts] = useState(mockContracts);
    const [showGenerator, setShowGenerator] = useState(false);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge variant="success">Active</Badge>;
            case 'expired':
                return <Badge variant="secondary">Expired</Badge>;
            case 'terminated':
                return <Badge variant="destructive">Terminated</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <FileSignature className="h-5 w-5" />
                                Contract Management
                            </CardTitle>
                            <CardDescription>Manage employee and rental contracts with AI generation</CardDescription>
                        </div>
                        <Button onClick={() => setShowGenerator(!showGenerator)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Generate New Contract
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Party A</TableHead>
                                <TableHead>Party B</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contracts.map((contract) => (
                                <TableRow key={contract.id}>
                                    <TableCell>
                                        <Badge variant={contract.type === 'employment' ? 'default' : 'secondary'}>
                                            {contract.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{contract.title}</TableCell>
                                    <TableCell>{contract.partyA}</TableCell>
                                    <TableCell>{contract.partyB}</TableCell>
                                    <TableCell>{formatDate(contract.startDate)}</TableCell>
                                    <TableCell className="font-semibold">
                                        ${contract.amount.toLocaleString()} {contract.type === 'employment' ? '/yr' : '/mo'}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(contract.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {showGenerator && (
                <Card className="border-2 border-primary">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            AI Contract Generator
                        </CardTitle>
                        <CardDescription>
                            Generate professional contracts using AI - customized for New Zealand law
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium">Contract Type</label>
                                <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                                    <option>Employment Agreement</option>
                                    <option>Rental Lease Agreement</option>
                                    <option>Contractor Agreement</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Employee/Tenant Name</label>
                                <Input placeholder="John Smith" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Start Date</label>
                                <Input type="date" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Annual Salary / Monthly Rent</label>
                                <Input placeholder="75000" type="number" />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Additional Terms (Optional)</label>
                            <textarea
                                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Enter any specific terms or conditions..."
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button className="flex-1">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Generate Contract with AI
                            </Button>
                            <Button variant="outline" onClick={() => setShowGenerator(false)}>
                                Cancel
                            </Button>
                        </div>

                        <div className="p-3 bg-primary/5 rounded-lg text-sm">
                            <p className="text-muted-foreground">
                                <strong>AI will generate:</strong> A legally compliant NZ contract including all required clauses,
                                employee rights, leave entitlements, Kiwisaver provisions, and termination conditions.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default Contracts;
