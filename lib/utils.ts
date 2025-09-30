import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  // Commit 18: Added a comment to the cn function in utils.ts.
  return twMerge(clsx(inputs))
}
