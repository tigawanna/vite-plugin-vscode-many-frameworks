import { defineConfig } from 'vite';
import vscode from '@tomjs/vite-plugin-vscode';
// import react from '@vitejs/plugin-react-swc';
import preact from "@prefresh/vite";
// https://vitejs.dev/config/
export default defineConfig({
plugins: [
    preact(),
    vscode({
      extension: {
        sourcemap: "inline",
      },
    }),
  ],
});
