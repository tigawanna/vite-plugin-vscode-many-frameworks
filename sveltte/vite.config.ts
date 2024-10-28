import { defineConfig } from 'vite';
import vscode from '@tomjs/vite-plugin-vscode';
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    vscode({
      extension: {
        sourcemap: "inline",
      },
    }),
  ],
});
