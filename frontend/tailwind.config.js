// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary color (green)
        primary: {
          light: '#bbf7d0',   // Light green
          std: '#22c55e', // Standard green
          dark: '#15803d',    // Dark green
        },
        // Secondary color (teal)
        secondary: {
          light: '#99f6e4',   // Light teal
          std: '#14b8a6', // Standard teal
          dark: '#0f766e',    // Dark teal
        },
        // Alert colors
        alert: {
          success: '#10b981', // Success green
          warning: '#f59e0b', // Warning amber
          error: '#ef4444',   // Error red
        },
        // Neutral gray (for text and backgrounds)
        neutral: {
          light: '#f5f5f5',   // Light gray (backgrounds)
          std: '#737373', // Medium gray (text)
          dark: '#262626',    // Dark gray (headings)
        }
      }
    }
  },
  plugins: [],
}