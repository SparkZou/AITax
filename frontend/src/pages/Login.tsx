import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { UserTier } from '@/lib/mockData';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (tier: UserTier) => {
        login(tier);
        navigate('/app/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nz-blue/20 via-background to-nz-teal/20">
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 p-6">
                {/* Left Side - Branding */}
                <div className="flex flex-col justify-center space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-nz-blue to-nz-teal shadow-lg">
                                <span className="text-3xl font-bold text-white">AT</span>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-nz-blue to-nz-teal bg-clip-text text-transparent">
                                    AITax NZ
                                </h1>
                                <p className="text-muted-foreground">Intelligent Tax Management</p>
                            </div>
                        </div>

                        <p className="text-xl text-muted-foreground">
                            Simplify your New Zealand tax compliance with AI-powered automation
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <p>✨ AI-powered transaction classification</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <p>📊 Automated GST calculations & returns</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <p>💼 Contract & payroll management</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <p>🏦 Direct IRD & bank integration</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login/Demo */}
                <Card className="glass">
                    <CardHeader>
                        <CardTitle>Welcome Back</CardTitle>
                        <CardDescription>Choose a demo account to explore the platform</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <Input type="email" placeholder="demo@example.co.nz" defaultValue="demo@example.co.nz" />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Password</label>
                                <Input type="password" placeholder="••••••••" defaultValue="password" />
                            </div>
                        </div>

                        <div className="border-t pt-4 space-y-3">
                            <p className="text-sm text-muted-foreground font-semibold">Demo Accounts:</p>

                            <Button
                                variant="outline"
                                className="w-full justify-start h-auto p-4"
                                onClick={() => handleLogin('free')}
                            >
                                <div className="text-left">
                                    <div className="font-semibold">Free Tier Demo</div>
                                    <div className="text-xs text-muted-foreground">
                                        Basic features: Bank import, manual tagging, GST calculation
                                    </div>
                                </div>
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start h-auto p-4 border-primary"
                                onClick={() => handleLogin('lite')}
                            >
                                <div className="text-left">
                                    <div className="font-semibold">Lite Tier Demo ⭐</div>
                                    <div className="text-xs text-muted-foreground">
                                        + AI classification, chatbot assistance, email support
                                    </div>
                                </div>
                            </Button>

                            <Button
                                className="w-full justify-start h-auto p-4 bg-gradient-to-r from-nz-blue to-nz-teal"
                                onClick={() => handleLogin('enterprise')}
                            >
                                <div className="text-left text-white">
                                    <div className="font-semibold">Enterprise Tier Demo 👑</div>
                                    <div className="text-xs opacity-90">
                                        Full access: Contracts, Payroll, Bank/IRD integration, AI database
                                    </div>
                                </div>
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground pt-4">
                            <p>New user? <a href="/pricing" className="text-primary hover:underline">View pricing plans</a></p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
