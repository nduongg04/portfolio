import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				blink: {
					"0%": { opacity: "0" },
					"50%": { opacity: "1" },
					"100%": { opacity: "0" },
				},
				scroll: {
					"0%": {
						transform: "translateX(0)",
					},
					"100%": {
						transform: "translateX(-50%)",
					},
				},
			},
			animation: {
				blink: "blink 1s infinite",
				scroll: "scroll 30s linear infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
