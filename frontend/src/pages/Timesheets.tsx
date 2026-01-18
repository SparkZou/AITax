import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Clock, Download } from 'lucide-react';
import { mockTimesheets } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';

const Timesheets = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Employee Timesheets
                            </CardTitle>
                            <CardDescription>Track employee hours and calculate pay</CardDescription>
                        </div>
                        <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {mockTimesheets.map((timesheet) => (
                        <Card key={timesheet.id} className="mb-6">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{timesheet.employeeName}</CardTitle>
                                        <CardDescription>
                                            Week: {formatDate(timesheet.weekStarting)} - {formatDate(timesheet.weekEnding)}
                                        </CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-muted-foreground">Total Hours</div>
                                        <div className="text-2xl font-bold">{timesheet.totalHours}h</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Day</TableHead>
                                            <TableHead className="text-right">Hours</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.entries(timesheet.hours).map(([day, hours]) => (
                                            <TableRow key={day}>
                                                <TableCell className="capitalize font-medium">{day}</TableCell>
                                                <TableCell className="text-right">
                                                    {hours > 0 ? (
                                                        <span className="font-semibold">{hours}h</span>
                                                    ) : (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Total Hours:</span>
                                        <span className="font-semibold">{timesheet.totalHours}h</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Hourly Rate:</span>
                                        <span className="font-semibold">{formatCurrency(timesheet.hourlyRate)}/h</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between font-bold">
                                        <span>Total Pay:</span>
                                        <span className="text-primary">{formatCurrency(timesheet.totalPay)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default Timesheets;
