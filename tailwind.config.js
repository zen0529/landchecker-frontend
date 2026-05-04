export default {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: "#4F46E5", // indigo-600
                    light: "#818CF8",   // indigo-400
                    dark: "#3730A3",    // indigo-800
                },
                slate: {
                    50: "#F8FAFC",
                    100: "#F1F5F9",
                    200: "#E2E8F0",
                    300: "#CBD5E1",
                    400: "#94A3B8",
                    500: "#64748B",
                    600: "#475569",
                    700: "#334155",
                    800: "#1E293B",
                    900: "#0F172A",
                },
                // Keep some semantic colors but modernize them
                success: "#10B981", // emerald-500
                error: "#EF4444",   // red-500
                warning: "#F59E0B", // amber-500
                
                // Keep old names for compatibility during migration if needed, 
                // but map them to modern colors
                cream: "#F8FAFC", // slate-50
                ink: "#0F172A",   // slate-900
                "warm-gray": "#64748B", // slate-500
                gold: "#4F46E5", // Use brand instead of gold
                surface: "#FFFFFF",
                border: "#E2E8F0", // slate-200
            },
            fontFamily: {
                sans: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
            },
            boxShadow: {
                'premium': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
                'premium-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            keyframes: {
                fadeSlideUp: {
                    from: { opacity: 0, transform: "translateY(16px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                },
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                pulse: {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.5 },
                },
            },
            animation: {
                "fade-slide-up": "fadeSlideUp 0.4s ease both",
                "fade-in": "fadeIn 0.3s ease both",
                "pulse-slow": "pulse 1.5s infinite",
            },
        },
    },
    plugins: [],
}