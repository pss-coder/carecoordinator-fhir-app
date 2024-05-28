import type { Config } from "tailwindcss";
import typographyPlugin from '@tailwindcss/typography'

const config: Config = {
  content: [
    "./src/components/documentation/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/documentation/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [typographyPlugin],
};
export default config;
