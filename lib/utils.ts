import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function for combining CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// End of utility functions
