import type { Config } from "tailwindcss";

// each package has its own extended tailwind.config.ts
export default {
  theme: { extend: {} },
  plugins: [],
} satisfies Omit<Config, "content">;
