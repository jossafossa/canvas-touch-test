import { defineConfig } from "vite";
// import eslint from "vite-plugin-eslint";
import path from "path";

export default defineConfig( {
  plugins: [
    // eslint( ),
  ],
  // alias @
  resolve: {
    alias: {
      "@/": `${path.resolve( __dirname, "src" )}/`,
    },
  },
} );