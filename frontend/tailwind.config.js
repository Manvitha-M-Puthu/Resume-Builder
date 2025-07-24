// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This tells Tailwind to scan your React components
  ],
  theme: {
    extend: {
      // Explicitly define colors here using hex or rgb values.
      // This overrides Tailwind's internal color definitions that might
      // implicitly use oklch/lch functions, which html2canvas doesn't support.
      colors: {
        // Your primary accent colors (indigo, green, red, blue, purple)
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Used for primary buttons, links
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a', // Used for save button
          700: '#15803d',
          800: '#14532d',
          900: '#0c4a6e',
          950: '#052e16',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // Used for remove/logout buttons
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // Used for download button
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea', // Used for AI generate button
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Also explicitly define shades of gray, as they are used for text/backgrounds
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6', // Used for main background
            200: '#e5e7eb', // Used for borders
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563', // Used for text-gray-600
            700: '#374151', // Used for text-gray-700
            800: '#1f2937', // Used for sidebar background, H1
            900: '#111827',
            950: '#030712',
        },
        // Add any other specific colors you might have used or plan to use.
      },
    },
  },
  plugins: [],
};