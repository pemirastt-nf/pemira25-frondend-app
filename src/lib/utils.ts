import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs))
}

export function fixUtcToWib(dateString: string | Date | null | undefined): Date | null {
     if (!dateString) return null;
     if (dateString instanceof Date) return dateString;

     // Hack: Remove 'Z' to force browser/server to interpret as Local Time (WIB)
     // This fixes the issue where "10:00 WIB" is stored as "10:00 UTC" (7 hours shift).
     const localString = dateString.endsWith('Z') ? dateString.slice(0, -1) : dateString;
     return new Date(localString);
}
