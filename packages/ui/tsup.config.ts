import { defineConfig } from 'tsup'


export default defineConfig({
  entry: ['src/index.tsx'],
  splitting: true,
  sourcemap: true,
  clean: true,
  format: 'esm',
  dts: true,
  external: ['react', 'react-dom'],
})
