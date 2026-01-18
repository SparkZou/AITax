import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ArrowRight,
    CheckCircle2,
    Sparkles,
    TrendingUp,
    Shield,
    Clock,
    Zap,
    FileText,
    Calculator,
    Bot,
    Mail,
    Phone,
    Star,
} from 'lucide-react';

const LandingPage = () => {
    const features = [
        {
            icon: Sparkles,
            title: 'AI-Powered Classification',
            description: '92-98% accuracy in automatically categorizing transactions, saving you hours of manual work.',
        },
        {
            icon: Calculator,
            title: 'Automated GST Returns',
            description: 'Automatic 15% GST calculation and reporting, ensuring IRD compliance.',
        },
        {
            icon: FileText,
            title: 'Smart Contract Generation',
            description: 'AI-generated employment and rental contracts compliant with NZ law.',
        },
        {
            icon: TrendingUp,
            title: 'Real-time Analytics',
            description: 'Interactive dashboards and charts for instant financial insights.',
        },
        {
            icon: Shield,
            title: 'Bank-Grade Security',
            description: '256-bit encryption and daily backups keep your data safe.',
        },
        {
            icon: Bot,
            title: 'AI Tax Assistant',
            description: 'Get instant answers to NZ tax questions from our intelligent chatbot.',
        },
    ];

    const testimonials = [
        {
            name: 'Sarah Chen',
            company: 'Chen Consulting Ltd',
            role: 'Managing Director',
            content: 'AITax has saved us over 20 hours per month. The AI classification is incredibly accurate!',
            rating: 5,
        },
        {
            name: 'James Wilson',
            company: 'Wilson Retail Group',
            role: 'CFO',
            content: 'The payroll and Kiwisaver automation is a game-changer. We\'ve reduced our accounting costs by 70%.',
            rating: 5,
        },
        {
            name: 'Michelle Zhang',
            company: 'Zhang & Associates',
            role: 'Accountant',
            content: 'I recommend AITax to all my clients. It\'s the perfect solution for NZ SMEs.',
            rating: 5,
        },
    ];

    const stats = [
        { value: '10,000+', label: 'Transactions Processed' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '500+', label: 'Businesses Served' },
        { value: '$2M+', label: 'GST Filed' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-nz-blue/5">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nz-blue to-nz-teal">
                                <span className="text-xl font-bold text-white">AT</span>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-nz-blue to-nz-teal bg-clip-text text-transparent">
                                AITax NZ
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
                            <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
                            <a href="#testimonials" className="text-sm hover:text-primary transition-colors">Testimonials</a>
                            <a href="#faq" className="text-sm hover:text-primary transition-colors">FAQ</a>
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Sign In</Button>
                            </Link>
                            <Link to="/login">
                                <Button size="sm" className="bg-gradient-to-r from-nz-blue to-nz-teal">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
                        <Badge variant="outline" className="text-primary border-primary">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI-Powered Tax Management
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            Tax Management for
                            <br />
                            <span className="bg-gradient-to-r from-nz-blue via-nz-teal to-nz-fern bg-clip-text text-transparent">
                                New Zealand Businesses
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Simplify your tax compliance with AI-powered automation. Save time, reduce costs, and ensure IRD compliance.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/login">
                                <Button size="lg" className="bg-gradient-to-r from-nz-blue to-nz-teal text-lg px-8">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <a href="#demo">
                                <Button size="lg" variant="outline" className="text-lg px-8">
                                    Watch Demo
                                </Button>
                            </a>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span>No credit card required</span>
                            <span className="mx-2">•</span>
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span>14-day free trial</span>
                            <span className="mx-2">•</span>
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span>Cancel anytime</span>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="mt-16 max-w-5xl mx-auto">
                        <div className="glass rounded-2xl p-2 shadow-2xl">
                            <div className="rounded-xl w-full bg-gradient-to-br from-nz-blue/20 via-nz-teal/20 to-nz-fern/20 aspect-video flex items-center justify-center backdrop-blur-sm border-2 border-primary/20">
                                <div className="text-center space-y-4 p-8">
                                    <div className="text-6xl mb-4">📊</div>
                                    <h3 className="text-2xl font-bold">AITax Dashboard</h3>
                                    <p className="text-muted-foreground">
                                        Beautiful, interactive financial dashboard with real-time insights
                                    </p>
                                    <div className="flex gap-4 justify-center pt-4">
                                        <div className="px-4 py-2 bg-primary/10 rounded-lg">
                                            <div className="text-sm text-muted-foreground">Revenue</div>
                                            <div className="text-xl font-bold text-green-600">$33.5k</div>
                                        </div>
                                        <div className="px-4 py-2 bg-primary/10 rounded-lg">
                                            <div className="text-sm text-muted-foreground">GST Due</div>
                                            <div className="text-xl font-bold text-primary">$3.9k</div>
                                        </div>
                                        <div className="px-4 py-2 bg-primary/10 rounded-lg">
                                            <div className="text-sm text-muted-foreground">Profit</div>
                                            <div className="text-xl font-bold text-nz-fern">$26.2k</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge variant="outline" className="mb-4">Features</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Everything You Need to Manage Tax
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive tools designed specifically for New Zealand businesses
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <Card key={idx} className="border-2 hover:border-primary transition-colors">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-nz-blue/5 via-background to-nz-teal/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge variant="outline" className="mb-4">Why AITax?</Badge>
                            <h2 className="text-4xl font-bold mb-6">
                                Save Time. Save Money. Stay Compliant.
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { icon: Clock, text: 'Save 20+ hours per month on manual data entry' },
                                    { icon: TrendingUp, text: 'Reduce accounting costs by up to 70%' },
                                    { icon: Shield, text: '100% IRD compliant with automatic updates' },
                                    { icon: Zap, text: 'Real-time insights for better business decisions' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="h-4 w-4 text-primary" />
                                        </div>
                                        <p className="text-lg">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <Card className="border-2 border-green-600/20">
                                <CardHeader>
                                    <CardTitle className="text-green-600">Traditional Accounting</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-red-600">✗</span>
                                        <span>Manual data entry: 20 hours/month</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-red-600">✗</span>
                                        <span>Accountant fees: $5,000/year</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-red-600">✗</span>
                                        <span>Delayed reports: 1-3 days</span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-2 border-primary">
                                <CardHeader>
                                    <CardTitle className="text-primary">With AITax NZ</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        <span>AI automation: 2 hours/month</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        <span>Software cost: $600-1,800/year</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                        <span>Instant reports: Real-time</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge variant="outline" className="mb-4">Pricing</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Choose Your Plan
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Flexible pricing for businesses of all sizes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Free Tier */}
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle>Free</CardTitle>
                                <div className="text-4xl font-bold">$0<span className="text-lg text-muted-foreground">/month</span></div>
                                <CardDescription>Perfect for getting started</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Link to="/login">
                                    <Button variant="outline" className="w-full">Get Started</Button>
                                </Link>
                                <div className="space-y-2">
                                    {[
                                        'ANZ bank import',
                                        'Manual categorization',
                                        'GST calculation',
                                        'Basic reports',
                                        'Invoice generation',
                                    ].map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Lite Tier */}
                        <Card className="border-4 border-primary relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <Badge className="bg-gradient-to-r from-nz-blue to-nz-teal">
                                    RECOMMENDED
                                </Badge>
                            </div>
                            <CardHeader>
                                <CardTitle>Lite</CardTitle>
                                <div className="text-4xl font-bold">$49.99<span className="text-lg text-muted-foreground">/month</span></div>
                                <CardDescription>For growing businesses</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Link to="/login">
                                    <Button className="w-full bg-gradient-to-r from-nz-blue to-nz-teal">
                                        Start Free Trial
                                    </Button>
                                </Link>
                                <div className="space-y-2">
                                    {[
                                        'Everything in Free',
                                        'AI auto-classification (98%)',
                                        'Tax knowledge chatbot',
                                        'Priority email support',
                                        'Email notifications',
                                    ].map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Enterprise Tier */}
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle>Enterprise</CardTitle>
                                <div className="text-4xl font-bold">$149.99<span className="text-lg text-muted-foreground">/month</span></div>
                                <CardDescription>For established businesses</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Link to="/login">
                                    <Button variant="outline" className="w-full">Contact Sales</Button>
                                </Link>
                                <div className="space-y-2">
                                    {[
                                        'Everything in Lite',
                                        'AI contract generation',
                                        'Payroll & Kiwisaver',
                                        'Bank & IRD integration',
                                        '24/7 phone support',
                                    ].map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 px-4 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge variant="outline" className="mb-4">Testimonials</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Loved by NZ Businesses
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, idx) => (
                            <Card key={idx}>
                                <CardHeader>
                                    <div className="flex gap-1 mb-2">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <CardDescription className="text-base">"{testimonial.content}"</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="font-semibold">{testimonial.name}</div>
                                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="glass rounded-2xl p-12 bg-gradient-to-br from-nz-blue/10 to-nz-teal/10">
                        <h2 className="text-4xl font-bold mb-4">
                            Ready to Simplify Your Tax Management?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Join hundreds of NZ businesses already using AITax
                        </p>
                        <Link to="/login">
                            <Button size="lg" className="bg-gradient-to-r from-nz-blue to-nz-teal text-lg px-12">
                                Start Your Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground">
                            No credit card required • 14-day free trial • Cancel anytime
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-nz-blue to-nz-teal">
                                    <span className="text-xl font-bold text-white">AT</span>
                                </div>
                                <span className="text-xl font-bold">AITax NZ</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                AI-powered tax management for New Zealand businesses.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <a href="#features" className="block hover:text-primary">Features</a>
                                <a href="#pricing" className="block hover:text-primary">Pricing</a>
                                <Link to="/login" className="block hover:text-primary">Demo</Link>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <a href="#" className="block hover:text-primary">About</a>
                                <a href="#" className="block hover:text-primary">Blog</a>
                                <a href="#" className="block hover:text-primary">Careers</a>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Contact</h3>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    <span>contact@aitax.co.nz</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span>0800 AITAX NZ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                        <p>© 2026 AITax NZ. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
