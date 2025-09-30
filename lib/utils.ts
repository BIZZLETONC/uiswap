// Commit 13: Adding a header comment to utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function for combining CSS classes
export function cn(...inputs: ClassValue[]) {
  // Commit 12: Adding a comment inside the cn function
  return twMerge(clsx(inputs))
}
