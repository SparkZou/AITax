import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { hasAccess } from '@/lib/mockData';
import {
    LayoutDashboard,
    Upload,
    FileText,
    FileSignature,
    Clock,
    Wallet,
    Receipt,
    BarChart3,
    MessageSquare,
    Settings,
    Menu,
    X,
    LogOut,
    Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (!user) return null;

    const navigationItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, feature: 'bank-import' },
        { name: 'Bank Import', href: '/bank-import', icon: Upload, feature: 'bank-import' },
        { name: 'GST Returns', href: '/gst-returns', icon: FileText, feature: 'gst-calculation' },
        { name: 'Contracts', href: '/contracts', icon: FileSignature, feature: 'contracts' },
        { name: 'Timesheets', href: '/timesheets', icon: Clock, feature: 'timesheets' },
        { name: 'Payroll', href: '/payroll', icon: Wallet, feature: 'payroll' },
        { name: 'Invoices', href: '/invoices', icon: Receipt, feature: 'invoices' },
        { name: 'Tax Reports', href: '/tax-reports', icon: BarChart3, feature: 'tax-reports' },
        { name: 'AI Assistant', href: '/ai-assistant', icon: MessageSquare, feature: 'chatbot' },
        { name: 'Settings', href: '/settings', icon: Settings, feature: 'bank-import' },
    ];

    const accessibleItems = navigationItems.filter(item =>
        hasAccess(user.tier, item.feature)
    );

    const getTierBadgeVariant = (tier: string) => {
        switch (tier) {
            case 'enterprise': return 'default';
            case 'lite': return 'secondary';
            case 'free': return 'outline';
            default: return 'outline';
        }
    };

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card/50 backdrop-blur-sm transition-all duration-300",
                    sidebarOpen ? "w-64" : "w-20"
                )}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b px-6">
                    {sidebarOpen ? (
                        <>
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-nz-blue to-nz-teal">
                                    <span className="text-lg font-bold text-white">AT</span>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-nz-blue to-nz-teal bg-clip-text text-transparent">
                                    AITax
                                </span>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="mx-auto text-muted-foreground hover:text-foreground"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    )}
                </div>

                {/* User Info */}
                <div className="border-b p-4">
                    <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-nz-teal to-nz-blue text-white font-semibold">
                            {user.name.charAt(0)}
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium">{user.name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant={getTierBadgeVariant(user.tier)} className="text-xs capitalize">
                                        {user.tier === 'enterprise' && <Crown className="h-3 w-3 mr-1" />}
                                        {user.tier}
                                    </Badge>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <ul className="space-y-1">
                        {accessibleItems.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <li key={item.name}>
                                    <Link
                                        to={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                            !sidebarOpen && "justify-center px-2"
                                        )}
                                    >
                                        <item.icon className="h-5 w-5 shrink-0" />
                                        {sidebarOpen && <span>{item.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout */}
                <div className="border-t p-4">
                    <button
                        onClick={logout}
                        className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
                            !sidebarOpen && "justify-center px-2"
                        )}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        {sidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div
                className={cn(
                    "flex flex-1 flex-col transition-all duration-300",
                    sidebarOpen ? "ml-64" : "ml-20"
                )}
            >
                {/* Header */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur px-6">
                    <div>
                        <h1 className="text-2xl font-bold">
                            {navigationItems.find(item => item.href === location.pathname)?.name || 'Dashboard'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/pricing" className="text-sm text-primary hover:underline">
                            {user.tier !== 'enterprise' && 'Upgrade Plan'}
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
