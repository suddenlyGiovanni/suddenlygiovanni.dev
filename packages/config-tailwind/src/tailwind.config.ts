import type { Config } from "tailwindcss";

// each package has its own extended tailwind.config.ts
const config = {
  theme: { extend: {} },
  plugins: [],
} satisfies Omit<Config, "content">;
export default config;
export type { Config } from "tailwindcss";
