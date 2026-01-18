import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NZ', {
        style: 'currency',
        currency: 'NZD',
    }).format(amount)
}

export function formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat('en-NZ', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(date))
}

export function formatPercentage(value: number): string {
    return `${(value * 100).toFixed(2)}%`
}

export function calculateGST(amount: number, rate: number = 0.15): number {
    return amount * rate
}

export function getGSTNet(grossAmount: number): number {
    return grossAmount / 1.15
}

export function getGSTAmount(grossAmount: number): number {
    return grossAmount - getGSTNet(grossAmount)
}
