import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Helper function for utility classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
