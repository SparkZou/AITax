import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { User, Building, CreditCard, Bell, Link as LinkIcon, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { hasAccess } from '@/lib/mockData';
import { Link } from 'react-router-dom';

const Settings = () => {
    const { user } = useAuth();

    if (!user) return null;

    const hasEmailFeature = hasAccess(user.tier, 'email-support');
    const hasBankIntegration = hasAccess(user.tier, 'bank-integration');
    const hasIRDIntegration = hasAccess(user.tier, 'ird-integration');

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl">
            {/* Account Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Account Information
                    </CardTitle>
                    <CardDescription>Manage your profile and account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium">Full Name</label>
                            <Input value={user.name} readOnly />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input value={user.email} readOnly />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Company</label>
                            <Input value={user.company} readOnly />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Current Plan</label>
                            <div className="flex gap-2">
                                <Input value={user.tier.toUpperCase()} readOnly className="flex-1" />
                                <Link to="/pricing">
                                    <Button variant="outline">Change</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Subscription */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Subscription & Billing
                    </CardTitle>
                    <CardDescription>Manage your subscription and payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold capitalize">{user.tier} Plan</p>
                                <Badge variant={user.tier === 'enterprise' ? 'default' : 'secondary'}>
                                    Active
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Member since {new Date(user.subscriptionDate).toLocaleDateString('en-NZ')}
                            </p>
                        </div>
                        <Link to="/pricing">
                            <Button>Manage Plan</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Email Notifications */}
            {hasEmailFeature && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Email Notifications
                        </CardTitle>
                        <CardDescription>Configure your notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Transaction Alerts</p>
                                <p className="text-sm text-muted-foreground">Get notified of new transactions</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-5 w-5" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">GST Reminders</p>
                                <p className="text-sm text-muted-foreground">Remind me before GST deadlines</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-5 w-5" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Invoice Updates</p>
                                <p className="text-sm text-muted-foreground">Alerts for invoice payments</p>
                            </div>
                            <input type="checkbox" defaultChecked className="h-5 w-5" />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Bank Integration */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <LinkIcon className="h-5 w-5" />
                        Bank Integration
                    </CardTitle>
                    <CardDescription>Connect your bank accounts for automatic imports</CardDescription>
                </CardHeader>
                <CardContent>
                    {hasBankIntegration ? (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Building className="h-8 w-8 text-primary" />
                                    <div>
                                        <p className="font-medium">ANZ Bank</p>
                                        <p className="text-sm text-muted-foreground">Account ending in 4567</p>
                                    </div>
                                </div>
                                <Badge variant="success">Connected</Badge>
                            </div>
                            <Button variant="outline" className="w-full">Add Another Bank</Button>
                        </div>
                    ) : (
                        <div className="text-center p-6 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground mb-2">
                                Bank integration is only available on the Enterprise plan
                            </p>
                            <Link to="/pricing">
                                <Button>Upgrade to Enterprise</Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* IRD Integration */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        IRD Integration
                    </CardTitle>
                    <CardDescription>Connect to Inland Revenue for automated filing</CardDescription>
                </CardHeader>
                <CardContent>
                    {hasIRDIntegration ? (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Shield className="h-8 w-8 text-green-600" />
                                    <div>
                                        <p className="font-medium">IRD Connected</p>
                                        <p className="text-sm text-muted-foreground">IRD Number: 123-456-789</p>
                                    </div>
                                </div>
                                <Badge variant="success">Active</Badge>
                            </div>
                            <Button variant="outline" className="w-full">Reconfigure</Button>
                        </div>
                    ) : (
                        <div className="text-center p-6 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground mb-2">
                                IRD integration is only available on the Enterprise plan
                            </p>
                            <Link to="/pricing">
                                <Button>Upgrade to Enterprise</Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Settings;
