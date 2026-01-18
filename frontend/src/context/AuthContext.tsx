import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserTier, mockUsers } from '@/lib/mockData';

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (tier: UserTier) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem('aitax_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Default to enterprise tier for demo
            const defaultUser = mockUsers.enterprise;
            setUser(defaultUser);
            localStorage.setItem('aitax_user', JSON.stringify(defaultUser));
        }
    }, []);

    const login = (tier: UserTier) => {
        const selectedUser = mockUsers[tier];
        setUser(selectedUser);
        localStorage.setItem('aitax_user', JSON.stringify(selectedUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('aitax_user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
