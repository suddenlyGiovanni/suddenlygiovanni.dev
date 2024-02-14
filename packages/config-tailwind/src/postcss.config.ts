import { type Config } from "postcss-load-config";

/**
 * If you want to use other PostCSS plugins, see the following:
 * https://tailwindcss.com/docs/using-with-preprocessors
 */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
} satisfies Config;
export default config;

export { type Config } from "postcss-load-config";
