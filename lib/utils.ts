import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Helper function for combining CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
