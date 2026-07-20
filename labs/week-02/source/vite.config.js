import { defineConfig } from "vite";

const repositoryName = "engse203-student-labs-68543210037-6";

export default defineConfig({
  base: './',
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});