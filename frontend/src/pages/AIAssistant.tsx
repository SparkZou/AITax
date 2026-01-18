import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Database, Send, Sparkles, Bot } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { hasAccess } from '@/lib/mockData';

const AIAssistant = () => {
    const { user } = useAuth();
    const [taxMessage, setTaxMessage] = useState('');
    const [dbQuery, setDbQuery] = useState('');
    const [taxChat, setTaxChat] = useState<Array<{ role: 'user' | 'assistant'; message: string }>>([]);
    const [dbResults, setDbResults] = useState<string>('');

    const hasChatbot = user && hasAccess(user.tier, 'chatbot');
    const hasDatabase = user && hasAccess(user.tier, 'chat-database');

    const taxSuggestedQuestions = [
        "What is the current GST rate in New Zealand?",
        "How do I calculate Kiwisaver contributions?",
        "When are GST returns due?",
        "What expenses can I claim for my business?",
        "How does PAYE work for employees?",
    ];

    const dbSuggestedQueries = [
        "Show me total revenue for the last 6 months",
        "What are my top 5 expenses this year?",
        "List all unpaid invoices",
        "Show GST summary for Q4 2025",
        "Find all transactions over $5,000",
    ];

    const handleTaxSubmit = () => {
        if (!taxMessage.trim()) return;

        setTaxChat([
            ...taxChat,
            { role: 'user', message: taxMessage },
            {
                role: 'assistant',
                message: "The current GST rate in New Zealand is 15%. GST is charged on most goods and services. If your business has revenue over $60,000 per year, you must register for GST with the IRD. GST returns are typically filed every 2, 6, or 12 months depending on your registration."
            }
        ]);
        setTaxMessage('');
    };

    const handleDbSubmit = () => {
        if (!dbQuery.trim()) return;

        setDbResults(`Query: "${dbQuery}"\n\nResults:\n- Total Revenue (6 months): $188,675.00\n- Average monthly revenue: $31,445.83\n- Highest month: December 2025 ($35,100)\n- Lowest month: August 2025 ($29,500)\n- Growth trend: +12.5%`);
        setDbQuery('');
    };

    if (!hasChatbot && !hasDatabase) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>Upgrade Required</CardTitle>
                        <CardDescription>
                            AI Assistant features are available on Lite and Enterprise plans
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full" onClick={() => window.location.href = '/pricing'}>
                            View Plans
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2 animate-fade-in">
            {/* Tax Knowledge Chatbot */}
            {hasChatbot && (
                <Card className="flex flex-col h-[600px]">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <Bot className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Tax Knowledge Assistant</CardTitle>
                                <CardDescription>Ask questions about NZ tax rules and regulations</CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col overflow-hidden">
                        {/* Suggested Questions */}
                        {taxChat.length === 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
                                <div className="space-y-2">
                                    {taxSuggestedQuestions.slice(0, 3).map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setTaxMessage(q)}
                                            className="w-full text-left p-2 text-sm rounded-lg border hover:bg-accent transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                            {taxChat.map((chat, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-lg p-3 ${chat.role === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'
                                            }`}
                                    >
                                        <p className="text-sm">{chat.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="flex gap-2">
                            <Input
                                value={taxMessage}
                                onChange={(e) => setTaxMessage(e.target.value)}
                                placeholder="Ask about NZ tax regulations..."
                                onKeyPress={(e) => e.key === 'Enter' && handleTaxSubmit()}
                            />
                            <Button onClick={handleTaxSubmit}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Database Query Assistant */}
            {hasDatabase && (
                <Card className="flex flex-col h-[600px]">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-nz-teal/10">
                                <Database className="h-5 w-5 text-nz-teal" />
                            </div>
                            <div>
                                <CardTitle>Database Query Assistant</CardTitle>
                                <CardDescription>Chat with your financial data using natural language</CardDescription>
                            </div>
                        </div>
                        <Badge variant="default" className="w-fit">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Enterprise Only
                        </Badge>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col overflow-hidden">
                        {/* Suggested Queries */}
                        {!dbResults && (
                            <div className="mb-4">
                                <p className="text-sm text-muted-foreground mb-2">Example queries:</p>
                                <div className="space-y-2">
                                    {dbSuggestedQueries.slice(0, 3).map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setDbQuery(q)}
                                            className="w-full text-left p-2 text-sm rounded-lg border hover:bg-accent transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Results */}
                        {dbResults && (
                            <div className="flex-1 overflow-y-auto mb-4">
                                <div className="bg-muted rounded-lg p-4">
                                    <pre className="text-sm whitespace-pre-wrap font-mono">{dbResults}</pre>
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="flex gap-2">
                            <Input
                                value={dbQuery}
                                onChange={(e) => setDbQuery(e.target.value)}
                                placeholder="Ask about your data..."
                                onKeyPress={(e) => e.key === 'Enter' && handleDbSubmit()}
                            />
                            <Button onClick={handleDbSubmit}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default AIAssistant;
