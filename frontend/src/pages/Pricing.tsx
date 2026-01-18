import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Zap, Building } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserTier } from '@/lib/mockData';

const Pricing = () => {
    const { user, login } = useAuth();

    const plans = [
        {
            name: 'Free',
            tier: 'free' as UserTier,
            price: 0,
            description: 'Perfect for getting started',
            icon: Zap,
            color: 'text-gray-600',
            bgColor: 'bg-gray-50 dark:bg-gray-900',
            features: [
                'Bank statement import (ANZ)',
                'Manual transaction tagging',
                'GST calculation and reports',
                'Tax reports (Profit & Loss)',
                'Invoice generation',
                'Basic email support',
            ],
            limitations: [
                'No AI classification',
                'No chatbot assistance',
                'No contract management',
                'No payroll features',
            ]
        },
        {
            name: 'Lite',
            tier: 'lite' as UserTier,
            price: 49.99,
            description: 'For growing businesses',
            icon: Zap,
            color: 'text-primary',
            bgColor: 'bg-primary/5',
            recommended: true,
            features: [
                'Everything in Free, plus:',
                '✨ AI-powered transaction classification',
                '🤖 Tax knowledge chatbot',
                '📧 Priority email support',
                'Email notifications',
                'All invoicing features',
                'Advanced GST analytics',
            ],
            limitations: [
                'No bank/IRD integration',
                'No contract generation',
                'No payroll management',
            ]
        },
        {
            name: 'Enterprise',
            tier: 'enterprise' as UserTier,
            price: 149.99,
            description: 'For established companies',
            icon: Building,
            color: 'text-nz-blue',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
            features: [
                'Everything in Lite, plus:',
                '📝 AI contract generation (employee & rental)',
                '⏰ Employee timesheet management',
                '💰 Automated payroll & Kiwisaver',
                '🏦 Direct bank integration (ANZ, ASB, BNZ)',
                '🏛️ IRD API integration',
                '🤖 Advanced AI query system (chat with database)',
                '☎️ Dedicated account manager',
                '24/7 phone support',
            ],
            limitations: []
        }
    ];

    const handleSelectPlan = (tier: UserTier) => {
        login(tier);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-nz-blue/10 via-background to-nz-teal/10 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-nz-blue to-nz-teal bg-clip-text text-transparent">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Select the perfect plan for your business needs
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Current plan: <span className="font-semibold capitalize">{user?.tier}</span>
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid gap-8 md:grid-cols-3 mb-12">
                    {plans.map((plan, index) => (
                        <Card
                            key={plan.tier}
                            className={`relative overflow-hidden transition-all hover:shadow-xl ${plan.recommended ? 'border-2 border-primary scale-105' : ''
                                } ${user?.tier === plan.tier ? 'border-2 border-green-500' : ''}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {plan.recommended && (
                                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
                                    RECOMMENDED
                                </div>
                            )}

                            {user?.tier === plan.tier && (
                                <div className="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-br-lg flex items-center gap-1">
                                    <Crown className="h-3 w-3" />
                                    CURRENT PLAN
                                </div>
                            )}

                            <CardHeader className={plan.bgColor}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-background">
                                        <plan.icon className={`h-6 w-6 ${plan.color}`} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                        <CardDescription>{plan.description}</CardDescription>
                                    </div>
                                </div>

                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">
                                        ${plan.price.toFixed(2)}
                                    </span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-6">
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <h4 className="font-semibold mb-2 text-sm text-muted-foreground">FEATURES</h4>
                                        <ul className="space-y-2">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                                                    <span className="text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <Link to="/dashboard">
                                    <Button
                                        className="w-full"
                                        variant={user?.tier === plan.tier ? 'outline' : 'default'}
                                        onClick={() => handleSelectPlan(plan.tier)}
                                    >
                                        {user?.tier === plan.tier ? 'Current Plan' : `Switch to ${plan.name}`}
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Feature Comparison Table */}
                <Card className="animate-fade-in">
                    <CardHeader>
                        <CardTitle>Feature Comparison</CardTitle>
                        <CardDescription>Detailed breakdown of features across all plans</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4">Feature</th>
                                        <th className="text-center py-3 px-4">Free</th>
                                        <th className="text-center py-3 px-4 bg-primary/5">Lite</th>
                                        <th className="text-center py-3 px-4">Enterprise</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Bank Import (ANZ)', free: true, lite: true, enterprise: true },
                                        { name: 'Manual Transaction Tagging', free: true, lite: true, enterprise: true },
                                        { name: 'GST Calculation', free: true, lite: true, enterprise: true },
                                        { name: 'Tax Reports', free: true, lite: true, enterprise: true },
                                        { name: 'Invoice Generation', free: true, lite: true, enterprise: true },
                                        { name: 'AI Transaction Classification', free: false, lite: true, enterprise: true },
                                        { name: 'Tax Knowledge Chatbot', free: false, lite: true, enterprise: true },
                                        { name: 'Email Support', free: 'Basic', lite: 'Priority', enterprise: '24/7' },
                                        { name: 'Contract Generation (AI)', free: false, lite: false, enterprise: true },
                                        { name: 'Timesheet Management', free: false, lite: false, enterprise: true },
                                        { name: 'Payroll & Kiwisaver', free: false, lite: false, enterprise: true },
                                        { name: 'Bank Integration', free: false, lite: false, enterprise: true },
                                        { name: 'IRD Integration', free: false, lite: false, enterprise: true },
                                        { name: 'Chat with Database (AI)', free: false, lite: false, enterprise: true },
                                    ].map((row, idx) => (
                                        <tr key={idx} className="border-b">
                                            <td className="py-3 px-4 font-medium">{row.name}</td>
                                            <td className="text-center py-3 px-4">
                                                {typeof row.free === 'boolean' ? (
                                                    row.free ? <Check className="h-4 w-4 text-green-600 mx-auto" /> : '—'
                                                ) : row.free}
                                            </td>
                                            <td className="text-center py-3 px-4 bg-primary/5">
                                                {typeof row.lite === 'boolean' ? (
                                                    row.lite ? <Check className="h-4 w-4 text-green-600 mx-auto" /> : '—'
                                                ) : row.lite}
                                            </td>
                                            <td className="text-center py-3 px-4">
                                                {typeof row.enterprise === 'boolean' ? (
                                                    row.enterprise ? <Check className="h-4 w-4 text-green-600 mx-auto" /> : '—'
                                                ) : row.enterprise}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Pricing;
